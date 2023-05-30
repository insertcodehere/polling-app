import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { map, merge, Observable, Subject, takeUntil } from 'rxjs';

import { AuthenticationService, NotificationService, User } from 'utils';
import { Poll, PollVoteDTO } from '../poll.model';
import { PollService } from '../poll.service';



@Component({
  selector: 'app-poll-voting',
  templateUrl: './poll-voting.component.html',
  styleUrls: ['./poll-voting.component.scss']
})
export class PollVotingComponent {

  private _destroy = new Subject<void>();

  private _authenticatedUser: User;

  private _pollAsync!: Observable<Poll>;

  poll: Poll | null = null;

  alreadyVoted: boolean = false;

  votedOptionValue: string | null = null;

  optionIndex: number = -1;

  pollId!: string;

  constructor(
    private _route: ActivatedRoute,
    private _notification: NotificationService,
    private _auth: AuthenticationService,
    private _pollService: PollService
  ) {
    // Get authenticated user
    this._authenticatedUser = this._auth.authenticatedUser as User;

    // Get the poll if from the current route
    this.pollId = this._route.snapshot.params['id'];

    // Load the poll by id
    this._pollAsync = this._pollService.get(this.pollId);

    // Create an observable that verify if the user has already voted
    this._pollAsync.pipe(
      takeUntil(this._destroy),
      map(poll => poll.options.some(option => option.votes.includes(this._authenticatedUser.id.toString())))
    ).subscribe(voted => {
      this.alreadyVoted = voted;
    });;

    merge(this._pollAsync, this._pollService.listen(this.pollId))
      .pipe(
        takeUntil(this._destroy)
      )
      .subscribe(poll => {
        this.poll = poll;

        const option = poll.options.find(option => option.votes.includes(this._authenticatedUser.id));
        if (option) {
          this.votedOptionValue = option.text;
        }
      });
  }

  ngOnDestroy(): void {
    this._destroy.next();
  }

  trackByText(index: number, item: any): void {
    return item.text;
  }

  countOptionVotes(option: any): number {
    const totalVoteCount = this.poll!.options.reduce((accumulator: number, option: any) => {
      return accumulator + option.votes.length;
    }, 0);

    return option.votes.length * 100 / totalVoteCount;
  }

  // MAX - 100
  // V   - x
  // V * 100 / MAX

  updateSelection(event: any, index: number): void {
    this.optionIndex = index;
  }

  vote(): void {
    const pollVote: PollVoteDTO = {
      option: this.optionIndex,
      votedBy: this._authenticatedUser.id
    };
    this._pollService.vote(this.pollId, pollVote).subscribe(poll => {
      this.alreadyVoted = true;

      this._pollAsync = this._pollService.get(this.pollId);

      this._notification.open('Voted successfully');
    });
  }

}

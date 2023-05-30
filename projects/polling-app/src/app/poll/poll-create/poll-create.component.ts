import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService, NotificationService } from 'utils';
import { Poll } from '../poll.model';
import { PollService } from '../poll.service';



type PollCreateDTO = Omit<Poll, 'id'>;

@Component({
  selector: 'poll-create',
  templateUrl: './poll-create.component.html',
  styleUrls: ['./poll-create.component.scss']
})
export class PollCreateComponent {

  poll: PollCreateDTO = this._createEmptyPoll();

  constructor(
    private _router: Router,
    private _notification: NotificationService,
    private _auth: AuthenticationService,
    private _pollService: PollService
  ) { }

  updateStatus(opened: boolean): void {
    this.poll.status = opened ? 'Opened' : 'Closed';
  }

  backToList(): void {
    this._router.navigate(['polls/list']);
  }

  createPoll(): void {
    this._pollService.create(this.poll).subscribe(poll => {
      this._showNotification();

      this._router.navigate(['polls', 'edit', poll.id]);
    });
  }

  updateOptionList(options: string[]): void {
    this.poll = {
      ...this.poll,
      options: options.map(option => ({ text: option, votes: [] }))
    };
  }

  private _createEmptyPoll(): PollCreateDTO {
    return {
      name: '',
      description: '',
      status: 'Opened',
      createdBy: this._auth.authenticatedUser!.id,
      options: []
    };
  }

  private _showNotification(): void {
    this._notification.open('Poll created');
  }

}

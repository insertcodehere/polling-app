import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';

import { Observable } from 'rxjs';

import { NotificationService } from 'utils';
import { Poll } from '../poll.model';
import { PollService } from '../poll.service';



@Component({
  selector: 'app-poll-edit',
  templateUrl: './poll-edit.component.html',
  styleUrls: ['./poll-edit.component.scss']
})
export class PollEditComponent {

  pollAsync: Observable<Poll>;

  poll!: Poll;

  @ViewChild('form')
  form!: NgForm;

  constructor(
    private _router: Router,
    private _route: ActivatedRoute,
    private _notification: NotificationService,
    private _pollService: PollService
  ) {
    // Load the poll by id
    const pollId = this._route.snapshot.params['id'];
    this.pollAsync = this._pollService.get(pollId);

    this.pollAsync.subscribe(poll => {
      this.poll = poll;
    });
  }

  updateStatus(opened: boolean): void {
    this.poll.status = opened ? 'Opened' : 'Closed';
  }

  backToList(): void {
    this._router.navigate(['polls/list']);
  }

  updatePoll(): void {
    const changes = { status: this.poll.status };
    this._pollService.updateStatus(this.poll.id, changes).subscribe(poll => {
      this._showNotification();

      this.form.form.markAsPristine();
    });
  }

  private _showNotification(): void {
    this._notification.open('Poll updated');
  }

}

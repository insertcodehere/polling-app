import { Component } from '@angular/core';

import { Observable } from 'rxjs';

import { Poll } from '../poll.model';
import { PollService } from '../poll.service';


@Component({
  templateUrl: './poll-list.component.html',
  styleUrls: ['./poll-list.component.scss']
})
export class PollListComponent {

  myPolls: Observable<Poll[]>;

  constructor(private _pollService: PollService) {
    this.myPolls = this._pollService.getMyPolls();
  }

}

import { Component } from '@angular/core';

import { BehaviorSubject, debounceTime, Observable, switchMap } from 'rxjs';

import { Poll } from '../poll.model';
import { PollService } from '../poll.service';



@Component({
  selector: 'app-poll-search',
  templateUrl: './poll-search.component.html',
  styleUrls: ['./poll-search.component.scss']
})
export class PollSearchComponent {

  private _searchQuery = new BehaviorSubject<string>('');

  searchResult: Observable<Poll[]>;

  constructor(private _pollService: PollService) {
    this.searchResult = this._pollService.getAll();

    this.searchResult = this._searchQuery.pipe(
      debounceTime(200),
      switchMap(query => this._pollService.search(query))
    );
  }

  updateSearchQuery(event: Event): void {
    const target = event.target as HTMLInputElement;
    const value = target.value;
    this._searchQuery.next(value);
  }

}

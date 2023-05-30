import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

import { Observable, of, throwError } from "rxjs";
import { WebSocketSubject } from "rxjs/webSocket";

import { environment } from "../../environments/environment";

import { Poll, PollVoteDTO } from "./poll.model";



type PollUpdateStatusDTO = Pick<Poll, 'status'>;

@Injectable({
  providedIn: 'root'
})
export class PollService {

  private _apiBaseEndpoint: string = `${environment.pollApi}/poll`;

  private _wsBaseEndpoint: string = `${environment.pollWs}/poll`;

  constructor(private _http: HttpClient) { }

  listen(pollId: string): Observable<Poll> {
    // WS - https://kube-demo.redscan.global/polling-server/api/poll/:id
    throw new Error('Not yet implemented.');
  }

  getAll(): Observable<Poll[]> {
    // GET - https://kube-demo.redscan.global/polling-server/api/poll
    throw new Error('Not yet implemented.');
  }

  getMyPolls(): Observable<Poll[]> {
    // GET - https://kube-demo.redscan.global/polling-server/api/poll/my
    throw new Error('Not yet implemented.');
  }

  get(id: string): Observable<Poll> {
    // GET - https://kube-demo.redscan.global/polling-server/api/poll/:id
    throw new Error('Not yet implemented.');
  }

  search(searchText: string): Observable<Poll[]> {
    // GET - https://kube-demo.redscan.global/polling-server/api/poll/search?query=:searchText
    throw new Error('Not yet implemented.');
  }

  create(poll: Omit<Poll, 'id'>): Observable<Poll> {
    // POST - https://kube-demo.redscan.global/polling-server/api/poll
    throw new Error('Not yet implemented.');
  }

  updateStatus(id: string, changes: PollUpdateStatusDTO): Observable<Poll> {
    // PUT - https://kube-demo.redscan.global/polling-server/api/poll/:id
    throw new Error('Not yet implemented.');
  }

  vote(id: string, vote: PollVoteDTO): Observable<Poll> {
    // PUT - https://kube-demo.redscan.global/polling-server/api/poll/:id/vote
    throw new Error('Not yet implemented.');
  }

  delete(id: string): Observable<void> {
    // DELETE - https://kube-demo.redscan.global/polling-server/api/poll/:id
    throw new Error('Not yet implemented.');
  }

}

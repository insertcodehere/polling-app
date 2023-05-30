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
    const socket = new WebSocketSubject<Poll>({
      url: `${this._wsBaseEndpoint}/${pollId}`,
      openObserver: {
        next: (event) => {
          console.log('Someone connected to the websocket.');
        }
      },
      closingObserver: {
        next: (event) => {
          console.log('Someone disconnecting the websocket.');
        }
      },
      closeObserver: {
        next: (event) => {
          console.log('Someone disconnected the websocket.');
        }
      }
    });

    return socket.asObservable();
  }

  getAll(): Observable<Poll[]> {
    return this._http.get<Poll[]>(`${this._apiBaseEndpoint}`);
  }

  getMyPolls(): Observable<Poll[]> {
    return this._http.get<Poll[]>(`${this._apiBaseEndpoint}/my`);
  }

  get(id: string): Observable<Poll> {
    return this._http.get<Poll>(`${this._apiBaseEndpoint}/${id}`);
  }

  search(searchText: string): Observable<Poll[]> {
    const encodedSearchText = encodeURIComponent(searchText);
    return this._http.get<Poll[]>(`${this._apiBaseEndpoint}/search?query=${encodedSearchText}`);
  }

  create(poll: Omit<Poll, 'id'>): Observable<Poll> {
    return this._http.post<Poll>(`${this._apiBaseEndpoint}`, poll);
  }

  updateStatus(id: string, changes: PollUpdateStatusDTO): Observable<Poll> {
    return this._http.put<Poll>(`${this._apiBaseEndpoint}/${id}`, changes);
  }

  vote(id: string, vote: PollVoteDTO): Observable<Poll> {
    return this._http.put<Poll>(`${this._apiBaseEndpoint}/${id}/vote`, vote);
  }

  delete(id: string): Observable<void> {
    return this._http.delete<void>(`${this._apiBaseEndpoint}/${id}`);
  }

}

import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, of, throwError} from 'rxjs';
import {User} from '../models/user';
import {Note} from '../models/note';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  loginUrl = 'http://localhost:3000/users/';
  notesUrl = 'http://localhost:3000/notes/';
  currentUser: User;

  constructor(private http: HttpClient) { }

  login(user: User): Observable<any> {
    this.currentUser = user;
    return this.http.post<any>(this.loginUrl, user);
  }

  getNotes(): Observable<Note[]> {
    if (this.currentUser) {
      return this.http.get<Note[]>(this.notesUrl + '?user=' + this.currentUser.username);
    }
    return of([]);
  }

  addNote(note: Note): Observable<any> {
    if (!this.currentUser) {
      return  throwError('You are not logged in.');
    }
    note.createdBy = this.currentUser.username;
    return this.http.post<any>(this.notesUrl + '/add', note);

  }
}

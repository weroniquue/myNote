import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Note} from '../models/note';

@Injectable({
  providedIn: 'root'
})
export class NotesService {
  notesUrl = 'http://localhost:3000/notes/';

  constructor(private http: HttpClient) {
  }

  getNotes(): Observable<Note[]> {
    return this.http.get<Note[]>(this.notesUrl);
    // return of([]);
  }

  addNote(note: Note): Observable<Note> {
    return this.http.post<Note>(this.notesUrl + '/add', note);
  }

  updateNote(note: Note): Observable<Note> {
    return this.http.put<Note>(this.notesUrl + '/edit', note);
  }

  deleteNote(id: string) {
    return this.http.delete(this.notesUrl + '/delete?id=' + id);
  }
}

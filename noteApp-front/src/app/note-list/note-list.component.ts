import {Component, OnInit} from '@angular/core';
import {NotesService} from '../services/notes.service';
import {Note} from '../models/note';

const enum NoteStatus {
  NEW = 'new',
  DONE = 'done'
}

@Component({
  selector: 'app-note-list',
  templateUrl: './note-list.component.html',
  styleUrls: ['./note-list.component.css']
})
export class NoteListComponent implements OnInit {

  noteList: Note[];
  noteModel = new Note('', '');
  loading = false;
  error: string;
  category = 'all';

  constructor(private notesService: NotesService) {
  }

  ngOnInit() {
    this.notesService.getNotes()
      .subscribe(response => {
        this.noteList = response;
      });
  }

  addNote(note: Note) {
    this.notesService.addNote(note)
      .subscribe(response => {
          this.noteList.push(response);
        },
        error => {
          this.error = error;
          this.loading = false;
        });
  }

  updateStatus(note: Note) {
    const oldStatus = note.status;
    if (note.status === NoteStatus.NEW) {
      note.status = NoteStatus.DONE;
    } else {
      note.status = NoteStatus.NEW;
    }

    this.updateNote(note, oldStatus);
  }

  deleteNote(note: Note) {
    this.notesService.deleteNote(note._id)
      .subscribe(() => {
          this.noteList.splice(this.noteList.indexOf(note), 1);
        },
        error => {
          this.error = error;
          this.loading = false;
        });
  }

  updateNote(note: Note, defaultStatus) {
    const index = this.noteList.indexOf(note);
    this.notesService.updateNote(note)
      .subscribe(response => {
          // TODO jest zły rrsposne
          console.log(response);
          this.noteList[index] = response;
          // note.updatedAt = response.updatedAt;
        },
        error => {
          this.error = error;
          this.loading = false;
          note.status = defaultStatus;
        });
  }

  setCategory(category: string) {
    this.category = category;
  }
}

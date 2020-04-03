import { Component, OnInit } from '@angular/core';
import {NotesService} from '../services/notes.service';
import {Note} from '../models/note';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

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
  submitted = false;
  loading = false;
  addNoteForm: FormGroup;
  error: string;

  constructor(private notesService: NotesService,
              private formBuilder: FormBuilder) { }

  ngOnInit() {

    this.addNoteForm = this.formBuilder.group({
      title: ['', Validators.required],
      content: ['', Validators.required],
    });

    this.notesService.getNotes()
      .subscribe(response => {
        this.noteList = response;
      });
  }



  get f() { return this.addNoteForm.controls; }

  addNote() {

    this.submitted = true;

    // stop here if form is invalid
    if (this.addNoteForm.invalid) {
      return;
    }

    const note = new Note(this.f.title.value, this.f.content.value);

    this.notesService.addNote(note)
      .subscribe(response => {
          note.updatedAt = response.updatedAt;
          this.noteList.push(note);
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

    this.notesService.updateNote(note)
      .subscribe(response => {
          note.updatedAt = response.updatedAt;
        },
        error => {
          this.error = error;
          this.loading = false;
          note.status = oldStatus;
        });
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
}

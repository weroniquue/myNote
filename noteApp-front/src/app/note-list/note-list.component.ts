import { Component, OnInit } from '@angular/core';
import {UserService} from '../services/user.service';
import {Note} from '../models/note';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {User} from '../models/user';

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
  error:string;

  constructor(private userService: UserService,
              private formBuilder: FormBuilder) { }

  ngOnInit() {

    this.addNoteForm = this.formBuilder.group({
      title: ['', Validators.required],
      content: ['', Validators.required],
    });

    this.userService.getNotes()
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

    this.userService.addNote(note)
      .subscribe(response => {
          console.log(response);
          note.createdAt = response.createdAt;
          this.noteList.push(note);
        },
        error => {
          this.error = error;
          this.loading = false;
        });


  }
}

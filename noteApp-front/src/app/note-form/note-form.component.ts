import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Note} from '../models/note';

@Component({
  selector: 'app-note-form',
  templateUrl: './note-form.component.html',
  styleUrls: ['./note-form.component.css']
})
export class NoteFormComponent implements OnInit {

  submitted = false;
  addNoteForm: FormGroup;

  @Input() noteModel: Note;
  @Output() note = new EventEmitter<Note>();

  constructor(private formBuilder: FormBuilder) {
  }

  get f() {
    return this.addNoteForm.controls;
  }

  ngOnInit(): void {
    this.addNoteForm = this.formBuilder.group({
      title: [this.noteModel.title, Validators.required],
      content: [this.noteModel.content, Validators.required],
    });
  }

  addNote() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.addNoteForm.invalid) {
      return;
    }

    this.note.emit(this.noteModel);
    this.addNoteForm.reset();
  }

}

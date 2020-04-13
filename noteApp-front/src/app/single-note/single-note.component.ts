import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Note} from '../models/note';

@Component({
  selector: 'app-single-note',
  templateUrl: './single-note.component.html',
  styleUrls: ['./single-note.component.css']
})
export class SingleNoteComponent implements OnInit {

  @Input() note: Note;
  @Output() status = new EventEmitter<Note>();
  @Output() edit = new EventEmitter<Note>();
  @Output() delete = new EventEmitter<Note>();
  private canEdit: boolean;

  constructor() { }

  ngOnInit(): void {
  }

  updateStatus(note: Note) {
    this.status.emit(note);
  }

  deleteNote(note: Note) {
    this.delete.emit(note);
  }

  editNote($event: Note) {
    this.canEdit = false;
    this.edit.emit($event);
  }

  enableEdit() {
    this.canEdit = true;
  }
}

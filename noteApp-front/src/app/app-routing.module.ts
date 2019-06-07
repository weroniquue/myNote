import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from './login/login.component';
import {NoteListComponent} from './note-list/note-list.component';

const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'notes', component: NoteListComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

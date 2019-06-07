export class Note {
  title: string;
  content: string;
  createdBy: string;
  createdAt: Date;

  constructor(title: string, content: string){
    this.title = title;
    this.content = content;
  }
}

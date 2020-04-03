export class Note {
  // tslint:disable-next-line:variable-name
  _id: string;
  title: string;
  content: string;
  status: string;
  updatedAt: Date;

  constructor(title: string, content: string) {
    this.title = title;
    this.content = content;
    this.status = 'new';
  }
}

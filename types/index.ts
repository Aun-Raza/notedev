export interface User {
  id: string;
  username: string;
}

export interface Note {
  id: string;
  title: string;
  text: string;
  createdAt: Date;
  updatedAt: Date;
}

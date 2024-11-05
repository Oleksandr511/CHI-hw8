export interface User {
  id: string;
  username: string;
}

export interface Exhibit extends User {
  id: string;
  imageUrl: string;
  description: string;
  commentCount: number;
  user: User;
}

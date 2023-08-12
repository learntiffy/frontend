import { User } from "./User";

export interface Post {
  _id: string;
  user: User;
  text: string;
  postDate: string;
  url: string;
}

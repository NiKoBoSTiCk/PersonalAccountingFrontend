import { User } from "./user";
import { Tag } from "./tag";

export class Document {
  id: number;
  user: User;
  tag:Tag;
  description:string;
  amount:number;

  constructor(id:number, user:User, tag:Tag, description:string, amount:number ) {
    this.id = id; this.user = user; this.tag = tag; this.description = description; this.amount = amount;
  }
}

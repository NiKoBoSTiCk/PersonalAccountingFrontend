export class User {
  token: string;
  id: number;
  username: string;
  email: string;

  constructor(id:number, token:string, username:string, email:string) {
    this.id = id; this.token = token; this.username = username; this.email = email;
  }
}

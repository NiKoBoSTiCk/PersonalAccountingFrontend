export class User {
  token: string;
  username: string;
  email: string;
  tokenType: string;

  constructor(token: string, username: string, email: string, tokenType: string) {
    this.token = token;
    this.username = username;
    this.email = email;
    this.tokenType = tokenType;
  }
}

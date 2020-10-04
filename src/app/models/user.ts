export class User {
  constructor(
    public name: string,
    public email: string,
    public id: string,
    private _token: string
  ) {}

  getToken() {
    return this._token;
  }
}

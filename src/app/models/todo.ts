export class Todo {
  constructor(public description, public finished, private _id) {}

  getId() {
    return this._id;
  }
}

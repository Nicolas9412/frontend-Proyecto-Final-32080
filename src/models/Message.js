export class Message {
  constructor(_id, email, type, datetime, body, read) {
    this._id = _id;
    this.email = email;
    this.type = type;
    this.datetime = datetime;
    this.body = body;
    this.read = read;
  }
}

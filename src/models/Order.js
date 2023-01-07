class Order {
  constructor(_id, products, numberOrder, datetime, state, email) {
    this._id = _id;
    this.products = products;
    this.numberOrder = numberOrder;
    this.datetime = datetime;
    this.state = state;
    this.email = email;
  }
}

export default Order;

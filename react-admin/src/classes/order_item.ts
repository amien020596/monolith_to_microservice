export class orderItem {
  id: number;
  price: number;
  product_title: string;
  quantity: number;

  constructor(id = 0, price = 0, product_title = '', quantity = 0) {
    this.id = id;
    this.price = price;
    this.product_title = product_title;
    this.quantity = quantity;
  }
}
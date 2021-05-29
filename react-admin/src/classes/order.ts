export class Order {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  total: number;
  order_item: any[];

  constructor(id = 0, first_name = '', last_name = '', email = '', total = 0, order_item = []) {
    this.id = id;
    this.first_name = first_name;
    this.last_name = last_name;
    this.email = email;
    this.total = total;
    this.order_item = order_item;
  }

}
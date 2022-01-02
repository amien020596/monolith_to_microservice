export class product {
  id: number;
  description: string;
  image: string;
  price: number;
  title: string;
  constructor(id = 0, description = '', image = '', price = 0, title = '') {
    this.id = id;
    this.description = description;
    this.image = image;
    this.price = price;
    this.title = title;
  }
}
import { permission } from "./permission";

export class role {
  id: number;
  name: string;
  permission: permission[];

  constructor(id = 0, name = '', permission = []) {
    this.id = id;
    this.name = name;
    this.permission = permission;
  }
}
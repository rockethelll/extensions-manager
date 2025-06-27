export class Extension {
  id!: number;
  logo: string;
  name: string;
  description: string;
  isActive: boolean;

  constructor(
    logo: string,
    name: string,
    description: string,
    isActive: boolean
  ) {
    this.logo = logo;
    this.name = name;
    this.description = description;
    this.isActive = isActive;
  }
}

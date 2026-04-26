export class ProductImage {
  constructor(
    public readonly id: string,
    private url: string,
    private isFeatured: boolean = false,
  ) {}

  getId() {
    return this.id;
  }

  getUrl() {
    return this.url;
  }

  isMain() {
    return this.isFeatured;
  }

  setAsMain() {
    this.isFeatured = true;
  }

  removeAsMain() {
    this.isFeatured = false;
  }
}

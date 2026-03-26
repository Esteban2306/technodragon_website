export class ProductImage {
    constructor(
        public readonly id: string,
        private url: string
    ) {}

    getId() {
        return this.id;
    }

    getUrl() {
        return this.url;
    }
}
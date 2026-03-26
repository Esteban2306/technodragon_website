export interface VariantAttributeProps {
  id: string;
  name: string;
  value: string;
}

export class VariantAttribute {
  constructor(
    public readonly id: string,
    private name: string,
    private value: string
  ) {
    this.validate();
  }

  private validate() {
    if (!this.name || !this.value) {
      throw new Error("Attribute name and value are required");
    }
  }

  getName() {
    return this.name;
  }

  getValue() {
    return this.value;
  }
}
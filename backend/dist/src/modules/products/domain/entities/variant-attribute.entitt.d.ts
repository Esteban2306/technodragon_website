export interface VariantAttributeProps {
    id: string;
    name: string;
    value: string;
}
export declare class VariantAttribute {
    readonly id: string;
    private name;
    private value;
    constructor(id: string, name: string, value: string);
    private validate;
    getName(): string;
    getValue(): string;
}

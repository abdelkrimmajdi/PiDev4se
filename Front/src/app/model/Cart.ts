import { product } from '../model/product';

export class Cart{
    idCard?:number;
    quantity!:number;
    price!:number;
    product?: product;
}
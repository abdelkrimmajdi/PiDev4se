import { Cart } from "./Cart";


export class Delivery{

    idDelivery!: number;
    name!: string;
    email!: string;
    phone!:number;
    adresse!: string;
    city!: string;
    country!:string;
    total!: number;
    cart!:Cart;

}
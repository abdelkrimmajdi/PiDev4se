import { Role } from "../model/role.enum";
import { Image } from "./image.model";
export class User{
    id!: number;
    firstName!: string;
    lastName!: string;
    email!: string;
    password!: string;
    role!: Role;
    image!: Image;
    phonenumber!: string;
    imageStr!: string;
}
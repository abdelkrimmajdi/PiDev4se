import { Role } from "../model/role.enum";
import { Image } from "./image.model";
export class User{
<<<<<<< HEAD
    id!: number;
=======
    id!:number;
>>>>>>> 4095e4be584b28adb5ad3d57622c43f1b6596c3a
    firstName!: string;
    lastName!: string;
    email!: string;
    password!: string;
    role!: Role;
    image!: Image;
    phonenumber!: string;
    imageStr!: string;
}
import { Role } from "../model/role.enum";
export class User{
    id!: number;
    firstName!: string;
    lastName!: string;
    email!: string;
    password!: string;
    role!: Role;
    image!: string;
    phonenumber!: string;
}
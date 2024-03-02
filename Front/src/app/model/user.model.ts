import { Role } from "../model/role.enum";
export class User{
    firstname!: string;
    lastname!: string;
    email!: string;
    password!: string;
    role!: Role;
}
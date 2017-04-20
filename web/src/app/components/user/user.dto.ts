
export class UserDTO{
    id: number;
    login: string;
    name: string;
    email: string;
    password: string;
    roles: string[]=[];
    current:boolean;
}
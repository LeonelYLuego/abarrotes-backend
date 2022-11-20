import { Role } from "../types/role.types";

export class ResponseLogInDto {
    role: Role;
    id: number;
    token: string;
}
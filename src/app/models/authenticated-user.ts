import { UnauthenticatedUser } from "./unauthenticated-user";

export class AuthenticatedUser extends UnauthenticatedUser {
    public id: number|null;
    public firstName: string;
    public lastName: string;
    public email: string;
}

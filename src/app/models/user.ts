
export class User {
    public following?: string[];
    public uid: string;
    public firstName: string;
    public lastName: string;
    public email: string;
    public phone: string;
    public role: string = "anonymous";
}

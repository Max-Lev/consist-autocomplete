export interface IUser {
    UserName: string;
    Name: string;
    Email: string;
    Title: string;
}

export class User {
    Name: string;
    Email: string;
    Title: string;
    FullName: string;
    IsSelected?: boolean = false;
    constructor(user: IUser) {
        this.Name = user.UserName;
        this.FullName = user.Name;
        this.Email = user.Email;
        this.Title = user.Title;
    };
};
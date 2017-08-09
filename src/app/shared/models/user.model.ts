export class User {
    public email: string;
    public username: string;
    public password: string;
    // tslint:disable-next-line:variable-name
    public password_confirm: string;

    constructor(data) {
        this.email = data.email;
        this.username = data.username;
        this.password = data.password;
        this.password_confirm = data.confirmPassword;
    }

    public getUser() {
        return {
            email: this.email,
            username: this.username
        };
    }
};

import { User } from "./types";

const ValidateEmail = (email: string): boolean => {
    const expression: RegExp = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    const result: boolean = expression.test(email);
    return result;
}

const ValidatePassword =  (password:string, confirmPassword: string): boolean => {
    return password === confirmPassword && password.length > 0;
}

export const ValidateDataRegister = (user: User, confirmPassword: string): [boolean, boolean] => {
    return [ValidateEmail(user.email), ValidatePassword(user.password, confirmPassword)];
}

export const ValidateDataLogin = (user:User): boolean => {
    return ValidateEmail(user.email);
}
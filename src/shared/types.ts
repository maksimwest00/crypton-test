export type User = {
    email: string,
    password: string
}
 
export type UserSuccess = {
     token: string,
     type: string
}
 
export type ProfileSuccess = {
     email: string,
     id: string
}

export type RequestError = {
     code: string,
     message: string
};

export type CardProps = {
     navigateTo: (state: EPagestate) => void;
     checkStatus: () => void
}
 
export enum EPagestate{
    Register,
    Login,
    Profile
}
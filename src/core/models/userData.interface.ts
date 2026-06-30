export interface ILogin {
    email: string;
    password: string;
}
export interface IAddress {
    firstName: string;
    lastName: string;
    street: string;
    city: string;
    country: string;
}

export interface ISignin{
    email: string;
    password: string;
    displayName: string;
    phoneNumber: string;
    address: IAddress;
}
export interface ISigninRes {
    token: string;
    email: string;
    password: string;
}

export interface ILoginRes {
    email: string;
    password: string;
    displayName: string;
}

export interface IUserData {
    id: string;
    role: string;
    name: string;
    exp: number;
}




export interface Profile {
    firstName : string,
    lastName : string,
    email : string
}


export interface ProfileDoctor extends Profile {
    specialization: string;
    licenseNumber: string;
    priceHour: number;
}
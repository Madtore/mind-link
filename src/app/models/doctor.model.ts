export interface Doctor {
    id?: number;
    name?: string;
    specialty?: string;
    price?: number;
    imageUrl?: string;
    description?: string;
    available?: boolean;
  }


export interface DoctorResponse {
    firstName: string,
    lastName: string,
    email: string,
    dateOfBirth: string,
    gender: string,
    specialization: string,
    licenseNumber: string,
    priceHour: number

}
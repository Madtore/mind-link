import { Gender } from "./enum/Gender";

export class DoctorCreate {
    constructor(public firstName: string,
        public lastName: string,
        public email: string,
        public password: string,
        public dateOfBirth: Date,
        public gender: Gender,
        public specialization: string,
        public licenseNumber: string
    ){}
}

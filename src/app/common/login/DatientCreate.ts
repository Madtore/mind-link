import { Gender } from "./enum/Gender";

export class PatientCreate {
    constructor(public firstName: string,
        public lastName: string,
        public email: string,
        public password: string,
        public dateOfBirth: string,
        public gender: Gender
    ){}
}

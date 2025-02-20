export class CommentGetDto {
    constructor(public id:number, public content: string, public fechaCreacion: Date, public userName: string) {

    }
}

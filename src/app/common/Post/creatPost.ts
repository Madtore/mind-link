export class CreatePost {
    constructor(
        public title: string,
        public content: string,
        public category: string,
        public email: string,
        public image: File | null = null  
    ) {}
}

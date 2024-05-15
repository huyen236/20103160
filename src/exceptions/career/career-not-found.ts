export class CareerNotFound extends Error {
    constructor(message: string) {
        super(message);
        this.name = "CareerNotFound";
    }
}
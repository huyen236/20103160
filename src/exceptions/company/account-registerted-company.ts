export class AccountRegisteredCompany extends Error {
    constructor(message: string) {
        super(message);
        this.name = "AccountRegisteredCompany";
    }
}

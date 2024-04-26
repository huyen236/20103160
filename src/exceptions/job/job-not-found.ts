export class JobNotFound extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'JobNotFound';
  }
}

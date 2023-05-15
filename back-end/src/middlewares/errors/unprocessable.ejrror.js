class UnprocessableContentError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 422;
  }
}

export default UnprocessableContentError;
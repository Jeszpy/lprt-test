export const badReqErrorsGenerator = (fields: string[]) => {
  const errors = fields.map((field) => ({
    message: expect.any(String),
    field,
  }));
  return {
    errorsMessages: expect.arrayContaining(errors),
  };
};

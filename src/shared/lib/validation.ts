export const emailValidation = (value: string) =>
  // eslint-disable-next-line security/detect-unsafe-regex
  /^[\w.!#$%&'*+/=?^`{|}~-]+@[a-zA-Z\d](?:[a-zA-Z\d-]{0,61}[a-zA-Z\d])?(?:\.[a-zA-Z\d](?:[a-zA-Z\d-]{0,61}[a-zA-Z\d])?)*$/.test(
    value
  );

export const getBaseEmailValidation = ({ required }: { required: boolean }) => ({
  ...(Boolean(required) && { required: "This is required" }),
  validate: {
    validEmail: (value: string) => (value && !emailValidation(value) ? "Invalid email" : true)
  }
});

export const getBasePasswordValidation = () => ({
  required: "This is required",
  minLength: { value: 6, message: "Min length of password is 6" }
});

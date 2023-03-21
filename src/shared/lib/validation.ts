import { Validate } from "react-hook-form";
import { isValidUrl } from "./isValidUrl";

type BaseValidate<FormFields> =
  | Validate<string | undefined, Partial<FormFields>>
  | Record<string, Validate<string | undefined, Partial<FormFields>>>
  | undefined;

export const emailValidation = (value: string) =>
  // eslint-disable-next-line security/detect-unsafe-regex
  /^[\w.!#$%&'*+/=?^`{|}~-]+@[a-zA-Z\d](?:[a-zA-Z\d-]{0,61}[a-zA-Z\d])?(?:\.[a-zA-Z\d](?:[a-zA-Z\d-]{0,61}[a-zA-Z\d])?)*$/.test(
    value
  );

export const baseRequired = { required: "This is required" };

export const isEmpty = (value: string) => value.replace(/\s/gi, "").length === 0;

export const isContainsNumbers = (value: string) => /\d/.test(value);

export const getBaseEmailValidation = <FormFields>(
  { required }: { required: boolean } = { required: false }
) => ({
  ...(Boolean(required) && baseRequired),
  validate: {
    validEmail: (value: string) => (value && !emailValidation(value) ? "Invalid email" : true)
  } as BaseValidate<FormFields>
});

export const getBaseUrlValidation = <FormFields>(
  { required }: { required: boolean } = { required: false }
) => ({
  ...(Boolean(required) && baseRequired),
  validate: {
    validUrl: (value: string) => (value && !isValidUrl(value) ? "Invalid url" : true)
  } as BaseValidate<FormFields>
});

export const getBasePasswordValidation = () => ({
  ...baseRequired,
  minLength: { value: 6, message: "Min length of password is 6" }
});

export const getFullNameValidation = <FormFields>(
  { required }: { required: boolean } = { required: false }
) => ({
  ...(Boolean(required) && baseRequired),
  validate: {
    checkEmpty: (value: string) => (value && isEmpty(value) ? "Empty field" : true),
    checkNumbers: (value: string) =>
      value && isContainsNumbers(value) ? "Field contains numbers" : true
  } as BaseValidate<FormFields>
});

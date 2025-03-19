import * as yup from "yup";

const schema = yup.object({
  firstName: yup
    .string()
    .required("Ім'я обов'язкове"),
  lastName: yup
    .string()
    .required("Прізвище обов'язкове"),
  email: yup
    .string()
    .email("Некоректна e-mail адреса")
    .required("E-mail обов'язковий"),
  password: yup
    .string()
    .required("Пароль обов'язковий")
    .min(6, 'Значення занадто коротке. Введіть 6 або більше символів')
    .max(16),
  confirmPassword: yup
    .string()
    .required("Підтвердження пароля обов'язкове")
    .oneOf([yup.ref("password")], "Паролі мають співпадати"),
  recaptcha: yup.boolean().oneOf([true]).required(),
  acceptTerms: yup.boolean().oneOf([true], 'Необхідно надати дозвіл на обробку персональної інформації.').required("Необхідно надати дозвіл на обробку персональної інформації."),
});
export type FormDataSchema = yup.InferType<typeof schema>;

export default schema;
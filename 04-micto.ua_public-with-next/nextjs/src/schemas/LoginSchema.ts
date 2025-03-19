import * as yup from "yup";

const schema = yup.object({
  email: yup
    .string()
    .email("Некоректна e-mail адреса")
    .required("E-mail обов'язковий"),
  password: yup
    .string()
    .matches(/^[A-Za-z0-9]+$/, "Можна використовувати літери лише латинського алфавіту та цифри.")
    .required("Пароль обов'язковий"),
  recaptcha: yup.boolean().oneOf([true]).required(),
});
export type FormDataSchema = yup.InferType<typeof schema>;

export default schema;
import * as yup from "yup";

const schema = yup.object({
  code: yup.string().required("Перейдіть за посиланням ще раз"),
  password: yup
    .string()
    .required("Новий пароль обов'язковий")
    .matches(/^[A-Za-z0-9]+$/, "Можна використовувати літери лише латинського алфавіту та цифри.")
    .min(6, "Мiнiмальна довжина пароля - 6 символiв")
    .max(16, " "),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Паролі мають співпадати")
    .required("Підтвердження пароля обов'язкове"),
});
export type FormDataSchema = yup.InferType<typeof schema>;

export default schema;

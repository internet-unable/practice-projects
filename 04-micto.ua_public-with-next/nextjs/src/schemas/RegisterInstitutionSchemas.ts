import * as yup from "yup";

export const firstStepSchema = yup.object({
  name: yup
    .string()
    .required("Назва обов'язкова"),
  type: yup.string().required("Тип власності обов'язковий"),
  edrpou: yup.string()
    .length(8, "Значення повинно бути рівно 8 символів")
    .matches(/^\d+$/, "Код ЄДРПОУ має містити лише цифри")
    .required("ЄДРПОУ обов'язковий"),
  description: yup.string().optional(),
});

export type FirstStepSchema = yup.InferType<typeof firstStepSchema>;

export const secondStepSchema = yup.object({
  firstName: yup.string().required("Ім'я обов'язкове"),
  lastName: yup.string().required("Прізвище обов'язкове"),
  phone: yup.string().required("Телефон обов'язковий"),
  email: yup.string().email("Некоректна e-mail адреса").required("E-mail обов'язковий"),
  position: yup.string().optional(),

})

export type SecondStepSchema = yup.InferType<typeof secondStepSchema>;

export const thirdStepSchema = yup.object({
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
  recaptcha: yup.boolean().oneOf([true]).required(),
  agreeTerms: yup.boolean().oneOf([true], 'Необхідно надати дозвіл на обробку персональної інформації.').required("Необхідно надати дозвіл на обробку персональної інформації.")
});

export type ThirdStepSchema = yup.InferType<typeof thirdStepSchema>;
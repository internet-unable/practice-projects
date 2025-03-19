import * as yup from "yup";

const schema = yup.object({
  oldPassword: yup.string().required("Старий пароль обов'язковий"),
  password: yup
    .string()
    .required("Новий пароль обов'язковий")
    .matches(/[A-Z]/, " ")
    .matches(/([0-9!@#$%^&*(),.?":{}|<>])/, " ")
    .min(6, " ")
    .max(16, " "),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Паролі мають співпадати")
    .required("Підтвердження пароля обов'язкове"),
});

export default schema;
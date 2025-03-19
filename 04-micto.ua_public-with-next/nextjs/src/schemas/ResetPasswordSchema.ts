import * as yup from "yup";

const schema = yup.object({
  email: yup
    .string()
    .email("Некоректна e-mail адреса")
    .required("E-mail обов'язковий"),
});
export type FormDataSchema = yup.InferType<typeof schema>;

export default schema;
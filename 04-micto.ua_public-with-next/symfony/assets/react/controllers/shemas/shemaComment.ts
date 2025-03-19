import * as yup from "yup";

export const schema = yup.object({
    text: yup.string().required("Обов'язкове поле"),
});

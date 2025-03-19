import { DayOfWeek } from "@/Types/cabinetTypes";
import * as yup from "yup";

const schema = yup.object({
  email: yup
    .string()
    .email("Некоректна e-mail Адреса")
    .required("E-mail обов'язковий"),
  password: yup
    .string()
    .required("Пароль обов'язковий"),
});

export default schema;
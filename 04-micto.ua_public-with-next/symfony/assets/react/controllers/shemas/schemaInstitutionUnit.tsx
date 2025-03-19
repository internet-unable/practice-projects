import { DayOfWeek } from "@/Types/cabinetTypes";
import * as yup from "yup";

const schema = yup.object({
  name: yup.string().required("Назва обов'язкова"),
  fullName: yup.string().optional(),
  description: yup.string().optional(),
  contacts: yup.object({
    phones: yup
      .array()
      .of(
        yup.object({
          number: yup.string().required("Номер телефону обов'язковий"), 
          comment: yup.string().required("Комментар обов'язковий")
        })
      )
      .optional(),
    emails: yup
      .array()
      .of(
        yup.object({
          email: yup.string().email("Некоректний формат email").required("Email є обов'язковий"),
          comment: yup.string().required("Комментар обов'язковий"),
        })
      )
      .optional(),
  }),
  schedule: yup
    .array()
    .of(
      yup.object({
        dayOfWeek: yup
          .string()
          .oneOf([...Object.values(DayOfWeek) as string[]], 'bug')
          .required(),
        isHoliday: yup.boolean().optional(),
        startTime: yup
          .string()
          .matches(
            /^([01]\d|2[0-3]):([0-5]\d)$/,
            "Час має бути у форматі HH:mm"
          )
          .required(),
        endTime: yup
          .string()
          .matches(
            /^([01]\d|2[0-3]):([0-5]\d)$/,
            "Час має бути у форматі HH:mm"
          )
          .required(),
      })
    )
    .required("Розклад обов'язковий"),
  typeId: yup.string().required("Тип обов'язковий"),
  edrpou: yup
    .string()
    .matches(/^\d+$/, "Код ЄДРПОУ має містити лише цифри")
    .required("ЄДРПОУ обов'язковий"),
  address: yup.object({
    cityId: yup.string().required("Місто обов'язкове"),
    address: yup.string().required("Адреса обов'язкова"),
    zipCode: yup
      .string()
      .matches(/^\d{5}$/, "Індекс має містити 5 цифр")
      .optional(),
  }),
});

export default schema;
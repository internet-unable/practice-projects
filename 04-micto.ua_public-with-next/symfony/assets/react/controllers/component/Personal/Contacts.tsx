import React from "react";
import Container from "@/controllers/component/Elements/Container";
import CustomInput from "@/controllers/component/Elements/CustomInput";
import CustomDataInput from "@/controllers/component/Elements/CustomDataInput";
import { useAppSelector } from "@/reduxToolkit/hooks";

interface IContact {
  fullName: string;
  birthday: Date;
  phone: string;
}

const Contacts = () => {
  const { firstName, lastName, middleName, phone } = useAppSelector(
    (state) => state.user.userInfo.info
  );

  const [contact, setContact] = React.useState({
    birthday: new Date(1997, 0, 17),
  });

  const handleBirthdayChange = (date: Date | undefined) => {
    if (date) {
      setContact((prevContact) => ({
        ...prevContact,
        birthday: date,
      }));
    }
  };

  return (
    <div className="min-h-[311px] ">
      <section className="bg-[var(--white)] rounded-[7px] p-4 m-0 desktop:p-6">
        <h3 className="text-[var(--color10)] fontMedium desktop:fontUbuntuMedium">Контактні дані</h3>

        <form action="" className="flex flex-col gap-3">
          <CustomInput
            className="mt-5"
            value={firstName}
            label="Ім’я:"
            placeholder="Вкажіть ім’я"
            type="text"
          />

          <CustomInput
            value={lastName}
            label="Прізвище:"
            placeholder="Вкажіть прізвище"
            type="text"
          />

          <CustomInput
            value={middleName}
            label="По батькові:"
            placeholder="Вкажіть по батькові"
            type="text"
          />

          <CustomDataInput
            value={contact.birthday}
            onSelect={handleBirthdayChange}
          />

          <CustomInput
            className=""
            value={phone?.number}
            label="Ваш телефон"
            placeholder="Вкажіть ваш телефон"
            type="tel"
          />
        </form>
      </section>
    </div>
  );
};

export default Contacts;

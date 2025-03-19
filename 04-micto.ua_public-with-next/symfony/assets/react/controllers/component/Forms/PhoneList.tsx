import React from "react";
import { Control, Controller } from "react-hook-form";
import Input from "./Input";
import { InstitutionUnitInput, PhoneInput } from "../../../Types/cabinetTypes";

type Props = {
  phones?: PhoneInput[];
  setPhonesState: Function;
};

export default function PhoneList({ phones, setPhonesState }: Props) {
  React.useEffect(() => {
    if (phones && phones.length === 0) {
      setPhonesState([
        {
          number: "",
          comment: "",
        },
      ]);
    }
  }, [phones]);

  const addNewPhoneRow = () => {
    setPhonesState([
      ...phones,
      {
        number: "",
        comment: "",
      },
    ]);
  };

  return (
    <>
      {phones &&
        phones.length > 0 &&
        phones.map((phone, index) => {
          return (
            <div className="row col-2" key={`${phone?.number}_${index}`}>
              <Input
                type={"tel"}
                id={`phones.${index}.value`}
                placeholder={"+380"}
                label={"Телефон"}
                customOnChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setPhonesState(
                    phones.map((el, i) => {
                      if (i === index) {
                        return {
                          number: phone?.number,
                          comment: phone?.comment,
                        };
                      }
                      return el;
                    })
                  );
                }}
                value={phone?.number || ""}
              />

              <Input
                type={"text"}
                id={`phones.${index}.comment`}
                placeholder={"Наприклад: Бухгалтерія"}
                label={"Коментар"}
                customOnChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setPhonesState(
                    phones.map((el, i) => {
                      if (i === index) {
                        return {
                          number: phone?.number || "",
                          comment: phone?.comment || "",
                        };
                      }
                      return el;
                    })
                  );
                }}
                value={phone.comment || ""}
              />
            </div>
          );
        })}

      <button
        className="add-new add-tel"
        onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
          addNewPhoneRow();
        }}
      >
        Додати ще телефон
      </button>
    </>
  );
}

import React from "react";
import { IPropsTimeInput, TimeInputControll } from "../../TimeInput";
import CustomCheckbox, {
  CustomCheckboxControll,
} from "@/controllers/component/Elements/CustomCheckbox";
import { Control, FieldValues, Path } from "react-hook-form";

type Props<T extends FieldValues> = {
  weekDay: string;
  isRoundTheClock?: boolean;
  isAdditionalActive?: boolean;
  control?: Control<T>;
  name?: Path<T>;
};

const WeekTime = <T extends FieldValues>({
  weekDay,
  isRoundTheClock,
  control,
  name,
  isAdditionalActive,
}: Props<T>) => {
  return (
    <div className="flex flex-col gap-[24px] p-4 bg-white shadow-cabinet rounded-[7px]">
      <div className="fontRegular2Bold font-bold font-inter">{weekDay}</div>

      <div className="flex flex-col gap-[16px]">
        <div className="fontMedium font-inter leading-6 text-[#007DCF]">
          Робочий час
        </div>

        <div
          className={`flex gap-[16px] items-center fontRegular2 ${
            isRoundTheClock || isAdditionalActive
              ? "opacity-50" + " pointer-events-none"
              : ""
          }`}
        >
          <div>з</div>

          <TimeInputControll
            control={control}
            name={`${name}.startTime` as Path<T>}
            isRoundTheClock={isRoundTheClock}
          />

          <div>до</div>

          <TimeInputControll
            control={control}
            name={`${name}.endTime` as Path<T>}
            isRoundTheClock={isRoundTheClock}
          />
        </div>

        <CustomCheckboxControll
          control={control}
          name={`${name}.isHoliday` as Path<T>}
          label="Зробити вихідним днем"
        />
      </div>

      <div className="fontMedium font-inter leading-6 text-[#007DCF]">
        Перерва
      </div>

      <div className="flex flex-col gap-[16px]">
        <CustomCheckbox label="Без перерви" />

        <CustomCheckbox label="Додати перерву" />
      </div>
    </div>
  );
};

export default WeekTime;

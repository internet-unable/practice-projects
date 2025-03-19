import React from "react";
import AddCustomButton from "../AddCustomButton";

const EmptyDepartments = ({ onOpen }) => {
  return (
    <div className="flex flex-col justify-start items-center gap-6 h-[173px] bg-[var(--white)] rounded-[var(--default-round)] pt-6 px-6">
      <h4 className="text-[var(--color10)] fontUbuntuMedium">
        У вас ще нема відділень
      </h4>
      <AddCustomButton
        className="w-full mt-4 h-[44px] gap-3 desktop:mt-0 desktop:w-[300px] desktop:h-[50px]"
        title="Додати відділення"
        onClick={onOpen}
      />
    </div>
  );
};

export default EmptyDepartments;

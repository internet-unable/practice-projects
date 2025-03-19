import React from "react";

type Props = {
  tabs: [string, string];
  setIsActive: React.Dispatch<React.SetStateAction<boolean>>;
  isActive: boolean;
};

const EditTabs: React.FC<Props> = ({ tabs, isActive, setIsActive }) => {
  return (
    <div className="flex py-[20px] px-[16px] desktop:p-4 desktop:px-0 desktop:pt-0 fontMedium leading-6 font-intermedium border-b border-[var(--gray2)]">
      <div className="w-full flex gap-4 desktop:w-fit">
        <div
          onClick={() => setIsActive(true)}
          className={`cursor-pointer whitespace-nowrap px-4 flex-1 flex items-center justify-center h-[40px] rounded-[7px] transition-colors duration-300 desktop:w-fit ${
            isActive
              ? "bg-[var(--color1)] text-[var(--black)]"
              : "bg-transparent text-[var(--gray4)]"
          }`}
        >
          {tabs[0]}
        </div>

        <div
          onClick={() => setIsActive(false)}
          className={`cursor-pointer whitespace-nowrap px-4 flex-1 flex items-center justify-center h-[40px] rounded-[7px] transition-colors duration-300 ${
            isActive
              ? "bg-transparent text-[var(--gray4)]"
              : "bg-[var(--color1)] text-[var(--black)]"
          }`}
        >
          {tabs[1]}
        </div>
      </div>
    </div>
  );
};

export default EditTabs;

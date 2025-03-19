import { Skeleton } from "@/components/ui/skeleton";
import AddCustomButton from "@/controllers/component/Elements/AddCustomButton";
import CustomInput from "@/controllers/component/Elements/CustomInput";
import React from "react";
import { useMedia } from "react-use";

interface IPropsInstitutionHeader {
  institutionsLength: number;
  loading: boolean;
  onOpen: () => void;
  setSearchString?: (str: string) => void;
}

const InstitutionHeader: React.FC<IPropsInstitutionHeader> = ({
  institutionsLength,
  loading,
  onOpen,
  setSearchString,
}) => {
  const isMedia991 = useMedia("(min-width: 991px)");

  if (loading) {
    return (
      <div className=" mt-5">
        <Skeleton className="w-[90px] h-[20px] rounded-[var(--default-round)]" />
        <Skeleton className="w-full h-[44px] rounded-[var(--default-round)] mt-4" />
        <Skeleton className="w-full h-[44px] rounded-[var(--default-round)] mt-10" />
      </div>
    );
  }
  return (
    <div className=" mt-5">
      {isMedia991 && (
        <div className="fontMediumRegular !text-[var(--gray3)] mb-5">
          {institutionsLength === 1
            ? institutionsLength + " " + "підзрозділ"
            : institutionsLength + " " + "підрозділи"}
        </div>
      )}
      <div className="desktop:flex  desktop:items-center desktop:flex-row gap-5 desktop:mt-7">
        <CustomInput
          placeholder="Я хочу знайти..."
          isSearchIcon={true}
          type="text"
          className="mb-5 gap-0 desktop:w-full desktop:min-h-[50px] desktop:mb-0"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setSearchString(e.currentTarget.value);
          }}
        />

        {!isMedia991 && (
          <span className="fontRegular !text-[var(--gray3)] ">
            {institutionsLength === 1
              ? institutionsLength + " " + "підзрозділ"
              : institutionsLength + " " + "підрозділи"}
          </span>
        )}
        <AddCustomButton
          className="w-full mt-4 h-[44px] gap-3 desktop:mt-0 desktop:w-[300px] desktop:h-[50px]"
          title="Додати підрозділ"
          onClick={onOpen}
        />
      </div>
    </div>
  );
};

export default InstitutionHeader;

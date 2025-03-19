import React from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { Label } from "@/components/ui/label";

interface CustomDataInputProps {
  value: Date;
  onSelect: (date: Date | undefined) => void;
}

const CustomDataInput: React.FC<CustomDataInputProps> = ({
  value,
  onSelect,
}) => {
  return (
    <div className="flex flex-col gap-1">
      <Label className="fontRegular2 text-[var(--color10)]">
        Дата народження
      </Label>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            className={cn(
              "w-full justify-start text-left font-normal rounded-[var(--default-round)] h-11",
              !value && "text-muted-foreground",
            )}
          >
            <img
              src="/img/cabinet/calendar.svg"
              alt="calendar"
              className="h-5 w-5"
            />
            <div className="fontRegular text-[var(--color10)]">
              {value ? (
                format(value, "dd/MM/yyyy")
              ) : (
                <span className="fontRegular text-[var(--color10)]">
                  Вкажіть дату народження
                </span>
              )}
            </div>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={value}
            onSelect={onSelect}
            initialFocus
          />
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default CustomDataInput;

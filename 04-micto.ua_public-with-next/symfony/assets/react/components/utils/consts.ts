import { ScheduleItemInput } from "@/Types/cabinetTypes";

export const sheduleFormat = (
  schedule: ScheduleItemInput[],
  isRoundTheClock: boolean,
  isTimeForAllWorkdays: {
    startTime: string;
    endTime: string;
  },
  isAdditionalActive: boolean,
) => {
  if(isRoundTheClock) {
      return schedule.map((item) => ({
          ...item,
          startTime: '00:00',
          endTime: '00:00',
      }))
  };

  if(isAdditionalActive) {
      return schedule.map((item) => ({
          ...item,
          startTime: isTimeForAllWorkdays.startTime,
          endTime: isTimeForAllWorkdays.endTime,
      }))
  };

  return schedule;
};

export const weeksName = ['Понеділок', 'Вівторок', 'Середа', 'Четвер', 'Пятниця', 'Субота', 'Неділя'];
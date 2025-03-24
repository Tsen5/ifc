import { useCallback, useMemo } from 'react';

import { IfcDate } from '../../../helpers/IfcDate';
import { useCalendarStore } from '../../../store/calendar';

import DayButton from './DayButton';

export interface DayProps {
  day: number;
  onSelectDay: (day: number) => void;
  currentMonthDate: IfcDate;
}

function Day({ day, onSelectDay, currentMonthDate }: DayProps) {
  const selectedDate = useCalendarStore((state) => state.selectedDate);

  const currentDate = useMemo(() => {
    const date = new IfcDate(currentMonthDate.toGregorian());
    date.setDate(day);
    return date;
  }, [currentMonthDate, day]);

  const isSelectedDate = useMemo(() => currentDate.isSameDate(selectedDate), [currentDate, selectedDate]);

  const isToday = useMemo(() => {
    const today = new IfcDate();
    return currentDate.isSameDate(today);
  }, [currentDate]);

  const handleSelectDay = useCallback(() => {
    onSelectDay(day);
  }, [day, onSelectDay]);

  return (
    <div>
      <DayButton
        isSelectedDate={isSelectedDate}
        variant="soft"
        color={isToday ? 'ruby' : 'gray'}
        onClick={handleSelectDay}
      >
        {day}
      </DayButton>
    </div>
  );
}

export default Day;

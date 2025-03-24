import { useTheme } from '@emotion/react';
import { useCallback, useMemo } from 'react';

import { IfcDate } from '../../helpers/IfcDate';
import { useCalendarStore } from '../../store/calendar';

import Day from './Day/Day';
import DayName from './Day/DayName';

export interface MonthProps {
  currentMonthDate: IfcDate;
}

function Month({ currentMonthDate }: MonthProps) {
  const theme = useTheme();

  const setSelectedDate = useCalendarStore((state) => state.setSelectedDate);

  const hasLeapDay = useMemo(
    () => currentMonthDate.isLeapYear() && currentMonthDate.getMonth() === 6,
    [currentMonthDate]
  );
  const hasYearDay = useMemo(() => currentMonthDate.getMonth() === 13, [currentMonthDate]);

  const days = useMemo(() => Array.from({ length: 28 }, (_, i) => i + 1), []);

  const handleSelectDate = useCallback(
    (day: number) => {
      const newDate = new IfcDate(currentMonthDate.toGregorian());
      newDate.setDate(day);
      setSelectedDate(newDate);
    },
    [currentMonthDate, setSelectedDate]
  );

  return (
    <div
      css={{
        display: 'grid',
        gridTemplateColumns: 'repeat(7, 1fr)',
        textAlign: 'center',
        gap: theme.sizing.spacing(2),
      }}
    >
      {days.slice(0, 7).map((day) => (
        <DayName key={day} day={day} />
      ))}
      {days.map((day) => (
        <Day key={day} day={day} onSelectDay={handleSelectDate} currentMonthDate={currentMonthDate} />
      ))}
      {hasLeapDay && <Day day={29} onSelectDay={handleSelectDate} currentMonthDate={currentMonthDate} />}
      {hasYearDay && <Day day={29} onSelectDay={handleSelectDate} currentMonthDate={currentMonthDate} />}
    </div>
  );
}

export default Month;

import { useTheme } from '@emotion/react';
import { useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { IfcDate } from '../../helpers/IfcDate';
import { useCalendarStore } from '../../store/calendar';

import Day from './Day/Day';
import DayName from './Day/DayName';
import EpagomenalDay from './EpagomenalDay';

export interface MonthProps {
  currentMonthDate: IfcDate;
}

function Month({ currentMonthDate }: MonthProps) {
  const { t } = useTranslation('calendar');
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
    <>
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
      </div>
      {hasYearDay && (
        <EpagomenalDay label={t('text.yearDay')} onSelectDay={handleSelectDate} currentMonthDate={currentMonthDate} />
      )}
      {hasLeapDay && (
        <EpagomenalDay label={t('text.leapDay')} onSelectDay={handleSelectDate} currentMonthDate={currentMonthDate} />
      )}
    </>
  );
}

export default Month;

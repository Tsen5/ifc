import { ChevronLeftIcon, ChevronRightIcon } from '@radix-ui/react-icons';
import { Button, Flex, IconButton, Separator, Text, Tooltip } from '@radix-ui/themes';
import { useCallback, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { IfcDate } from '../../helpers/IfcDate';
import { useCalendarStore } from '../../store/calendar';

import Month from './Month';

const firstDateOfMonth = (date = new Date()) => new Date(date.getFullYear(), date.getMonth(), 1);

function Calendar() {
  const { t } = useTranslation('calendar');

  const selectedDate = useCalendarStore((state) => state.selectedDate);
  const setSelectedDate = useCalendarStore((state) => state.setSelectedDate);

  const [currentMonthDate, setCurrentMonthDate] = useState(new IfcDate(firstDateOfMonth()));

  const today = useMemo(() => new IfcDate(), []);

  const isToday = useMemo(
    () => selectedDate.isSameDate(today) && currentMonthDate.getMonth() === today.getMonth(),
    [selectedDate, currentMonthDate, today]
  );

  const handleToday = useCallback(() => {
    setCurrentMonthDate(new IfcDate(today.toGregorian()));
    setSelectedDate(new IfcDate(today.toGregorian()));
  }, [today, setSelectedDate]);

  const handlePreviousMonth = useCallback(() => {
    const newDate = new IfcDate(currentMonthDate.toGregorian());
    if (newDate.getMonth() === 1) {
      newDate.setYear(newDate.getFullYear() - 1);
      newDate.setMonth(13);
    } else {
      newDate.setMonth(newDate.getMonth() - 1);
    }
    setCurrentMonthDate(newDate);
  }, [currentMonthDate]);

  const handleNextMonth = useCallback(() => {
    const newDate = new IfcDate(currentMonthDate.toGregorian());
    if (newDate.getMonth() === 13) {
      newDate.setYear(newDate.getFullYear() + 1);
      newDate.setMonth(1);
    } else {
      newDate.setMonth(newDate.getMonth() + 1);
    }
    setCurrentMonthDate(newDate);
  }, [currentMonthDate]);

  return (
    <>
      <Flex direction="row" gap="3" align="center">
        <Button
          variant="soft"
          css={{ cursor: 'pointer', '&:not(:hover)': { backgroundColor: !isToday ? 'transparent' : undefined } }}
          onClick={handleToday}
        >
          {t('button.today')}
        </Button>
        <Tooltip content={t('tooltip.previousMonth')}>
          <IconButton css={{ cursor: 'pointer' }} variant="ghost" size="2" onClick={handlePreviousMonth}>
            <ChevronLeftIcon />
          </IconButton>
        </Tooltip>
        <Tooltip content={t('tooltip.nextMonth')}>
          <IconButton css={{ cursor: 'pointer' }} variant="ghost" size="2" onClick={handleNextMonth}>
            <ChevronRightIcon />
          </IconButton>
        </Tooltip>
        <Text
          css={{ lineHeight: 1 }}
        >{`${t(`months.month`, { context: `${currentMonthDate.getMonth()}` })} ${currentMonthDate.getFullYear()}`}</Text>
      </Flex>
      <Separator css={{ width: '100%' }} my="3" />
      <Month currentMonthDate={currentMonthDate} />
    </>
  );
}

export default Calendar;

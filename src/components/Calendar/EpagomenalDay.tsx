import { Button, Flex, Text } from '@radix-ui/themes';
import { useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { IfcDate } from '../../helpers/IfcDate';
import { useCalendarStore } from '../../store/calendar';

export interface EpagomenalDayProps {
  label: string;
  onSelectDay: (day: number) => void;
  currentMonthDate: IfcDate;
}

function EpagomenalDay({ label, onSelectDay, currentMonthDate }: EpagomenalDayProps) {
  const { t } = useTranslation('calendar');

  const selectedDate = useCalendarStore((state) => state.selectedDate);

  const currentDate = useMemo(() => {
    const date = new IfcDate(currentMonthDate.toGregorian());
    date.setDate(29);
    return date;
  }, [currentMonthDate]);

  const isSelectedDate = useMemo(() => currentDate.isSameDate(selectedDate), [currentDate, selectedDate]);

  const isToday = useMemo(() => {
    const today = new IfcDate();
    return currentDate.isSameDate(today);
  }, [currentDate]);

  const handleSelectDay = useCallback(() => {
    onSelectDay(29);
  }, [onSelectDay]);

  return (
    <Flex direction="row" gap="2" align="center" mt="5" ml="5">
      <Text size="2">{t('text.epagomenalDay')} :</Text>
      <Button
        variant="soft"
        color={isToday ? 'ruby' : 'gray'}
        size="2"
        css={{ '&:not(:hover)': { backgroundColor: !isSelectedDate ? 'transparent' : undefined } }}
        onClick={handleSelectDay}
      >
        {label}
      </Button>
    </Flex>
  );
}

export default EpagomenalDay;

import { Card, Flex, Inset, Text } from '@radix-ui/themes';
import { useTranslation } from 'react-i18next';

import { useCalendarStore } from '../../store/calendar';

import DateEvents from './DateEvents';

function DatePanel() {
  const { t } = useTranslation('calendar');

  const selectedDate = useCalendarStore((state) => state.selectedDate);

  return (
    <Card size="2" css={{ width: '400px' }}>
      <Inset side="top" clip="padding-box">
        <Card>
          <Flex direction="column" justify="center" align="center" pb="1">
            {!selectedDate.isYearDay() && !selectedDate.isLeapDay() ? (
              <>
                <Text css={{ lineHeight: '1' }} weight="bold" color="ruby" size="9">
                  {selectedDate.getDate()}
                </Text>
                <Text css={{ lineHeight: '1' }} weight="bold" color="ruby" size="7" mb="1">
                  {t('months.month', { context: `${selectedDate.getMonth()}` })}
                </Text>
              </>
            ) : (
              <>
                <Text weight="bold" color="ruby" size="6" mb="1">
                  {t('text.epagomenalDay')}
                </Text>
                <Text weight="bold" color="ruby" size="8" mb="1">
                  {selectedDate.isYearDay() ? t('text.yearDay') : t('text.leapDay')}
                </Text>
              </>
            )}
            <Text css={{ lineHeight: '1' }} weight="bold" color="ruby" size="7">
              {selectedDate.getFullYear()}
            </Text>
          </Flex>
        </Card>
      </Inset>
      <Text as="div" mt="3">
        {t('text.gregorianDate', { date: selectedDate.toGregorian().toLocaleDateString() })}
      </Text>
      <Text as="div">{t('text.dayOfYear', { day: selectedDate.getDayOfYear() })}</Text>
      <DateEvents />
    </Card>
  );
}

export default DatePanel;

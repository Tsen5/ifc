import { Text } from '@radix-ui/themes';
import { useTranslation } from 'react-i18next';

export interface DayNameProps {
  day: number;
}

function DayName({ day }: DayNameProps) {
  const { t } = useTranslation('calendar');

  return (
    <Text weight="bold" size="2" css={{ textTransform: 'uppercase' }}>
      {t('days.short.day', { context: `${day}` })}
    </Text>
  );
}

export default DayName;

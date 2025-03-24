import { Flex, Heading, Text } from '@radix-ui/themes';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { useEvents } from '../../hooks/useEvents';
import { useCalendarStore } from '../../store/calendar';

import EventSkeleton from './EventSkeleton';
import EventsList from './EventsList';

const DateEvents = () => {
  const { t } = useTranslation('calendar');

  const selectedDate = useCalendarStore((state) => state.selectedDate);

  const { data: events = [], isFetching } = useEvents({
    month: selectedDate.toGregorian().getMonth(),
    day: selectedDate.toGregorian().getDate(),
  });

  const displaySkeleton = useMemo(() => isFetching, [isFetching]);

  const currentYearEvents = useMemo(
    () => events.filter((event) => event.year === selectedDate.getFullYear()),
    [events, selectedDate]
  );

  const otherYearEvents = useMemo(
    () => events.filter((event) => event.year !== selectedDate.getFullYear()),
    [events, selectedDate]
  );

  return (
    <Flex direction="column" mt="4" gap="4">
      <Heading size="7">{t('title.events')}</Heading>
      {!displaySkeleton && (
        <Flex direction="column" gap="5">
          {events.length > 0 && (
            <>
              <EventsList events={currentYearEvents} title={t('title.currentYearEvents')} />
              <EventsList events={otherYearEvents} title={t('title.otherYearEvents')} />
            </>
          )}
          {events.length === 0 && <Text size="2">{t('text.noEvents')}</Text>}
        </Flex>
      )}
      {displaySkeleton && (
        <Flex direction="column" gap="4">
          <EventSkeleton />
          <EventSkeleton />
          <EventSkeleton />
        </Flex>
      )}
    </Flex>
  );
};

export default DateEvents;

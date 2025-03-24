import { Button, Flex, Heading, Text } from '@radix-ui/themes';
import { useCallback, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { WikipediaEvent } from '../../hooks/useEvents';

import EventSummary from './EventSummary';

export const EVENTS_LIST_MAX_EVENTS = 2;

export interface EventsListProps {
  title: string;
  events: WikipediaEvent[];
}

function EventsList({ events, title }: EventsListProps) {
  const { t } = useTranslation('calendar');
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const displayedEvents = useMemo(() => (isOpen ? events : events.slice(0, EVENTS_LIST_MAX_EVENTS)), [events, isOpen]);
  const displaySeeMoreButton = useMemo(() => events.length > EVENTS_LIST_MAX_EVENTS, [events]);

  const handleOpen = useCallback(() => {
    setIsOpen(!isOpen);
  }, [isOpen]);

  return (
    <Flex direction="column" gap="2">
      <Flex direction="row" justify="between" align="center">
        <Heading size="5">{title}</Heading>
        {isOpen && (
          <Button variant="ghost" onClick={handleOpen} size="1" css={{ cursor: 'pointer' }}>
            {t('button.close')}
          </Button>
        )}
      </Flex>
      {displayedEvents.length > 0 && (
        <Flex direction="column" gap="3">
          {displayedEvents.map((event) => (
            <EventSummary event={event} />
          ))}
        </Flex>
      )}
      {displayedEvents.length === 0 && <Text size="2">{t('text.noEvents')}</Text>}
      {displaySeeMoreButton && (
        <Button variant="ghost" onClick={handleOpen} size="1" css={{ cursor: 'pointer' }}>
          {isOpen ? t('button.close') : t('button.seeMore', { count: events.length - EVENTS_LIST_MAX_EVENTS })}
        </Button>
      )}
    </Flex>
  );
}

export default EventsList;

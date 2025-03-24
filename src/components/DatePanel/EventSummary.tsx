import { Text } from '@radix-ui/themes';

import { WikipediaEvent } from '../../hooks/useEvents';

export interface EventSummaryProps {
  event: WikipediaEvent;
}

function EventSummary({ event }: EventSummaryProps) {
  return (
    <Text as="p" css={{ overflow: 'hidden', display: '-webkit-box', WebkitBoxOrient: 'vertical', WebkitLineClamp: 3 }}>
      <Text weight="bold">{event.year} : </Text>
      <Text>{event.text}</Text>
    </Text>
  );
}

export default EventSummary;

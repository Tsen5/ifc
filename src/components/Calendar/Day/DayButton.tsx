import styled from '@emotion/styled';
import { Button } from '@radix-ui/themes';

export interface DayButtonProps {
  isSelectedDate: boolean;
}

const DayButton = styled(Button, {
  shouldForwardProp: (prop) => prop !== 'isSelectedDate',
})<DayButtonProps>(({ isSelectedDate }) => ({
  paddingLeft: 0,
  paddingRight: 0,
  aspectRatio: 1,
  '&:not(:hover)': { backgroundColor: !isSelectedDate ? 'transparent' : undefined },
  cursor: 'pointer',
}));

export default DayButton;

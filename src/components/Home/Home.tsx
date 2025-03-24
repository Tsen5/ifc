import { ExternalLinkIcon } from '@radix-ui/react-icons';
import { Card, Container, Flex, Heading, Link } from '@radix-ui/themes';
import { useTranslation } from 'react-i18next';

import Calendar from '../Calendar/Calendar';
import DatePanel from '../DatePanel/DatePanel';

function Home() {
  const { t } = useTranslation('calendar');

  return (
    <Container size="4" p="5">
      <Flex direction="row" gap="5" width="100%" align="start">
        <DatePanel />
        <Flex direction="column" gap="5" flexGrow="1">
          <Card>
            <Flex direction="row" justify="between" align="center">
              <Heading size="5" weight="bold">
                {t('title.page')}
              </Heading>
              <Link href="https://en.wikipedia.org/wiki/International_Fixed_Calendar" target="_blank" size="1">
                {t('text.whatIsIt')} <ExternalLinkIcon height="12" />
              </Link>
            </Flex>
          </Card>
          <Card>
            <Calendar />
          </Card>
        </Flex>
      </Flex>
    </Container>
  );
}

export default Home;

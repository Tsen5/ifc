import { useTheme } from '@emotion/react';
import { ExternalLinkIcon, GitHubLogoIcon } from '@radix-ui/react-icons';
import { Card, Container, Flex, Heading, Link } from '@radix-ui/themes';
import { useTranslation } from 'react-i18next';

import Calendar from '../Calendar/Calendar';
import DatePanel from '../DatePanel/DatePanel';

function Home() {
  const { t } = useTranslation('calendar');
  const theme = useTheme();

  return (
    <Container size="4" p="5">
      <Flex direction="row" gap="5" width="100%" align="start">
        <DatePanel />
        <Flex direction="column" gap="5" flexGrow="1" position="sticky" top={theme.sizing.spacing(5)}>
          <Card size="2">
            <Flex direction="row" justify="between" align="center">
              <Heading size="5" weight="bold">
                {t('title.page')}
              </Heading>
              <Flex direction="row" gap="5" align="center">
                <Link href="https://en.wikipedia.org/wiki/International_Fixed_Calendar" target="_blank" size="1">
                  {t('text.whatIsIt')} <ExternalLinkIcon height="12" />
                </Link>
                <Link target="_blank" color="gray" href="https://github.com/Tsen5/ifc">
                  <GitHubLogoIcon />
                </Link>
              </Flex>
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

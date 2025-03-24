import { Flex, Skeleton, Text } from '@radix-ui/themes';

function EventSkeleton() {
  return (
    <Flex direction="column" gap="2">
      <Flex direction="row" gap="2">
        <Skeleton>
          <Text css={{ lineHeight: 1 }}>9999</Text>
        </Skeleton>
        <Skeleton css={{ flexGrow: 1 }}>
          <Text css={{ lineHeight: 1 }}>9999</Text>
        </Skeleton>
      </Flex>
      <Skeleton css={{ flexGrow: 1 }}>
        <Text css={{ lineHeight: 1 }}>9999</Text>
      </Skeleton>
    </Flex>
  );
}

export default EventSkeleton;

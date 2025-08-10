import { Button, Container, Group, Text, Title } from "@mantine/core";


export default function NotFound() {
  return (
    <Container className="py-20">
      <div className="text-center font-medium text-[38px] leading-none mb-12 text-gray-300 sm:text-[32px]">
        404
      </div>

      <Title
        order={1}
        className="font-outfit text-center font-medium text-[38px] sm:text-[32px]"
      >
        You have found a secret place.
      </Title>

      <Text
        c="dimmed"
        size="lg"
        ta="center"
        className="max-w-[500px] mx-auto mt-8 mb-12"
      >
        Unfortunately, this is only a 404 page. You may have mistyped the
        address, or the page has been moved to another URL.
      </Text>

      <Group justify="center">
        <Button variant="subtle" size="md">
          Take me back to home page
        </Button>
      </Group>
    </Container>
  );
}

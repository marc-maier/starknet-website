import { Box, Flex, Container, LinkBox, Link, List } from "@chakra-ui/react";
import { Heading } from "@ui/Typography/Heading";
import { slugify } from "@starknet-io/cms-utils/src/index";
import type { DisplayCardItems } from "@starknet-io/cms-data/src/pages";
import { DisplayCard } from "@ui/Card/DisplayCard";
interface Props extends LocaleProps {
  title: string;
  button?: string;
  buttonLink?: string;
  card_display_items: DisplayCardItems[];
  randomize?: boolean;
}

export default function DisplayCardItems({
  params: { locale },
  title,
  button,
  buttonLink,
  card_display_items,
}: Props): JSX.Element {
  return (
    <Box>
      <Container maxW="1062px">
        <Flex
          justifyContent="space-between"
          direction={{ base: "column", sm: "row" }}
          mb="24px"
        >
          {title && (
            <Heading
              color="heading-navy-fg"
              variant="h3"
              fontWeight="extrabold"
              mb={{ base: "24px", sm: "10px" }}
              fontSize={24}
              id={`toc-${slugify(title)}`}
            >
              {title}
            </Heading>
          )}
          {button && (
            <LinkBox
              as={Link}
              href={buttonLink}
              bgColor="#0C0C4F"
              color="white"
              border="1px"
              cursor="pointer"
              _dark={{ color: "#0C0C4F", bgColor: "white" }}
              _hover={{
                color: "#0C0C4F",
                bgColor: "white",
                border: "1px",
                borderColor: "#0C0C4F",
                _dark: {
                  color: "white",
                  bgColor: "#0C0C4F",
                  borderColor: "white",
                },
              }}
              padding={2}
              fontWeight={600}
              paddingInline={6}
              borderRadius="6px"
              fontSize={18}
              target="_blank"
              style={{ textDecoration: "none" }}
              textAlign="center"
            >
              {button} &rarr;
            </LinkBox>
          )}
        </Flex>
        <List display="flex" flexDirection="column" as="ol" flex={1} gap={4}>
          {card_display_items?.map(({ title, description }, i) => {
            return (
              <DisplayCard
                key={title + i}
                index={i + 1}
                title={title}
                description={description}
              />
            );
          })}
        </List>
      </Container>
    </Box>
  );
}

import { Box, Stack, BoxProps, Text, Circle } from "@chakra-ui/react";
import { Application } from "@ui/Icons/DisplayCardIcons/Application";
import { GrantDeliverables } from "@ui/Icons/DisplayCardIcons/GrantDeliverables";
import { InternalEvaluation } from "@ui/Icons/DisplayCardIcons/InternalEvaluation";
import { Onboarding } from "@ui/Icons/DisplayCardIcons/Onboarding";
import { Results } from "@ui/Icons/DisplayCardIcons/Results";
import { Heading } from "@ui/Typography/Heading";

type Props = {
  readonly title:
    | "Application"
    | "Internal Evaluation"
    | "Results"
    | "Onboarding"
    | "Post Grant Check-in";
  readonly description?: string;
  readonly index: number;
} & BoxProps;

const images = {
  Application: <Application />,
  "Internal Evaluation": <InternalEvaluation />,
  Results: <Results />,
  Onboarding: <Onboarding />,
  "Post Grant Check-in": <GrantDeliverables />,
};

export const DisplayCard = (props: Props) => {
  return (
    <Box
      as="li"
      maxW="5xl"
      w={{ base: "full" }}
      mx="auto"
      bg="card-bg"
      borderRadius="16px"
      rounded={"16px"}
      padding={"32px 24px"}
      border="1px"
      borderColor="#EFEFEF"
      _dark={{ borderColor: "transparent" }}
      px={{ base: "6", md: "8" }}
    >
      <Stack
        direction={{ base: "column", md: "row" }}
        spacing={{ base: "3", md: "6" }}
        align="center"
      >
        <Stack spacing="4">
          <Box
            width="80px"
            height="80px"
            borderRadius="8px"
            overflow="hidden"
            color="#0C0C4F"
            _dark={{ color: "white" }}
            marginBottom={{ base: "16px", md: "0" }}
          >
            {images[props?.title]}
          </Box>
        </Stack>
        <Box flex="1">
          <Stack
            direction={{ base: "row", md: "row" }}
            pb="4px"
            paddingTop="4px"
          >
            <Circle
              size="24px"
              bg="#0C0C4F"
              _dark={{ bg: "white", color: "black" }}
              color="white"
            >
              {props.index}
            </Circle>
            <Heading
              variant="h4"
              fontSize={18}
              color="btn-primary-bg"
              _dark={{
                color: "button-nav-fg",
              }}
            >
              {props.title}
            </Heading>
          </Stack>
          <Text>{props.description}</Text>
        </Box>
      </Stack>
    </Box>
  );
};

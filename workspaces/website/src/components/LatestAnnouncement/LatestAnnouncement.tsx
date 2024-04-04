import { Box, Text, Heading, FlexProps } from "@chakra-ui/react";
import { Link } from "@chakra-ui/react";
import { LatestAnnouncements } from "@starknet-io/cms-data/src/settings/latest-announcements";
import { Image } from "@ui/ArticleCard/ArticleCard";
import { useMemo } from "react";
import { gtmEvent } from "src/utils/utils";

interface LatestAnnouncementProps extends FlexProps {
  readonly list: readonly LatestAnnouncements[];
}

const LatestAnnouncement = ({ list, ...rest }: LatestAnnouncementProps) => {
  const LatestAnnouncementList = useMemo(
    () => list.filter(({ isActive }) => isActive),
    []
  );

  const onReadMore = () => gtmEvent("Latest_announcement_read_more");

  if (!LatestAnnouncementList.length) return null;

  return (
    <Box
      as="aside"
      position={{ base: "relative", lg: "sticky" }}
      top={{ base: "unset", lg: 100 }}
      height="fit-content"
      left={{ base: "unset", lg: "calc(100% - 32px)" }}
      width={{ base: "100%", lg: "225px" }}
      mt={{ base: 6, lg: "unset" }}
      mb={{ base: 6, lg: "unset" }}
      p={{ base: 4, lg: 3 }}
      gap={{ lg: 6 }}
      backgroundColor="surface"
      borderRadius={8}
      {...rest}
    >
      <Heading
        as="h5"
        fontSize={18}
        fontWeight={600}
        textAlign="left"
        mb={3}
        lineHeight="25px"
        color="snNavy"
      >
        Latest announcements
      </Heading>
      <Box
        as="ul"
        display="flex"
        flexDir={{ base: "column", sm: "row", md: "row", lg: "column" }}
        gap={4}
        justifyContent={{ base: "space-between", lg: "unset" }}
      >
        {LatestAnnouncementList.map((item) => (
          <Box
            as="li"
            textDecoration="none"
            listStyleType="none"
            key={item.buttonLink + item.text}
            width={{ base: "100%", md: "50%", lg: "200px" }}
          >
            <Image
              url={item.image}
              imageAlt={item.text}
              borderRadius={8}
              width={{ base: "100%", lg: "200px" }}
              height={{ base: "186px", lg: "100px" }}
            />
            <Text
              fontSize={{ base: 16, md: 14, lg: 14, xl: 14 }}
              mt={3}
              fontWeight={600}
              mb={2}
              color="snNavy"
              lineHeight="21px"
            >
              {item.text}
            </Text>
            <Link
              href={item.buttonLink}
              color="Link"
              fontWeight="500"
              onClick={onReadMore}
              fontSize={12}
            >
              {item.buttonText} -{">"}
            </Link>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default LatestAnnouncement;

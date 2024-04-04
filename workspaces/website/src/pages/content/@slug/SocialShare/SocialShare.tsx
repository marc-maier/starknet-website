import { Flex, Icon, Text } from "@chakra-ui/react";
import {
  TwitterShareButton,
  TelegramShareButton,
  LinkedinShareButton,
} from "react-share";
import { FaTelegram } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";

interface Props {
  readonly params: LocaleParams & {
    readonly slug: string;
  };
}

const SocialShare = ({ params: { slug, locale } }: Props) => {
  const shareUrl = `${import.meta.env.VITE_SITE_URL}/${locale}/content/${slug}`;

  return (
    <Flex
      gap={"24px"}
      position={{ base: "relative", lg: "sticky" }}
      top={{ base: "unset", lg: 100 }}
      mt={1}
      height="fit-content"
      left={{ base: "unset", lg: "calc(100% - 600px)" }}
    >
      <Text display={{ base: "unset", xl: "none" }}>Share this post:</Text>

      <Flex
        alignItems={"center"}
        gap={"8px"}
        flexDir={{ base: "row", xl: "column" }}
      >
        <TwitterShareButton url={shareUrl} title="Twitter share">
          <Icon
            boxSize="24px"
            color="grey.coolText"
            _dark={{ color: "grey.morning" }}
            as={FaTwitter}
          />
        </TwitterShareButton>
        <TelegramShareButton url={shareUrl} title="Telegram share">
          <Icon
            boxSize="24px"
            pt="1"
            color="grey.coolText"
            _dark={{ color: "grey.morning" }}
            as={FaTelegram}
          />
        </TelegramShareButton>
        <LinkedinShareButton url={shareUrl} title="Linkedin share">
          <Icon
            boxSize="24px"
            padding="0"
            color="grey.coolText"
            _dark={{ color: "grey.morning" }}
            as={FaLinkedin}
          />
        </LinkedinShareButton>
      </Flex>
    </Flex>
  );
};

export default SocialShare;

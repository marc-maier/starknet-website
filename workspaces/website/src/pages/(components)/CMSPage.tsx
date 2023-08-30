import type { Page as PageType } from "@starknet-io/cms-data/src/pages";
import { PageLayout } from "@ui/Layout/PageLayout";
import moment from "moment";
import { Heading } from "@ui/Typography/Heading";
import { Text } from "@ui/Typography/Text";
import { Block } from "src/blocks/Block";
import { TableOfContents } from "./TableOfContents/TableOfContents";
import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Flex,
} from "@chakra-ui/react";
import "@ui/CodeHighlight/code-highlight-init";
import { blocksToTOC } from "./TableOfContents/blocksToTOC";
import { LandingConent } from "@ui/HeroImage/LandingConent";

type CMSPageProps = {
  data: PageType;
  locale: string;
};
const maxW = {
  content: {
    base: "contentMaxW.lg",
    lg: "contentMaxW.xl",
  },
  "narrow content": "846px",
  landing: "none",
};

const px = {
  landing: "0px",
  "narrow content": {
    base: "page.left-right.base",
    md: "page.left-right.md",
  },
  content: {
    base: "page.left-right.base",
    md: "page.left-right.md",
  },
};

const gap = {
  landing: {
    base: "page.block-gap.base",
  },
};

export default function CMSPage({ data, locale }: CMSPageProps) {
  const date = data?.gitlog?.date;
  const [firstBlock, ...remainingBlocks] = data.blocks || [];
  const isFirstBlockLandingHero = firstBlock?.type === "hero";

  return (
    <Box>
      <PageLayout
        contentMaxW={maxW[data.template]}
        sx={
          isFirstBlockLandingHero
            ? { px: "0px" }
            : { paddingInline: px[data.template] }
        }
        maxW={data.template === "landing" ? "none" : undefined}
        breadcrumbs={
          <>
            {data.breadcrumbs &&
            data.breadcrumbs_data &&
            data.breadcrumbs_data.length > 0 ? (
              <Breadcrumb separator="/">
                <BreadcrumbItem>
                  <BreadcrumbLink
                    fontSize="sm"
                    href={`/${data.breadcrumbs_data[0].locale}`}
                  >
                    Home
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbItem>
                  <BreadcrumbLink
                    fontSize="sm"
                    href={`/${data.breadcrumbs_data[0].locale}/${data.breadcrumbs_data[0].slug}`}
                  >
                    {data.breadcrumbs_data[0].title}
                  </BreadcrumbLink>
                </BreadcrumbItem>

                <BreadcrumbItem isCurrentPage>
                  <BreadcrumbLink fontSize="sm">{data.title}</BreadcrumbLink>
                </BreadcrumbItem>
              </Breadcrumb>
            ) : null}
          </>
        }
        main={
          <Flex
            direction="column"
            gap={{
              base:
                data.slug === "home"
                  ? "page.gap-wide.base"
                  : "page.gap-standard.base",
              md:
                data.slug === "home"
                  ? "page.gap-wide.md"
                  : "page.gap-standard.md",
              lg:
                data.slug === "home"
                  ? "page.gap-wide.lg"
                  : "page.gap-standard.lg",
            }}
          >
            {data.show_title ? (
              <Heading variant="h1" color="text-hero-fg">
                {data.title}
              </Heading>
            ) : null}
            <Box>
              <Text variant="cardBody" top="1px" pos="relative">
                {data.page_last_updated && date
                  ? `Page last updated ${moment(date).fromNow()}  `
                  : null}
              </Text>
            </Box>
            {!isFirstBlockLandingHero &&
              data.blocks?.map((block, i) => {
                return <Block key={i} block={block} locale={locale} />;
              })}
            {isFirstBlockLandingHero && (
              <>
                <Block block={firstBlock} locale={locale} />
                <LandingConent>
                  {remainingBlocks?.map((block, i) => {
                    return <Block key={i} block={block} locale={locale} />;
                  })}
                </LandingConent>
              </>
            )}
          </Flex>
        }
        rightAside={
          data.template === "content" ? (
            <TableOfContents
              headings={blocksToTOC(data.blocks, 1)}
              {...(data.tocCustomTitle && {
                tocCustomTitle: data.tocCustomTitle,
              })}
            />
          ) : null
        }
      />
    </Box>
  );
}

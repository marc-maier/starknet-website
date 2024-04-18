/**
 * Module dependencies
 */

import { Box, Flex } from "@chakra-ui/react";
import { Button } from "@ui/Button";

/**
 * Export `CategoryTabItem` type.
 */

export type CategoryTabItem = {
  id: string;
  label: string;
  link?: string;
};

/**
 * Export `CategoryTabProps` type.
 */

export type CategoryTabsProps = {
  items: CategoryTabItem[];
  currentChapter: { id: string };
  onChapterChange: (id: string) => void;
};

/**
 * Export `CategoryTabs` component.
 */

export const CategoryTabs = ({
  items,
  currentChapter,
  onChapterChange,
}: CategoryTabsProps) => {
  return (
    <Box
      borderTopWidth="1px"
      borderBottomWidth="1px"
      borderColor="border.divider"
      width="100%"
    >
      <Flex
        as="ul"
        sx={{ overflowX: "auto" }}
        gap="24px"
        width="100%"
        padding={"0 24px"}
        role="tablist"
        aria-orientation="horizontal"
      >
        {items.map((item, index) => {
          return (
            <Button
              id={item.id}
              key={item.id}
              role="tab"
              aria-selected={item.id === currentChapter.id}
              aria-controls={`${item.id}-content`}
              as={item.link ? "a" : "button"}
              href={item.link}
              isActive={item.id === currentChapter.id}
              onClick={() => onChapterChange(item.id)}
              variant="category"
              padding={"24px 12px"}
            >
              {item.label}
            </Button>
          );
        })}
      </Flex>
    </Box>
  );
};

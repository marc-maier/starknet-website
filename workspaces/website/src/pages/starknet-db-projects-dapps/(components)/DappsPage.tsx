import {
  Box,
  Heading,
  Image,
  Stack,
  List,
  ListItem,
  HStack,
} from "@chakra-ui/react";
import {
  DappsProps,
  TagObject,
} from "@starknet-io/cms-data/src/starknet-db-projects-dapps";
import { Button } from "@ui/Button";
import { useEffect, useMemo, useState } from "react";
import { Input, Select } from "@chakra-ui/react";
import { navigate } from "vite-plugin-ssr/client/router";
import useQueryString from "src/hooks/useQueryString";

enum SORT_BY {
  A_Z = "A-Z",
  FOLLOWERS = "Followers",
}

const DappsPage = ({ list, categories }: DappsProps) => {
  const [searchValue, setSearchValue] = useState<string>();
  const [sortBy, setSortBy] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<
    TagObject | undefined
  >();

  const queryParams = useQueryString();

  useEffect(() => {
    const { category, sortBy, searchValue } = queryParams;
    const fullCategory = categories.find((item) => item.slug === category);
    setSelectedCategory(fullCategory);
    setSortBy(sortBy);
    setSearchValue(searchValue || "");
  }, [queryParams]);

  const url = new URL(window.location.href);
  useEffect(() => {
    if (!selectedCategory?.slug && !sortBy && !searchValue) {
      navigate(url.pathname);
      return;
    }

    const queryParams = new URLSearchParams();
    selectedCategory && queryParams.set("category", selectedCategory.slug);
    sortBy && queryParams.set("sortBy", sortBy);
    searchValue && queryParams.set("searchValue", searchValue);

    navigate(`${url.pathname}?${queryParams.toString()}`);
  }, [searchValue, sortBy, selectedCategory, url.pathname]);
  const projects = useMemo(() => {
    const byCategory =
      selectedCategory !== undefined
        ? list.filter((item) => item.tags.includes(selectedCategory.slug))
        : list;
    if (!searchValue) return byCategory;
    return byCategory.filter((item) =>
      item.name.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase())
    );
  }, [selectedCategory, searchValue]);

  const projectsSort = useMemo(() => {
    if (sortBy === SORT_BY.A_Z)
      return projects.sort((a, b) => a.name.localeCompare(b.name));
    return projects.sort(
      (a, b) =>
        a.socialMetrics?.twitterFollower - b.socialMetrics?.twitterFollower
    );
  }, [sortBy, projects]);

  const handleChangeCategory = (category: string | undefined) => {
    const fullCategory = categories.find((item) => item.slug === category);
    setSelectedCategory(fullCategory);
  };

  return (
    <>
      <>
        <Heading>Dapps</Heading>
        <Stack display="flex" direction="row" gap="100px">
          <List display="flex" flexDir="column" gap="5px">
            <ListItem>
              <Button
                variant="filter"
                sx={{ bgColor: selectedCategory === undefined ? "red" : "" }}
                onClick={() => handleChangeCategory(undefined)}
              >
                All
              </Button>
            </ListItem>
            {categories.map((category) => {
              return (
                <ListItem key={category.slug}>
                  <Button
                    onClick={() => handleChangeCategory(category.slug)}
                    variant={"filter"}
                    sx={{ bgColor: selectedCategory === category ? "red" : "" }}
                  >
                    {category.label}
                  </Button>
                </ListItem>
              );
            })}
          </List>
          <Box>
            <HStack>
              <Box>List length:{projects.length}</Box>
              <Select
                value={sortBy || ""}
                variant="filled"
                onChange={(e) => setSortBy(e.target.value)}
              >
                {Object.values(SORT_BY).map((sortByItem) => (
                  <option value={sortByItem} key={sortByItem}>
                    {sortByItem}
                  </option>
                ))}
              </Select>
              <Input
                defaultValue={searchValue}
                placeholder="Search"
                onChange={(e) => setSearchValue(e.target.value)}
              />
            </HStack>
            <List display="flex" flexWrap="wrap" gap="20px">
              {projectsSort.map((item) => {
                return (
                  <ListItem width="300px" key={item.name}>
                    <Box>{item.name}</Box>
                    <Image src={item.network.twitterBanner} loading="lazy" />
                  </ListItem>
                );
              })}
            </List>
          </Box>
        </Stack>
      </>
    </>
  );
};

export default DappsPage;

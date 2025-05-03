import { useEffect } from "react";

import {
  Container,
  Tabs,
  TabList,
  Tab,
  TabPanel,
  TabPanels,
  useColorModeValue,
} from "@chakra-ui/react";

import { useProductStore } from "../store/product.store";
import Library from "./Library";
import SoldBooks from "./SoldBooks";

function HomePage() {
  const { fetchProducts, products } = useProductStore();

  const bgColor = useColorModeValue("gray.300", "gray.700");
  const textColor = useColorModeValue("black", "white");
  const activeBgColor = useColorModeValue("gray.700", "gray.400");
  const activeTextColor = useColorModeValue("gray.200", "gray.800");

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return (
    <Container maxW={"container.xl"}>
      <Tabs variant="enclosed">
        <TabList
          bg={bgColor}
          justifyContent={"center"}
          gap={6}
          color={textColor}
          p={2}
          rounded="lg"
          borderBottom="none"
        >
          <Tab
            paddingInline={10}
            _selected={{
              bg: activeBgColor,
              color: activeTextColor,
              borderBottomRadius: "6px",
            }}
          >
            All Books
          </Tab>
          <Tab
            paddingInline={10}
            _selected={{
              bg: activeBgColor,
              color: activeTextColor,
              borderBottomRadius: "6px",
            }}
          >
            Sold Books
          </Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <Library products={products} />
          </TabPanel>
          <TabPanel>
            <SoldBooks products={products} />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Container>
  );
}

export default HomePage;

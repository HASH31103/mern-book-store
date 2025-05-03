import { SimpleGrid, Text, VStack } from "@chakra-ui/react";
import SoldProductCard from "../components/SoldProductCard";

export default function SoldBooks({ products }) {
  return (
    <VStack spacing={8}>
      <SimpleGrid
        columns={{
          base: 1,
          md: 2,
          lg: 3,
        }}
        spacing={10}
        w={"full"}
      >
        {products
          .filter((product) => product.sold)
          .map((product) => (
            <SoldProductCard key={product._id} product={product} />
          ))}
      </SimpleGrid>

      {products.filter((product) => product.sold).length === 0 && (
        <Text fontSize={"xl"} textAlign={"center"} fontWeight={"bold"}>
          No Books Marked For Sale ☹️ <br />
        </Text>
      )}
    </VStack>
  );
}

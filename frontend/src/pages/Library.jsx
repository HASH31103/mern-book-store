import { Link } from "react-router-dom";
import { SimpleGrid, Text, VStack } from "@chakra-ui/react";
import ProductCard from "../components/ProductCard";

export default function Library({ products }) {
  return (
    <VStack spacing={8}>
      {/* <Heading as={"h1"} size={"2xl"} mb={8}>
      Current Books 🚀
    </Heading> */}

      <SimpleGrid
        columns={{
          base: 1,
          md: 2,
          lg: 3,
        }}
        spacing={10}
        w={"full"}
      >
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </SimpleGrid>

      {products.length === 0 && (
        <Text fontSize={"xl"} textAlign={"center"} fontWeight={"bold"}>
          No Books found ☹️
          <Link to="/create">
            {" "}
            <Text
              as={"span"}
              color={"blue.400"}
              _hover={{ textDecoration: "underline" }}
            >
              Store a Book
            </Text>
          </Link>
        </Text>
      )}
    </VStack>
  );
}

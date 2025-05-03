import { useState } from "react";
import {
  Box,
  Button,
  Container,
  Heading,
  Input,
  useColorModeValue,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { useProductStore } from "../store/product.store";

function CreatePage() {
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    imageURL: "",
    sold: false,
  });

  const { createProduct } = useProductStore();

  const toast = useToast();

  const handleAddProduct = async () => {
    const { success, message } = await createProduct(newProduct);
    if (!success) {
      toast({
        title: "Error!",
        description: message,
        status: "error",
        isClosable: true,
      });
    } else {
      toast({
        title: "Success!",
        description: message,
        status: "success",
        isClosable: true,
      });
    }
    setNewProduct({
      name: "",
      price: "",
      imageURL: "",
    });
  };

  return (
    <Container maxW={"container.sm"}>
      <VStack spacing={8}>
        <Heading as={"h1"} size={"2xl"} mb={8}>
          Add New Book
        </Heading>

        <Box
          w={"full"}
          bg={useColorModeValue("white", "gray.800")}
          p={6}
          shadow={"md"}
          rounded={"lg"}
        >
          <VStack spacing={4}>
            <Input
              placeholder={"Book name"}
              name={"name"}
              value={newProduct.name}
              onChange={(e) =>
                setNewProduct({ ...newProduct, name: e.target.value })
              }
            />

            <Input
              placeholder={"Book Price (PKR)"}
              name={"price"}
              value={newProduct.price}
              onChange={(e) =>
                setNewProduct({ ...newProduct, price: e.target.value })
              }
            />

            <Input
              placeholder={"Image URL"}
              name={"imageURL"}
              value={newProduct.imageURL}
              onChange={(e) =>
                setNewProduct({ ...newProduct, imageURL: e.target.value })
              }
            />

            <Button colorScheme={"blue"} w={"full"} onClick={handleAddProduct}>
              Add Product
            </Button>
          </VStack>
        </Box>
      </VStack>
    </Container>
  );
}

export default CreatePage;

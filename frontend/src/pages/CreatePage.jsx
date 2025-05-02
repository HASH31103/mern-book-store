import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Container,
  Heading,
  HStack,
  IconButton,
  Input,
  useColorModeValue,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { FaMinus, FaPlus } from "react-icons/fa";
import { useProductStore } from "../store/product.store";

function CreatePage() {
  const [productAmount, setProductAmount] = useState(0);
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    imageURL: "",
    amount: productAmount,
    sold: false,
  });

  const { createProduct } = useProductStore();

  const toast = useToast();

  useEffect(() => {
    setNewProduct((prev) => ({ ...prev, amount: productAmount }));
  }, [productAmount]);

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
      amount: 0,
    });
    setProductAmount(0);
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

            <VStack gap={2}>
              <p>Amount</p>
              <HStack>
                <IconButton
                  icon={<FaMinus />}
                  aria-label="minus-amount"
                  colorScheme="gray"
                  variant="solid"
                  onClick={() => {
                    if (productAmount > 0) setProductAmount(productAmount - 1);
                  }}
                />
                <Input
                  placeholder={"Amount"}
                  name={"amount"}
                  type="number"
                  value={productAmount}
                  onChange={(e) =>
                    setNewProduct({ ...newProduct, amount: e.target.value - 1 })
                  }
                />
                <IconButton
                  icon={<FaPlus />}
                  aria-label="Search"
                  colorScheme="blue"
                  variant="solid"
                  onClick={() => setProductAmount(productAmount + 1)}
                />
              </HStack>
            </VStack>

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

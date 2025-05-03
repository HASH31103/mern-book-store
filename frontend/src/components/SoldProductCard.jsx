import {
  Box,
  Button,
  HStack,
  Heading,
  Image,
  Text,
  VStack,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import { useProductStore } from "../store/product.store";

function SoldProductCard({ product }) {
  const textColor = useColorModeValue("gray.600", "gray.200");
  const bgColor = useColorModeValue("white", "gray.800");

  const { updateProduct } = useProductStore();
  const toast = useToast();

  const handleMarkAsUnsold = async () => {
    const updated = { ...product, sold: false, soldInfo: null };
    const { success, message } = await updateProduct(product._id, updated);

    toast({
      title: success ? "Updated" : "Error",
      description: success
        ? "Product marked as unsold."
        : message || "Failed to update.",
      status: success ? "success" : "error",
      isClosable: true,
    });
  };

  if (!product.sold) return null;

  return (
    <Box shadow="md" rounded="lg" overflow="hidden" bg={bgColor} p={4}>
      <Image
        src={product.imageURL}
        alt={product.name}
        h={48}
        w="full"
        objectFit="cover"
        mb={4}
      />

      <VStack align="start" spacing={2}>
        <HStack justifyContent={"space-between"} width={"full"}>
          <VStack alignItems={"left"}>
            <Heading as="h3" size="md">
              {product.name}
            </Heading>
            <Text color={textColor} fontWeight="semibold">
              Rs {product.price}
            </Text>
          </VStack>
          <Button mt={4} colorScheme="yellow" onClick={handleMarkAsUnsold}>
            Mark as Unsold
          </Button>
        </HStack>

        <Heading as="h4" size="sm" mt={4}>
          Sold To:
        </Heading>
        <Text color={textColor}>Name: {product.soldInfo?.name}</Text>
        <Text color={textColor}>Email: {product.soldInfo?.email}</Text>
        <Text color={textColor}>Location: {product.soldInfo?.location}</Text>
      </VStack>
    </Box>
  );
}

export default SoldProductCard;

import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Heading,
  HStack,
  IconButton,
  Image,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Text,
  useColorModeValue,
  useDisclosure,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { useProductStore } from "../store/product.store";
import { useState } from "react";
import { FaHandshake } from "react-icons/fa";

function ProductCard({ product }) {
  const textColor = useColorModeValue("gray.600", "gray.200");
  const bgColor = useColorModeValue("white", "gray.800");

  const { deleteProduct, updateProduct } = useProductStore();
  const [updatedProduct, setUpdatedProduct] = useState(product);
  const [soldInfo, setSoldInfo] = useState({
    name: "",
    email: "",
    location: "",
  });

  const toast = useToast();
  const {
    isOpen: isEditOpen,
    onOpen: onEditOpen,
    onClose: onEditClose,
  } = useDisclosure();

  const {
    isOpen: isSoldOpen,
    onOpen: onSoldOpen,
    onClose: onSoldClose,
  } = useDisclosure();

  const handleDelete = async (pid) => {
    const { success, message } = await deleteProduct(pid);

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
  };

  const handleMarkAsSold = async (pid, product) => {
    const updatedProduct = { ...product, sold: !product.sold, soldInfo };
    await handleUpdate(pid, updatedProduct);
  };

  const handleUpdate = async (pid, product) => {
    const { success, message } = await updateProduct(pid, product);
    onEditClose();

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
        description: "Book updated successfully",
        status: "success",
        isClosable: true,
      });
    }
  };

  return (
    <Box
      shadow={"lg"}
      rounded={"lg"}
      overflow={"hidden"}
      transition={"all 0.3s"}
      _hover={{ transform: "translateY(-5px)", shadow: "xl" }}
      bg={bgColor}
    >
      <Image
        src={product.imageURL}
        alt={product.name}
        h={48}
        w={"full"}
        objectFit={"cover"}
      />
      <Box p={4}>
        <Heading as={"h3"} size={"md"} mb={2}>
          {product.name}
        </Heading>

        <Text fontWeight={"semibold"} fontSize={"xl"} color={textColor} mb={4}>
          Rs {product.price}
        </Text>

        <HStack justifyContent={"space-between"}>
          <HStack spacing={2}>
            <IconButton
              icon={<EditIcon />}
              onClick={onEditOpen}
              colorScheme="blue"
            />
            <IconButton
              icon={<DeleteIcon />}
              onClick={() => handleDelete(product._id)}
              colorScheme="red"
            />
          </HStack>

          <IconButton
            icon={<FaHandshake />}
            onClick={onSoldOpen}
            colorScheme="green"
          />
        </HStack>
      </Box>

      <Modal isOpen={isEditOpen} onClose={onEditClose}>
        <ModalContent>
          <ModalHeader>Update Product</ModalHeader>
          <ModalCloseButton />

          <ModalBody>
            <VStack spacing={4}>
              <Input
                placeholder={"Book name"}
                name={"name"}
                value={updatedProduct.name}
                onChange={(e) =>
                  setUpdatedProduct({ ...updatedProduct, name: e.target.value })
                }
              />
              <Input
                placeholder={"Book price"}
                name={"price"}
                value={updatedProduct.price}
                onChange={(e) =>
                  setUpdatedProduct({
                    ...updatedProduct,
                    price: e.target.value,
                  })
                }
              />
              <Input
                placeholder={"Book imageURL"}
                name={"imageURL"}
                value={updatedProduct.imageURL}
                onChange={(e) =>
                  setUpdatedProduct({
                    ...updatedProduct,
                    imageURL: e.target.value,
                  })
                }
              />
            </VStack>
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3}
              onClick={() => handleUpdate(product._id, updatedProduct)}
            >
              Update
            </Button>

            <Button variant={"ghost"} onClick={onEditClose}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Modal isOpen={isSoldOpen} onClose={onSoldClose}>
        <ModalContent>
          <ModalHeader>Buyer Information</ModalHeader>
          <ModalCloseButton />

          <ModalBody>
            <VStack spacing={4}>
              <Input
                placeholder={"Buyer name"}
                value={soldInfo.name}
                onChange={(e) =>
                  setSoldInfo({ ...soldInfo, name: e.target.value })
                }
              />
              <Input
                placeholder={"Buyer email"}
                value={soldInfo.email}
                onChange={(e) =>
                  setSoldInfo({ ...soldInfo, email: e.target.value })
                }
              />
              <Input
                placeholder={"Buyer location"}
                value={soldInfo.location}
                onChange={(e) =>
                  setSoldInfo({ ...soldInfo, location: e.target.value })
                }
              />
            </VStack>
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3}
              onClick={() => handleMarkAsSold(product._id, product)}
            >
              Mark as Sold
            </Button>

            <Button variant={"ghost"} onClick={onSoldClose}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}

export default ProductCard;

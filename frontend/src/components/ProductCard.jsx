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

  const [password, setPassword] = useState("");
  const [authAction, setAuthAction] = useState(null);

  const PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD;

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

  const {
    isOpen: isPasswordOpen,
    onOpen: onPasswordOpen,
    onClose: onPasswordClose,
  } = useDisclosure();

  const handleDelete = async (pid) => {
    const { success, message } = await deleteProduct(pid);

    toast({
      title: success ? "Success!" : "Error!",
      description: message,
      status: success ? "success" : "error",
      isClosable: true,
    });
  };

  const handleMarkAsSold = async (pid, product) => {
    const updated = { ...product, sold: !product.sold, soldInfo };
    await handleUpdate(pid, updated);
  };

  const handleUpdate = async (pid, product) => {
    const { success } = await updateProduct(pid, product);
    onEditClose();

    toast({
      title: success ? "Success!" : "Error!",
      description: success ? "Book updated successfully" : "Update failed",
      status: success ? "success" : "error",
      isClosable: true,
    });
  };

  const verifyPasswordAndProceed = () => {
    if (password !== PASSWORD) {
      toast({
        title: "Access Denied",
        description: "Incorrect password",
        status: "error",
        isClosable: true,
      });
      return;
    }

    if (authAction === "edit") {
      onEditOpen();
    } else if (authAction === "delete") {
      handleDelete(product._id);
    }

    onPasswordClose();
    setPassword("");
    setAuthAction(null);
  };

  return (
    <Box
      shadow="lg"
      rounded="lg"
      overflow="hidden"
      transition="all 0.3s"
      _hover={{ transform: "translateY(-5px)", shadow: "xl" }}
      bg={bgColor}
    >
      <Image
        src={product.imageURL}
        alt={product.name}
        h={48}
        w="full"
        objectFit="cover"
      />

      <Box p={4}>
        <Heading as="h3" size="md" mb={2}>
          {product.name}
        </Heading>

        <Text fontWeight="semibold" fontSize="xl" color={textColor} mb={4}>
          Rs {product.price}
        </Text>

        <HStack justifyContent="space-between">
          <HStack spacing={2}>
            <IconButton
              icon={<EditIcon />}
              colorScheme="blue"
              onClick={() => {
                setAuthAction("edit");
                onPasswordOpen();
              }}
            />
            <IconButton
              icon={<DeleteIcon />}
              colorScheme="red"
              onClick={() => {
                setAuthAction("delete");
                onPasswordOpen();
              }}
            />
          </HStack>

          <IconButton
            icon={<FaHandshake />}
            colorScheme="green"
            onClick={onSoldOpen}
          />
        </HStack>
      </Box>

      {/* Edit Modal */}
      <Modal isOpen={isEditOpen} onClose={onEditClose}>
        <ModalContent>
          <ModalHeader>Update Product</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={4}>
              <Input
                placeholder="Book name"
                value={updatedProduct.name}
                onChange={(e) =>
                  setUpdatedProduct({ ...updatedProduct, name: e.target.value })
                }
              />
              <Input
                placeholder="Book price"
                value={updatedProduct.price}
                onChange={(e) =>
                  setUpdatedProduct({
                    ...updatedProduct,
                    price: e.target.value,
                  })
                }
              />
              <Input
                placeholder="Book imageURL"
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
              onClick={() => handleUpdate(product._id, updatedProduct)}
            >
              Update
            </Button>
            <Button variant="ghost" onClick={onEditClose}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Sold Modal */}
      <Modal isOpen={isSoldOpen} onClose={onSoldClose}>
        <ModalContent>
          <ModalHeader>Buyer Information</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={4}>
              <Input
                placeholder="Buyer name"
                value={soldInfo.name}
                onChange={(e) =>
                  setSoldInfo({ ...soldInfo, name: e.target.value })
                }
              />
              <Input
                placeholder="Buyer email"
                value={soldInfo.email}
                onChange={(e) =>
                  setSoldInfo({ ...soldInfo, email: e.target.value })
                }
              />
              <Input
                placeholder="Buyer location"
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
              onClick={() => handleMarkAsSold(product._id, product)}
            >
              Mark as Sold
            </Button>
            <Button variant="ghost" onClick={onSoldClose}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Shared Password Modal */}
      <Modal isOpen={isPasswordOpen} onClose={onPasswordClose}>
        <ModalContent>
          <ModalHeader>Enter Password</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Input
              placeholder="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" onClick={verifyPasswordAndProceed}>
              Submit
            </Button>
            <Button variant="ghost" onClick={onPasswordClose}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}

export default ProductCard;

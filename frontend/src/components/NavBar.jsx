import {
  Button,
  Container,
  Flex,
  HStack,
  Input,
  Text,
  useColorMode,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
} from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { MoonIcon, PlusSquareIcon, SunIcon } from "@chakra-ui/icons";

function NavBar() {
  const { colorMode, toggleColorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleProtectedNavigate = () => {
    if (password === import.meta.env.VITE_ADMIN_PASSWORD) {
      navigate("/create");
      onClose();
      setPassword("");
    } else {
      alert("Incorrect password");
    }
  };

  return (
    <Container maxW={"1140px"} p={4}>
      <Flex
        h={16}
        alignItems={"center"}
        justifyContent={"space-between"}
        flexDir={{
          base: "column",
          sm: "row",
        }}
      >
        <Text fontSize={22} fontWeight={"bold"}>
          <Link to={"/"}>Book Store 🛒</Link>
        </Text>

        <HStack spacing={2} alignItems={"center"}>
          <Button onClick={onOpen}>
            <PlusSquareIcon fontSize={20} />
          </Button>

          <Button onClick={toggleColorMode}>
            {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
          </Button>
        </HStack>
      </Flex>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Enter Password</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" onClick={handleProtectedNavigate}>
              Submit
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Container>
  );
}

export default NavBar;

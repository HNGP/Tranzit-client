import { CloseIcon, HamburgerIcon } from "@chakra-ui/icons";
import {
  Box,
  Flex,
  HStack,
  IconButton,
  Link,
  Menu,
  MenuDivider,
  MenuItem,
  MenuList,
  Stack,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import Image from "next/image";
import logoImg from "../public/tranzit-2x-shadow.png";

export default function Simple() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box
      style={{
        backdropFilter: "blur(2rem)",
        boxShadow: "6px 6px 20px rgba(122, 122, 122, 0.212)",
        opacity: "80%",
      }}
      bgGradient="linear(to-br, rgba(255, 255, 255, 0.7),
    				rgba(255, 255, 255, 0.3))"
      pl={80}
      height={70}
      mb={100}
    >
      <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
        <IconButton
          size={"md"}
          icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
          aria-label={"Open Menu"}
          display={{ md: "none" }}
          onClick={isOpen ? onClose : onOpen}
          mt={1}
          ml={-300}
        />
        <Box display="flex" style={{ cursor: "pointer" }}>
          <Image
            style={{ border: "2px" }}
            height="50px"
            width="50px"
            src={logoImg}
            alt="Logo"
          />
          <Text
            fontSize={35}
            px={2}
            fontWeight={300}
            bgGradient="linear(to-r, #4c4ab8, #dba171)"
            bgClip="text"
          >
            tranzit
          </Text>
        </Box>
        <HStack
          as={"nav"}
          spacing={6}
          ml={400}
          zIndex={100}
          display={{ base: "none", md: "flex" }}
        >
          <Link px={2} py={1} rounded={"md"} href={"/"} zIndex={100}>
            Home
          </Link>
          <Link px={2} py={1} rounded={"md"} href={"/"} zIndex={100}>
            Map
          </Link>
          <Link px={2} py={1} rounded={"md"} href={"/aboutPage"} zIndex={100}>
            About
          </Link>
        </HStack>
        <Flex alignItems={"center"}>
          <Menu>
            <MenuList>
              <MenuItem>Home</MenuItem>
              <MenuItem>Map</MenuItem>
              <MenuDivider />
              <MenuItem>About</MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </Flex>

      {isOpen ? (
        <Box pb={2} display={{ md: "none" }}>
          <Stack
            spacing={4}
            bg="#E0E0E0"
            ml={-300}
            mt={3}
            mr={1}
            mb={80}
            alignItems={"center"}
            borderRadius={10}
            padding={2}
          >
            <Link px={2} py={1} rounded={"md"} href={"/"} zIndex={100}>
              Home
            </Link>
            <Link px={2} py={1} rounded={"md"} href={"/"} zIndex={100}>
              Map
            </Link>
            <Link px={2} py={1} rounded={"md"} href={"/aboutPage"} zIndex={100}>
              About
            </Link>
          </Stack>
        </Box>
      ) : null}
    </Box>
  );
}

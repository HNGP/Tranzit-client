import { ReactNode } from "react";
import {
  Box,
  Flex,
  Text,
  HStack,
  Link,
  IconButton,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  Stack,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import Image from "next/image";
import logoImg from "../public/tranzit-2x-shadow.png";

const Links = ["Home", "Map", "About"];

const NavLink = ({ children }) => (
  <Link
    px={2}
    py={1}
    rounded={"md"}
    // _hover={{
    //   textDecoration: "none",
    //   bg: useColorModeValue("blue.200", "gray.700"),
    // }}

    href={"#"}
    zIndex={100}
  >
    {children}
  </Link>
);

export default function Simple() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box
      // bg={useColorModeValue("gray.100", "gray.300")}
      style={{
        backdropFilter: "blur(2rem)",
        boxShadow: "6px 6px 20px rgba(122, 122, 122, 0.212)",
        opacity: "80%",
      }}
      bgGradient="linear(to-br, rgba(255, 255, 255, 0.7),
    				rgba(255, 255, 255, 0.3))"
      pl={80}
      height={70}
      zIndex={100}
      mb={100}
    >
      <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
        <IconButton
          size={"md"}
          icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
          aria-label={"Open Menu"}
          display={{ md: "none" }}
          onClick={isOpen ? onClose : onOpen}
          zIndex={100}
          mt={20}
        />
        <Box display="flex" style={{ cursor: "pointer" }}>
          <Image
            style={{ border: "2px" }}
            height="50px"
            width="50px"
            src={logoImg}
            alt="Logo"
          />
          <Text fontSize={35} px={2} fontWeight={300}>
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
          {Links.map((link) => (
            <NavLink key={link}>{link}</NavLink>
          ))}
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
          <Stack as={"nav"} spacing={4}>
            {Links.map((link) => (
              <NavLink key={link}>{link}</NavLink>
            ))}
          </Stack>
        </Box>
      ) : null}
    </Box>
  );
}

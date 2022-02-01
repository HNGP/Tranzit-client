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
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { Drawer } from "antd";
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
      pl={80}
      height={70}
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
        <Box display="flex" style={{ cursor: "pointer" }} ml={-10} mt={2}>
          <Image
            style={{ border: "2px" }}
            height="50px"
            width="56px"
            src={logoImg}
            alt="Logo"
          />
          <Link
            px={2}
            py={1}
            rounded={"md"}
            href={"/"}
            zIndex={100}
            style={{ textDecoration: "none" }}
          >
            <Text
              fontSize={35}
              px={2}
              fontWeight={300}
              bgGradient="linear(to-r, #4c4ab8, #dba171)"
              letterSpacing={-2.5}
              bgClip="text"
            >
              tranzit
            </Text>
          </Link>
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
          <Link
            px={2}
            py={1}
            rounded={"md"}
            href="http://www.delhimetrorail.com/images/Network-Map-English-1.jpg"
            zIndex={100}
            isExternal
          >
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
      <Drawer
        visible={isOpen}
        onClose={onClose}
        placement="top"
        title="tranzit"
      >
        <div style={{ fontSize: "18px", marginLeft: "180px" }}>
          <h1 style={{ margin: "5px", padding: "5px" }}>
            <Link h1x={2} py={1} rounded={"md"} href={"/"} zIndex={100}>
              Home
            </Link>
          </h1>
          <h1 style={{ padding: "5px" }}>
            <Link px={2} py={1} rounded={"md"} href={"/"} zIndex={100}>
              Map
            </Link>
          </h1>
          <h1 style={{ paddingTop: "7px" }}>
            <Link px={2} py={1} rounded={"md"} href={"/aboutPage"} zIndex={100}>
              About
            </Link>
          </h1>
        </div>
      </Drawer>
    </Box>
  );
}

import { Box, Text } from "@chakra-ui/layout";
import { Menu, MenuButton, Tooltip } from "@chakra-ui/react";
import { BellIcon, ChevronDownIcon} from "@chakra-ui/icons";
import { Button } from "@chakra-ui/button";
import { Avatar } from "@chakra-ui/react";
import React, { useState } from 'react';
import { ChatState } from "../../Context/ChatProvider";
import {  MenuItem, MenuList, MenuDivider, }  from "@chakra-ui/menu";
import ProfileModal from "./ProfileModal";



const SideDrawer = () => {
    const [search, setSearch] = useState("");
    const [searchResult, setSearchResult] = useState([]);
    const [loading, setLoading] = useState(false);
    const [loadingChat, setLoadingChat] = useState();


    const { user } = ChatState();

  return <>
  <Box
  d="flex"
  justifyContent="space-between"
  alignItems="center"
  bg="white"
  w="100%"
  p="5px 10px 5px 10px"
  borderWidth="1px"
  >
<Tooltip label="Search Users to chat" hasArrow placement="bottom-end">
<Button variant="ghost">
  <i class="fas fa-search"></i>
  <Text d={{base: "none", md: "flex"}} px="1" >
    Search Users
  </Text>
</Button>
</Tooltip>

<Text fontSize="3xl" fontFamily="Work sans" textAlign="center">
  Chatopia
</Text>

<div>
  <Menu>
    <MenuButton p={1}>
      <BellIcon fontSize="2xl" m={1}/>
    </MenuButton>
      {/*<MenuList></MenuList>*/}
  </Menu>

<Menu>
  <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
  <Avatar  size="sm" cursor="pointer" name={user.name} src={user.pic} />
  </MenuButton>
<MenuList>
  <ProfileModal user={user}>
  <MenuItem>My Profile</MenuItem>
  </ProfileModal>
  <MenuDivider />
  <MenuItem>Logout</MenuItem>
</MenuList>
</Menu>
</div>
  </Box>
  </>
  };

export default SideDrawer;

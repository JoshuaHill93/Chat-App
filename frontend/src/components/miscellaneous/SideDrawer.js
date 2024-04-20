import { Box, Text } from "@chakra-ui/layout";
import { Tooltip } from '@chakra-ui/react';
import { Button } from "@chakra-ui/button";
import React, { useState } from 'react';





const SideDrawer = () => {
    const [search, setSearch] = useState("");
    const [searchResult, setSearchResult] = useState([]);
    const [loading, setLoading] = useState(false);
    const [loadingChat, setLoadingChat] = useState();

  return <>
  <Box
  d="flex"
  justifyContent="space-between"
  alignItems="center"
  bg="white"
  w="100%"
  p="5px 10px 5px 10px"
  borderWidth="5px"
  >
<Tooltip label="Search Users to chat" hasArrow placement="bottom-end">
<Button variant="ghost">
  <i class="fas fa-search"></i>
  <Text d={{base: "none", md: "flex"}} px="4" >
    Search Users
  </Text>
</Button>
</Tooltip>
  </Box>
  </>
  };

export default SideDrawer;

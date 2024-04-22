import { useDisclosure } from '@chakra-ui/react';
import { ViewIcon } from "@chakra-ui/icons";
import React from 'react';
import { useState } from "react";
import UserBadgeItem from "../userAvatar/UserBadgeItem";
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    IconButton,
    useToast,
    Box,



} from "@chakra-ui/react";
import { ChatState } from '../../Context/ChatProvider';
const UpdateGroupChatModal = ({ fetchAgain, setFetchAgain }) => {
        const {isOpen, onOpen, onClose} = useDisclosure();
        const [ groupChatName, setGroupChatName] = useState();
        const [search, setSearch] = useState("");
        const [searchResult, setSearchResult] = useState([]);
        const [loading, setLoading] = useState(false);
        const [renameloading, setRenameLoading] = useState(false);
        const toast = useToast();

const { selectedChat, setSelectedChat, user } = ChatState();

 const handleRemove = () => {};


        return (
            <>
            
        <IconButton d={{ base: "flex" }} icon={<ViewIcon />} onClick={onOpen} />

 
        
              <Modal isOpen={isOpen} onClose={onClose} isCentered >
                <ModalOverlay />
                <ModalContent>
                  <ModalHeader 
                    fontSize="35px"
                    fontFamily="Work sans"
                    d="flex"
                    justifyContent="center"

                  >{selectedChat.chatName}
                  </ModalHeader>
                  <ModalCloseButton />
                  <ModalBody>
                    <Box>
                        {selectedChat.users.map(u=> (
                             <UserBadgeItem key={user.id} user={u}
                             handleFunction={()=>handleRemove(u)}
                             />
                        ))}
                    </Box>
                  </ModalBody>
        
                  <ModalFooter>
                    <Button colorScheme="purple" mr={3} onClick={onClose}>
                      Close
                    </Button>
                    <Button variant='ghost'>Secondary Action</Button>
                  </ModalFooter>
                </ModalContent>
              </Modal>
            </>
          )
}

export default UpdateGroupChatModal;

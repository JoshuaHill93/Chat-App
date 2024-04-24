import { ViewIcon } from "@chakra-ui/icons";
import {  useDisclosure } from "@chakra-ui/hooks";
import React from "react";
import { IconButton } from "@chakra-ui/button";

import { Modal, ModalOverlay, ModalContent, ModalHeader,  ModalFooter,  ModalBody,  ModalCloseButton, Button,  Text, Image,} from "@chakra-ui/react";
const ProfileModal = ({ user, children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();


return (
<>
{children ? (
<span onClick={onOpen}>{children}</span>
) : (
  <IconButton d={{ base: "flex" }} icon={<ViewIcon />} onClick={onOpen} />
)}

<Modal size="sm" isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader
          fontSize="40px"
          fontFamily="Work sans"
          d="flex"
          justifyContent="center"
          >
            {user.name}
            </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Image
            borderRadius="full"
            boxSide="150"
            src={user.pic}
            alt={user.name}
            />
            <Text fontSize={{ base: "28", md: "30px"}}
                   fontFamily="Work sans"
                   >
                    Email: {user.email}
                    </Text>
          </ModalBody>
            <ModalFooter>
            <Button colorScheme="purple" mr={3} onClick={onClose}>
              Close
            </Button>
       
          </ModalFooter>
        </ModalContent>
      </Modal>

</>
);
}
export default ProfileModal;

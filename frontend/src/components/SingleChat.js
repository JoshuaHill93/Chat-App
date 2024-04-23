import React from "react";
import { ChatState } from "../Context/ChatProvider";
import { Box, Text } from "@chakra-ui/layout";
import { ArrowBackIcon } from "@chakra-ui/icons";
import UpdateGroupChatModal from "./miscellaneous/UpdateGroupChatModal";
import { getSender, getSenderFull } from "../config/ChatLogics";
import ProfileModal from "./miscellaneous/ProfileModal";
import { useState,  } from "react";
import { FormControl, IconButton, Spinner, Input, useToast} from "@chakra-ui/react";
import axios from "axios";
import ScrollableChat from "./ScrollableChat";



const SingleChat = ({ fetchAgain, setFetchAgain }) => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newMessage, setNewMessage] = useState();

const toast = useToast();
  const { user, selectedChat, setSelectedChat } = ChatState();


  const fetchMessages = async () => {
    if(!selectedChat) return;
     

    try {
        const config = {
            headers: {
                "content-Type":"application/json",
                Authorization:`Bearer ${user.token}`
            },
        };

        setLoading(true)

        const { data } = await axios.get(
            `/api/message/${selectedChat._id}`,
        config);

        console.log(messages);
        setMessages(data);
        setLoading(false);
    } catch (error) {
        toast({
            title: "Error Occured!",
            description: "Failed to send the Message",
            status: "error",
            duration: 5000,
            inCloseable: true,
            postions: "bottom",
        });
    }
};

// useEffect(() => {
//     fetchMessages();
// }, [selectedChat]);

  const typingHandler = (e) => {
    setNewMessage(e.target.value);

        // typing indicator logic
  };




  const sendMessage = async (event) => {
    if(event.key==="Enter" && newMessage) {
        try {
            const config = {
                headers: {
                    "content-Type":"application/json",
                    Authorization:`Bearer ${user.token}`
                }
            }

            setNewMessage("");
            const {data} = await axios.post("/api/message", {
                content: newMessage,
                chatId: selectedChat._id,
            },
            config
        );

        console.log(data);

            setMessages([...messages,data]);
        } catch (error) {
            toast({
                title: "Error Occured!",
                description: "Failed to send the Message",
                status: "error",
                duration: 5000,
                inCloseable: true,
                postions: "bottom",
            });
            
        }
    }
  };





  return (
    <>
      {selectedChat ? (
        <>
          <Text
            fontSize={{ base: "28px", md: "30px" }}
            pb={3}
            px={2}
            w="100%"
            fontFamily="Work sans"
            d="flex"
            justifyContent={{ base: "space-between" }}
            alignItems="center"
          >
            <IconButton
              d={{ base: "flex", md: "none" }}
              icon={<ArrowBackIcon />}
              onClick={() => setSelectedChat("")}
            />
            {!selectedChat.isGroupChat ? (
              <>
                {getSender(user, selectedChat.users)}
                <ProfileModal user={getSenderFull(user, selectedChat.users)} />
              </>
            ) : (
              <>
                {selectedChat.chatName.toUpperCase()}
                <UpdateGroupChatModal
                  fetchAgain={fetchAgain}
                  setFetchAgain={setFetchAgain}
                  fetchMessages={fetchMessages}
                />
              </>
            )}
          </Text>
          <Box
            display="flex" //
            flexDir="column"
            justifyContent="flex-end"
            p={3}
            bg="#C54A9C"
            w="100%"
            h="93%"
            borderRadius="lg"
            overflowy="hidden"
          >
            {loading ? (
              <Spinner
                size="xl"
                w={20}
                h={20}
                alignSelf="center"
                margin="auto"
              />
            ) : (
              <div className="messages">
                <ScrollableChat messages={messages} />
                 
                 </div>
            )}

            <FormControl onKeyDown={sendMessage} isRequired mt={1} bg="white" >
                    <Input
                    variant="filled"
                    bg="white"
                    placeholder="Enter a message.."
                   
                    value={newMessage}
                    onChange={typingHandler}
                    />
            </FormControl>
          </Box>
        </>
      ) : (
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          h="100%"
        >
          <Text fontSize="3xl" pb={3} fontFamily="Work sans">
            Click on a user to start chatting
          </Text>
        </Box>
      )}
    </>
  );
};

export default SingleChat;

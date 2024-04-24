import React from "react";
import { ChatState } from "../Context/ChatProvider";
import { Box, Text } from "@chakra-ui/layout";
import { ArrowBackIcon } from "@chakra-ui/icons";
import UpdateGroupChatModal from "./miscellaneous/UpdateGroupChatModal";
import { getSender, getSenderFull } from "../config/ChatLogics";
import ProfileModal from "./miscellaneous/ProfileModal";
import { useState, useEffect } from "react";
import { FormControl, IconButton, Spinner, Input, useToast} from "@chakra-ui/react";
import axios from "axios";
import ScrollableChat from "./ScrollableChat";

import io from "socket.io-client";
const ENDPOINT = "http://localhost:5000";
var socket, selectedChatCompare;



const SingleChat = ({ fetchAgain, setFetchAgain }) => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newMessage, setNewMessage] = useState();
  const [socketConnected, setSocketConnected] = useState(false);
  const [typing, setTyping] = useState(false);
  const [isTyping, setIsTyping] = useState(false);



const toast = useToast();
  const { user, selectedChat, setSelectedChat } = ChatState();
  
  useEffect(() => {
    socket = io(ENDPOINT);
    socket.emit("setup", user);
    socket.on("connected",() => setSocketConnected(true));
    socket.on("typing", () => setIsTyping(true));
    socket.on("stop typing", () => setIsTyping(false));


  }, []);

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

        
        setMessages(data);
        setLoading(false);
        socket.emit("join chat", selectedChat._id);
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

useEffect(() => {
    fetchMessages();
    selectedChatCompare = selectedChat;
}, [selectedChat]);

useEffect(() => {
    socket.on("message recieved", (newMessageRecieved) => {
      if (!selectedChatCompare  || selectedChatCompare._id !== newMessageRecieved.chat._id){
        // give notification
      } else {
        setMessages([...messages, newMessageRecieved]);
      }
    });
});



  const typingHandler = (e) => {
    setNewMessage(e.target.value);

        // typing indicator logic
        if (!socketConnected) return;

        if(!typing){
          setTyping(true);
          socket.emit("typing", selectedChat._id)
        }
        let  lastTypingTime = new Date().getTime();
        var timerLength = 3000;
        setTimeout(() => {
          var timeNow = new Date().getTime();
          var timeDiff = timeNow - lastTypingTime;

          if(timeDiff >= timerLength && typing){
            socket.emit("stop typing", selectedChat._id);
            setTyping(false)
          }
        }, timerLength);

  };

const sendMessage = async (event) => {
    if(event.key==="Enter" && newMessage) {
      socket.emit("stop typing", selectedChat._id)
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
        socket.emit("new message", data);
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
            
        };
    };
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
            )},

            <FormControl onKeyDown={sendMessage} isRequired mt={1} bg="white" >
                    {isTyping ? <div>Loading...</div> : <></>}
                    <Input
                    variant="filled"
                    bg="white"
                    placeholder="Enter a message.."
                    onChange={typingHandler}
                    value={newMessage}
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
      )},
    </>
  );
};

export default SingleChat;

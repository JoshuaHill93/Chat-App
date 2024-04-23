export const getSender = (loggedUser, users) => {
    return users[0]._id === loggedUser.id ? users[1].name : users.name[0];
};

export const getSenderFull = (loggedUser, users) => {
    return users[0]._id === loggedUser.id ? users[1]: users[0];
};





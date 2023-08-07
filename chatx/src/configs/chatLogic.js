export const GetSenderId = (currentUserId,members)=>{
    return (members[0]._id === currentUserId ) ? members[1].userName : members[0].userName
}

export const GetSenderDetails = (currentUserId,members)=>{
    return(members[0]._id === currentUserId ? members[1]:members[0])
}
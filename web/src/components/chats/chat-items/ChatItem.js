import moment from 'moment';
import { useContext } from "react"
import { AuthContext } from "../../../contexts/AuthContext"
import { Link } from 'react-router-dom';
import './ChatItem.css';

function ChatItem({id, users, messages}) {
    const auth = useContext(AuthContext)
    const sortedMessages = messages.sort((a, b) => b.date - a.date)
    console.log(sortedMessages)

    const otherUser = users.find((user) => user.id != auth.user.id);
    const dateFromNow = moment(messages[0].createdAt).fromNow()

    return (
            <div className="ChatItem">
                <img 
                    src={otherUser.avatar}
                    className="ChatAvatar rounded-circle mx-2" 
                    alt= {otherUser.name}
                    width="64px"
                    height="64px"
                />
                <div className="ChatText mx-3">
                    <h5 className="ChatName">{otherUser.name}</h5>
                    <p className="mb-2"><small>{moment(messages[0].createdAt).fromNow()}</small></p>
                    <p>{messages[0].content}</p>  
                </div>
                <Link to={`chats/${id}`} className="stretched-link"/> 
            </div>
    )
}

export default ChatItem;
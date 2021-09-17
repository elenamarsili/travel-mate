import moment from 'moment';
import { useContext } from "react"
import { AuthContext } from "../../../contexts/AuthContext"
import { Link } from 'react-router-dom';
import './ChatItem.css';

function ChatItem({id, users, messages}) {
    const auth = useContext(AuthContext)
    const lastMessage = messages[messages.length-1]

    const otherUser = users.find((user) => user.id !== auth.user.id);
    const date = lastMessage ? moment(lastMessage.createdAt).fromNow() : undefined

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
                    <p className="mb-2"><small>{date}</small></p>
                    <p>{lastMessage?.content.substring(0, 20)}...</p>  
                </div>
                <Link to={`chats/${id}`} className="stretched-link"/> 
            </div>
    )
}

export default ChatItem;
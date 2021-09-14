import { useState, useEffect } from "react"
import service from "../../../services/users-service"
import ChatItem from "../chat-items/ChatItem";

function ChatsList() {

    const [chats, setChats] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    
    useEffect(() => {
        service.chats()
            .then((chats) => {
                setChats(chats);
                setIsLoading(false);
            })
    }, [])

    return (
  
            <>
                {isLoading ? (<i className="fa fa-gear fa-spin"></i>) : (
                    <div className="container">
                      <div className="row mb-2">
                        <div className="col">
                          <ul className="list-group">
                          {chats.map(chat => (
                              <li key={chat.id} className="list-group-item list-group-item-action">
                                <ChatItem {...chat}/>
                              </li>
                          ))}
                          </ul>
                        </div>
                      </div> 
                    </div>
                )}
            </>   
    )
}

export default ChatsList;
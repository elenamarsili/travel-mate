import { useEffect, useState } from 'react';
import service from "../../../services/users-service"
import ChatItem from "../chat-items/ChatItem";
import './ChatLIst.css';

function ChatsList() {

  const [state, setState] = useState({ chats: [], isLoading: true});
  
    useEffect(() => {
      let isMounted = true;
      service.chats()
        .then(chats => {
          if (isMounted) {
            setState({ chats, isLoading: false });
          }
        })
        .catch(error => {
          setState({ isLoading: false });
          console.error(error);
        });
      return () => isMounted = false
    }, []);

    const { chats, isLoading } = state;

    return (
            chats &&
            <>
                {isLoading ? (<i className="fa fa-gear fa-spin"></i>) : (
                    <div className="row mb-2">
                      <div className="col">
                          {chats.map(chat => (
                              <div key={chat.id} className="list-group-item list-group-item-action px-0 py-0">
                                <ChatItem {...chat}/>
                              </div>
                          ))}
                      </div>
                    </div>
                )}
            </>   
    )
}

export default ChatsList;


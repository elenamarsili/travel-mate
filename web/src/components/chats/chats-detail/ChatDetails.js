import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { AuthContext } from "../../../contexts/AuthContext"
import { useContext } from "react"
import service from '../../../services/users-service';
import './ChatsDetail.css';
import { useForm } from "react-hook-form";

function ChatDetails() {
  const auth = useContext(AuthContext)
  const { id } = useParams();
  const [chat, setChat] = useState();
  const [fetch, setFetch] = useState(false)
  
  const updateChat = ()=> setFetch(!fetch)

  useEffect(() => {
    let isMounted = true;
    service.messageList(id)
      .then(chat => {
        if (isMounted) {
          setChat(chat)
        }
      })
      .catch(error => console.error(error))
    return () => isMounted = false;
  }, [id, fetch]);
  
  const otherUser = chat?.users.find((user) => user.id !== auth.user.id); 
  
  const { register, handleSubmit, reset, setError, formState: { errors } } = useForm({ mode: 'all' });
  const onMessageCreate = message => {
    service.messageCreate(id, message)
      .then(() => {
        reset()
        updateChat()
      })
      .catch(error => {
        const { message, errors } = error.response?.data || error;
        if (errors) {
          Object.keys(errors).forEach(input => {
            setError(input, { type: 'manual', message: errors[input] });
          })
        } else {
          setError('content', { type: 'manual', message: message });
        }
      })
  };

  if (!chat) return <p>Loading messages...</p>

  return (
    <div className="chat-box">
      <div className="chat-header">
        <img 
          src={otherUser.avatar}
          className="ChatAvatar rounded-circle mx-2" 
          alt={otherUser.name}
          width="64px"
          height="64px"/>
        <h5 className="ChatName">{otherUser.name}</h5>
      </div>        
      <div className="chat">
        <div className="ChatText">
          <div className="messages">  
          {chat.messages.map((message) => (
                <div key={message.id} className={message.sender.id === auth.user.id ? "message-mine" : "message-yours"}>
                  <p>{message.content}</p>
                </div>
              ))} 
          </div>
        </div>
        <div className="new-message">
        <form  className="message-form" onSubmit={handleSubmit(onMessageCreate)}>
          <div className="message-input input-group mb-2">
              <input  
                  type="text" {...register("content")}
                  className="custom-form-control form-control input-border py-2 ps-4" 
              />
          </div>
          <div className="btn-div mx-3">
              <button type="submit" className="btn send-btn rounded-circle"><i className="fa fa-paper-plane" aria-hidden="true"></i></button>
          </div>
        </form>

        </div>
      </div>
    </div>
  )
}

export default ChatDetails;
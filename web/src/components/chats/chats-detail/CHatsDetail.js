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

  useEffect(() => {
    let isMounted = true;
    service.messageList(id)
      .then(chat => {
        if (isMounted) {
          setChat(chat)
        }
      })
    return () => isMounted = false;
  }, [id]);

  console.log(chat)

  const { register, handleSubmit, setError, formState: { errors } } = useForm({ mode: 'all' });
  const onMessageCreate = message => {
/*     service.messageCreate(message, id)
      .then(() => {
        history.push('chats/${chatId}')
      })
      .catch(error => {
        const { message, errors } = error.response?.data || error;
        if (errors) {
          Object.keys(errors).forEach(input => {
            setError(input, { type: 'manual', message: errors[input] });
          })
        } else {
          setError('message', { type: 'manual', message: message });
        }
      }) */
  };

  if (!chat) return <p>Loading messages...</p>

  return (
    <div className="chat-box">
      <div className="chat-header">
        <img 
          src=""
          className="ChatAvatar rounded-circle mx-2" 
          alt= ""
          width="64px"
          height="64px"/>
        <h5 className="ChatName">Name</h5>
      </div>        
      <div className="chat">
        <div className="ChatText">
          <div className="messages">
{/*             <div className="message-mine">
              <p>Whatever</p>
            </div>
            <div className="message-yours">
              <p>Whatever</p>
            </div>
            <div className="message-mine">
              <p>Whatever</p>
            </div>
            <div className="message-yours">
              <p>Whatever</p>
            </div>
            <div className="message-mine">
              <p>Whatever</p>
            </div>
            <div className="message-yours">
              <p>Whatever</p>
            </div>
            <div className="message-mine">
              <p>Whatever</p>
            </div>
            <div className="message-yours">
              <p>Whatever</p>
            </div>
            <div className="message-mine">
              <p>Whatever</p>
            </div>
            <div className="message-yours">
              <p>Whatever</p>
            </div>
            <div className="message-mine">
              <p>Whatever</p>
            </div>
            <div className="message-yours">
              <p>Whatever</p>
            </div>
            <div className="message-mine">
              <p>Whatever</p>
            </div>
            <div className="message-yours">
              <p>Whatever</p>
            </div>
            <div className="message-mine">
              <p>Whatever</p>
            </div>
            <div className="message-yours"> */}
            {/*   <p>Whatever</p>
            </div> */}  
          {chat.messages.map((message, i) => (
                <div key={i} className={message.sender.id === auth.user.id ? "message-mine" : "message-yours"}>
                  <p>{message.content}</p>
                </div>
              ))} 
          </div>
        </div>
        <div className="new-message">
        <form  className="message-form" onSubmit={handleSubmit(onMessageCreate)}>
          <div className="message-input input-group mb-2">
              <input  
                  type="text" {...register("message")}
                  className="custom-form-control form-control input-border py-2 ps-4" 
                  aria-label="message" />
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
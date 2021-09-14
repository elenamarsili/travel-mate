import moment from 'moment';
import { useContext, useHistory } from "react"
import { AuthContext } from "../../../contexts/AuthContext"
import { Link } from 'react-router-dom';
import './ChatItem.css';

function ChatItem({id, users, messages}) {
    const auth = useContext(AuthContext)
    const sortedMessages = messages.sort((a, b) => b.date - a.date)
    console.log(sortedMessages)

    return (
        <div className="ChatItem card mb-3 mx-3">
            <div className="row g-0">
                <div className="col">
                    <img 
                        src={users.filter((user) =>{ 
                                if(user.id != auth.id) {
                                    return user.avatar
                                }
                            })}
                        className="img-fluid rounded-start" 
                        alt={users.filter((user) =>{ 
                            if(user.id != auth.id) {
                                return user.name
                            }
                        })}/>
                </div>
                <div className="col-md-9">
                    <div className="card-body">
                        <h5 className="card-title">{users.filter((user) =>{ 
                                if(user.id != auth.id) {
                                    return user.name
                                }
                            })}</h5>
{/*                         <p className="card-text">{messages.sort(function(a,b){
                            return new Date(b.date) - new Date(a.date);
                            })}</p>
                        <p className="card-text"><small className="text-muted">{moment(messagescreatedAt).fromNow()}</small></p>
                        <Link to={`/${id}`} className="stretched-link"/> */}
                    </div>
                </div>
            </div>
        </div>
    )
}
export default ChatItem;
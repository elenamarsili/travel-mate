import moment from 'moment';
import { Link } from 'react-router-dom';
import './ChatItem.css';


function ChatItem({id, users, messages}) {
    return (
        <div className="ChatItem card mb-3 mx-3">
            <div className="row g-0">
                <div className="col">
                    <img 
                        src={users.filter((user) =>{ 
                                if(user.id != req.user.id) {
                                    return user.avatar
                                }
                            })} 
                        className="img-fluid rounded-start" 
                        alt={users.filter((user) =>{ 
                            if(user.id != req.user.id) {
                                return user.name
                            }
                        })}/>
                </div>
                <div className="col-md-9">
                    <div className="card-body">
                        <h5 className="card-title">{users.filter((user) =>{ 
                                if(user.id != req.user.id) {
                                    return user.name
                                }
                            })}</h5>
                        <p className="card-text">{description}</p>
                        <p className="card-text"><small className="text-muted">{moment(messagescreatedAt).fromNow()}</small></p>
                        <Link to={`/${id}`} className="stretched-link"/>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default ChatItem;
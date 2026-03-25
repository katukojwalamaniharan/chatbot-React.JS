import RobotProfileImage from '../assets/robot.png';
import UserProfileImage from '../assets/user.png';
import dayjs from 'dayjs';
import './ChatMessage.css';
/* ================= SINGLE MESSAGE COMPONENT ================= */
export function ChatMessage({message,sender,time}){ 
    return (
        <div className={
            sender === 'user'
            ?'chat-message-user'   /* right side */
            :'chat-message-robot' /* left side */
        }>

            {/* show robot image only for robot */}
            {sender === 'robot'&& <img src={RobotProfileImage} className="chat-message-profile"/>}

            <div className="chat-message-content">
                <div className="chat-message-text">
                    {message}

                    <div className="chat-message-time">
                        {dayjs(time).format('h:mma')}
                    </div>
                </div>
            </div>

            {/* show user image only for user */}
            {sender === 'user' && <img src={UserProfileImage} className="chat-message-profile"/>}

        </div>
    );
}
console.log(UserProfileImage);
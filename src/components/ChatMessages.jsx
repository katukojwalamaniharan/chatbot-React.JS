import { ChatMessage } from './ChatMessage';
import { useEffect } from 'react';
import { useRef } from 'react';
import '../App.css'
import './ChatMessages.css';
/* ================= MESSAGES LIST COMPONENT ================= */
function useAutoScroll(dependencies){
    const containerRef = useRef(null);
    useEffect(()=>{ 
        const containerElem = containerRef.current;

        if(containerElem){
            containerElem.scrollTop = containerElem.scrollHeight;
        }
    },[dependencies]); // runs whenever chatMessages updates
    return containerRef;
}

export function ChatMessages({chatMessages}){

    // reference to container DOM
    const containerRef = useAutoScroll(chatMessages);
    // auto scroll when messages change

    return (
        <div className="chat-messages-container" ref={containerRef}>

            {/* loop through messages */}
            {chatMessages.map((chatMessage)=>{

                return (
                    <ChatMessage 
                        message = {chatMessage.message}
                        sender={chatMessage.sender}
                        time={chatMessage.time}
                        key = {chatMessage.id} /* important for React */
                    />
                );

            })}

        </div>
    );
} 
export default ChatMessages;
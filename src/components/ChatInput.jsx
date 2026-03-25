import { useState } from 'react'
import dayjs from 'dayjs';
import { Chatbot } from 'supersimpledev'
import LoadingGif from '../assets/loading-spinner.gif';
import './ChatInput.css';

/* ================= CHAT INPUT COMPONENT ================= */
export function ChatInput({chatMessages,setChatMessages}){

    // state for input text
    const [inputText,setInputText] = useState('');

    // state to prevent multiple requests
    const [isLoading, setIsLoading] = useState(false);
    
    // updates inputText when user types
    function saveInputText(event){
        setInputText(event.target.value);
    }

    // handles keyboard events
    function handleKeyDown(event){

        // press Enter → send message
        if(event.key === 'Enter'){
            sendMessage();

        // press Escape → clear input
        }else if(event.key === 'Escape'){
            setInputText('');
        }
    }
    function clearMessages() {
        setChatMessages([]);

    // Here, you could also run:
    // localStorage.setItem('messages', JSON.stringify([]));

    // However, because chatMessages is being updated, the
    // useEffect in the App component will run, and it will
    // automatically update messages in localStorage to be [].
    }

    // sends message to chatbot
    async function sendMessage(){
        // prevent sending when loading OR empty input
        if (isLoading || inputText.trim() === '') return;
        setInputText('');

        setIsLoading(true);

        // add user message
        const newChatMessages = [
            ...chatMessages,
            {   
                message:inputText,
                sender:'user',
                id:crypto.randomUUID(),
                time: dayjs().valueOf()
            }
        ];

        setChatMessages(newChatMessages);

        // clear input field
        

        // show temporary "Loading." message
        const loadingMessage = [
            ...newChatMessages,
            {   
                message:<img src={LoadingGif} className="loading-spinner" />,
                sender:'robot',
                id:crypto.randomUUID()
            }
        ];

        setChatMessages(loadingMessage);

        // wait for chatbot response
        const response = await Chatbot.getResponseAsync(inputText);

        // replace loading with actual response
        setChatMessages([
            ...newChatMessages,
            {
                message:response,
                sender:'robot',
                id:crypto.randomUUID(),
                time: dayjs().valueOf()
            }
        ]);
        
        setIsLoading(false);
    }

    // JSX UI
    return (
        <div className="chat-input-container">

            <input 
                placeholder="Send a message to Chatbot" 
                size="30" 
                value={inputText} /* controlled input */
                onChange={saveInputText}
                onKeyDown = {handleKeyDown}
                className = "chat-input"
            />

            <button 
                className = "send-button"
                onClick={sendMessage}
            >
                Send
            </button>
            <button
                onClick={clearMessages}
                className="clear-button"
            >Clear</button>
        </div>
    );
}
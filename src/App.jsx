import { useState , useEffect} from 'react'
import { Chatbot } from 'supersimpledev'
import './App.css'
import { ChatInput } from './components/ChatInput';
import ChatMessages from './components/ChatMessages';



function App(){

    // main state holding all chat messages
    const [chatMessages,setChatMessages] = useState(JSON.parse(localStorage.getItem('messages')) || [{}]);

    useEffect(() => {
    Chatbot.addResponses({
      'goodbye': 'Goodbye. Have a great day!',
      'give me a unique id': function() {
        return `Sure! Here's a unique ID: ${crypto.randomUUID()}`;
      },
      'My name':'Maniharan chary',
      'hi':'hello how are you doing?'
    });
    // [] tells useEffect to only run once. We only want to run
    // this setup code once because we only want to add these
    // extra responses once.
    }, []);

    useEffect(() => {
        localStorage.setItem('messages', JSON.stringify(chatMessages));
    }, [chatMessages]);
    return (
        <div className="app-container">
            {chatMessages.length === 0?(
                <p className="welcome-message">
                    Welcome to the chatbot project! Send a message using the textbox below.
                </p>
            ):null}
            {/* message list */}
            <ChatMessages 
                chatMessages = {chatMessages}
            />
            {/* input box */}
            <ChatInput
                chatMessages = {chatMessages}
                setChatMessages = {setChatMessages}
            />

        </div>
    );
}

export default App

import React, { useState, useEffect } from 'react';

//this module will retireve data from url
import queryString from 'query-string';
import io from 'socket.io-client';
import './Chat.css'

import InfoBar from '../InfoBar/InfoBar'
import Input from '../input/input'
import Messages from '../Messages/Messages'
import TextContainer from '../TextContainer/TextContainer'

let socket;


/*
useEffect: is a hook that lets u use life cycle methods or side effects in function components
*/

const Chat = ({ location }) => {
    const [name, setName] = useState('');
    const [room, setRoom] = useState('');
    const [users, setUsers] = useState('');
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState('');
    const [pageTheme, setTheme] = useState('');
    const [pageColor, setPageColor] = useState('')
    const [fontColor, setFontColor] = useState('')

    //Local Server
    // const ENDPOINT = 'localhost:5000'

    //Netlifly Server
    const ENDPOINT = 'https://friendsczar.herokuapp.com/'
    
    useEffect(() => {
        const { name, room, pageTheme, pageColor, fontColor } = queryString.parse(window.location.search);

        socket = io(ENDPOINT);

        setName(name)
        setRoom(room)
        setTheme(pageTheme)
        setPageColor(pageColor)
        setFontColor(fontColor)
        console.log(name, room, pageTheme, pageColor, fontColor)
        // console.log(socket)

        
        socket.emit('join', { name, room }, (error) => {
            if(error) {
                alert(error);
                window.location="/"
              }
            

        });

        return () => {
            socket.emit('disconnect');
            socket.off();
        }
    }, [ENDPOINT, location.search]);
    // }, [ENDPOINT]);

    useEffect(() => {

    })

    useEffect(() => {
        socket.on('message', (message) => {
            setMessages([...messages, message])
        })
    }, [messages]);

    useEffect(() => {
        socket.on('roomData', ({ users }) => {
            setUsers(users);
        })
    }, []);

    //Function to Sending Messages

    const sendMessage = (event) => {
        event.preventDefault();

        if (message) {
            socket.emit('sendMessage', message, () => setMessage(''));
        }
    }
    console.log(message, messages);
    // console.log(users)
    const colorMode = () => {

        if (pageColor === "1A1A1D") {
            setFontColor('black');
            setTheme('Dark');
            setPageColor('FFF')

        } else {
            setFontColor('white');
            setTheme('Light');
            setPageColor('1A1A1D')

        }
    }

    return (
        <div>
            <div>
                <div className='header' style={{ backgroundColor: '#' + pageColor }}>
                    <h1 className="appName" style={{ color: fontColor }}>FRIENDSCZAR <span role="img" aria-label="emoji">💬</span></h1>
                    {/* <h2 className="About" style={{ color: fontColor }}>About</h2> */}
                    <button className="themeButton" onClick={colorMode} style={{ color: fontColor }}>{pageTheme} Theme</button>


                </div>
            </div>
            <div className="OuterContainer" style={{ backgroundColor: '#' + pageColor }}>

                <div className="Container" style={{ border: '1px solid black' }}>
                    <InfoBar room={room} />
                    <Messages messages={messages} name={name} />
                    <Input
                        message={message}
                        setMessage={setMessage}
                        sendMessage={sendMessage}
                    />

                </div>
                <TextContainer users={users} fontColor={fontColor} />

            </div>
        </div>
    )
}

export default Chat;
import React, { useState } from 'react';
//Link to the /chat  path
import { Link } from 'react-router-dom'
import './Join.css';

/*React Hooks 
useState= this is a Hook , using state in function based component
simple functions and variable names (no this.)

*/


const Join = () => {
    //declaring hooks
    const [name, setName] = useState('');
    const [room, setRoom] = useState('');
    const [bgColor, setBgColor] = useState('#1A1A1D');
    const [fontColor, setFontColor] = useState('white');
    const [theme, setTheme] = useState('Light');
    const [pageTheme, setPageTheme] = useState('Dark')
    const [pageColor, setPageColor] = useState('1A1A1D')


    const colorMode = () => {

        if (bgColor === "#1A1A1D") {
            setBgColor('white');
            setFontColor('black');
            setTheme('Dark');
            setPageTheme('Light')
            setPageColor('FFF')

        } else {
            setBgColor('#1A1A1D');
            setFontColor('white');
            setTheme('Light');
            setPageTheme('Dark')
            setPageColor('1A1A1D')
        }
    }

    

  

    const enterEvent = (event) => {
        event.preventDefault();
        window.location = '/chat?name=' + name + '&room=' + room + '&pageTheme=' + pageTheme + '&pageColor=' + pageColor + '&fontColor=' + fontColor;

    }
    return (
        <div style={{ backgroundColor: bgColor }}>
            <div className='header' style={{ color: fontColor }}>
                <h1 className="appName" style={{ position: 'relative', left: 95, color: fontColor }}>FRIENDSCZAR <span role="img" aria-label="emoji">💬</span></h1>
                {/* <h2 className="About" style={{ color: fontColor }}>About</h2> */}
                <button className="themeButton" onClick={colorMode} style={{ color: fontColor }}>{theme} Theme</button>
            </div>
            <div className="joinOuterContainer">

                <div className="joinInnerCointainer" style={{ color: fontColor }}>
                    <h1 className="title" style={{ color: fontColor, borderBottomColor: fontColor }}>Join</h1>
                    <div><input placeholder="Name" className="joinInput" type="text" onChange={(event) => setName(event.target.value)} /></div>
                    <div><input onKeyPress={event => (room) && event.key === 'Enter' ? enterEvent(event) : null} placeholder="Room" className="joinInput mt-20" type="text" onChange={(event) => setRoom(event.target.value)} /></div>

                    <Link onClick={event => (!name || !room) ? event.preventDefault() : null} to={'/chat?name=' + name + '&room=' + room + '&pageTheme=' + pageTheme + '&pageColor=' + pageColor + '&fontColor=' + fontColor}>
                        <button className="button mt-20" type="submit">Sign In</button>
                    </Link>
                </div>
            </div>
        </div>

    )
}




export default Join;
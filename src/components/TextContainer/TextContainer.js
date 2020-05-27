import React from 'react';
import onlineIcon from '../../icons/onlineIcon.png';
import './TextContainer.css';

const TextContainer = ({ users ,fontColor }) => (
  <div className="textContainer">
    {
      users
        ? (
          <div>
            <h1 style={{color:fontColor}}>People currently active:</h1>
            <div className="activeContainer" style={{color:fontColor}}>
              <h2>
                {users.map(({name}) => (
                  <div key={name} className="activeItem" style={{color:fontColor}}>
                    {name}
                    <img alt="Online Icon" src={onlineIcon}/>
                  </div>
                ))}
              </h2>
            </div>
          </div>
        )
        : null
    }
  </div>
);

export default TextContainer;
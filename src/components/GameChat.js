import './GameChat.css';
import React from 'react';

import Game from './Game/Game';
import Chat from './Chat/Chat';

class GameChat extends React.Component {

    render() {
        return (
            <div className="col-xs-12 gamechat">
                <div className="game-main"><Game /></div>
                <div className="game-chat"><Chat /></div>
            </div>
        );
    }
}

export default GameChat

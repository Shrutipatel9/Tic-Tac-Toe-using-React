import React from 'react'
import {GAME_STATE_PLAYING} from '../constants'

const Footer = ({onGameClick,onSuggestClick,gameState}) => {
  return (
    <div className='panel footer'>
      {
        gameState === GAME_STATE_PLAYING && 
      <button onClick={onSuggestClick}>Suggest</button>
}
    {
      gameState !== GAME_STATE_PLAYING &&
      <button onClick={onGameClick}>New Game</button>
    }
      
        
    </div>
  )
}

export default Footer
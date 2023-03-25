import React from 'react'
import '../game.css'


const GameCircle = ({id,children,className,onCircleClicked}) => {

      return (
    <div className={`GameCircle ${className}`} onClick={() => onCircleClicked(id)}>
        
        {children}
    </div>
  )
}

export default GameCircle

import React,{useEffect, useState} from 'react';
import GameCircle from './gamecircle';

import '../game.css'

import Header from './header';
import Footer from './footer';
import {isDraw, isWinner,getComputerMove} from '../helper';
import { GAME_STATE_PLAYING,GAME_STATE_WIN,GAME_STATE_DRAW,PLAYER_1,PLAYER_2,NO_PLAYER,NO_CIRCLES} from '../constants';


const GameBoard = ()=>{

    const [gameBoard,setGameBoard]= useState([Array(16).fill(NO_PLAYER)]);
    const [currentPlayer,setCurrentPlayer]=useState(PLAYER_1);
    const [gameState,setGameState]=useState(GAME_STATE_PLAYING);
    const [winPlayer,setWinPlayer]=useState(NO_PLAYER);

    console.log(gameBoard);

    useEffect(()=>{
        initGame();
    },[]);

    const initGame =() =>{
        console.log("init Game");
        setGameBoard([Array(16).fill(NO_PLAYER)]);
        setCurrentPlayer(PLAYER_1);
        setGameState(GAME_STATE_PLAYING);

    }

    const initBoard = () =>{
        const circles = [];
        for(let i=0;i<NO_CIRCLES;i++){
           circles.push(renderCircle(i));
        }
        return circles; 
    };
    
    const suggestMove=()=>{
       // console.log("suggest move"); 
       circleClicked(getComputerMove(gameBoard));

    }
    const circleClicked = (id) =>{   
    console.log("circle clicked with id : " + id);

    if(gameBoard[id] === PLAYER_1) return;
    if(gameBoard[id] === PLAYER_2) return;
    if(gameState !== GAME_STATE_PLAYING) return;
    
    if(isWinner(gameBoard,id,currentPlayer)){
        console.log("winner");
        setGameState (GAME_STATE_WIN);
        setWinPlayer(currentPlayer);
    }
    if(isDraw(gameBoard,id,currentPlayer)){
        console.log("DRAW");
        setGameState (GAME_STATE_DRAW);
        setWinPlayer(NO_PLAYER);
    }

    const board = [...gameBoard];
    board[id]=currentPlayer;
    setGameBoard(board);
    // setGameBoard(prev =>{
    //     return prev.map((circle,pos) =>{    
    //         if(pos===id) return currentPlayer;
    //         return circle;
    //     })
    // })
 

    setCurrentPlayer(currentPlayer===PLAYER_1 ? PLAYER_2 : PLAYER_1);   

    console.log(gameBoard);
    console.log(currentPlayer);
}
const renderCircle = id =>{
    return  <GameCircle key={id} id={id} className={`player_${gameBoard[id]}`} onCircleClicked={circleClicked}>
    </GameCircle> 
}

    return (
        <>
        <Header gameState={gameState} currentPlayer={currentPlayer} winPlayer={winPlayer} />
        <div className="GameBoard">
          {initBoard()}
        </div>
        <Footer onGameClick={initGame} onSuggestClick={suggestMove} gameState={gameState}/>
        </>
    )
}
export default GameBoard;

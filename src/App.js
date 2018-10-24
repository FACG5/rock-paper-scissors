import React, { Component } from 'react';
import './App.css';
import {getGithubData} from './utilities';

const PlayerCard = ({ color, symbol }) => {
    const style = {
        backgroundColor: color,
        backgroundImage: "url(./img/" + symbol + ".png)"
    }
    return ( <div style = {style} className = "player-card" >
                          {symbol} 
              </div>
    )
}

const Playerphoto = (props) =>{
    return <img src={props.imgsrc}/>
}

class Photodiv extends React.Component{
    constructor(props){
    super(props)
    this.state={photo:""};
    }
    inputChangeHandler = (e)=> {
        this.setState({inputText:e.target.value});
    }

    getPhoto = () =>{
        getGithubData(this.state.inputText)
        .then(userResponse => {
          this.setState({photo: userResponse.avatar_url});
        });
    }

    render(){
        return (
            <div className ="photo"> 
            <input type="text" onChange={this.inputChangeHandler}/>
            <button onClick = {this.getPhoto} > Get Photo </button>
            < Playerphoto imgsrc = {this.state.photo}/>
            </div>
        )
    }
}


class App extends Component {

    constructor(props) {
        super(props)
        this.symbols = ["rock", "paper", "scissors"]
        this.state = {data:undefined};

    }


 
   
  
        decideWinner = () => {
            const { playerYellow, playerGreen } = this.state
            if (playerGreen === playerYellow) {
                return "It's a draw!";

            } if ((playerGreen === "rock" && playerYellow === "scissors")||
                  (playerGreen === "paper" && playerYellow === "rock")||
                  (playerGreen === "scissors" && playerYellow === "paper")) {
                return "Green Player Wins !"
                
            }
                return "Yellow Player Wins !"
        }

    
    runGame = () => {
        let counter = 0;
        let myInterval = setInterval(() => {
            counter++
            this.setState({
                playerGreen: this.symbols[Math.floor(Math.random() * 3)],
                playerYellow: this.symbols[Math.floor(Math.random() * 3)]

            })
            if (counter > 20) {
                clearInterval(myInterval);
                this.setState({winner: this.decideWinner()})
            }
        }, 100)
    }
    render() {

        return ( 
        <div className = "App" >

         <Photodiv />

            <div className ="game"> 
                < PlayerCard color = "green" symbol = { this.state.playerGreen }/>
                < PlayerCard color = "yellow" symbol = { this.state.playerYellow }/>
                <p>{this.state.winner}</p>
                < button onClick = {this.runGame} > Run Game </button> 
            </div>
            
            <Photodiv />


        </div>
        );
    }
}

export default App;
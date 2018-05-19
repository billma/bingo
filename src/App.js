import React, { Component } from 'react';
import Action from './action';
import Ticket from './ticket';
import './App.css';

class App extends Component {
  state={
    tickets: [],
    currentBalls: [],
    winningTicket: ''
  }
  componentDidMount() {
    Action.getTickets(4)
      .then((tickets)=>{
        this.setState({ tickets });
        this.draw();
      })
  }

  draw = () => {
    const { currentBalls } = this.state;
    Action.draw({ currentBalls })
      .then(({ nextBall})=>{
        currentBalls.unshift(nextBall); 
        this.setState({ currentBalls });
      })
  }

  bingo = ({ checked, ticket, ticketId }) => {
    const { currentBalls } = this.state;
    Action.verify({
      checked,
      ticket,
      currentBalls
    }).then(({ bingo })=>{
      if (bingo) { 
        this.setState({ winningTicket: ticketId }, ()=>{
          alert(`Bingo! ticket number ${ticketId}`);
        });
      }
    });
  }

  render() {
    const { currentBalls, tickets, winningTicket } = this.state;
    const lastBall = currentBalls[0];
    const prevBalls = currentBalls.slice(1,currentBalls.length);
    const ticketsView = tickets.map((ticket, key)=>{
      return <Ticket
        { ... { 
          key,
          ticket,
          currentBalls,
          id: key,
          winningTicket } }
        bingo = {this.bingo}
      />
    });
    const prevBallsList = prevBalls.map((ball, i)=>
      <div key={i} className="prev">{ball}</div>
    );

    return (
      <div className="app">
        <div className="scores">
          <div className="lastBall">
            <strong className="label">Last Ball</strong>
            <span className="value">{lastBall}</span>
            <button className="draw" onClick={this.draw}>draw</button>
          </div>     
          <div className="prevBalls">
            <strong className="label">PREVIOUS BALLS</strong>
            <div className="list">
              { prevBallsList }
            </div>
          </div>
        </div>
        <div className="ticketContainer">
          {ticketsView}
        </div>
      </div>
    );
  }
}

export default App;

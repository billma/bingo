import ReactDOM from 'react-dom';
import React, { Component } from 'react';
import Adapter from './adapter';
import classNames from 'classnames';
import './App.css';

const Cell = ({ cell, active }) => {
  const className = classNames(
    'cell',
    {'active': active}
  )
  return (
    <div
      className={className}
    >{cell}</div>
  );
}

const Ticket = ({ ticket, isWinning }) => {
  const { cells, checked } = ticket;
  const className = classNames(
    'ticket',
    { 'win': isWinning }
  ); 
  const cellList = cells.map((cell,key)=>
    <Cell
      {...{ 
        key,
        cell,
        active: (checked.includes(key))
      }}
    />
  );

  return (
    <div className={className}>
      { cellList } 
    </div>
  );
}

class App extends Component {
  state={
    tickets: [],
    currentBalls: [],
    winningTickets: []
  }
  componentDidMount() {
    Adapter.getTickets(4)
      .then((data)=>{
        const tickets = data.map((cells, id)=> {
          return {id, cells, checked: []};
        });
        this.setState({ tickets });
        this.draw();
      })
  }

  draw = () => {
    const { currentBalls, tickets } = this.state;
    Adapter.draw({ currentBalls })
      .then(({ nextBall})=>{
        currentBalls.unshift(nextBall); 
        tickets.forEach(({ cells, checked })=>{
          const check = cells.indexOf(nextBall);
          if (check > -1) {
            checked.push(check);
          }
        })
        this.setState({ currentBalls, tickets }, this.verify);
      })
  }

  verify = () => {
    const { currentBalls, tickets } = this.state;
    Adapter.verify({
      tickets,
      currentBalls
    }).then(({ winningTickets })=>{
      if (winningTickets.length > 1) {
        this.setState({ winningTickets }, ()=>{
          alert("Bingo!");
        });
      }
    });
  }

  render() {
    const { currentBalls, tickets, winningTickets } = this.state;
    const lastBall = currentBalls[0];
    const prevBalls = currentBalls.slice(1,currentBalls.length);
    const ticketsView = tickets.map((ticket, key)=>{
      return <Ticket
        { ... { 
          key,
          ticket,
          isWinning: (winningTickets.includes(key)) 
        }}
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


ReactDOM.render(<App />, document.getElementById('root'));

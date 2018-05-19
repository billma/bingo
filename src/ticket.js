import React, { Component } from 'react';
import classNames from 'classnames';

const Cell = ({ indx, cell, check, active, suggest, lastBall }) => {
  const className = classNames(
    'cell',
    {'active': active},
    {'suggest': (cell === lastBall)}
  )
  return (
    <div
      className={className}
      onClick={()=>{ check(indx, cell); }}
    >{cell}</div>
  );
}

class Ticket extends Component {
  state = {
    checked:[],
  }
  check= (indx, cell) => {
    const { checked } = this.state;
    const { ticket, id, currentBalls } = this.props;
    if (currentBalls.includes(cell)) {
      checked.push(indx);
      this.setState({ checked });
      this.props.bingo({ checked, ticket, ticketId:id });
      return;
    }
    alert("Wrong number");
  }
  render () {
    const { ticket ,currentBalls, winningTicket, id } = this.props;
    const lastBall = currentBalls[0];
    const { checked } = this.state;
    const className = classNames(
      'ticket',
      { 'win': (winningTicket === id) }
    ); 
    const cells = ticket.map((cell,key)=>
      <Cell
        {...{ 
          key,
          cell,
          lastBall,
          indx: key,
          check: this.check,
          active: (checked.includes(key))
        }}
      />
    );
    return (
      <div className={className}>
        { cells } 
      </div>
    );
  }
}

export default Ticket;

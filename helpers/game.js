const DEFAULT = {
  min: 1,
  max: 100,
  size: 5
}

class Game {
  constructor ({ range, size }) {
    this.size = size || DEFAULT.size;
    this.range = range || [ DEFAULT.min, DEFAULT.max ];
  }

  getRandom () {
    const [ min, max ] = this.range;
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  getNextBall (existing) {
    const nextBall = this.getRandom();
    if(!existing.includes(nextBall)) return nextBall;
    return this.getNextBall(existing);
  } 

  getTicket (ticket=[]) {
    if(ticket.length === this.size**2) return ticket;
    ticket.push(this.getNextBall(ticket))
    return this.getTicket(ticket);
  }

  getTickets (count=1, tickets=[]) {
    if(count===0) return tickets;
    tickets.push(this.getTicket());
    return this.getTickets(count-1,tickets);
  }

  checkRow (row, indices, i=row ) {
    if(i === row + this.size) return true;
    if(!indices.includes(i)) return false;
    return this.checkRow(row, indices, i+1);
  }

  checkColumn (col, indices, i=0) {
    if(i === this.size ) return true;
    if(!indices.includes(col+i*this.size)) return false;
    return this.checkColumn(col, indices, i+1);
  }

  checkDiagnal (indx, indices, i=0) {
    const increment = indx === 0 ? this.size + 1 : this.size - 1;
    if (i === this.size) return true;
    if (!indices.includes(indx+i*increment)) return false;
    return this.checkDiagnal(indx, indices, i+1);
  }

  validateTicket (checked, ticket, currentBalls, i=0) {
    if (i===checked.length) return true;
    const checkedNum = ticket[checked[i]];
    if (!currentBalls.includes(checkedNum)) return false;
    return this.validateTicket(checked, ticket, currentBalls, i+1);
  }

  validateBingo (sortedIndx, i=0) {
    const indx = sortedIndx[i];
    if (i=== sortedIndx.length) return false;
    if ((indx === 0 || indx === this.size - 1)
      && this.checkDiagnal(indx, sortedIndx)) return true;
    if ((indx >= 0 || indx <= this.size - 1)
      && this.checkColumn(indx, sortedIndx)) return true;
    if (indx % this.size ===0 && this.checkRow(indx, sortedIndx)) return true;
    return this.validateBingo(sortedIndx, i+1); 
  }

  verify ({ checked, ticket, currentBalls }) {
    const sortedIndices = checked.sort();
    if(!this.validateTicket(sortedIndices, ticket, currentBalls)) return false;
    if(!this.validateBingo(sortedIndices)) return false;
    return true;
  }
}

module.exports = Game;

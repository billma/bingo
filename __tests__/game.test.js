const Game = require('../helpers/game');

const game = new Game({
  range: [1,10],
  size: 3
});

describe('Game', ()=>{
  test("should initialize properties", () => {
    expect(game.size).toBe(3);
    expect(game.range).toEqual([1,10]);
  });

  test("should create tickets", () => {
    const tickets = game.getTickets(2); 
    expect(tickets.length).toBe(2);
    expect(tickets[0].length).toBe(9);
  });

  test("should create ticket with range [1,10]", ()=>{
    const ticket = game.getTicket();
    ticket.forEach((val)=>{
      expect(val).toBeLessThanOrEqual(10);
      expect(val).toBeGreaterThanOrEqual(1);
    });
  });

  test("should create ticket with unique numbers", ()=>{
    const ticket = game.getTicket();
    const seen = [];
    ticket.forEach((val)=>{
      expect(seen.includes(val)).toBeFalsy();
      seen.push(val);
    });
  });

  test("should draw unique ball", ()=>{
    const currentBalls=[1,2,3,4,5,6,7,8,9];
    const nextBall = game.getNextBall(currentBalls);
    expect(nextBall).toBe(10);
  })

  test("should check winning diagnal combo", ()=>{
    expect(game.validateBingo([0,4,8])).toBeTruthy();
    expect(game.validateBingo([2,4,6])).toBeTruthy();
    expect(game.validateBingo([4,8])).toBeFalsy();
    expect(game.validateBingo([0,4])).toBeFalsy();
    expect(game.validateBingo([2,4])).toBeFalsy();
    expect(game.validateBingo([4,6])).toBeFalsy();
    expect(game.validateBingo([-1,6,10])).toBeFalsy();
  });
  
  test("should check winning row combo", ()=>{
    expect(game.validateBingo([0,1,2])).toBeTruthy();
    expect(game.validateBingo([1,2,3,4,5])).toBeTruthy();
    expect(game.validateBingo([-1,3,4,5,10])).toBeTruthy();
    expect(game.validateBingo([1,2,3,5])).toBeFalsy();
    expect(game.validateBingo([])).toBeFalsy();
  });

  test("should check winning column combo", ()=>{
    expect(game.validateBingo([0,3,5,6,7])).toBeTruthy();
    expect(game.validateBingo([3,6,9])).toBeTruthy();
    expect(game.validateBingo([3,8])).toBeFalsy();
    expect(game.validateBingo([0,4,6,9])).toBeFalsy();
  });

  test("should validate ticket combo value", ()=>{
    const ticket = game.getTicket();
    expect(game.verify({
      checked: [0,1,2],
      ticket,
      currentBalls: []
    })).toBeFalsy();

    expect(game.verify({
      checked: [0,1,2],
      ticket,
      currentBalls: [ticket[0], ticket[1], ticket[2], 9]
    })).toBeTruthy();
  });
});

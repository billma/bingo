# Bingo Game 
### by Bill Ma

## Running App  
```
npm start
```

## Running Test 
```
npm test
```

## Walkthrough

### game.js
this is helper class created for the server to handle game's logic including verfication, draw next ball and generating tickets

### server.js

This is the API server containing 3 endpoints:

GET '/tickets' 

returns a list of ticket. Each ticket is represented by an array of numbers.
It takes in `count` in the query to specify how many tickets the clients need

POST '/draw'
Takes in the `currentBalls` in the game and return the next Ball that has been shown

POST '/verify'
Takes in a list of tickets with the following `json` structure, and `currentBalls` in the game.
It than goes through the array of tickets to determine the winner of the ticket and push the ticket ID into an array

```
// checked is represented by the indices of the number
// that has been match in the currentBalls


// cells is the array of numbers representing the ticket
[
  { id: 0, cells: [...], checked: [3]},
  { id: 1, cells: [...], checked: [0,1]},
  { id: 2, cells: [...], checked: []},
  { id: 3, cells: [...], checked: []},
]
```
### src/adapter.js
Responsible for sending Ajax calls to the server using `node-fetch` module


### src/index.js
This file is the entry point to the react app featuring three components

`App` component that holds the entire states of the app. 

`Ticket` component is responsible for rendering the list of cells

'Cell' component just shows the value of the cell 


### Game flow 

1. When the page first load the user are given the first Ball 
2. User then click on the `draw` button to get the next Ball
3. Everytime the `draw` button is clikced on, the game sends api calls to the server to:
  * get the next ball 
  * verify winning tickets
  * alert "Bingo" and highlight winning tickets



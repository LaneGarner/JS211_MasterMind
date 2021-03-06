'use strict';

const assert = require('assert');
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let board = [];
let solution = '';
let letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];

const printBoard = () =>  {
  for (let i = 0; i < board.length; i++) {
    console.log(board[i]);
  }
}

const generateSolution = () =>  {
  for (let i = 0; i < 4; i++) {
    const randomIndex = getRandomInt(0, letters.length);
    solution += letters[randomIndex];
  }
}

const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min)) + min;
}

const generateHint = (guess) =>  {
  let solutionArr = solution.split('');
  let guessArr = guess.split('');
  let correctLetter = 0;
  let correctLocation = 0;
  
  solutionArr.forEach((i)=>{
    if (solutionArr[i] === guessArr[i]) {
      correctLocation ++;
      solutionArr[i] = null;
    }
  })

  for (let i = 0; i < solutionArr.length; i++) {
    if (solutionArr[i] === guess[i]) {
      correctLocation ++;
      solutionArr[i] = null;
    }
  }

  solutionArr.forEach((i)=>{
    let target = solutionArr.indexOf(guess[i])
    if (target > -1) {
      correctLetter++;
      solution[target] = null;
    }
  })

  let hint = correctLocation.toString() + "-" + correctLetter.toString();
  return hint;
}

const mastermind = (guess) => {
  if (solution === guess) {
    console.log('You guessed it!')
    return 'You guessed it!'
  }
  else {
    let hint = generateHint(guess);
    board.push(guess + ' ' + hint)
    if (board.length > 10) {
      console.log('You ran out of turns!')
      return 'You ran out of turns!'
    }
    else {
      console.log('Guess Again!')
      return 'Guess Again'
    }
  }
}

const getPrompt = () =>  {
  rl.question('guess: ', (guess) => {
    mastermind(guess);
    printBoard();
    getPrompt();
  });
}

// Tests

if (typeof describe === 'function') {
  solution = 'abcd';
  describe('#mastermind()', () => {
    it('should register a guess and generate hints', () => {
      mastermind('aabb');
      assert.equal(board.length, 1);
    });
    it('should be able to detect a win', () => {
      assert.equal(mastermind(solution), 'You guessed it!');
    });
  });

  describe('#generateHint()', () => {
    it('should generate hints', () => {
      assert.equal(generateHint('abdc'), '2-2');
    });
    it('should generate hints if solution has duplicates', () => {
      assert.equal(generateHint('aabb'), '1-1');
    });

  });

} else {

  generateSolution();
  getPrompt();
}
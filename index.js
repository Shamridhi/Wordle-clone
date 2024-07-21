const dict=['video', 'audio', 'movie', 'crash','hater','crane','early','eager','apple', 'brave', 'charm', 'doubt', 'eagle', 'fairy', 'globe', 'habit', 'irony', 'jolly',
    'kneel', 'latch', 'mango', 'noble', 'ocean', 'piano', 'quilt', 'raven', 'spade', 'tiger',
    'unite', 'vivid', 'waste', 'xerox', 'yacht', 'zebra', 'adopt', 'bacon', 'candy', 'delve',
    'enter', 'fable', 'gleam', 'hound', 'image', 'jelly', 'knead', 'layer', 'mirth', 'nifty',
    'olive', 'pearl', 'quack', 'rival', 'sable', 'tango', 'ultra', 'vital', 'waste', 'xenon']
const state = {
    secret: dict[Math.floor(Math.random()*dict.length)],
    grid: Array(6).fill().map(()=>Array(5).fill('')),
    currentrow : 0,
    currentcol:0,
};
function updategrid(){
    for(let i=0;i<state.grid.length;i++){
        for(let j=0;j<state.grid[i].length;j++)
        {
            const box = document.getElementById(`box${i}${j}`);
            box.textContent = state.grid[i][j];
        }
    }
}
function drawBox(container, row, col, letters='')
{
    const box = document.createElement('div');
    box.className = 'box';
    box.textContent = letters;
    box.id = `box${row}${col}`;
    container.appendChild(box);
    return box;
}
function drawGrid(container) {
    const grid = document.createElement('div');
    grid.className = 'grid';
    for(let i = 0; i < 6; i++) {
      for(let j = 0; j < 5; j++) {
        drawBox(grid, i, j);
      }
    }
    container.appendChild(grid);
  }
function registerkeyboard(){
    document.body.onkeydown = (e) =>{
        const key = e.key;
        if(key === 'Enter'){
        if(state.currentcol===5){
            const word = getCurrentWord();
            if(isValid(word)){
               revealWord(word);
               state.currentrow++;
               state.currentcol=0;
            }
            else{
                alert('Word not available');
            }
        }
        updategrid();
        }
        if(key==='Backspace'){
          removeLetter();
          updategrid();
        }
        if(isLetter(key))
        {
             addLetter(key);
             updategrid();
        }
    }
}
function getCurrentWord(){
    return state.grid[state.currentrow].reduce((prev , curr )=> prev + curr);
}
function isValid(word){
    return dict.includes(word);
}
function revealWord(guess){
     const row = state.currentrow;
     const anidelay = 500;
     for(let i=0;i<5;i++){
        const box = document.getElementById(`box${row}${i}`);
        const letter = box.textContent;
        setTimeout(()=>{
        if(letter === state.secret[i])
        {
            box.classList.add('right');
        }
        else if(state.secret.includes(letter)){
            box.classList.add('wrong');
        }
        else{
            box.classList.add('empty');
        }
        },((i+1)*anidelay)/2);
        
        box.classList.add('animated');
        box.style.animationDelay = `${(i*anidelay)/2}ms`;
     }
     const winner = state.secret===guess;
     const gameover = state.currentrow===5;
    setTimeout(()=>{ if(winner){
        alert('Congratulations!');
     }
     else if(gameover){
        alert(`Better luck next time! The word was ${state.secret}.`);
     }},3*anidelay);
    
}
function isLetter(key){
    return key.length===1 && key.match(/[a-z]/i); 
}
function addLetter(letter){
    if(state.currentcol===5){
        return;
    }
    state.grid[state.currentrow][state.currentcol] = letter;
    state.currentcol++;
}
function removeLetter(){
    if(state.currentcol===0){
        return;
    }
    state.grid[state.currentrow][state.currentcol-1] = '';
    state.currentcol--;
}
function startUp()
{
    const game = document.getElementById('game');
    drawGrid(game);
    registerkeyboard();
   
}
startUp();
/*const dict = ['video', 'audio', 'movie', 'crash', 'hater', 'crane', 'early', 'eager', 'apple'];

const state = {
  secret: dict[Math.floor(Math.random() * dict.length)],
  grid: Array(6).fill().map(() => Array(5).fill('')),
  currentRow: 0,
  currentCol: 0,
};

function updateGrid() {
  for (let i = 0; i < state.grid.length; i++) {
    for (let j = 0; j < state.grid[i].length; j++) {
      const box = document.getElementById(`box${i}${j}`);
      box.textContent = state.grid[i][j];
    }
  }
}

function drawBox(container, row, col, letters = '') {
  const box = document.createElement('div');
  box.className = 'box';
  box.textContent = letters;
  box.id = `box${row}${col}`;
  container.appendChild(box);
  return box;
}

function drawGrid(container) {
  const grid = document.createElement('div');
  grid.className = 'grid';
  for (let i = 0; i < 6; i++) {
    for (let j = 0; j < 5; j++) {
      drawBox(grid, i, j);
    }
  }
  container.appendChild(grid);
}

function registerKeyboard() {
  document.body.onkeydown = (e) => {
    const key = e.key;
    if (key === 'Enter') {
      if (state.currentCol === 5) {
        const word = getCurrentWord();
        if (isValid(word)) {
          revealWord(word);
          state.currentRow++;
          state.currentCol = 0;
        } else {
          alert('Word not available');
        }
      }
    }
    if (key === 'Backspace') {
      removeLetter();
      updateGrid(); 
    }
    if (isLetter(key)) {
      addLetter(key);
      updateGrid(); 
    }
  }
}

function getCurrentWord() {
  return state.grid[state.currentRow].reduce((prev, curr) => prev + curr);
}

function isValid(word) {
  return dict.includes(word);
}

function revealWord(guess) {
  const row = state.currentRow;
  for (let i = 0; i < 5; i++) {
    const box = document.getElementById(`box${row}${i}`);
    const letter = box.textContent;
    if (letter === state.secret[i]) {
      box.classList.add('right');
    } else if (state.secret.includes(letter)) {
      box.classList.add('wrong');
    } else {
      box.classList.add('empty');
    }
  }
  const winner = state.secret === guess;
  const gameOver = state.currentRow === 5;
  if (winner) {
    alert('Congratulations!');
  } else if (gameOver) {
    alert(`Good try, better luck next time. The word was ${state.secret}`);
  }
}

function isLetter(key) {
  return key.length === 1 && key.match(/[a-z]/i);
}

function addLetter(letter) {
  if (state.currentCol === 5) {
    return;
  }
  state.grid[state.currentRow][state.currentCol] = letter;
  state.currentCol++;
}

function removeLetter() {
  if (state.currentCol === 0) {
    return;
  }
  state.grid[state.currentRow][state.currentCol - 1] = '';
  state.currentCol--;
}

function startUp() {
  const game = document.getElementById('game').querySelector('.grid');
  drawGrid(game);
  registerKeyboard();
  console.log(state.secret);
}

startUp();*/

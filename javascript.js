let text = document.getElementById("player");
let resetbtn = document.getElementById("resetbtn");
let boxes = Array.from(document.getElementsByClassName("box"))

const O_TEXT = "O";
const X_TEXT = "X";
let currentplayer = X_TEXT;
let spaces = Array(9).fill(null);

const start = () => {
    boxes.forEach(box => box.addEventListener('click', boxclicked))
}

function boxclicked(e){
    let id = e.target.id;
    if (!spaces[id]) {
        spaces[id] = currentplayer
        e.target.innerText = currentplayer
        if(playerhaswon() !== false){
            boxes.forEach(box => box.removeEventListener('click', boxclicked))
            text.innerHTML = "'"+currentplayer+"'"+' has WON'
            resetbtn.innerHTML= 'New game'
            console.log('you won');
        }
        currentplayer = currentplayer == X_TEXT? O_TEXT : X_TEXT
    }
}

const winning_combos =[
    [0,1,2],[3,4,5],[6,7,8],[0,4,8],[2,4,6],[0,3,6],[1,4,7],[2,5,8]
]
function playerhaswon(){
    for (const condition of winning_combos) {
        let [a,b,c] = condition
        if (spaces[a] && (spaces[a] == spaces[b] && spaces[a] == spaces[c])) {
            return [a,b,b]
        }
    }return false
}

resetbtn.addEventListener('click', reset)

function reset(){
    spaces.fill(null)

    boxes.forEach(box => {
        box.innerText = ''
    })
    currentplayer=X_TEXT
    boxes.forEach(box => box.addEventListener('click', boxclicked))
    resetbtn.innerHTML= 'reset'
    text.innerHTML='Tic-Tac-Toe'
}

start();

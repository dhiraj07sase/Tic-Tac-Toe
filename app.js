let boxes=document.querySelectorAll(".box");
let resetBtn=document.querySelector("#reset-btn");
let newGameBtn=document.querySelector("#new-btn");
let msgContainer=document.querySelector(".msg-container");
let msg =document.querySelector("#msg");
let turnO=true; //playerX, playerY

const resetGame= ()=>{
    turnO=true;
    enableBoxes();
    msgContainer.classList.add("hide");
}

const winPatterns=[
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [1,4,7],
    [2,5,8],
    [2,4,6],
    [3,4,5],
    [6,7,8],

];
    //add event listner for box click
boxes.forEach((box)=>{
    box.addEventListener("click", ()=> {
        //console.log("box was clicked");
        
        //turn logic
        if(turnO) //player O turn
        {
            box.innerHTML="O";
            turnO=false;
        }
        else{   //player X turn 
            box.innerHTML="X";
            turnO=true;
        }
        box.disabled=true;


        chekeWinner();
    });
});

const disableBoxes= ()=>{
    for(let box of boxes)
    {
        box.disabled=true;
    }
}

const enableBoxes= ()=>{
    for(let box of boxes)
    {
        box.disabled=false;
        box.innerText="";
    }
}

    const showWinner= (winner)=>{
        msg.innerText=`Congratualation , Winner is ${winner}`;
        msgContainer.classList.remove("hide");
        disableBoxes();
    }

    const Drow = ()=>{
        msg.innerText=" Match Drow";
        msgContainer.classList.remove("hide");
        disableBoxes();
    }

const chekeWinner = () => {
    let filledBoxes = 0; // Counter for filled boxes
    let winnerFound = false;

    for (let pattern of winPatterns) {
        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;

        if (pos1Val !== "" && pos2Val !== "" && pos3Val !== "") {
            if (pos1Val === pos2Val && pos2Val === pos3Val) {
                showWinner(pos1Val);
                winnerFound = true;
                break; // If there's a winner, exit the loop
            }
        }
    }

    if (!winnerFound) {
        for (let box of boxes) {
            if (box.innerText !== "") {
                filledBoxes++;
            }
        }

        if (filledBoxes === 9) {
            // All boxes are filled
            Drow(); // Check for draw
        }
    }
};

newGameBtn.addEventListener("click",resetGame);
resetBtn.addEventListener("click",resetGame);




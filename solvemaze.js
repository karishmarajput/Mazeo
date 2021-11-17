let end = newMaze.grid[newMaze.rows - 1][newMaze.columns - 1];
let start = newMaze.grid[0][0];
let currCell;
let childCell;
let stacks = [];
let highlight = [];
let found = false;

function solveMaze(){
    for(let i = 0; i < newMaze.columns; i++){
        for(let j =0; j < newMaze.rows; j++){
            newMaze.grid[j][i].visited = false;
        }
    }
    current = newMaze.grid[0][0];
    traverse(current);
}
function traverse(current){   
    if(current == end){  
        for(let i = 0; i < stacks.length; i++){
            if(stacks[i] == start)
                continue;
            highlightCell(stacks[i]);
        }
        throw new Error("Path found");
    }
    if(!current.visited){    
        current.visited= true;
        let nextCell = checkNeighborsCell(current);
        if(nextCell){
            stacks.push(current);
            current = nextCell;
            traverse(current);
        }
        if(stacks.length > 0){
            if(nextCell){
                do{
                    current = stacks.pop();  
                    nextCell = checkNeighborsCell(current);             
                }while(!nextCell);
                stacks.push(current);
                traverse(nextCell);
            }       
        }
    
    }
}

function findNext(i, j){
    if(i < 0|| j< 0|| i> newMaze.columns-1 || j > newMaze.rows -1){
        return undefined;
    }
    return newMaze.grid[j][i];
}

function checkNeighborsCell(current){  
    let i = current.colNum ;
    let j = current.rowNum;
    let neighbors = [];
    let top = findNext(i,j-1);
    let right = findNext(i+1,j);
    let bottom = findNext(i,j+1);
    let left = findNext(i-1,j);

    if(top && !top.visited && !current.walls.topWall){
        neighbors.push(top);
    }
    if(right && !right.visited && !current.walls.rightWall){
        neighbors.push(right);
    }
    if(bottom && !bottom.visited && !current.walls.bottomWall){
        neighbors.push(bottom);
    }
    if(left && !left.visited && !current.walls.leftWall){
        neighbors.push(left);
    }
    if(neighbors.length > 0){
        let r = Math.floor(Math.random(0,neighbors.length));
        return neighbors[r];
    }else{
        return undefined;
    }
}

function highlightCell(current) {
    let x = (current.colNum * current.parentSize) /newMaze.columns + 1;
    let y = (current.rowNum * current.parentSize) / newMaze.columns + 1;
    ctx.fillStyle = "blue";
    ctx.fillRect(
      x,
      y,
      current.parentSize / newMaze.columns - 3,
      current.parentSize / newMaze.columns - 3
    );
}

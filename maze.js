function Getcell(row , col){

    for(var i = 0 ; i < cells.length ; i++){

        if(cells[i].row === row && cells[i].col === col){

            return cells[i]
        }
    }
}

function GetNeighbor(row , col){

    var neighbors = []

    for(var i = - 1 ; i < 3 ; i++){

        for(var j = - 1 ; j < 3 ; j++){

            if((i === -1 && j === 0) || (i === 0 && j === -1) || (i === 0 && j === 1) || (i === 1 && j === 0)){

                if(Getcell(row + i , col + j) && !Getcell(row + i , col + j).visited){

                    neighbors.push(Getcell(row + i , col + j))
                }
            }
        }
    }

    return neighbors[Math.floor(Math.random() * neighbors.length)]
}

function removeWalls(current , next){

    if(current.row === next.row  && current.col === next.col - 1){

        current.right = false 
        next.left = false

    }

    if(current.row === next.row  && current.col === next.col + 1){

        current.left = false 
        next.right = false 

    }

    if(current.col === next.col  && current.row === next.row + 1){

        current.top = false
        next.bottom = false 
    }

    if(current.col === next.col && current.row === next.row - 1){

        current.bottom = false 
        next.top = false
       
    }

}

function CreateMaze(){

    if(!currentcell){

        currentcell = cells[Math.floor(Math.random() * cells.length)]
        currentcell.color = "white"
        currentcell.visited = true
        stack.push(currentcell)

    }

    do{

        var nextcell = GetNeighbor(currentcell.row , currentcell.col)

        if(nextcell){

            removeWalls(currentcell , nextcell)
            nextcell.visited = true 
            stack.push(nextcell)
            currentcell = nextcell
            currentcell.color = "white"
            
        
        }else{

        
            if(stack.length > 0){

                currentcell = stack.pop()
                currentcell.color = "white"
                
            }else{

                currentcell = undefined
                cells.forEach(cell => { cell.visited = false })
             
            }
        }


    }while(currentcell)

    renderContent()

    solve()
  
}


//////////////// solving maze
function solve(){

    var start = Getcell(0,0);
    var end = Getcell(rows - 1 , cols-1)
    var current = start
    current.visited  = true
    path.push(current)

    function solvemaze(){

        //if maze solved
        if(current === end){

            path.push(end)
            renderContent()
            console.log("maze solved")
            return
        }

        renderContent()

        var next = Getpossibilites(current.row , current.col)

        if(next){

            next.visited = true 
            path.push(next)
            current = next

        }else{

            if(path.length > 0){

                path.pop()
                current = path[path.length - 1]
            }
        }

        requestAnimationFrame(solvemaze)
    }

    solvemaze()
}

function Getpossibilites(row , col){

    var possiblecells = []

    if(Getcell(row - 1 , col)){

        if(!Getcell(row - 1 , col).visited && !Getcell(row - 1 , col).bottom){

            possiblecells.push(Getcell(row - 1 , col))
        }
    }

    if(Getcell(row + 1 , col)){

        if(!Getcell(row + 1 , col).visited && !Getcell(row + 1 , col).top){

            possiblecells.push(Getcell(row + 1 , col))
        }
    }

    if(Getcell(row , col + 1)){

        if(!Getcell(row , col + 1).visited && !Getcell(row , col + 1).left){

            possiblecells.push(Getcell(row , col + 1))
        }
    }

    if(Getcell(row , col - 1)){

        if(!Getcell(row , col - 1).visited && !Getcell(row , col - 1).right){

            possiblecells.push(Getcell(row , col - 1))
        }
    }

    return possiblecells[Math.floor(Math.random() * possiblecells.length)]
}



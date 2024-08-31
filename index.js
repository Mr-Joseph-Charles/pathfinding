var canvas = document.querySelector("canvas");
var c = canvas.getContext("2d")

canvas.width = innerWidth * devicePixelRatio 
canvas.height = innerHeight * devicePixelRatio 

var cols = 150
var size = canvas.width / cols
var rows = Math.floor(canvas.height / size) - 1
var cells = []
var stack = []
var path = []
var currentcell = undefined

CreateCells()
CreateMaze()

function CreateCells(){

    for(var i = 0 ; i < rows ; i++){

        for(var j = 0 ; j < cols ; j++){

            cells.push(new Cell(j * size , i * size , size , i , j))
        }
    }
}


function renderContent(){

    c.clearRect(0 , 0 , canvas.width , canvas.height)
       
        cells.forEach(cell => {

            if(cell.visited){

                c.beginPath()
                c.fillStyle = "rgba(128,0,128,.5)"
                c.rect(cell.x , cell.y , size , size)
                c.fill()
                c.closePath()

            }

            cell.draw()
        
        })

        if(path.length > 0){

            c.save()
            c.beginPath()
            c.strokeStyle = "lime"
            c.lineWidth = size/5
            c.moveTo(path[0].x + size/2 , path[0].y + size/2)

            for(var i = 0 ; i < path.length  ; i++){

                c.lineTo(path[i].x + size/2 , path[i].y + size/2)
             
            
            }

            c.stroke()
            c.closePath()
            c.restore()
        }    

}

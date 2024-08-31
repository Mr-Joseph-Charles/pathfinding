class Cell{

    constructor(x , y , size , row , col){

        this.x = x 
        this.y = y 
        this.size = size 
        this.row = row 
        this.col = col
        this.color = "black"
        this.visited = false
        this.top = true
        this.right = true
        this.bottom = true
        this.left = true
    }

    draw(){

        if(this.top){

            c.beginPath()
            c.strokeStyle = this.color
            c.moveTo(this.x , this.y)
            c.lineTo(this.x + this.size , this.y)
            c.stroke()
            c.closePath()

        }

        if(this.right){

            c.beginPath()
            c.strokeStyle = this.color
            c.moveTo(this.x + this.size, this.y)
            c.lineTo(this.x + this.size , this.y + this.size)
            c.stroke()
            c.closePath()

        }

        if(this.bottom){

            c.beginPath()
            c.strokeStyle = this.color
            c.moveTo(this.x + this.size, this.y + this.size)
            c.lineTo(this.x , this.y + this.size)
            c.stroke()
            c.closePath()

        }

        if(this.left){

            c.beginPath()
            c.strokeStyle = this.color
            c.moveTo(this.x , this.y + this.size)
            c.lineTo(this.x , this.y)
            c.stroke()
            c.closePath()

        }
      
    }
}
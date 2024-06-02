class Worm {
    constructor(x, y, vx, vy, length, width, canvas, ctx) {
        this.canvas = canvas;
        this.ctx = ctx;

        this.length = length;
        this.width = width;

        this.x = Array(length);
        this.y = Array(length);
        this.x[0] = x;
        this.y[0] = y;

        for (let i=1; i<length; i++) {
            this.x[i] = Math.cos(i/length * 4 * Math.PI) * canvas.width/4 + x;
            this.y[i] = Math.sin(i/length * 4 * Math.PI) * canvas.height/4 + y;
            //console.log(this.x[i], this.y[i]);
        }

        this.vx = vx;
        this.vy = vy;
    }

    draw(showvel) {
        for (let i=0; i< this.length; i++) {
            this.ctx.fillRect(Math.floor(this.x[i]) - this.width/2, Math.floor(this.y[i]) - 1, this.width, this.width);
            //this.ctx.fillRect(this.x[i] - this.width/2, this.y[i] - this.width/2, this.width, this.width);
            if (showvel){
                this.ctx.fillRect(this.x[0] + this.vx * 100 - this.width/2, this.y[0] + this.vy * 100 - this.width/2, this.width, this.width);
            }
        }
    }

    update(cx, cy) {
        this.x[0] += this.vx;
        this.y[0] += this.vy;
        
        //Update Body Segments
        for (let i=1; i < this.length; i++) {
            const magn = Math.sqrt(Math.pow(this.x[i-1]-this.x[i], 2) + Math.pow(this.y[i-1]-this.y[i], 2))
            this.x[i] = ((this.x[i]-this.x[i-1])/magn) * this.width + this.x[i-1]
            this.y[i] = ((this.y[i]-this.y[i-1])/magn) * this.width + this.y[i-1]
        }

        //Boundary Avoidance
        this.vx += Math.pow(this.x[0], -1.4) - Math.pow(this.canvas.width - this.x[0], -1.4)
        this.vy += Math.pow(this.y[0], -1.4) - Math.pow(this.canvas.height - this.y[0], -1.4)

        //Random Walk Behavior
        this.vx += (Math.random() - 0.5)/8
        this.vy += (Math.random() - 0.5)/8

        //Slow factor
        this.vx /= Math.pow(this.vx, 6)/10 + 1
        this.vy /= Math.pow(this.vy, 6)/10 + 1

        //Chase
        if (cx && cy) {
            this.vx += (cx - this.x[0])/(Math.abs(cx - this.x[0])*1000) * Math.log(Math.abs(cx - this.x[0]));
            this.vy += (cy - this.y[0])/(Math.abs(cy - this.y[0])*1000) * Math.log(Math.abs(cy - this.y[0]));
        }
    }
}
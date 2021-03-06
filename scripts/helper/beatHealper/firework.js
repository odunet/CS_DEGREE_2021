function Firework(color, x, y) {

    var color = color;
    var x = x;
    var y = y;

    var particles = [];

    //End firework
    this.depleted = false;

    for (var i = 0; i < 360; (i += 18)) {
        particles.push(new Particle(x, y, color, i, 10))
    }

    this.draw = function() {
        for (var i = 0; i < particles.length; i++) {
            particles[i].draw();
        }
        if (particles[0].speed <= 0) {
            this.depleted = true;
        } 
    }
}
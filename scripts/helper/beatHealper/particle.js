function Particle(x, y, color, angle, speed) {
    var x = x;
    var y = y;
    var color = color;
    var angle = angle;

    this.speed = speed;

    this.draw = function() {
        update();
        fill(color);
        ellipse(x, y, 10, 10);
    }

    function update() {
        this.speed -= 0.8;
        //TODO update x and y
        x += cos(angle) * speed;
        y += sin(angle) * speed;
    }
}
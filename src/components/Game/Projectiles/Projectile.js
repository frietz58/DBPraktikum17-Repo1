import GameObject from '../GameObject';

export default function Projectile(x, y, direction) {

    GameObject.call(this, x, y);

    this.update = () => {
        if (Math.sqrt(Math.pow(this.x - this.startx, 2) + Math.pow(this.y - this.starty, 2)) <= this.distance) {
            this.check();
            this.move();
        } else {
            this.emit('destroy');
            this.destruct();
        }
    };

    this.handleCollision = (object, collision) => {
        switch (object.type) {
            case 'Wall':
                this.destruct();
                object.takeDamage(this.damage);
                break;
            case 'Character':
                if (object.id !== this.owner) {
                    this.destruct();
                    object.takeDamage(this.damage);
                }
                break;
            case 'Cow':
                this.destruct();
                object.takeDamage(this.damage);
                break;
        }
    };

    this.owner = null;
    this.type = 'Projectile';
    this.startx = x;
    this.starty = y;
    this.distance = 100;
    this.damage = 5;
    this.direction = direction;
}
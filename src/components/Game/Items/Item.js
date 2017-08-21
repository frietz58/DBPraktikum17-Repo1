import GameObject from '../GameObject';

export default function Item(x, y) {

    GameObject.call(this, x, y);

    this.update = () => {
        this.check();
    };

    this.handleCollision = (object, collision) => {
        switch (object.type) {
            case 'Cow':
                this.destruct();
                break;
        }
    };

    this.type = 'Item';
    this.startx = x;
    this.starty = y;
}

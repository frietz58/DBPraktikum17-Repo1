import PlayerGuy from './PlayerGuy';
import Wall from './Wall';

var gameStage = null;

function GameStage() {

    this.construct = () => {
        this.stage = new window.createjs.Stage('game-field');
    };

    this.initialize = () => {
        this.activeObject = new PlayerGuy(10, 10);
        new Wall(200, 0);

        // var query = DB.Opponent.find().notEqual('id', '/db/Opponent/' + this.activeObject.id);
        // query.resultStream(result => console.log(result), err => console.log(err), console.log('offline'));
    };

    this.update = () => {
        this.gameObjects.forEach((gameObject) => {
            gameObject.update();
        });
        this.stage.update();
    };

    this.add = (object) => {
        this.gameObjects.push(object);
        this.stage.addChild(object.sprite);
    };

    this.remove = (object) => {
        this.stage.removeChild(object.sprite);
        this.gameObjects = this.gameObjects.filter((gameObject) => {
            return gameObject.id !== object.id; });
        // TODO: think about
        // delete this.networkObjects[this.id];
        // delete this;
    };

    this.link = (object, id) => {
        this.add(object);
        this.networkObjects[id] = object;
    };

    this.unlink = (id) => {
        this.stage.removeChild(this.networkObjects[id]);
        this.gameObjects = this.gameObjects.filter((object) => { return object.id !== id; });
        // TODO: think about
        // delete this.networkObjects[id];
    };

    this.near = (object) => {
        // TODO: implement near
        return this.gameObjects.filter((gameObject) => { return gameObject.id !== object.id });
    };

    this.keyPressed = (event) => {
        if (this.activeKeys.lastIndexOf(event.keyCode) === -1) {
            this.activeKeys.push(event.keyCode);
        }
        this.activeObject.handleEvent();
    };

    this.keyReleased = (event) => {
        this.activeKeys = this.activeKeys.filter((keyCode) => {
            return keyCode !== event.keyCode;
        });
        this.activeObject.handleEvent();
    };

    this.stage = null;
    this.gameObjects = [];
    this.activeObject = null;
    this.networkObjects = [];
    this.activeKeys = [];

    this.construct();
}

export default function getStage() {
    if (gameStage === null) {
        gameStage = new GameStage();
    }
    return gameStage;
}
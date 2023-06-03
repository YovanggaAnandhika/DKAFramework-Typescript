import Five, {Board, Led, Relay, Switch, Sensor, Servo, Sonar, Stepper, Pin, Button} from "johnny-five";


export interface ArduinoReturnPromise {
    Board : Board
    IO : typeof Five
};
import { SeatEnum } from "./seatType";

export class Seat{

    constructor(public seatNumber:number,public seatStatus:SeatEnum){
        this.seatNumber=seatNumber;
        this.seatStatus=seatStatus;
    }
}
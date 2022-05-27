import { Screening } from "./screening";

export class Reservation{
    constructor(public screening:Screening,public firstName:string,public middleName:string,public lastName:string,public seatNumbers:Array<number>,public user:string){}
}
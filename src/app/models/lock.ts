import { Screening } from "./screening";

export class Lock{
    constructor(public screening:Screening,public user: string,public seatNumber: number){}
}
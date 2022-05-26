import { Screening } from "./screening";

export class MovieScreenings{
    constructor(public movie :string,public screenings : Array<Screening>){}
}
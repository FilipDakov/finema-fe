import { Actor } from "./actor";

export class Movie{
    constructor( public actors : Array<Actor>, public ageRestriction : string, public description:string,public genres : Array<String> ,public imgPath:string, public name: string,public releaseDate : Date, public timespan: number ){}
}
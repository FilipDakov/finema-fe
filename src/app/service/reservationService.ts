import { Injectable } from "@angular/core";
import { Screening } from "../models/screening";

@Injectable()
export class ReservationService{
    private firstName:string;
    private secondName:string;
    private lastName:string;
    private screening: Screening;
    private selectedSeats: Array<number>=[];

    getSelectedSeats() :  Array<number>{
        return this.selectedSeats;
    }
    
    setSelectedSeats(seats : Array<number>){
        this.selectedSeats =seats;
    }

     getScreening() : Screening{
        return this.screening;
    }

     setScreening(screening:Screening){
        this.screening = screening;
    }

    getFirstName(){
        return this.firstName;
    }

    setFirstName(firstName:string){
        this.firstName=firstName;
    }

    getSecondName(){
        return this.secondName;
    }

    setSecondName(secondName:string){
        this.secondName=secondName;
    }

    getLastName(){
        return this.lastName;
    }

    setLastName(lastName:string){
        this.lastName=lastName;
    }

}
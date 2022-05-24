import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { User } from './user';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;

    constructor(private http: HttpClient,@Inject('BACKEND_URL') private backendUrl: string) {
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('user')));
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): User {
        return this.currentUserSubject.value;
    }

    login(email: string, password: string) {
        return this.http.post<any>(`${this.backendUrl}/logIn`, { email, password })
        .pipe(map(user => {
           //    store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem('user', JSON.stringify(user));
            this.currentUserSubject.next(user);
            console.log(this.currentUserValue.admin);
            return user;
        }));
    }
    signup(email:string,password:string){
        return this.http.post<any>(`${this.backendUrl}/signUp`, { email, password })
        .pipe(map(user => {
           //    store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem('user', JSON.stringify(user));
            this.currentUserSubject.next(user);
            return user;
        }));
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('user');
        this.currentUserSubject.next(null);
    }

    isLogedIn():boolean{
        return this.currentUserValue && this.currentUserValue.token != undefined;
    }

    isAdmin():boolean{
        return this.currentUserValue.admin;
    }
}
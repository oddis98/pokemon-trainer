import { Injectable } from "@angular/core";
import { User } from "../models/user.model";

@Injectable({
    providedIn: 'root',
})
export class SessionService{
    private _user: User | undefined;
    private _pokemon: any = [];

    constructor() {
        const storedUser = localStorage.getItem('user')
        if(storedUser) {
            this._user = JSON.parse(storedUser)
        }
    }
    getUser(): User | undefined{
        return this._user;
    }

    setUser(user: User):void {
        this._user = user;
        localStorage.setItem('user', JSON.stringify(user))
    }

    getPokemon(){
        return JSON.parse(localStorage.getItem('pokemon') || "{}")
    }

    setPokemon(pokemon: any): void {
        this._pokemon = pokemon
        localStorage.setItem('pokemon', JSON.stringify(pokemon))
    }

    logout() {
        this._user = undefined
        localStorage.removeItem('user')
    }
}
 

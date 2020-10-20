import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs';
import { map } from "rxjs/operators";
import { Player } from '../interfaces/player';

export const PlayerSettings = [
  "Name",
  "Last Name",
  "Position",
  "Weight",
  "Height",
  "Nationality",
  "Left Footed",
  "Action"
]
@Injectable({
  providedIn: 'root'
})
export class PlayerService {
private playersDb: AngularFireList<Player>
  constructor(private db: AngularFireDatabase) {
    this.playersDb = this.db.list('/players',query=>query.orderByChild('name'));
   }


   getPlayers$():Observable<Player[]>{
     return this.playersDb.snapshotChanges().pipe(
       map(changes => {
         return changes.map(c=> ({$key:c.payload.key, ...c.payload.val()}))
       })
     )
   }

   addPlayer$(player:Player){
     return this.playersDb.push(player);
   }

   editPlayer(newPlayer){
      const $key = newPlayer.$key;
      delete(newPlayer.$key);
      this.db.list('/players').update($key,newPlayer);
   }


   removePlayer(id:string){
     this.db.list('/players').remove(id);
   }
}

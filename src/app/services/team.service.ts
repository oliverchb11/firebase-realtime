import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Injectable } from '@angular/core';
import { Team } from '../interfaces/team';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

export const TeamsTableHeaders = ["Name","Country","Players"]
@Injectable({
  providedIn: 'root'
})
export class TeamService {
  private teamDb : AngularFireList<Team>
  constructor(private db: AngularFireDatabase) {
    this.teamDb = this.db.list('/teams',query=>query.orderByChild('name'));
   }



   getTeams$():Observable<Team[]>{
    return this.teamDb.snapshotChanges().pipe(
      map(changes => {
        return changes.map(c=> ({$key:c.payload.key, ...c.payload.val()}))
      })
    )
  }
  addTeam$(team:Team){
    return this.teamDb.push(team);
  }


  editTeam(newTeam){
    const $key = newTeam.$key;
    delete(newTeam.$key);
    this.db.list('/Teams').update($key,newTeam);
 }

  removeTeam(id:string){
    this.db.list('/teams').remove(id);
  }
}

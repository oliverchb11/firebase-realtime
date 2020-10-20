import { Component, OnInit } from '@angular/core';
import { Countries, SquadNumber } from '../../interfaces/player';
import { PlayerService } from '../../services/player.service';
import { Team } from '../../interfaces/team';
import { take } from 'rxjs/operators';
import { TeamService } from '../../services/team.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-player-modal',
  templateUrl: './player-modal.component.html',
  styleUrls: ['./player-modal.component.scss']
})
export class PlayerModalComponent implements OnInit {
  public formulario:FormGroup;
  private team:Team;
public countries= Object.keys(Countries).map(key=> ({label:key,key:Countries[key]}));
public squadNumbers= Object.keys(SquadNumber).slice(Object.keys(SquadNumber).length/2);
  constructor(private playerService:PlayerService,private teamService : TeamService,private fb : FormBuilder) { }

  ngOnInit(): void {
    this.getTeams()
    this.formulario = this.fb.group({
  name:['',Validators.required],
  lastName:['',Validators.required],
  position:['',Validators.required],
  weight:['',Validators.required],
  height:['',Validators.required],
  nationality:['',Validators.required],
  leftFooted:['',Validators.required],
  action:['',Validators.required],

    })
  }

  getTeams(){
    this.teamService.getTeams$().pipe(take(1)).subscribe(teams=>{
      if(teams.length === 0){
        this.team = {
          name:'MyAmazingTeam',
          country: Countries.Colombia,
          players:null
        }
      
      }
    })
  }

  addPlayer(newPlayerValue){
   const key = this.playerService.addPlayer$(newPlayerValue).key;
   const playerFormValueKey = {
     ...newPlayerValue,
     key
   }
   const formatedteam = {
    ...this.team,
    players:[...(this.team.players ? this.team.players : []),playerFormValueKey]
   }
   this.teamService.addTeam$(formatedteam);
  }

  createPlayer(form){
    let playerFormvalue = {...form};
    playerFormvalue.leftFooted = playerFormvalue.leftFooted === '' ? false : playerFormvalue.leftFooted;
    console.log(playerFormvalue);
    this.addPlayer(playerFormvalue);
    window.location.replace('#')
  }

}

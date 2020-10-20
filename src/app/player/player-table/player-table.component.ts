import { Component, OnInit } from '@angular/core';
import { PlayerService, PlayerSettings } from '../../services/player.service';
import { Observable } from 'rxjs';
import { Player } from '../../interfaces/player';

@Component({
  selector: 'app-player-table',
  templateUrl: './player-table.component.html',
  styleUrls: ['./player-table.component.scss']
})
export class PlayerTableComponent implements OnInit {
  public players$ :Observable<Player[]>
  public tablePlayers = PlayerSettings;
  public showModal = false
  constructor(private playerService:PlayerService) { }

  ngOnInit(): void {
    this.getPlayersComp()
  }


  getPlayersComp(){
    this.players$ = this.playerService.getPlayers$();
  }

  newPlayer(){
    this.showModal = true;
    setTimeout(() => {
      window.location.replace('#open-modal')
    }, 0);
  }

  deletePlayer(id){
    console.log(id);
    this.playerService.removePlayer(id);
  }
}

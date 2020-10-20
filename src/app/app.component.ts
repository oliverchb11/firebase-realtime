import { Component } from '@angular/core';
import { PlayerService } from './services/player.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'typescript-platzi';
  hola = 45
  constructor(private playerService:PlayerService){
    this.playerService.getPlayers$().subscribe(players=>{
      console.log(players);
    
    })
  }
}

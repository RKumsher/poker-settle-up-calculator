import { Component, OnInit } from '@angular/core';
import { Player } from '../player';
import { PLAYERS } from '../mock-players';
import * as _ from 'lodash';

@Component({
  selector: 'app-players',
  templateUrl: './players.component.html',
  styleUrls: ['./players.component.css']
})
export class PlayersComponent implements OnInit {

//   players = PLAYERS;
 players: Player[] = [];

  model: Player = { profit: null, name: null };

  results: String;

  selectedPlayer: Player;

  constructor() { }

  ngOnInit() { }

  onSelect(player: Player): void {
    this.selectedPlayer = player;
  }

  onSubmit(): void {
    this.players.push(this.model);
    this.model = { profit: null, name: null };
    console.log(document);
  }

  calculate(): void {
    var players = _.cloneDeep(this.players);
    players.forEach(player => player.profit = Math.round(player.profit * 100));
    var playersWhoWon = players.filter(player => player.profit > 0).sort((n1,n2) => n2.profit - n1.profit);
    var playersWhoLost = players.filter(player => player.profit < 0).sort((n1,n2) => n1.profit - n2.profit);
    var results = "";

    playersWhoWon.forEach(function (player) { console.log(player); });
    playersWhoLost.forEach(function (player) { console.log(player); });

    playersWhoLost.forEach(function (player) {
      while (player.profit != 0) {
        var playerWhoWon = playersWhoWon[0];
        if (playerWhoWon === undefined) {
          results = "Math doesn't add up correctly";
          break;
        }
        if (player.profit + playerWhoWon.profit <= 0) {
          var loss = playerWhoWon.profit;
          player.profit = Math.round((player.profit * 100 + loss * 100) / 100);
          playerWhoWon.profit = 0;
          playersWhoWon.splice(0, 1);
        } else {
          var loss = player.profit;
          playerWhoWon.profit = Math.round((playerWhoWon.profit * 100 + loss * 100) / 100);
          player.profit = 0;
        }
        results += player.name + " pays " + playerWhoWon.name + " $" + Math.abs(loss / 100).toFixed(2) + "\n";
      }
    });

    if (playersWhoLost.some(player => player.profit != 0) || playersWhoWon.length > 0) {
      results = "Math doesn't add up correctly";
    }

    this.results = results;
  }
}


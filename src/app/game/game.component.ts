import { Component, OnInit } from '@angular/core';
import { Game } from 'src/models/game';
import { MatDialog, } from '@angular/material/dialog';
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActivatedRoute, Router } from '@angular/router';
import { EditPlayerComponent } from '../edit-player/edit-player.component';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {

  game: Game;
  gameId: string;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private firestore: AngularFirestore,
    public dialog: MatDialog) { }

  ngOnInit(): void {
    this.newGame();
/**
 * gets id from URL and loads from firestore
 */
    this.route.params.subscribe((params) => {
      this.gameId = params['id'];
      this.firestore.collection('games').doc(params['id']).valueChanges().subscribe((game: any) => {
        this.game.currentPlayer = game.currentPlayer;
        this.game.stack = game.stack;
        this.game.players = game.players;
        this.game.playedCards = game.playedCards;
        this.game.pickCardAnimation = game.pickCardAnimation;
        this.game.currentCard = game.currentCard;
      });
    });
  }


  newGame() {
    this.game = new Game();
  }


  takeCard() {
    if (this.game.stack.length == 0) {
      this.router.navigateByUrl('');
    }
    if (!this.game.pickCardAnimation && this.game.players.length > 1) {
      this.takeValidCard();
    };
    if (this.game.players.length < 2) {
      this.openDialog();
    }
  };


  takeValidCard() {
    this.game.currentCard = this.game.stack.pop();
    this.game.pickCardAnimation = true;
    this.game.currentPlayer++;
    this.game.currentPlayer = this.game.currentPlayer % this.game.players.length;
    this.saveGame();
    setTimeout(() => {
      this.game.playedCards.push(this.game.currentCard);
      this.game.pickCardAnimation = false;
      this.saveGame();
    }, 1000);
  }


  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddPlayerComponent);
    dialogRef.afterClosed().subscribe((form: object) => {
      this.game.players.push(form);
      this.saveGame();
    });
  }

  saveGame() {
    this.firestore
      .collection('games')
      .doc(this.gameId).update(this.game.toJson());
  }

  editPlayer(playerId: number) { 
    const dialogRef = this.dialog.open(EditPlayerComponent);
    dialogRef.afterClosed().subscribe((form: object) => {
      this.game.players[playerId]['name'] = form['name'];
      this.game.players[playerId]['profile']= form['profile'];
      this.saveGame();
    });
  }
}


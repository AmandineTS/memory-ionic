import { SettingsService } from './../services/settings.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  //1: Déclaration de mes variables
  cardDeck = [];
  numberOfCards = 6;
  cardColumnSize = 4;

  //..temps d'affichage d'une carte
  timeToHide = 1000;

  //..Définition de la valeur booléenne des cartes
  isCardDisplayed = false;

  //..définition de la carte précédente
  previousCard = null;

  //..comptage des paires
  foundPairs = 0;

  //9: Créattion de la fonction settingsService 
  constructor(private settingsService : SettingsService) {
    //3: Initialisation du jeu dans mon constructor
    this.generateDeck();
    this.shuffleCards();
  }

  //10: Création de la fonction pour prendre en compte mes nouveaux paramétres
  ionViewDidEnter(){
   this.numberOfCards = this.settingsService.settings.numberOfCards;
   this.timeToHide = this.settingsService.settings.delay;
   this.cardColumnSize = this.settingsService.getColumnSize();
   //..initialisation du jeu
   this.generateDeck();
   this.shuffleCards();
  }

  /**
   * Génère une liste de paires de cartes
   */
  //2: Création de la fonction boucle sur les cartes
  generateDeck(){
    //11: Efface les carte précédente après le changement de paramétre
    this.cardDeck = []
    //2..Création de ma boucle
    for(let i=0; i< this.numberOfCards; i++){
      //..Création de ma carte
    this.cardDeck.push({image: i + '.png', revealed: false});
    this.cardDeck.push({image: i + '.png', revealed: false});
    }
    console.log(this.cardDeck);
    }

    //4: Fonction de mélange de carte
    shuffleCards(){
      //..boucle sur l'ensemble des cartes (for in boucle sur les index et non sur les valeurs)
      for(let pos in this.cardDeck){
        //..enregistrement de la carte en cours
        let currentCard = this.cardDeck[pos];
        //..position aléatoire au sein du jeu de carte
        let randomPos = Math.floor(Math.random() * this.cardDeck.length);
        //..permutation 
        this.cardDeck[pos] = this.cardDeck[randomPos];
        this.cardDeck[randomPos] = currentCard;

      }
      console.log(this.cardDeck);
    }

    //5: Création de ma fonction pour affichage de la carte lors d'un clic
    pickCard(card) {
      //..une seule carte affichée en même temps
      if(!this.isCardDisplayed) {
        //..affichage de la carte
        card.revealed = true;
        this.isCardDisplayed = true;


        //7: Comparaison de la carte(on a cliqué) avec la carte précédente
        if(this.previousCard && this.previousCard.image === card.image) {
          this.previousCard.revealed = true;
          this.isCardDisplayed = false;
          //..j'agrémente de 1
          this.foundPairs++;
        } else {
          //6: Masquage de la carte au bout d'un certain délai
        setTimeout(() => { 
          card.revealed = false; 
          this.isCardDisplayed = false;
          //..la carte précédente = à la carte
          this.previousCard = card;
          
        }, this.timeToHide);
        }
        
      }   
    }

    //8: création d'une fonction pour réinitialiser le jeu
    playAgain() {
      //..trouver les paires =0
      this.foundPairs = 0;
      //..la carte précédente est nulle
      this.previousCard = null;
      //.. mélange les cartes
      this.shuffleCards();
      //..remasque toutes les cartes. map agit sur l'élément array (tableau) en le modifiant.
      this.cardDeck.map(
        (currentCard) => {currentCard.revealed = false; }
      );
    }

  }



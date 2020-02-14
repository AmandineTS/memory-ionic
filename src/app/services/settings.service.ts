import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  //1: Création de mes variables que je lie à setting.page
  settings = {
    numberOfCards: 6,
    delay: 1000,
    colNumber: 3
  }

  constructor() { }

  //2: Création de la fonction pour le calcul de la taille des colonnes
  getColumnSize() {
    return 12/this.settings.colNumber;
  }
}

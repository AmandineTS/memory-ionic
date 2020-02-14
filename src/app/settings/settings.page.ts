import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../services/settings.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

  //1: settings service contient mon tableau de paramétre par défaut(settings.service.ts)
  constructor(public settingsService : SettingsService) { }

  ngOnInit() {
  }

}

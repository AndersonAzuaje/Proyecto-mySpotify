import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NavParams, IonicModule, ModalController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-songs-modal',
  templateUrl: './songs-modal.page.html',
  styleUrls: ['./songs-modal.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SongsModalPage implements OnInit {

  songs: any;

  constructor(
    private navParams: NavParams,
    private modalCtrl: ModalController,
    private router: Router
  ) {}

  ngOnInit() {
    this.songs = this.navParams.data['songs'];
    console.log("recibi: ", this.songs);
  }

  closeAndGoHome() {
    this.modalCtrl.dismiss().then(() => {
      this.router.navigate(['/menu/home']);
    });
  }

}

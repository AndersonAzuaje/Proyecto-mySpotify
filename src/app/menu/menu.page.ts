import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/services/storage.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule]
})
export class MenuPage implements OnInit {

  constructor(private router: Router, private storageService: StorageService, private authService: AuthService) { }

  ngOnInit() {
  }
  goToIntro(){
    console.log("intro")
    this.router.navigateByUrl("/intro");
  }
  goToLogin() {
    console.log("ir al login");

    this.authService.logoutUser().then(() => {
    this.router.navigateByUrl("/login");
    });
}
  

}

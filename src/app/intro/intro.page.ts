import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/services/storage.service';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { image } from 'ionicons/icons';

@Component({
  selector: 'app-intro',
  templateUrl: './intro.page.html',
  styleUrls: ['./intro.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class IntroPage implements OnInit {

  genres = [
    {
      title: "Bienvenido a mySpotify",
      image: "https://image-cdn-ak.spotifycdn.com/image/ab67706c0000da84ef676544f8a671720d8994bd",
      description: "Descubre música personalizada según tus géneros favoritos."
    },
      {
      title: "Explora géneros",
      image: "https://fotografias.lasexta.com/clipping/cmsimages02/2023/12/15/87826775-B2EF-43DD-AA08-3FB8BBC44D5C/listado-generos-musicales_98.jpg?crop=1300,731,x0,y7&width=1900&height=1069&optimize=high&format=webply",
      description: "Desde salsa y champeta hasta vallenato y más."
    },
     {
      title: "Modo claro y oscuros",
      image: "https://www.ailonwebs.com/blog/diseno-paginas-web/modo-oscuro-y-modo-claro/modo-oscuro-y-modo-claro.png",
      description: "Puedes cambiar el tema visual cuando quieras."
    },
    {
      title: "¡Todo listo!",
      image: "https://todo-listo.app/logo/logoicon-empty.svg",
      description: "Haz clic para empezar",
      showButton: true
    }
  ]

  constructor(private router: Router, private storageService: StorageService) { }

  ngOnInit() {
  }

 async goBack() {
    console.log("Volver a home desde intro");
    await this.storageService.set('intro-visto', true);
    this.router.navigateByUrl("/menu/home");
  }

}

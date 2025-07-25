import { Component, OnInit } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonButton } from '@ionic/angular/standalone';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StorageService } from '../services/storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, CommonModule, IonButton],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HomePage implements OnInit {
  colorClaro = '#ffffff';
  colorOscuro = '#1e1e1e';
  textoClaro = '#000000';
  textoOscuro = '#ffffff';

  colorTema = this.colorOscuro;

  genres = [
    {
      title: "Vallenato",
      image: "https://panoramacultural.com.co/media/images/articulos/2023/10/22034023.jpg",
      description: "El vallenato es un género musical originario de la región Caribe de Colombia, específicamente de la antigua provincia de Padilla, que ahora abarca los departamentos de Magdalena, Cesar y La Guajira. Se caracteriza por el uso del acordeón, la caja (tambor) y la guacharaca, y por sus cuatro aires principales: paseo, son, merengue y puya"
    },
    {
      title: "Cumbia",
      image: "https://cdn.pixabay.com/photo/2021/08/27/02/56/dance-6577593_1280.png",
      description: "La cumbia es un baile de Colombia, país suramericano, que se originó en la Costa Caribe de estas tierras en los tiempos de la colonia. Esta danza es la fusión de tres culturas; la africana, la indígena y la española que se combinaron para convertirse en la expresión coreográfica y musical más representativa."
    },
    {
      title: "Salsa",
      image: "https://st.depositphotos.com/1994497/5095/v/450/depositphotos_50956085-stock-illustration-latin-dance.jpg",
      description: "La salsa es un género musical que surge de la mezcla de ritmos latinos tan reconocidos como el chachachá, el mambo y el son, entre otros, con el uso de instrumentos y estilos estadounidenses."
    },
    {
      title: "Champeta",
      image: "https://uvp.mx/uvpblog/wp-content/uploads/2020/04/Champeta-2.png",
      description: "La champeta es un género musical y un estilo de baile originario de la región Caribe colombiana, específicamente de Cartagena. Es una mezcla de sonidos africanos, ritmos afrocaribeños y elementos de la música electrónica, con letras que a menudo narran historias de la vida cotidiana en los barrios populares. También se refiere al baile asociado con este género musical, caracterizado por movimientos enérgicos y sensuales, y al vestuario colorido y llamativo que suelen usar los bailarines."
    }
  ];

  constructor(private storageService: StorageService, private router: Router) {}

  async ngOnInit() {
    await this.loadStorageData();
    this.aplicarTema(); // Aplicar tema al iniciar
  }

  async cambiarTema() {
    const esOscuro = this.colorTema === this.colorOscuro;
    this.colorTema = esOscuro ? this.colorClaro : this.colorOscuro;
    const texto = esOscuro ? this.textoClaro : this.textoOscuro;
    const colorBoton = esOscuro ? '#4a90e2' : '#007bff';

    document.documentElement.style.setProperty('--color-fondo', this.colorTema);
    document.documentElement.style.setProperty('--color-texto', texto);
    document.documentElement.style.setProperty('--color-boton', colorBoton);

    await this.storageService.set('theme', this.colorTema);
    console.log('Tema guardado:', this.colorTema);
  }

  async loadStorageData() {
    const savedTheme = await this.storageService.get('theme');
    if (savedTheme) {
      this.colorTema = savedTheme;
    }
  }

  aplicarTema() {
    const texto = this.colorTema === this.colorOscuro ? this.textoOscuro : this.textoClaro;
    const colorBoton = this.colorTema === this.colorOscuro ? '#4a90e2' : '#007bff';

    document.documentElement.style.setProperty('--color-fondo', this.colorTema);
    document.documentElement.style.setProperty('--color-texto', texto);
    document.documentElement.style.setProperty('--color-boton', colorBoton);
  }
  goIntro() {
    console.log("Voler");
    this.router.navigateByUrl("/intro");
  }
}

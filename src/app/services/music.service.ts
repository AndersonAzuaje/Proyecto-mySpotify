import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MusicService {

  urlServer: string ="https://music.fly.dev";

  constructor() { }

 getTracks() {
    return fetch(`${this.urlServer}/tracks`).then(
      response => response.json()
    ); 
  }
  getAlbums() {
     return fetch(`${this.urlServer}/albums`).then(
      response => response.json()
    );
  }
   getArtists(){
    return fetch(`${this.urlServer}/artists`).then(
      response => response.json()
    );
  }
  getSongByAlbums(albumId: string){
    return fetch(`${this.urlServer}/tracks/album/${albumId}`).then(
      response => response.json()
    );
  }
  getSongByArtist(artistId: string){
    return fetch(`${this.urlServer}/tracks/artist/${artistId}`).then(
      response => response.json()
    );
  }
  
}

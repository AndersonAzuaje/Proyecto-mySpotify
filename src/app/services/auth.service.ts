import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private storage: Storage) {
    this.init();
  }

  // Inicializa el almacenamiento
  async init() {
    await this.storage.create();
  }

  // Login: valida y guarda el estado de sesión
  loginUser(credentials: any) {
    return new Promise(async (accept, reject) => {
      // Usuario fijo
      if (
        credentials.email === "ander@gmail.com" &&
        credentials.password === "1234567"
      ) {
        await this.storage.set('esta-logeado', true);
        accept("Login Correcto");
        return;
      }

      // Obtener usuarios registrados
      const usuarios = (await this.storage.get('usuarios')) || [];

      // Buscar coincidencia
      const encontrado = usuarios.find((u: any) =>
        u.email === credentials.email && u.password === credentials.password
      );

      if (encontrado) {
        await this.storage.set('esta-logeado', true); // Guarda sesión
        accept("Login Correcto");
      } else {
        reject("Correo o contraseña incorrectos");
      }
    });
  }

  // Verifica si el usuario está logueado (usado por el guard)
  async isAuthenticated(): Promise<boolean> {
    const isLogged = await this.storage.get('esta-logeado');
    return isLogged === true;
  }

  // Cierra la sesión
  async logoutUser(): Promise<void> {
    await this.storage.remove('esta-logeado');
  }

  // Registro: guarda usuario en storage
  registerUser(credentials: any) {
    return new Promise(async (accept, reject) => {
      if (
        credentials.email &&
        credentials.password &&
        credentials.nombre &&
        credentials.apellido &&
        credentials.pais
      ) {
        try {
          const usuarios = (await this.storage.get('usuarios')) || [];

          // No dejar registrar el usuario fijo
          if (credentials.email === "ander@gmail.com") {
            reject("Este correo ya está reservado.");
            return;
          }

          const yaExiste = usuarios.find((u: any) => u.email === credentials.email);
          if (yaExiste) {
            reject("Este correo ya está registrado.");
          } else {
            usuarios.push(credentials);
            await this.storage.set('usuarios', usuarios);
            accept("Registro exitoso");
          }
        } catch (error) {
          reject("Error al registrar: " + error);
        }
      } else {
        reject("Faltan datos en el formulario");
      }
    });
  }
}

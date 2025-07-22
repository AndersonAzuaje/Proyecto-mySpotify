import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { IonicModule, NavController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, ReactiveFormsModule]
})
export class RegisterPage implements OnInit {

  registerForm: FormGroup;
  errorMessage: string = "";

  validation_messages = {
    nombre: [{ type: 'required', message: 'El nombre es obligatorio' }],
    apellido: [{ type: 'required', message: 'El apellido es obligatorio' }],
    pais: [{ type: 'required', message: 'El país es obligatorio' }],
    email: [
      { type: 'required', message: 'El email es obligatorio' },
      { type: 'email', message: 'Email inválido' }
    ],
    password: [
      { type: 'required', message: 'La contraseña es obligatoria' },
      { type: 'minlength', message: 'Mínimo 6 caracteres' }
    ]
  };

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private navCtrl: NavController
  ) {
    this.registerForm = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      pais: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  ngOnInit() {}

  registerUser() {
    if (this.registerForm.valid) {
      this.authService.registerUser(this.registerForm.value).then(res => {
        this.errorMessage = "";
        this.navCtrl.navigateForward('/login'); // o redirige a otra página
      }).catch(err => {
        this.errorMessage = err;
      });
    }
  }
}

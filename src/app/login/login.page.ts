import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { IonicModule, NavController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule, ReactiveFormsModule, RouterModule]
})
export class LoginPage implements OnInit {

  loginForm: FormGroup;
  errorMessage: string = "";

  validation_messages = {
    email: [
      { type: "required", menssage: "El email es obligatorio" },
      { type: "email", menssage: "Email inválido" }
    ]
  }

  validation_password = {
    password: [
      { type: "required", menssage: "Ingrese una contraseña con más de 6 dígitos" },
      { type: "minlength", menssage: "Mínimo 6 caracteres" }
    ]
  }

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private NavCtrl: NavController
  ) {
    this.loginForm = this.formBuilder.group({
      email: new FormControl(
        '',
        Validators.compose([
          Validators.required,
          Validators.email
        ])
      ),
      password: new FormControl(
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(6)
        ])
      )
    });
  }

  ngOnInit() { }

  loginUser() {
    if (this.loginForm.valid) {
      const credentials = this.loginForm.value;

      this.authService.loginUser(credentials).then(res => {
        this.errorMessage = "";
        this.NavCtrl.navigateForward("/home");
      }).catch(error => {
        this.errorMessage = error;
      });

    } else {
      this.errorMessage = "Por favor, completa el formulario correctamente.";
    }
  }
}

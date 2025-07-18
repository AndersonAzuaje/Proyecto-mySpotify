import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule, ReactiveFormsModule]
})
export class LoginPage implements OnInit {

  loginForm: FormGroup;

  validation_messages = {
    email: [
      {
        type: "required", menssage: "El email es obligatorio"
      },
      {
        type: "email", menssage: "Email invalido"
      }
    ]
    
  }
  validation_password = {
    password: [
      {
        type: "required", menssage: "Ingrese un contraseña con mas de 6 digitos"
      },
      {
        type: "password", menssage: "Contraseña invalida"
      }
    ]
    
  }

  constructor(private formBuilder: FormBuilder) {
    this.loginForm = this.formBuilder.group({
      email: new FormControl(
        '',
        Validators.compose([
          Validators.required, //campo obligatorio
          Validators.email // valida el correo, que sea tipo correa 
        ])
      ),
        password: new FormControl( 
          '',
          Validators.compose([
          Validators.required, //campo obligatorio
          Validators.minLength(6),
          ])
        )
    })
   }

  ngOnInit() {
  }


  loginUser(credentials: any){
    console.log(credentials)

  }

}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../models/user';
import { UserResponse } from '../models/user-response';
import { AuthenticationService } from '../services/authentication.service';
import { CustomValidators } from '../services/validators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: FormGroup;

  constructor(private builder: FormBuilder,
    private validators: CustomValidators,
    private authenticationService: AuthenticationService,
    private route: Router) { }

  ngOnInit(): void {
    // form builder - folosit pt two-way-binding (daca se schimba data pe html, se schimba si pe ts, daca se schimba pe ts se shcimba si pe html).
    this.form = this.builder.group({
      //validari custom sau predefinite
      user: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, this.validators.password]],
      repassword: ['', [Validators.required, this.validators.password]]
    }, { validator: this.validators.repassword });
  }
  onSubmit() {
    //accesarea valorilor email si parola din form
    let credentials: User = {
      email: this.form.controls.user.value,
      password: this.form.controls.password.value
    };

    //functia "login" returneaza un Observable pe care facem subscribe, asteapta ansincron, cand vin datele se executa
    this.authenticationService.login(credentials).subscribe((response: UserResponse) => {
      // response de la "backend"
      console.log("response: ", response);

      //salvam in session storage
      if (response.id != -1) {
        sessionStorage.setItem("userId", response.id.toString());
        sessionStorage.setItem("userRole", response.role);

        this.route.navigate(['login-success']);
      }
    });
  }
}

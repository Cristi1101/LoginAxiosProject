import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-login-successful',
  templateUrl: './login-successful.component.html',
  styleUrls: ['./login-successful.component.css']
})
export class LoginSuccessfulComponent {

  imageURL = [];

  constructor(
    private route: Router,
    private authenticationService: AuthenticationService) { }

  logout() {
    this.route.navigate(['login-page']);
    sessionStorage.clear();
  }

  axio() {
    this.authenticationService.axio().subscribe(response => {
      response.elemente.forEach(element => {
        this.imageURL.push(element);
      });
    });
  }
}

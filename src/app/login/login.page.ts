import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: false,
})
export class LoginPage {
  username: string = '';
  password: string = '';

  constructor(private router: Router) {}

  login() {
    const isValidUser = /^[a-zA-Z0-9]{3,8}$/.test(this.username);
    const isValidPass = /^\d{4}$/.test(this.password);

    if (isValidUser && isValidPass) {
      this.router.navigate(['/home'], {
        state: { username: this.username },
      });
    } else {
      alert('Verifica que los datos ingresados cumplan con las condiciones.');
    }
  }
}

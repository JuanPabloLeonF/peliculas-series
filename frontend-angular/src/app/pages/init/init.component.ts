import { Component } from '@angular/core';
import { LoginComponent } from '../../components/login/login.component';
import { RegisterComponent } from '../../components/register/register.component';
import { PasswordComponent } from '../../components/password/password.component';

@Component({
  selector: 'app-init',
  standalone: true,
  imports: [LoginComponent, RegisterComponent, PasswordComponent],
  templateUrl: './init.component.html',
  styleUrl: './init.component.css'
})
export class InitComponent {

  loginValue: boolean = true;
  registerValue: boolean = false;
  passwordValue: boolean = false;

  public activateSection(data: any): void {
    if (data.login) {
      this.loginValue = true;
      this.registerValue = false;
      this.passwordValue = false;
    } else if (data.password) {
      this.loginValue = false;
      this.registerValue = false;
      this.passwordValue = true;
    } else if (data.register) {
      this.loginValue = false;
      this.registerValue = true;
      this.passwordValue = false;
    } else {
      this.loginValue = true;
      this.registerValue = false;
      this.passwordValue = false;
    }
  }
}

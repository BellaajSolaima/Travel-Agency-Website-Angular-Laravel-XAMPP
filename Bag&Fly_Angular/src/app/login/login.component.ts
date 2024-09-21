import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/Services/AuthService';
import { CustomSnackbarService } from 'src/Services/custom-snackbar.service';
import { ApiService } from 'src/Services/api-service.service';
import { Compte } from 'src/Modeles/Compte';
import { Md5 } from 'ts-md5';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  isSigningUp: boolean = false;
  username: string = '';
  password: string = '';
  newName: string = '';
  newUsername: string = '';
  newPassword: string = '';
  errorMessageRegistre: string | null = null;
  errorMessageLogin: string | null = null;
  constructor(
    private AS: AuthService,
    private router: Router,
    private snackbarService: CustomSnackbarService,
    private api: ApiService
  ) {}

  signin(): void {
    this.AS.doGoogleLogin().then(() => {
      this.router.navigate(['/dashboard']);
    });
  }
  login(): void {
    if (!this.username || !this.password) {
      this.errorMessageLogin = 'Please enter username and password.';
      return;
    } else if (
      this.username.toLowerCase() == 'admin@admin.com' &&
      this.password.toLowerCase() == 'admin123'
    ) {
      this.router.navigate(['/admin']);
    } else {
      this.api.getData('comptes').subscribe((data) => {
        const filteredData = data.find(
          (item: Compte) =>
            item.Email.toLowerCase() == this.username.toLowerCase() &&
            item.Password == Md5.hashStr(this.password).toString()
        );
        if (filteredData) {
          localStorage.setItem('currentUser', this.username);
          this.router.navigate(['/dashboard']);
        } else {
          this.errorMessageLogin = 'Email or password is Wrong !';
        }
      });
    }
  }

  register(): void {
    this.isSigningUp = true;
    if (!this.newUsername || !this.newPassword) {
      this.errorMessageRegistre = 'Please enter username and password.';
      return;
    } else {
      this.api.getData('comptes').subscribe((data) => {
        const filteredData = data.find(
          (item: Compte) =>
            item.Email.toLowerCase() == this.newUsername.toLowerCase() &&
            item.Password == Md5.hashStr(this.newPassword).toString()
        );
        if (filteredData) {
          this.errorMessageRegistre = 'You are Already Registered !';
          this.isSigningUp = false;
        } else {
          let newClientId;
          this.api
            .postData('clients', { nomClient: this.newName })
            .subscribe((data: any) => {
              newClientId = data.id;
              console.log(newClientId);

              this.api
                .postData('comptes', {
                  Email: this.newUsername.toLowerCase(),
                  Password: this.newPassword,
                  client_id: newClientId,
                })
                .subscribe((data) => {
                  localStorage.setItem('currentUser', this.newUsername);
                  this.router.navigate(['/dashboard']);
                });
            });
        }
      });
    }
  }
}

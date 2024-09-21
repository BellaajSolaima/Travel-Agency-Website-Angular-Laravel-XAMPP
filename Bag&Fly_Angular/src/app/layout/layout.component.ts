import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/Services/AuthService';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent {
  user: any; // Assuming user is an object, you can adjust the type accordingly

  constructor(private authService: AuthService, private router: Router) {
    this.authService.getUserClaims().then((u) => {
      this.user = u;
      console.log(this.user.displayName);
    });
  }

  signout(): void {
    this.authService.doLogout().then(() => {
      this.router.navigate(['/Login']);
    });
  }
}
import { Component } from '@angular/core';
import { User } from '../model/user.model';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-verif-email',
  templateUrl: './verif-email.component.html',
  styleUrls: ['./verif-email.component.scss']
})
export class VerifEmailComponent {
  code: string = "";
  user: User = new User();
  err = "";

  constructor(private route: ActivatedRoute, private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.user = this.authService.registredUser;
  }

  onValidateEmail() {
    this.authService.validateEmail(this.code).subscribe({
      next: (res) => {
        alert("Email verified successfully");
        // Vous pouvez effectuer d'autres actions après la validation de l'e-mail ici
      },
      error: (err) => {
        console.error("Error verifying email:", err);
        // Gérez l'erreur ici
      }
    });
  }
}


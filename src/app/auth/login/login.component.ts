import { Component, DestroyRef, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { MaterialImportModule } from '../../shared/material-import.module';
import { AuthService } from '../auth.service';
import { Auth } from '../login/auth.model';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, MaterialImportModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  private authService = inject(AuthService);
  private destroyRef = inject(DestroyRef);
  private toastr = inject(ToastrService);
  private router = inject(Router);
  loadingState: boolean = false;

  onSubmit(form: NgForm) {
    if (form.invalid) {
      return;
    }
    if (form.valid) {
      this.loadingState = true;
      const authData: Auth = {
        email: form.value.email,
        password: form.value.password,
      };
      const subscription = this.authService.login(authData).subscribe({
        next: () => {
          this.loadingState = false;
          this.toastr.success('Login Success', 'Info');
          this.router.navigate(['/dashboard']);
        },
        error: (error) => {
          this.loadingState = false;
          const message = error.error.message;
          this.toastr.error(message, 'Error');
        },
      });

      this.destroyRef.onDestroy(() => {
        subscription.unsubscribe();
      });
    }
  }
}

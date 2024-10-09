import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { MaterialImportModule } from '../../shared/material-import.module';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, MaterialImportModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  onSubmit(form: NgForm) {
    throw new Error('Method not implemented.');
  }
}

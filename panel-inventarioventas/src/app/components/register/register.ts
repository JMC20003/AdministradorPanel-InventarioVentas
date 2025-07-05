import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Auth } from '../../services/auth';
import { Router } from '@angular/router';


@Component({
  selector: 'app-register',
  standalone: false,
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class Register {
 registroForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: Auth,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.registroForm = this.fb.group({
      nombre: ['', Validators.required],
      username: ['', Validators.required],
      direccion: ['', Validators.required],
      telefono: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.registroForm.valid) {
      const formData = this.registroForm.value;

      this.authService.register(formData).subscribe({
        next: () => {
          console.log('Registro exitoso');
          this.router.navigate(['/login']); // Redirige al login si quieres
        },
        error: (err) => {
          console.error('Error al registrar:', err);
          alert('Hubo un problema al registrar. Intenta nuevamente.');
        }
      });
    }
  }
}

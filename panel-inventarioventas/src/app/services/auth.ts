import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { jwtDecode } from 'jwt-decode';

interface AuthRequest {
  email: string;
  password: string;
}

interface RegisterRequest {
  username: string;
  password: string;
  nombre: string;
  direccion: string;
  telefono: string;
  email: string;
}

interface JwtPayload {
  sub: string;
  roles: string[];
  iat: number;
  exp: number;
}

@Injectable({
  providedIn: 'root'
})
export class Auth {

  //private baseUrl = 'https://api.tiendarjsc.site/auth';
  private baseUrl = 'http://localhost:8080/auth';
  constructor(private http: HttpClient) { }

  login(data: AuthRequest): Observable<any> {
    return this.http.post(`${this.baseUrl}/login`, data);
  }

  register(data: RegisterRequest): Observable<any> {
    return this.http.post(`${this.baseUrl}/register`, data);
  }

  getUserRole(): string[] {
  if (typeof window === 'undefined') return []; // No hay localStorage en servidor
  const token = localStorage.getItem('token');
  if (!token) return [];
  try {
    const decoded = jwtDecode<JwtPayload>(token);
    return decoded.roles || [];
  } catch (error) {
    console.error('Token inválido', error);
    return [];
  }
  }
  guardarUsuario(usuario: any) {
    localStorage.setItem('usuario', JSON.stringify({
      id: usuario.id,
      email: usuario.email,
      roles: usuario.roles
    }));
  }
  
  obtenerUsuario(): any {
    return JSON.parse(localStorage.getItem('usuario') || '{}');
  }

  hasRole(role: string): boolean {
    if (typeof window === 'undefined') return false;
    return this.getUserRole().includes(role);
  }

  isAdmin(): boolean {
    if (typeof window === 'undefined') return false;
    return this.getUserRole().includes('ROLE_ADMIN');
  }

  guardarToken(token: string) {
    if (typeof window !== 'undefined') {
      localStorage.setItem('token', token);
    }
  }

  obtenerToken(): string | null {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem('token');
  }

  cerrarSesion() {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('token');
    }
  }

  estaAutenticado(): boolean {
    if (typeof window === 'undefined') return false;
    return !!this.obtenerToken();
  }
}

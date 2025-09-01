import { Injectable, inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Injectable({ providedIn: 'root' })
export class ProfissionalGuard {
  #auth = inject(AuthService);
  #router = inject(Router);

  canActivate(): boolean {
    const usuario = this.#auth.getUserData();
    if (usuario?.roles.includes('ROLE_PROFISSIONAL')) {
      return true;
    }
    this.#router.navigate(['/home']);
    return false;
  }
}

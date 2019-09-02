import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, CanLoad, Route  } from '@angular/router';
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  codigoUsuario: string;

  constructor(private router: Router) {
    this.codigoUsuario = "1" // id do login do mySQL
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.verificarAcesso();
  }

  canLoad( route: Route ): Observable<boolean> | Promise<boolean> | boolean {
    return this.verificarAcesso();
  }

  verificarAcesso() {
    if (this.codigoUsuario) {
      localStorage.setItem('uid', this.codigoUsuario);
      return true;
    }
    this.router.navigate(['/login']);
    localStorage.removeItem('uid');

    return false;
  }
}

import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
  CanLoad,
  Route
} from '@angular/router';
import { Observable } from 'rxjs';
import { ApiService } from './../services/api.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  codigoUsuario: string;

  constructor(private router: Router, private api: ApiService) {
    //if (this.api.getCredentials().iduser) {
    this.codigoUsuario = api.getCredentials().iduser; // id do login do mySQL
    // }
    console.log('CanGuard id user' + api.getCredentials().iduser);
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    return this.verificarAcesso();
  }

  canLoad(route: Route): Observable<boolean> | Promise<boolean> | boolean {
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

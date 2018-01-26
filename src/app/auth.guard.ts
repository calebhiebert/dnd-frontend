import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {AuthService} from "./auth.service";

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private auth: AuthService, private router: Router) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return new Promise((resolve, reject) => {
      this.auth.isLoggedIn()
        .subscribe(res => {
          let loggedIn = res.data.isLoggedIn;

          if(!loggedIn) {
            this.router.navigate(['login']);
          }

          this.auth.setLoginStatus(loggedIn);

          resolve(loggedIn);

        }, e => reject(e));
      resolve(true);
    });
  }
}

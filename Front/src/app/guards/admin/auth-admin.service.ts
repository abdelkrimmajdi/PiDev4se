import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { Role } from 'src/app/model/role.enum';

@Injectable({
  providedIn: 'root'
})
export class AuthAdminService {

  userconnect = JSON.parse(localStorage.getItem("userconnect")!);

  constructor(private route: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.userconnect.role==Role.ADMIN||this.userconnect.role==Role.NUTRITIONISTE||this.userconnect.role==Role.COACH||this.userconnect.role==Role.MENTOR)
      return true
    else {
      this.route.navigateByUrl('/**')
      return false
    }
  }
  
}

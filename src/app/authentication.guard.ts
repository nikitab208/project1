import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthguardServiceService} from './authguard-service.service'
import { Router } from  '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationGuard implements CanActivate {
  constructor(private Authguardservice: AuthguardServiceService, private router: Router) {} 
  
  
  canActivate(): boolean {  
    if (!this.Authguardservice.gettoken()) {  
        this.router.navigateByUrl("/login"); 
        return false 
    }else{
      this.router.navigateByUrl("/posts");  
      return true
    }
    //return this.Authguardservice.gettoken();  
}  
   
    
  
  
}

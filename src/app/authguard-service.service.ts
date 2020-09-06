import { Injectable } from '@angular/core';
import { Router } from '@angular/router'

@Injectable({
  providedIn: 'root'
})
export class AuthguardServiceService {

  constructor(public router : Router) { }

  gettoken(){  
    return !localStorage.getItem("register");  
      // this.router.navigateByUrl("/posts"); 
    }  
}

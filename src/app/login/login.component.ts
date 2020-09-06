import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from  '@angular/forms';
import { Router } from  '@angular/router';
import { ToastrService } from 'ngx-toastr';


@Component({
    selector:'app-login',
    templateUrl:'./login.component.html',
    styleUrls:['./login.component.css']
})
export class LoginComponent implements OnInit{
    loginForm: FormGroup;
    isSubmitted  =  false;
    storeData
    constructor(private formBuilder : FormBuilder,private router : Router,private toster : ToastrService){

    }
    ngOnInit(){
        this.loginForm  =  this.formBuilder.group({
            username: ['', Validators.required],
            password: ['', Validators.required],
            remember: [false, Validators.required]
        });
        this.storeData =JSON.parse(localStorage.getItem('register'))
        console.log( this.storeData.name)
      
    }
    get formControls() { return this.loginForm.controls; }
    login(){
        console.log(this.loginForm.value);
 
        this.isSubmitted = true;
        if(this.loginForm.invalid){
          return;
        }
        if(this.storeData.name === this.loginForm.value.username && this.storeData.password === this.loginForm.value.password  ){
            this.router.navigateByUrl('/posts');
            this.loginForm.reset()
           
        }else{
            this.toster.error('Login Credential Incorrect');
            this.loginForm.reset()
        }
       
       
      }

}
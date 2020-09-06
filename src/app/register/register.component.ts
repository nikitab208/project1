import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from  '@angular/forms';
import { Router } from  '@angular/router';
import { ToastrService } from 'ngx-toastr';


@Component({
    selector:'app-register',
    templateUrl:'./register.component.html',
    styleUrls:['./register.component.css']
})
export class RegisterComponent{

    registerForm: FormGroup;
    isSubmitted  =  false;
    constructor(private formBuilder : FormBuilder,private router : Router,
        private toster : ToastrService){

    }
    ngOnInit(){
        this.registerForm  =  this.formBuilder.group({
            name: ['', Validators.required],
            email: ['', Validators.required],
            password: ['', Validators.required],
            cPassword: ['', Validators.required],
            termCondition: [false, Validators.required]
        });
      
    }
    get formControls() { return this.registerForm.controls; }
    register(){
        console.log(this.registerForm.value);
        this.isSubmitted = true;
        if(this.registerForm.invalid){
          return;
        }else{
            localStorage.setItem('register', JSON.stringify(this.registerForm.value));
            this.toster.success('Register Successfully');
             this.router.navigateByUrl('/posts');
            this.registerForm.reset();
           
        }

       
       
       
      }

}
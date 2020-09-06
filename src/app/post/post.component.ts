import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from  '@angular/forms';
import { PostDetails} from './post.model';
import { PostService} from './post.service';
import { Subscription} from 'rxjs'
import { ActivatedRoute, ParamMap } from '@angular/router';
import { ToastrService } from 'ngx-toastr';


@Component({
    selector:'app-post',
    templateUrl:'./post.component.html',
    styleUrls:['./post.component.css'],
    providers:[PostService]
})

export class PostsComponent implements OnInit,OnDestroy{
    empDetails :PostDetails []=[];
    postForm:FormGroup
    serachForm:FormGroup;
    searchTerm = '';
    mode ='Add Post';
    buttonUpdate = 'Add Post'
    buttonUpdates= true
    postDataById:any
    post
    userDetails:any
  
    private empSub :Subscription;
    
    constructor(public postService :PostService,private formBuilder:FormBuilder,
        public route:ActivatedRoute,private toster : ToastrService ){}
    
    ngOnInit(){
      this.userDetails =JSON.parse(localStorage.getItem('register'))
        this.postForm  =  this.formBuilder.group({
            title: ['', Validators.required],
            body: ['', Validators.required],
           
        });
        this.serachForm  =  this.formBuilder.group({
            term: ['', Validators.required],

        });
        this.serachForm.get('term').valueChanges
        .subscribe((term) => {
          this.searchTerm = term;
        });
   
       this.postService.getAllEmp();
       this.empSub = this.postService.getAllEmpListners().subscribe((empDetails:PostDetails [])=>{
               this.empDetails = empDetails;
        });
    }
    edit(id){
       this.postService.getEmp(id);
        this.buttonUpdates= true
        this.postService.getPostDataById().subscribe((response)=>{
            this.postDataById = response;
            this.mode = 'Edit Post'
            this.buttonUpdate = 'Update'
            console.log(response)
            this.postForm.controls["title"].setValue(this.postDataById[0].title);
            this.postForm.controls["body"].setValue(this.postDataById[0].body);
         });
       // this.post = this.postService.postDetails;
      
    }
    addPosts(){
      
 
      if( this.buttonUpdate =='Update'){
          console.log(this.postForm.value)
        this.postService.updatePosts(this.postForm.value.title,this.postForm.value.body,this.postDataById[0].id);
        this.postForm.reset()
        this.mode = 'Add Post'
        this.buttonUpdate = 'Add Post'
        this.toster.success('Post updated sucessfully');
      }else{
        this.postService.addPosts(this.postForm.value.title,this.postForm.value.body);
        this.postForm.reset()
        this.toster.success('Post added sucessfully');

      }
        
    }
    deletePost(id){
        this.postService.deletePost(id);
    
        this.postService.getPostDataById().subscribe((empDetails:PostDetails [])=>{
           
            this.toster.success('Post Deleted Sucessfully');
         });

    }
    viewPost(id){
      this.postService.getEmp(id);
      this.buttonUpdates = false
      this.postService.getPostDataById().subscribe((response)=>{
          this.postDataById = response;
          this.mode = 'View Post'
         // this.buttonUpdate = 'Update'
          console.log(response)
          this.postForm.controls["title"].setValue(this.postDataById[0].title);
          this.postForm.controls["body"].setValue(this.postDataById[0].body);
       });

    }

    ngOnDestroy(){
        this.empSub.unsubscribe();
    }

}
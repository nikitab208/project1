import { Injectable } from '@angular/core';
import { PostDetails} from './post.model';
import { Subject} from 'rxjs';
import { HttpClient} from '@angular/common/http';

@Injectable({providedIn:'root'})
export class PostService {
    public postDetails :PostDetails [] =[];
    getData:any
    public postUpdatedDetails =new Subject<PostDetails []>();
    postDataById =new Subject(); 
    constructor(private http :HttpClient){}

    getAllEmp(){
     this.http.get<PostDetails []>('https://jsonplaceholder.typicode.com/posts').
     subscribe((empData)=>{
       this.postDetails = empData;

       this.postUpdatedDetails.next([...this.postDetails]);
     });
    }
    
    getEmp(id:string){
      //return {...this.empDetails.find(p=>p.id === id)};
      this.http.get<{id: string, title:string,UserId:number,body:string}>('https://jsonplaceholder.typicode.com/posts/'+ id).
      subscribe((empData)=>{
        this.getData = empData;
        console.log(empData)
 
        this.postDataById.next([this.getData]);
      });

    }
    deletePost(id:string){
        //return {...this.empDetails.find(p=>p.id === id)};
        this.http.delete<{id: string, title:string,UserId:number,body:string}>('https://jsonplaceholder.typicode.com/posts/'+ id).
        subscribe((empData)=>{
          this.getData = empData;
          console.log(empData)
   
          this.postDataById.next([this.getData]);
        });
  
      }
    getPostDataById(){
        return this.postDataById.asObservable();
    }
    getAllEmpListners(){
        return this.postUpdatedDetails.asObservable();
    }
    addPosts(title:string,body:string){
           const Posts = { title:title,body:body}
            this.http.post<{id: string, title: string, body: string, UserId: 1}>('https://jsonplaceholder.typicode.com/posts',Posts).
            subscribe((empData)=>{
                const post: any  ={
                    id: empData.id,
                    title: empData.title,
                    body: empData.body,
                    
                }
                
                  this.postDetails.push(post);
              

            });
          

    }
    updatePosts(title:string,body:string,id:number){
        
        const Posts = { title:title,body:body,id:id}
        console.log(Posts)
         this.http.put<{id: string, title: string, body: string}>('https://jsonplaceholder.typicode.com/posts/'+id,Posts).
         subscribe((empData)=>{
             const post: any  ={
                 id: empData.id,
                 title: empData.title,
                 body: empData.body,
                 
             }
             
               this.postDetails.push(post);
           

         });
       

 }
}
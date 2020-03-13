import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';

//retreives the email and password from inputs
interface User {
  email?: string;
  password?: string;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  //allows input boxes to have preset values for quick testing purposes 
  user: User = {
   // email: "",
    //password: "test1234" ,
  };
  

  constructor(public afAuth: AngularFireAuth, private router: Router) { }
  
  //creates a new user to the database 
  async createAccount() {
    try{
    const user = await this.afAuth.auth.createUserWithEmailAndPassword(
      this.user.email,
      this.user.password,
     );
      console.log(user);
    }catch(error){
      var x = document.getElementById("errorDiv");
      x.style.display = "block";
      console.log(error);
    };
   
  }




  //login to a user that already has an account
  async login(){
    console.log(this.user.email)
    try{
    const user = await this.afAuth.auth.signInWithEmailAndPassword(
      this.user.email,
      this.user.password
    );
    } catch(error) {
      var x = document.getElementById("signinDiv");
      x.style.display = "block";
      console.log(error);
    }

  }

  //logout the current user 
  async logout() {
    await this.afAuth.auth.signOut();
  }


  ngOnInit() {
  }

  //navigates to the find game page
  joinBtnClick() {
    console.log('btn clicked')
    this.router.navigate(['find-game']); 

  }

  //navigates to the create game page
  createBtnClick() {
    console.log('btn clicked')
    this.router.navigate(['create-game']);

  }

}



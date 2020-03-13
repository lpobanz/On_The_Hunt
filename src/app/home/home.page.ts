import { Component } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  // navigates to the login page on click
  constructor(private router: Router) {}
  loginBtnClick() {
    console.log('btn clicked')
    this.router.navigate(['login']);

  }
  
  //navigates to info page
  infoBtnClick() {
    this.router.navigate(['info'])
  }
}

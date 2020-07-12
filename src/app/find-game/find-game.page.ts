import { Component, OnInit, } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router, NavigationExtras} from '@angular/router';
import { Injectable } from '@angular/core';

import {NavController} from '@ionic/angular'; 
import { HomePage } from '../home/home.page';



@Injectable({
  providedIn: 'root'
})


@Component({
  selector: 'app-find-game',
  templateUrl: './find-game.page.html',
  styleUrls: ['./find-game.page.scss'],
})
export class FindGamePage implements OnInit {
// declares variables
student: any;
public gameList: any[];
public initGameList: any[];
public gameName: string;
public gameId: string;

constructor(private firestore: AngularFirestore, private router : Router, private navCtrl: NavController) {

  
}
  
  

  ngOnInit() {
    //localStorage.clear();

    console.log("test");

    // prints game data to console
    this.firestore.collection('Games').snapshotChanges().subscribe(data => {

      this.initGameList =  data.map(e => {
        console.dir(data);
        return{
        Name: e.payload.doc.data()['Game Name'],
        Location: e.payload.doc.data()['Location'],
        ID: e.payload.doc.id
        
      }
      })

      this.gameList = data.map(e => {
        return{
        Name: e.payload.doc.data()['Game Name'],
        Location: e.payload.doc.data()['Location'],
        ID: e.payload.doc.id
      }
      })
      console.log(this.gameList);

    })
  }
  ionViewWillEnter() {
   localStorage.clear();
  }

  initializeItems(): void {
    this.gameList = this.initGameList;
  }

  //filter list based on searchbar input
  filterList(evt) {
    this.initializeItems();

    const searchTerm = evt.srcElement.value;

 

     
    if(!searchTerm) {
      console.log("ran 1");
      return;
    }


    //filters the list by input to searchbar
    this.gameList = this.gameList.filter(currentGame => {
      if( currentGame.Name && searchTerm) {
        if (currentGame.Name.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1) {

          console.log("ran 3");
          return true;
        } else if(currentGame.Location != undefined){  
           if(currentGame.Location.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1) {
            console.log("ran 2");
            return true;
          }
        } else {
          return false;
        }
      }
    })


  }


  backBtnClk() {
    this.router.navigate(['login']);
  }

  

  // joins specific game on button click
  joinGameClk(name, ID) {
    
    this.gameName = name;
    this.gameId = ID;
    console.log(this.gameName, this.gameId);


    // sends game name and id when page is switched
    const navigationExtras: NavigationExtras = {
      state: {
       name: this.gameName,
       ID: this.gameId
      }
    };


    this.navCtrl.navigateRoot(['game-home'], navigationExtras);



   //navigates to the game home page
   
    //this.router.navigate(["game-home"], navigationExtras);
    
    
  }


}

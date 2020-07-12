import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router} from '@angular/router';
import { Injectable } from '@angular/core';

import { NavController} from '@ionic/angular';


@Injectable({
  providedIn: 'root'
})

@Component({
  selector: 'app-scoreboard',
  templateUrl: './scoreboard.page.html',
  styleUrls: ['./scoreboard.page.scss'],
})
export class ScoreboardPage implements OnInit {

  //declares variables 
  public scoreList: any[];

  public objCount: any;

  gameName: string;
  gameId: string;
  userEmail: string;
  width: any;
  place: any;
  userLength: any;
  spot: any;
  colorChange: any;

  // color1 :any;
  // color2 : any;
  // color3:any;


  // gets game name and is from previous page 
  constructor(private router: Router, private firestore: AngularFirestore, private navCtrl : NavController) { 
    const navigation = this.router.getCurrentNavigation();
    const state = navigation.extras.state as {
      name: string;
      ID : string;
    };


    // try {
    //   this.gameId = state.ID
    //   this.gameName = state.name;
    // } catch { // catches error if page does not recieve values 
    //   this.gameName = "Error";
    //   this.gameId = "jKYNMktYB2gyPomrVpFZ";
    // }

    try{
      this.gameName = state.name;
      this.gameId = state.ID;

      console.log('try ran');
      localStorage.setItem('gameName', this.gameName);
      localStorage.setItem('gameId', this.gameId);
    } catch (e){
      

      if(localStorage.getItem('gameName') != null && localStorage.getItem('gameId') != null) {

        this.gameName = localStorage.getItem('gameName');
        this.gameId = localStorage.getItem('gameId');
      } else {
        this.router.navigate(["find-game"]);
      }
    }



    //reset variables
    this.place = 0;
    this.colorChange = 0;
    this.spot = 0;

    // this.color1 = 255; 
    // this.color2 = 34
    // this.color3 = 54


    // retrieves a list of emails and their scores from firebase collection
    this.firestore.collection('Games').doc(this.gameId).collection('Users', ref => ref.orderBy('Score', 'desc')).snapshotChanges().subscribe( data => {

      this.scoreList = data.map(e => {
        
        return {
          Email : e.payload.doc.data()['Email'],
          Score: e.payload.doc.data()['Score']
        }
        
      })
      this.userLength = this.scoreList.length
      console.log("cleared")
      
      
    })
    this.firestore.collection('Games').doc(this.gameId).snapshotChanges().subscribe(data => {
      this.objCount = data.payload.data()["totalObjectives"]
    });

  }

 

  ngOnInit() {


  }

  calcWidth(item){

    if((this.spot + 1)> this.userLength){
      this.spot = 0
      this.spot++;
    } else {
      this.spot++;
    }


    var color1 = 255; 
    var color2 = 34
    var color3 = 54
   
    
    if(color2 + (this.spot *20) < 255) {
      color2 = color2 + (this.spot * 20);
    } else {
      color2 = color2 + ((this.spot * 20) - ((this.spot - 1) * 20));
    }

    var color = "rgb(" +color1 + ',' + color2 + "," + color3 + ")"
    
    console.log(item)
    console.log("place is " + this.place)

    this.width = ((item.Score / this.objCount) * 100) +"%"
    console.log("width is " + this.width)

    console.log("color is " + color)


    return {'width' : this.width, 'background-color' : color}; 
  }

  calcPlace(){
    console.log("place is" + this.place)

    if((this.place + 1)> this.userLength){
    this.place = 0
    this.place++;
    } else {
    this.place++;
    }

    var color = "rgba(205, 128, 50, 0)";
    

    if(this.place == 1) {
      console.log("ran score" + this.place)
      color = "rgb(255, 196, 4)";
    } else if(this.place == 2) {
      color = "rgb(201, 201, 201)";
    } else if(this.place == 3){
      color = "rgb(205,127,50)";
    } else {
      color = "rgba(205, 128, 50, 0)";
    }

    
    return {"color" : color};
  }

  //redirects to game home page
  backBtnClick() {
    //this.router.navigate(['game-home']);
    this.navCtrl.navigateRoot(['game-home'], {animationDirection:'forward', state: {name: this.gameName, ID: this.gameId }});
  }

}

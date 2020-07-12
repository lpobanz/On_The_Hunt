import { Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router, ChildActivationStart,} from '@angular/router';
//importing firebase and firestore
import { AngularFireAuth } from '@angular/fire/auth';
import { Injectable } from '@angular/core';
import { firestore } from 'firebase';
import { IonContent } from '@ionic/angular';
import { NavController} from '@ionic/angular';







@Injectable({
  providedIn: 'root'
})



@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {


  //scroll
  //@ViewChild(IonContent, {static: false}) content: IonContent;
  @ViewChild("content", {static: false } ) content: IonContent;
  

  

  //declares variables
  public chatList: any[];

  gameName: string;
  gameId : string;
  docId : string;
  user : string;
  db : any;



 

  constructor(private router: Router, private firestore: AngularFirestore, public afAuth: AngularFireAuth, private navCtrl: NavController) { 
    

    const navigation = this.router.getCurrentNavigation();
    const state = navigation.extras.state as {
      name: string;
      ID : string;
    };

// gets current user email and catches if there is not a current user 
  // if(afAuth.auth.currentUser != null) {
  // this.user = afAuth.auth.currentUser.email;
  // } else {
  // this.user = "No Email";
  // }
  // console.log(this.user);

  //   // gets name and ID from previous page
  //   const navigation = this.router.getCurrentNavigation();
  //   const state = navigation.extras.state as {
  //     name: string;
  //     ID : string;
  //   };
  //   try{
  //     this.gameName = state.name;
  //     this.gameId = state.ID;
  //   } catch { // catches if page didn't recieve variables from other page
  //     this.gameName = "Error";
  //     this.gameId = "jKYNMktYB2gyPomrVpFZ";
  //   }

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
  console.log("Game Name is " + this.gameName); 

  // checks to see if user is currently signed in and then gets their email and id
  if(afAuth.auth.currentUser != null) {
    this.user = afAuth.auth.currentUser.email;
    

    localStorage.setItem('userEmail', this.user);
   
  } else if(localStorage.getItem('userEmail') != null && localStorage.getItem('userID') != null) {
    this.user = localStorage.getItem('userEmail');
    
  } else {
    this.router.navigate(["login"]);

  }
  console.log("this is email " + this.user);



  }

  ngOnInit() {

    console.log("scroll test")

   console.log(this.content)

    // stores each message from firebase chat collection in the chatList
    this.firestore.collection('Games').doc(this.gameId).collection('Chat', ref => ref.orderBy("Time")).snapshotChanges().subscribe(data => {
      
      
      this.chatList = data.map(e => {
        return{
        Message: e.payload.doc.data()['Message'],
        Email: e.payload.doc.data()['Email'],
        ID: e.payload.doc.id
        }
      });
     
      
      if(this.content != undefined) {
        console.log("rnenfneon")
        console.log(this.content);
        setTimeout(this.scroll, 250);
        //this.scroll()
      }

    })
    console.log("test")

    

    
  }

  scroll(){
    console.log("scroll")
    console.log(this.content)
    this.content.scrollToBottom()
  }


  deleteBtnClick(ID) {
    // deletes the message document on btn click
    this.docId = ID;
    console.log(this.gameId)  

    this.firestore.collection('Games').doc(this.gameId).collection('Chat').doc(this.docId).delete().then(function() {
      console.log("Document successfully deleted!");
  }).catch(function(error) {
      console.error("Error removing document: ", error);
  });
  }

  //navigates to game home page on btn click 
  backBtnClick() {
    //this.router.navigate(['game-home']);
    this.navCtrl.navigateRoot(['game-home'], {animationDirection:'forward', state: {name: this.gameName, ID: this.gameId }});
  }

  // sends message on btn click
  sendBtnClick() {
    console.log("sendBtn")
    console.log(this.content)
   
   

    // creates a message record 
    let record = {};
    record['Email'] = this.user;

    if(this.game.Message != undefined){ // if the message has a value then it adds it to the record
    record["Message"] = this.game.Message;
    } else {
      record["Message"] = "";
    }
    record["Time"] = firestore.Timestamp.now()
    console.log(record);

    // stores the record as a new message in the firebase chat collection
    this.firestore.collection('Games').doc(this.gameId).collection('Chat').add(record).then(resp => {
      this.game.Message = "";
      console.log(resp);
    }) 
      .catch(error => {
        console.log(error);
      })
  
  }
  game : Game = {}

}

//allows code to read message value of input box
interface Game {
  Message? : String;
}

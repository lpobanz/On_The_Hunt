import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router, NavigationExtras, NavigationEnd} from '@angular/router';

import {Platform} from '@ionic/angular';

import { AngularFireAuth } from '@angular/fire/auth';

//add firebase 
import { Injectable } from '@angular/core';
import { firestore } from 'firebase';

// adds google map geolocation
import { Geolocation } from '@ionic-native/geolocation/ngx';

// routing 
import { NavController} from '@ionic/angular';


declare var google;




@Injectable({
  providedIn: 'root'
})


@Component({
  selector: 'app-game-home',
  templateUrl: './game-home.page.html',
  styleUrls: ['./game-home.page.scss'],
})
export class GameHomePage implements OnInit {

  //declares variables 
  gameName: string;
  gameId : string;
  userId: string;
  public userScore : any;
  userEmail : string;
  public objectivesList: any[];
  userList: any[];
  userExists: boolean;
  objExists: boolean;
  completedObjList: any;
  userLat: any;
  userLng: any;
  objList: any[]; 
  zoom: any;

  userMarker: any;


  // adding map 
  @ViewChild('map', { static: false }) mapElement: ElementRef;
  map: any;
  markers = [];
  
  

  constructor(private platform: Platform, private router: Router, private firestore: AngularFirestore,public afAuth: AngularFireAuth, private geolocation: Geolocation, private navCtrl: NavController) {


   // this.userScore = 0;
    this.zoom = 11;
    // recieves game name and id from previous page
    const navigation = this.router.getCurrentNavigation();
    const state = navigation.extras.state as {
      name: string;
      ID : string;
    };

    console.log("game page loaded ");


    // if(state == undefined){ //state.name == undefined || state.ID == undefined

    //   console.log('catch ran');
  
    //     if(localStorage.getItem('gameName') != null || localStorage.getItem('gameId') != null) {
  
    //       this.gameName = localStorage.getItem('gameName');
    //       this.gameId = localStorage.getItem('gameId');
    //     } else {
    //       this.router.navigate(["find-game"]);
    //     }

    // }else{

    //  //if( state.name == undefined || state.ID == undefined){
    //       this.gameName = state.name;
    //       this.gameId = state.ID;
    //       console.log('try ran');
    //       localStorage.setItem('gameName', this.gameName);
    //       localStorage.setItem('gameId', this.gameId);
       
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
    console.log("Game Name is " + this.gameName); 

    // checks to see if user is currently signed in and then gets their email and id
    if(afAuth.auth.currentUser != null) {
      this.userEmail = afAuth.auth.currentUser.email;
      this.userId = afAuth.auth.currentUser.uid;

      localStorage.setItem('userEmail', this.userEmail);
      localStorage.setItem('userID', this.userId);

    } else if(localStorage.getItem('userEmail') != null && localStorage.getItem('userID') != null) {
      this.userEmail = localStorage.getItem('userEmail');
      this.userId = localStorage.getItem('userID');
      
    } else {
      this.router.navigate(["login"]);

    }
    console.log("this is email " + this.userEmail);

  
    

    // gets the list of objectives
    this.firestore.collection('Games').doc(this.gameId).collection('Objectives').snapshotChanges().subscribe(data => {
      
      this.objectivesList = data.map(e => {
        console.dir(e.payload.doc.data()['Name'])
        return {
          Name: e.payload.doc.data()['Name'],
          Link: e.payload.doc.data()['Link'],
          Lat: e.payload.doc.data()['Lat'],
          Lng: e.payload.doc.data()['Lng']
        }
      })

      //this.displayObj()

      

    }) 
    console.log('current position');

    this.getPosition();
   
    


    // watches and logs the current user position 
    this.platform.ready().then(()=> {

      geolocation.watchPosition().subscribe((position) => {

        //get zoom of map
        console.log("position ran")
        if(this.map != undefined) {
          this.zoom = this.map.getZoom();
         
  
        }
  
        if(position.coords != undefined){
        
        this.userLat = position.coords.latitude;
        this.userLng = position.coords.longitude;
        console.log("position is " + this.userLat + " "  + this.userLng)
        
       // this.displayUserInit(); // displays user location]
       
       this.updateUser();
        
        }
       
        
      })
    })
    // geolocation.watchPosition().subscribe((position) => {

    //   //get zoom of map
    //   console.log("position ran")
    //   if(this.map != undefined) {
    //     this.zoom = this.map.getZoom();
       

    //   }

    //   if(position.coords != undefined){
      
    //   this.userLat = position.coords.latitude;
    //   this.userLng = position.coords.longitude;
    //   console.log("position is " + this.userLat + " "  + this.userLng)
      
    //  // this.displayUserInit(); // displays user location]
     
    //  this.updateUser();
      
    //   }
     
      
    // })


    
   


  }


  //loads map
  ionViewWillEnter() {
    this.loadMap();
  }

  //loads map based on current user lat and lng
  loadMap() {
  

    
    let latLng = new google.maps.LatLng(0,0);
    
 
    let mapOptions = {
      center: latLng,
      zoom: 11,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
 
    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
    this.displayUserInit() // displays the user on the map
    


    
  }

  getPosition() {
    this.geolocation.getCurrentPosition().then((position) => {

      this.userLat = position.coords.latitude;
      this.userLng = position.coords.longitude;
      console.log("position is from get " + this.userLat + " "  + this.userLng)
      this.updateUser();
    });

  }

  showRadius() {
    //let 
  }

  updateUser(){
    let position = new google.maps.LatLng(this.userLat, this.userLng);
    if(this.userMarker != undefined){
     this.userMarker.setPosition(position);
    } else {
      this.displayUserInit();
    }
  }

  displayUserInit() {
    
    if (this.userLat != undefined && this.userLng != undefined && this.map != undefined) {
      // display user on map
    let position = new google.maps.LatLng(this.userLat, this.userLng);
    this.map.setCenter(position);
    this.map.setZoom(this.zoom); // default is 11 
    

    this.userMarker = new google.maps.Marker({
      map: this.map,
      animation: null, //google.maps.Animation.DROP,
      position: position,
      title: this.userEmail,
      icon: {
        path: google.maps.SymbolPath.CIRCLE,
        strokeColor: "blue", // aqua?
        scale: 6
    }
    });
    this.markers.push(this.userMarker);
     // displays the objectives on the map
    
 

    } else {
     
      setTimeout(this.displayUserInit, 250);
    }

    
  }

  displayObj(){
    //displays the objectives on the map

  
      // display marker for each location 

      console.log('display function ran');

      this.objectivesList.forEach(element => {
       



        if(this.completedObjList.some(({Name}) => Name === element['Name'])) {

        } else{

          console.log('objective list displayed');

       // adds marker 
        let latiLong = new google.maps.LatLng(element["Lat"], element['Lng']);
       

        let marker = new google.maps.Marker({
          map: this.map,
          animation: null, //google.maps.Animation.DROP,
          position: latiLong,
          title: element["Name"],
          icon: {
            path: google.maps.SymbolPath.BACKWARD_CLOSED_ARROW,
            strokeColor: "orange",
            scale: 5

          }
        });
        this.markers.push(marker);
       

      }
      });

    //})

 


  }





  ngOnInit() {
 

    // get list of current users
    this.firestore.collection('Games').doc(this.gameId).collection('Users').snapshotChanges().subscribe(data => {
     
      this.userList = data.map( e => {
        return{
          Email: e.payload.doc.data()['Email'],
          ID: e.payload.doc.id
        }
      })
      
     
      this.checkList() // checks list user to see if they have joined the game before


      this.firestore.collection('Games').doc(this.gameId).collection('Users').doc(this.userId).get().subscribe(data => {

        this.userScore = data.data()["Score"]
      });

      // gets completed objectives
      this.firestore.collection('Games').doc(this.gameId).collection('Users').doc(this.userId).get().subscribe( data => {  //.snapshot changes
      
        this.completedObjList = data.data()["Objectives"] 
        this.displayObj()
  
      })

      
    })





  }

  checkList() {

   // checks user list to see if the user has joined the game before 

    if(this.userList != undefined){
    this.userExists = this.userList.some(({Email}) => Email === this.userEmail)
  
    }

  
    if(this.userExists != true) {
        //if the user hasn't joined the game before, create a new user 
      this.createUser() 

    } else {
      //if a user exists connect them to their account

      let user = this.userList.find(obj => {
        if(obj.Email === this.userEmail) {
          
          return obj
        } else {
          return
        }
      })
      
      this.userId = user["ID"]
         

    }
  }



  createUser() {
    // creates a new user in the game
    //creates user record
    let record = {};
    record['Email'] = this.userEmail;
    record['Score'] = 0;
    record['Objectives'] = [];


    
    // add record for user to collection
    this.firestore.collection('Games').doc(this.gameId).collection('Users').add(record).then(resp => {
      this.userId = resp.id;
      
    })


  }


  completeBtnClick(objName, objLat, objLng){
    // runs when user completes an objective
    
   

   
    // retrieves object list from firebase


    // check for distance here
    console.log("this is the distance")
    console.log(this.getDistance(objLat, objLng))
    let dist = this.getDistance(objLat, objLng)




    //if the user is within 1000 meters of objective allows them to complete it
    if(dist <= 1000){
   

      //checks if there is an objective list 
      if (this.completedObjList != undefined){
       
        this.checkObj(objName) // checks to see if the user has completed the objective

      } else {
        // addes completed objective to user and increase their score 
        this.firestore.collection('Games').doc(this.gameId).collection('Users').doc(this.userId).update({
          Score: firestore.FieldValue.increment(1),
          Objectives: firestore.FieldValue.arrayUnion({Name : objName})
        });

      }
    }
      

  }

  // returns the distance between marker and the user location
  getDistance(objLat, objLng) {
    
    return google.maps.geometry.spherical.computeDistanceBetween(new google.maps.LatLng(this.userLat, this.userLng), new google.maps.LatLng(objLat, objLng));
    
  }

  checkObj(objName) {
    //checks user to see if the objective was completed
    this.objExists = this.completedObjList.some(({Name}) => Name === objName)

    if(this.objExists) {

    } else {
      // remove object from list?

      //adds completed objective to user and increase user score by 1
      this.firestore.collection('Games').doc(this.gameId).collection('Users').doc(this.userId).update({
        Score: firestore.FieldValue.increment(1),//ieldValue.increment(1)
        Objectives: firestore.FieldValue.arrayUnion({Name : objName})
      });

    }
    return 
  }

  //navigates to scoreboard page
  scoreBtnClick() {

    // sends user name and id to score page


    //this.router.navigate(['scoreboard'], navigationExtras);
    this.navCtrl.navigateRoot(['scoreboard'], {animationDirection:'forward', state: {name: this.gameName, ID: this.gameId }});
    this.closeNav();
  }



  //navigates to chat page
  chatBtnClick() {

    // sends user name and id to chat page
    //this.router.navigate(['chat'], navigationExtras);
    this.navCtrl.navigateRoot(['chat'], {animationDirection:'forward', state: {name: this.gameName, ID: this.gameId }});
    

    this.closeNav();
    
  }

  leaveBtnClick() {

    
    this.navCtrl.navigateRoot(['login'], {animationDirection:'forward'});
    //this.router.navigate(["login"]);
    this.closeNav();

  }


  // code for side menu
  openNav() {
    document.getElementById("mySidenav").style.left = "0"; //width 85
    document.getElementById("screenCover").style.width = "85%";
  }
  closeNav() {
    document.getElementById("mySidenav").style.left= "calc(0px - 85%)";
    document.getElementById("screenCover").style.width = "0";
  }

}




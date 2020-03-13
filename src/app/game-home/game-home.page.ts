import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router, NavigationExtras} from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';

//add firebase 
import { Injectable } from '@angular/core';
import { firestore } from 'firebase';

// adds google map geolocation
import { Geolocation } from '@ionic-native/geolocation/ngx';

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
  test: any;
  userList: any[];
  userExists: boolean;
  objExists: boolean;
  completedObjList: any;
  userLat: any;
  userLng: any;
  objList: any[]; 
  zoom: any;



  // adding map 
  @ViewChild('map', { static: false }) mapElement: ElementRef;
  map: any;
  markers = [];
  
  

  constructor(private router: Router, private firestore: AngularFirestore,public afAuth: AngularFireAuth, private geolocation: Geolocation) {


   // this.userScore = 0;
    this.zoom = 11;
    // recieves game name and id from previous page
    const navigation = this.router.getCurrentNavigation();
    const state = navigation.extras.state as {
      name: string;
      ID : string;
    };
    try{
    this.gameName = state.name;
    this.gameId = state.ID;
    } catch {
      this.gameName = "Error";
      this.gameId = "jKYNMktYB2gyPomrVpFZ";
    }
    console.log("Game Name is " + this.gameName); 

    // checks to see if user is currently signed in and then gets their email and id
    if(afAuth.auth.currentUser != null) {
      this.userEmail = afAuth.auth.currentUser.email;
      this.userId = afAuth.auth.currentUser.uid; // here 
    } else {
      this.userEmail = "no Email";
      this.userId = "NlciFleq4i5wRWoeDd2D"; // give it a test case
    }
    console.log("this is email " + this.userEmail);

  
    

    // watches and logs the current user position 
    geolocation.watchPosition().subscribe((position) => {

      //get zoom of map
      console.log("position ran")
      if(this.map != undefined) {
        this.zoom = this.map.getZoom();
        console.log("zoom is " + this.map.getZoom())

      }

      if(position.coords != undefined){
      console.log("this is position " + position.coords)
      this.userLat = position.coords.latitude;
      this.userLng = position.coords.longitude;
      console.log("position is " + this.userLat + " "  + this.userLng)
      
      this.displayUser(); // displays user location]
      }
     
      
    })
    
   


  }


  //loads map
  ionViewWillEnter() {
    this.loadMap();
  }

  //loads map based on current user lat and lng
  loadMap() {
  

    
    let latLng = new google.maps.LatLng(this.userLat, this.userLng);
    
 
    let mapOptions = {
      center: latLng,
      zoom: 11,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
 
    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
    this.displayUser() // displays the user on the map
    


    
  }

  showRadius() {
    //let 
  }

  displayUser() {
    console.log("display user ran");
    if (this.map != undefined) {
      // display user on map
    let position = new google.maps.LatLng(this.userLat, this.userLng);
    this.map.setCenter(position);
    this.map.setZoom(this.zoom); // default is 11 

    // adding marker to map
    this.markers.map(marker => marker.setMap(null));
    this.markers = [];

    let latLng = new google.maps.LatLng(this.userLat, this.userLng);

    let marker = new google.maps.Marker({
      map: this.map,
      animation: null, //google.maps.Animation.DROP,
      position: latLng,
      title: this.userEmail,
      icon: {
        path: google.maps.SymbolPath.CIRCLE,
        strokeColor: "blue", // aqua?
        scale: 6
    }
    });
    this.markers.push(marker);
    this.displayObj() // displays the objectives on the map
    console.log("zoom is " + this.map.getZoom())
 

    } else {
      console.log("no location")
      setTimeout(this.displayUser, 250);
    }

    
  }

  displayObj(){
    //displays the objectives on the map

    //retrieves the collection of objectives from google firebase
    this.firestore.collection('Games').doc(this.gameId).collection('Objectives').snapshotChanges().subscribe(data => {

      this.objList = data.map( e => {
        return {
          Name: e.payload.doc.data()['Name'],
          Lat: e.payload.doc.data()['Lat'],
          Lng: e.payload.doc.data()['Lng'],
          Link: e.payload.doc.data()['Link']
        }
      })
      console.log("this is obj list")
      console.log(this.objList)

  
      // display marker for each location 

      this.objList.forEach(element => {
        console.log(element)
        console.log("logged element")

       // adds marker 
        let latiLong = new google.maps.LatLng(element["Lat"], element['Lng']);
        console.log("this is latilong")
        console.log(latiLong)

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
        console.log("markers")
        console.log(this.markers);

      });

    })

 


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
      
      console.log("this is user list");
      console.log(this.userList);
      this.checkList() // checks list user to see if they have joined the game before


      this.firestore.collection('Games').doc(this.gameId).collection('Users').doc(this.userId).get().subscribe(data => {

        this.userScore = data.data()["Score"]
      });

    })



    // sets objective list 
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

    }) 



  }

  checkList() {

   // checks user list to see if the user has joined the game before 

    if(this.userList != undefined){
    this.userExists = this.userList.some(({Email}) => Email === this.userEmail)
    console.log({Email : this.userEmail})
    console.log('does user exist' + this.userExists)
    }

  
    if(this.userExists != true) {
        //if the user hasn't joined the game before, create a new user 
      this.createUser() 

    } else {
      //if a user exists connect them to their account
      let test = this.userEmail
      console.log("this is a big ol" + test)

      let aTest = this.userList.find(obj => {
        if(obj.Email === this.userEmail) {
          console.log("ran 12")
          return obj
        } else {
          return
        }
      })
      console.log("user is " + aTest["ID"])
      this.userId = aTest["ID"]
         

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
      console.log("id is " + this.userId)
    })


  }


  completeBtnClick(objName, objLat, objLng){
    // runs when user completes an objective
    
    console.log("user email" + this.userEmail)
    console.log("USer Id is " + this.userId)

   
    // retrieves object list from firebase
    this.firestore.collection('Games').doc(this.gameId).collection('Users').doc(this.userId).get().subscribe( data => {  //.snapshot changes
      
      this.completedObjList = data.data()["Objectives"] 
     
     

    })

    // check for distance here
    console.log("this is the distance")
    console.log(this.getDistance(objLat, objLng))
    let dist = this.getDistance(objLat, objLng)




    //if the user is within 1000 meters of objective allows them to complete it
    if(dist <= 1000){
    console.log("got List")

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
    console.log("cords are " + objLat + objLng)
    console.log("cords are " +this.userLat + this.userLng)
    console.log(new google.maps.LatLng(this.userLat, this.userLng));
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
    const navigationExtras : NavigationExtras = {
      state: {
        name: this.gameName,
        ID: this.gameId
      }
    }


    this.router.navigate(['scoreboard'], navigationExtras);
    this.closeNav();
  }



  //navigates to chat page
  chatBtnClick() {

    // sends user name and id to chat page
    const navigationExtras : NavigationExtras = {
      state: {
        name : this.gameName,
        ID : this.gameId
      }
    }
    this.router.navigate(['chat'], navigationExtras);
    this.closeNav();
    
  }

  leaveBtnClick() {

    this.router.navigate(["login"]);
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




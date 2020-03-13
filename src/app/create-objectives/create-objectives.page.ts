import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router} from '@angular/router';


//allows program to retrieve the user's location
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { firestore } from 'firebase';

declare var google;

@Component({
  selector: 'app-create-objectives',
  templateUrl: './create-objectives.page.html',
  styleUrls: ['./create-objectives.page.scss'],
})
export class CreateObjectivesPage implements OnInit {

  //declare variables
  gameId : string;
  docId: string;
  public objList: any[];

  userLat: any;
  userLng: any;

  constructor(private router: Router, private firestore: AngularFirestore, private geolocation: Geolocation) { 

    // reads the current game id from the create game page
    const navigation = this.router.getCurrentNavigation();
    const state = navigation.extras.state as {
      
      ID : string;
    };
    console.log(state)

    console.log("game id is" + this.gameId)
    try{
      this.gameId = state.ID;
      console.log(this.gameId)
      
    } catch {
      this.gameId = "jKYNMktYB2gyPomrVpFZ";
      console.log(this.gameId)
    }


    //tracks and records the current user's position
    geolocation.watchPosition().subscribe((position) => {
      console.log("this is position " + position)
      this.userLat = position.coords.latitude;
      this.userLng = position.coords.longitude;
      console.log("position is " + this.userLat + " "  + this.userLng)
    })

  }

  ngOnInit() {
    console.log("gamer ID" + this.gameId)
    
    // creates a list of objectives that the game currently has from firebase
    this.firestore.collection('Games').doc(this.gameId).collection('Objectives').snapshotChanges().subscribe(data => {
      this.objList = data.map(e => {
        return {
          Name: e.payload.doc.data()['Name'],
          ID: e.payload.doc.id
        }
      })
      console.log("this is obj list")
      console.log(this.objList)
    })
   

  }

  // deletes an objective from the game's objectives storage in firebase
  deleteBtnClick(ID) {
    this.docId = ID;
    this.firestore.collection('Games').doc(this.gameId).collection('Objectives').doc(this.docId).delete().then(function() {
      console.log("Document successfully deleted!");
      this.firestore.collection('Games').doc(this.gameId).update({
        totalObjectives: firestore.FieldValue.increment(-1)
      });
   }).catch(function(error) {
      console.error("Error removing document: ", error);
    });
  
  }

  //returns user to the login page
  backBtnClick() {
    this.router.navigate(['login']);
  }


  //sets the objective to firebase with the user inputed lat and lng
  sendSetLocClick() {
    let record = {} // creates a new record


    // sets record information to the input field values
    if(this.page.Name != undefined && this.page.Lat != undefined && this.page.Lng != undefined) {
      record['Name'] = this.page.Name;
      if(this.page.Link != undefined) {
      record['Link'] = this.page.Link;
      }
      if(isNaN(parseFloat(this.page.Lat)) == false && isNaN(parseFloat(this.page.Lng)) == false){
        //checks to see if the lat and lng inputs are numbers
        record['Lat'] = parseFloat(this.page.Lat);
        record['Lng'] = parseFloat(this.page.Lng);
        
        // sets the input field to blank after the doc is added to firebase 
        this.firestore.collection('Games').doc(this.gameId).collection('Objectives').add(record).then(resp => {
        this.page.Name = "";
        this.page.Link = "";
        this.page.Lat = "";
        this.page.Lng = "";

        })
        .catch(error => {
        console.log(error);
        })
      }   
  
    
    }
  }

  //adds objective to firebase with user's current lat and lng
  sendUserLocClick() {
    let record = {} // creates new record 
    console.log("btn click")

    // sets record information to inputs if they are not undefined
    if(this.page.Name != undefined && this.userLat != undefined && this.userLng!= undefined) {
      record['Name'] = this.page.Name;
      if(this.page.Link != undefined) {
      record['Link'] = this.page.Link;
      }
      record['Lat'] = this.userLat;
      record['Lng'] = this.userLng;

      this.firestore.collection('Games').doc(this.gameId).update({
        totalObjectives: firestore.FieldValue.increment(1)
      });
   
      //sets input field to blank after adding record to firebase
      this.firestore.collection('Games').doc(this.gameId).collection('Objectives').add(record).then(resp => {
        this.page.Name = "";
        this.page.Link = "";
        this.page.Lat = "";
        this.page.Lng = "";

      })
      .catch(error => {
        console.log(error);
      })
    }

  }






  page : Page = {}

}
// allows code to retrieve input field values 
interface Page {
  Name? : String;
  Link? : String;
  Lat? : string;
  Lng? : string;

}

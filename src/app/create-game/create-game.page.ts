import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router, NavigationExtras} from '@angular/router'; 
import { Injectable } from '@angular/core';


interface Data {

  distance?: number;
}



@Injectable({
  providedIn: 'root'
})




@Component({
  selector: 'app-create-game',
  templateUrl: './create-game.page.html',
  styleUrls: ['./create-game.page.scss'],
})



export class CreateGamePage implements OnInit {

// declares variables 
student: any;
gameID: any;

game : Game = {}

data: Data = {
  distance: 1000
}; 

constructor(private firestore: AngularFirestore, private router: Router) {
  }
  
  

  ngOnInit() {
    // prints game data to console
    this.firestore.collection('Games').snapshotChanges().subscribe(data => {

      this.student = data.map(e => {
        return {
          id: e.payload.doc.id,
          Name: e.payload.doc.data()['Game Name'],
          Location: e.payload.doc.data()['Location'],
        };
      })
      console.log(this.student);
    })
  }


  // creates new game when the button is clicked
  createBtnClick() {
    //creates record with game name and location saved
    let record = {};
    record['Game Name'] = this.game.Name;
    record['Location'] = this.game.Location;
    record['totalObjectives'] = 0;

    console.log(record);

    //adds record to friebase storage 
    this.firestore.collection('Games').add(record).then(resp => {
      this.game.Name = "";
      this.game.Location = "";
      console.log("this")
      console.log(resp.id);
      this.gameID = resp.id;
      this.navigate();
    })
      .catch(error => {
        console.log(error);
      });

    


   

  }


  //navigates to the create objective page 
  navigate() {
    const navigationExtras: NavigationExtras = {
      state: {
        ID: this.gameID
      }
    }

  this.router.navigate(['create-objectives'], navigationExtras);

  }

  inputCheck() {
    if (this.data.distance > 5000 ){
      this.data.distance = 5000;
      console.log("test1")
    } else if (this.data.distance < 50 ) {
      this.data.distance = 50;
      console.log("test2")
    } else if (this.data.distance <= 5000 && this.data.distance >= 50) {
      this.data.distance = this.data.distance;
      console.log("test3")
    } else {
      this.data.distance = 1000;
    }

    console.log("this data is " + this.data.distance)
  }


}

interface Game {
  Name? : string;
  Location? : String;
}

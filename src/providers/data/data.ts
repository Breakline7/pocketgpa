import { Storage } from '@ionic/storage';
import { Injectable } from '@angular/core';
 
@Injectable()
export class Data {
 
  constructor(public storage: Storage){
 
  }
 
  getTerms() {
    return this.storage.get('classwork');  
  }
 
  saveTerms(data){
    let newData = JSON.stringify(data);
    this.storage.set('classwork', newData);
  }

  saveGPA(data) {
      let newData = JSON.stringify(data);
      this.storage.set('gpa', newData)
  }

  getGPA() {
      return this.storage.get('gpa');
  }

  saveGPALong(data) {
      let newData = JSON.stringify(data);
      this.storage.set('gpalong', newData)
  }

  getGPALong() {
      return this.storage.get('gpalong');
  }
 
}
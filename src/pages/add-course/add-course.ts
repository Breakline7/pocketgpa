import { Component } from '@angular/core';
import { IonicPage, NavController, ViewController } from 'ionic-angular';

/**
 * Generated class for the AddCoursePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-add-course',
  templateUrl: 'add-course.html',
})
export class AddCoursePage {

  title;
  grade;
  termseason;
  termyear;
  units;
  GPALong;
  GPA;
  un;
  date;
  grades;

  constructor(public navCtrl: NavController, public view: ViewController) {

      this.grades = [
          {
              letter: 'A+',
              gradepoints: 4
          },
          {
              letter: 'A',
              gradepoints: 4
          },
          {
              letter: 'A-',
              gradepoints: 3.70
          },
          {
              letter: 'B+',
              gradepoints: 3.3
          },
          {
              letter: 'B',
              gradepoints: 3.0
          },
          {
              letter: 'B-',
              gradepoints: 2.7
          },
          {
              letter: 'C+',
              gradepoints: 2.3
          },
          {
              letter: 'C',
              gradepoints: 2.0
          },
          {
              letter: 'C-',
              gradepoints: 1.7
          },
          {
              letter: 'D',
              gradepoints: 1
          },
          {
              letter: 'F',
              gradepoints: 0
          },
      ];

  }

  saveCourse() {

      let newTerm = {
          courses: [
              {
              title: this.title,
              grade: this.grade,
              units: this.units,
              id: Math.floor(Math.random() * 10000000000000001),
              },
              ],
          termseason: this.termseason,
          termyear: this.termyear,
          GPALong: this.GPALong,
          GPA: this.GPA,
          un: this.un,
          date: this.date
      };

      this.view.dismiss(newTerm);

  }

  close() {
      this.view.dismiss();
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad AddCoursePage');
  }

}

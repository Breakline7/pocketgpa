import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { Data } from '../../providers/data/data';

/**
 * Generated class for the CourseDetailPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-course-detail',
  templateUrl: 'course-detail.html',
})
export class CourseDetailPage {
    public newTerm: any;
    public newCourse: any;
    public editedTerm: any;
    public grades: any;

    constructor(public navCtrl: NavController, public navParams: NavParams, public view: ViewController, public dataService: Data) {

        this.newTerm = navParams.get('term');
        this.newCourse = navParams.get('course');
        this.editedTerm =
        [{
          termyear: this.newTerm.termyear,
          termseason: this.newTerm.termseason,
          GPALong: this.newTerm.GPALong,
          GPA: this.newTerm.GPA,
          un: this.newTerm.un,
          courses:
            [{
                title: this.newCourse.title,
                units: this.newCourse.units,
                grade: this.newCourse.grade,
                id: this.newCourse.id
            }]

        }]

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

  ionViewDidLoad() {
      console.log('ionViewDidLoad CourseDetailPage');
  }

  saveCourse(editedTerm) {
      this.view.dismiss(editedTerm);
  }

  close() {
      this.view.dismiss();
  }

}

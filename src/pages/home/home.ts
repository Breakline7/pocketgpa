import { Component, ViewChild } from '@angular/core';
import { ModalController, NavController, NavParams, Nav } from 'ionic-angular';
import { CourseDetailPage } from '../course-detail/course-detail';
import { AddCoursePage } from '../add-course/add-course';
import { SettingsPage } from '../settings/settings';
import { Data } from '../../providers/data/data';
import { ToastController } from 'ionic-angular';
import { AdMobFree, AdMobFreeBannerConfig, AdMobFreeInterstitialConfig } from '@ionic-native/admob-free';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
    @ViewChild(Nav) nav: Nav;
    public courses: any[];
    public grades: any[];
    public GPA: string;
    public newCourse: any;
    public loadedonce: boolean;
    public GPALong: number;
    public showLong: boolean = false;
    public terms: any[];

    constructor(public admob: AdMobFree, public navCtrl: NavController, public modalCtrl: ModalController, public dataService: Data, public navParams: NavParams, public toastCtrl: ToastController) {
        this.terms = [];
        this.dataService.getGPA().then((gpa) => {

            if (gpa) {
                this.GPA = JSON.parse(gpa);
            }

        });
        this.dataService.getGPALong().then((gpalong) => {

            if (gpalong) {
                this.GPALong = JSON.parse(gpalong);
            }

        });
        this.dataService.getTerms().then((classwork) => {

            if (classwork) {
                this.terms = JSON.parse(classwork);
            }

        });
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

    showBanner() {

        let bannerConfig: AdMobFreeBannerConfig = {
            //isTesting: true, // Remove in production
            autoShow: true,
            id: 'ca-app-pub-5686363028654312/1418490080'
        };

        this.admob.banner.config(bannerConfig);

        this.admob.banner.prepare().then(() => {
            // success
        });

    }

    launchInterstitial() {

        let interstitialConfig: AdMobFreeInterstitialConfig = {
            //isTesting: true, // Remove in production
            autoShow: true,
            id: 'ca-app-pub-5686363028654312/8504912616'
        };

        this.admob.interstitial.config(interstitialConfig);

        this.admob.interstitial.prepare().then(() => {
            // success
        });

    }

    openSettings() {
        console.log('open settings?')
        this.navCtrl.setRoot(SettingsPage);
    }

    toggleLong() {
        this.showLong = !this.showLong;
        console.log('showLong toggled')
    }

    precise_round(num, decimals) {
        var sign = num >= 0 ? 1 : -1;
        return (Math.round((num * Math.pow(10, decimals)) + (sign * 0.001)) / Math.pow(10, decimals)).toFixed(decimals);
    }

    calculateGPA() {
        let gpt = 0;
        let unt = 0;
        for (let i = 0; i < this.terms.length; i++) {
            gpt += Number(this.terms[i].GPALong) * Number(this.terms[i].un);
            unt += this.terms[i].un;
        }
        this.GPALong = (gpt / unt);
        this.GPA = this.precise_round(this.GPALong, 2);
        this.dataService.saveGPA(this.GPA);
        this.dataService.saveGPALong(this.GPALong);
        console.log(this.GPA);
    }

    calculateSemester(term) {
        let gpt: number = 0;
        let un: number = 0;
        for (let i = 0; i < term.courses.length; i++) {
            gpt += (this.gradePointFinder(term.courses[i].grade) * Number(term.courses[i].units));
            un += (Number(term.courses[i].units));
        }
        term.GPALong = (gpt / un);
        term.GPA = this.precise_round(term.GPALong, 2);
        term.un = un;
        for (let i = 0; i < this.terms.length; i++) {
            if (this.terms[i].termseason == term.termseason && this.terms[i].termyear == term.termyear) {
                this.terms.splice(i, 1, term);
            }
        }
        console.log(term.GPA);
        this.dataService.saveTerms(this.terms);
    }

    randomIntFromInterval(min, max) {
        // returns random number between two parameters
        return Math.floor(Math.random() * (max - min + 1) + min);

    }

    ionViewDidLoad() {
    }

    ionViewDidEnter() {
        console.log(this.terms);
    }

    addCourse() {

        let addModal = this.modalCtrl.create(AddCoursePage);

        addModal.onDidDismiss((term) => {
            if (this.randomIntFromInterval(1, 5) == 3) {
                this.launchInterstitial();
            }
            if (term) {
                let month: number;
                switch (term.termseason) {
                    case 'Spring': month = 1;
                        break;
                    case 'Summer': month = 6;
                        break;
                    case 'Fall': month = 8;
                        break;
                    case 'Winter': month = 12;
                        break;
                }
                let d = new Date(Number(term.termyear), month);
                term.date = d.toString();
                this.saveItem(term);
            }
        });

        addModal.present();

    }

    saveNotification() {
        
        let toast = this.toastCtrl.create({
            message: 'Your course has been saved.',
            duration: 1000,
            position: 'top',
            showCloseButton: true,
            closeButtonText: 'Got it',
            dismissOnPageChange: true
        });
        toast.present();

    }

    saveItem(term) {
        for (let i = 0; i < this.terms.length; i++) {
            if (this.terms[i].termseason == term.termseason && this.terms[i].termyear == term.termyear) {
                this.terms[i].courses.push(term.courses[0]);
                this.calculateSemester(this.terms[i]);
              break;
            } else if (i == this.terms.length - 1) {
                this.terms.push(term);
                this.calculateSemester(this.terms[(i + 1)]);
                this.terms = this.dataSort(this.terms);
                break;
            }
        }
        if (this.terms.length == 0) {
            this.terms = [{
                GPALong: term.GPALong,
                GPA: term.GPA,
                termseason: term.termseason,
                termyear: term.termyear,
                un: term.un,
                date: term.date,
                courses: term.courses
            }]
            this.calculateSemester(this.terms[0]);
        }
      this.calculateGPA();
      this.saveNotification();
      this.dataService.saveTerms(this.terms);
      console.log(this.terms);
    }

    dataSort(terms) {
        console.log(terms);
        return terms.sort(function (a, b) { return new Date(b.date).getTime() - new Date(a.date).getTime()  });
    }

  courseSelected(term, course) {
      let detailModal = this.modalCtrl.create(CourseDetailPage, { term: term, course: course });

      detailModal.onDidDismiss((editedTerm) => {
          if (this.randomIntFromInterval(1, 5) == 3) {
              this.launchInterstitial();
          }
          if (editedTerm) {
              if (term.termseason == editedTerm[0].termseason && term.termyear == editedTerm[0].termyear) { // the event that the old term is the same as the edited term
                  for (let i = 0; i < this.terms.length; i++) {
                      if (this.terms[i].termseason == term.termseason && this.terms[i].termyear == term.termyear) { // find and enter the term in the actual terms array
                          for (let j = 0; j < this.terms[i].courses.length; j++) { 
                              if (this.terms[i].courses[j].id == editedTerm[0].courses[0].id) { // find and enter the actual courses array
                                  this.terms[i].courses.splice(j, 1, editedTerm[0].courses[0]); // splice in the edited course
                                  this.calculateSemester(this.terms[i]);
                                  this.saveNotification();
                                  this.dataService.saveTerms(this.terms);
                                  break;
                              }
                          }
                          break;
                      }
                  }
              } else { // the event that the edited course is now part of a different term
                  for (let i = 0; i < this.terms.length; i++) {
                      console.log('in the removal for loop');
                      if (this.terms[i].termseason == term.termseason && this.terms[i].termyear == term.termyear) { // identify old term
                          console.log('identified old term');
                          for (let j = 0; j < this.terms[i].courses.length; j++) {
                              if (this.terms[i].courses[j].id == course.id) { // identify old course version
                                  this.terms[i].courses.splice(j, 1); // remove old course version
                                  console.log('old term course removed');
                                  if (this.terms[i].courses.length == 0) {
                                      this.terms.splice(i, 1); // if empty, remove term
                                  }
                                  break;
                              }
                          }
                          break;
                      }
                  }
                  for (let i = 0; i < this.terms.length; i++) {
                      if (this.terms[i].termseason == editedTerm[0].termseason && this.terms[i].termyear == editedTerm[0].termyear) {
                          this.terms[i].courses.push(editedTerm[0].courses[0]);
                          console.log('edited course added to appropriate term');
                          this.calculateSemester(this.terms[i]);
                          this.dataService.saveTerms(this.terms);
                          break;
                      } else if (i == this.terms.length - 1) {
                          console.log('different term DNE, pushing editedTerm');
                          this.terms.push(editedTerm[0]);
                          this.calculateSemester(this.terms[(i + 1)]);
                          this.terms = this.dataSort(this.terms);
                          this.dataService.saveTerms(this.terms);
                          break;
                      }
                  }
              }
              this.calculateGPA();
          }
      })

      detailModal.present();

  }

  gradePointFinder(grade) {
      for (let j = 0; j < this.grades.length; j++) {
          if (this.grades[j].letter == grade) {
              return this.grades[j].gradepoints;
          }
      }
  }

  removeCourse(term, course) {
      for (let i = 0; i < this.terms.length; i++) {

          if (this.terms[i].termseason == term.termseason && this.terms[i].termyear == term.termyear) {

              for (let j = 0; j < this.terms[i].courses.length; j++) {

                  if (this.terms[i].courses[j].id == course.id) {
                      this.terms[i].courses.splice(j, 1);
                      this.calculateSemester(this.terms[i]);
                      if (this.terms[i].courses.length == 0) {
                          this.terms.splice(i, 1); // if empty, remove term
                      }
                      break;
                  }

              }
              this.calculateGPA();
              this.dataService.saveTerms(this.terms);
              break;
          }
      }
  }
}
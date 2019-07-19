import { Injectable } from '@angular/core';
import { Student } from '../entities/student.model';  // Student data type interface class
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database';  // Firebase modules for Database, Data list and Single object
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms'; // Reactive form services

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  studentList: AngularFireList<any>; 
     // Reference to Student data list, its an Observable
  student: AngularFireObject<any>;
  public studentForm: FormGroup;
  
  public choixmenu :number = 1;

  constructor(private db: AngularFireDatabase)
   {  this.studentList = db.list('students')}
  AddStudent(info: Student) {
    this.studentList.push(
      {
        mat: info.mat,
        nom: info.nom,
        classe: info.classe,
        tel: info.tel,
        email: info.email
      }
      );  
  }
 

  // Fetch Single Student Object
  GetStudent(id: string) {
    this.student = this.db.object('students/' + id);
    return this.student;
  }

  // Fetch Students List
  GetStudentsList() {
    this.studentList = this.db.list('students');
    return this.studentList;
  }  
 
 

  // Update Student Object
  UpdateStudent(info: Student) {
    this.studentList.update(info.$key,
      { mat: info.mat,
        nom: info.nom,
        classe: info.classe,
        tel: info.tel,
        email: info.email
      });
        
  }  

  // Delete Student Object
  DeleteStudent(id: string) { 
    this.student = this.db.object('students/'+id);
    this.student.remove();
  }
  
}

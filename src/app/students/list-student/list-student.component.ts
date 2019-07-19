import { Component, OnInit } from '@angular/core';
import { StudentService } from '../../service/student.service';    // CRUD services API
import { ToastrService } from 'ngx-toastr'; 
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, ReactiveFormsModule,Validators }
from '@angular/forms';
import { Student } from '../../entities/student.model';  // Student data type interface class
@Component({
  selector: 'app-list-student',
  templateUrl: './list-student.component.html',
  styleUrls: ['./list-student.component.css']
})
export class ListStudentComponent implements OnInit {
  studentList: Student[];
  p: number = 1;
  constructor(public crudApi: StudentService,public toastr: ToastrService,
    private router :Router,private fb: FormBuilder) { }
  
  ngOnInit() {
    this.getStudentList();
  }

  getStudentList()
  {
   var x = this.crudApi.GetStudentsList();
    x.snapshotChanges().subscribe(item => {
      this.studentList = [];
      item.forEach(element => {
        var y = element.payload.toJSON();
        y["$key"] = element.key;
        this.studentList.push(y as Student);
      }); 
   });
  }

  selectStudent(student :Student){
  
    this.crudApi.choixmenu = 2;
    this.crudApi.studentForm = this.fb.group(Object.assign({},student));
    this.router.navigate(['/student']);
  }

  deleteStudent(student) {
    if (window.confirm('Are sure you want to delete this student ?')) 
    { 
      this.crudApi.DeleteStudent(student.$key) 
      this.toastr.success(student.nom + ' successfully deleted!'); 
    }
  }

}

import { Component, OnInit } from '@angular/core';
import { StudentService } from '../../service/student.service';    // CRUD services API
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms'; // Reactive form services
import { ToastrService } from 'ngx-toastr'; // Alert message using NGX toastr
import { Router } from '@angular/router';
@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.css']
})
export class AddStudentComponent implements OnInit {
  
  constructor(public crudApi: StudentService, 
    public fb: FormBuilder,private router :Router,public toastr: ToastrService) { }

  ngOnInit() {
    if (this.crudApi.choixmenu == 1)
    {
      this.studenForm(); 
    }
    
}
  
resetForm() {
  this.crudApi.studentForm.reset();
  
  } 

studenForm() {
  this.crudApi.studentForm = this.fb.group({
    $key: null,
    mat: ['', [Validators.required, Validators.minLength(2)]],
    nom: ['', [Validators.required, Validators.minLength(2)]],
    adresse: [''],
    classe: [''],
    email: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')]],
    tel: ['', [Validators.required, Validators.pattern('^[0-9]+$')]]
  })  
}
  
  addStudent() {
   if (this.crudApi.studentForm.get('$key').value ==  null)
   {
    this.crudApi.AddStudent(this.crudApi.studentForm.value); // Submit student data using CRUD API
    this.toastr.success(this.crudApi.studentForm.controls['nom'].value + ' successfully added!'); // Show success message when data is successfully submited
  
    }
    else
    {
      this.crudApi.UpdateStudent(this.crudApi.studentForm.value); // Submit student data using CRUD API
      this.toastr.success(this.crudApi.studentForm.controls['nom'].value + ' successfully modified!'); // Show success message when data is successfully submited
    }
    this.resetForm();  // Reset form when clicked on reset button
    this.router.navigate(['/students']);
   };


}
 
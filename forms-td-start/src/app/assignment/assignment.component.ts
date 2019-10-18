import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-assignment',
  templateUrl: './assignment.component.html',
  styleUrls: ['./assignment.component.css']
})
export class AssignmentComponent implements OnInit {
 @ViewChild('form', {static: false}) submitForm: NgForm;
  defaultExperience = 'advanced';
  submitted = false;
  submittedData = {
    email: '',
    experience: '',
    password: ''
  };

  constructor() { }

  ngOnInit() {
  }

  onSubmit() {
    this.submittedData.email = this.submitForm.value.submitGroup.email;
    this.submittedData.experience = this.submitForm.value.submitGroup.experience;
    this.submittedData.password = this.submitForm.value.submitGroup.password;
    this.submitted = true;
    this.submitForm.reset();
  }

}

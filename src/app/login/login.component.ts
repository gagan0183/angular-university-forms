import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  value = {
    email: 'test@test.com',
    password: 'admin123'
  }
  constructor() {
  }

  ngOnInit() {
  }

  login(loginForm: NgForm, event) {
    console.log(this.value);
  }

  emailChanged(value) {
    console.log(value);
  }
}

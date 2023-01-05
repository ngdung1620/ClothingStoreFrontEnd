import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {LoginService} from "../../services/login.service";
import {NzNotificationService} from "ng-zorro-antd/notification";
import {Router} from "@angular/router";
import {LoginRequest} from "../../models/loginModel";

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.scss']
})
export class LogInComponent implements OnInit {

  dataForm!: FormGroup;
  constructor(private fb: FormBuilder,
              private loginService: LoginService,
              private notification: NzNotificationService,
              private route: Router) { }

  ngOnInit(): void {
    this.dataForm = this.fb.group({
      email: [null,[Validators.email,Validators.required]],
      password: [null,Validators.required]
    })
  }

  handleSubmit() {
    if (this.dataForm.valid) {
      const data: LoginRequest = {
        email: this.dataForm.value.email,
        password: this.dataForm.value.password
      }
      this.loginService.logIn(data).subscribe(res => {
        if(res.status == -1) {
          this.notification.error("Thất bại", res.message);
          return;
        }
        this.notification.success("Thành công",res.message);
        console.log(res.token)
        this.route.navigate(['']);

      })
    } else {
      Object.values(this.dataForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

}

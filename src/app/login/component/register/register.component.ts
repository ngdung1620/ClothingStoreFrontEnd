import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  UntypedFormControl,
  ValidationErrors,
  ValidatorFn,
  Validators
} from "@angular/forms";
import {NzNotificationService} from "ng-zorro-antd/notification";
import {LoginService} from "../../services/login.service";
import {RegisterRequest} from "../../models/RegisterModel";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  validateForm!: FormGroup;
  constructor(private fb: FormBuilder,
              private notification: NzNotificationService,
              private loginService: LoginService,
  ) { }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      fullName: [null, [Validators.required]],
      gender: [null, [Validators.required]],
      doB: [null, [Validators.required,this.validatorDate]],
      address: [null, [Validators.required]],
      phoneNumber: [null, [Validators.required]],
      email: [null, [Validators.email, Validators.required]],
      password: [null, [Validators.required,this.createPasswordStrengthValidator(),Validators.minLength(6)]],
      checkPassword: [null, [Validators.required, this.confirmationValidator]],
    });
  }
  createPasswordStrengthValidator(): ValidatorFn {
    return (control:AbstractControl) : ValidationErrors | null => {

      const value = control.value;

      if (!value) {
        return null;
      }

      const hasUpperCase = /[A-Z]+/.test(value);

      const hasLowerCase = /[a-z]+/.test(value);

      const hasNumeric = /[0-9]+/.test(value);

      const hasSpecialChar = /[!@#$%^&*]+/.test(value);

      const passwordValid = hasUpperCase && hasLowerCase && hasNumeric && hasSpecialChar;

      return !passwordValid ? {passwordStrength:true}: null;
    }
  }

  confirmationValidator = (control: UntypedFormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return { required: true };
    } else if (control.value !== this.validateForm.controls['password'].value) {
      return { confirm: true, error: true };
    }
    return {};
  };
  validatorDate = (control: UntypedFormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return { required: true };
    } else if ((new Date()).getFullYear() - (new Date(control.value)).getFullYear() < 16) {
      return { c: true, error: true };
    }
    return {};
  };

  updateConfirmValidator() {
    Promise.resolve().then(() => this.validateForm.controls['checkPassword'].updateValueAndValidity());
  }

  submitForm() {
    if (this.validateForm.valid) {
      const data: RegisterRequest = {
        fullName: this.validateForm.value.fullName,
        gender: this.validateForm.value.gender,
        doB: this.validateForm.value.doB,
        phoneNumber: this.validateForm.value.phoneNumber,
        email: this.validateForm.value.email,
        password: this.validateForm.value.password,
        address: this.validateForm.value.address,
        roles: ['Member']
      }
      this.loginService.registerAccount(data).subscribe(res => {
        if(res.status == -1) {
          this.notification.error("Thất bại", res.message);
          return;
        }
        this.notification.success("Thành công", res.message);
        this.validateForm.reset();

      })
    } else {
      Object.values(this.validateForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

}

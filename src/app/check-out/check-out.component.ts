import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {CheckOutService} from "./services/check-out.service";

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.scss']
})
export class CheckOutComponent implements OnInit {
  formData!: FormGroup;
  listDataProvince!: any;
  listDataDistrict!: any;
  listDataWard!: any;
  constructor(private fb: FormBuilder,
              private checkOutService: CheckOutService ) { }

  ngOnInit(): void {
    this.formData = this.fb.group({
      fullName: [null,[Validators.required]],
      phoneNumber: [null,[Validators.required,this.numberValidator]],
      province:[null,[Validators.required]],
      district:[null,[Validators.required]],
      ward: [null,[Validators.required]],
      address: [null,[Validators.required]],
    })
    this.checkOutService.getProvinces().subscribe(res => {
      this.listDataProvince = res;
    })

  }
  numberValidator = (control: FormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return { required: true };
    } else if (!control.value.toString().match(/^[0-9]+(\.?[0-9]+)?$/)) {
      return { invalidNumber: true, error: true };
    }
    return {};
  };
  submitForm(): void {
    if (this.formData.valid) {
      let province = this.listDataProvince.find((p:any) => p.code == this.formData.value.province);
      let district = this.listDataDistrict.find((p:any) => p.code == this.formData.value.district);
      let ward = this.listDataWard.find((p:any) => p.code == this.formData.value.ward);
      console.log(province.name + district.name + ward.name);

    } else {
      Object.values(this.formData.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  handleChangeProvince(e: any) {
    this.checkOutService.getDistrict(e).subscribe( res => {
      this.listDataDistrict = res.districts;
    })
    this.formData.controls['district'].setValue('');
    this.formData.controls['ward'].setValue('');
  }

  handleChangeDistrict(e: any) {
    this.checkOutService.getWard(e).subscribe(res => {
      this.listDataWard = res.wards;
    })
    this.formData.controls['ward'].setValue('');
  }
}

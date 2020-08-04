import { AuthService } from './../../login/auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  form: FormGroup;
  imagePreview;
  file: File;
  constructor(private authservice: AuthService) { }

  ngOnInit() {
    this.form = new FormGroup({
      firstName: new FormControl(null, { validators: [Validators.required] }),
      lastName: new FormControl(null, { validators: [Validators.required] }),
      email: new FormControl(null, { validators: [Validators.required] }),
      password: new FormControl(null, { validators: [Validators.required, Validators.minLength(5)] }),
      gender: new FormControl(null, { validators: [Validators.required] }),
      jobRole: new FormControl(null, { validators: [Validators.required] }),
      dept: new FormControl(null, { validators: [Validators.required] }),
      address: new FormControl(null, { validators: [Validators.required] }),
      image: new FormControl(null, { validators: [Validators.required] })
    });
  }

  registerUser() {
    const data = this.toFormData(this.form.value);
    console.log(data);
    this.authservice.registerUser(data).subscribe(
      res => console.log(res),
      err => console.log(err)
    );
  }

  onImagePicked(event: Event) {
    console.log(event);
    this.file = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({ image: this.file });
    this.form.get('image').updateValueAndValidity();
    console.log(this.form);
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result;
    };
    reader.readAsDataURL(this.file);
  }

  public toFormData<T>(formValue: T) {
    const formData = new FormData();
    for (const key of Object.keys(formValue)) {
      const value = formValue[key];
      formData.append(key, value);
      console.log(key, value);
    }
    return formData;
  }
}

import { Component } from '@angular/core';
import {FormGroup,FormControl,Validators} from '@angular/forms'

@Component({
  selector: 'signup-form',
  templateUrl: './signup-form.component.html',
  styleUrls: ['./signup-form.component.css']
})
export class SignupFormComponent {
  form=new FormGroup({
    username:new FormControl('',[
      Validators.required,
      Validators.minLength(3)
    ]),
    password:new FormControl('',[
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(12),
      Validators.pattern(/(?=.\d)[A-Za-z\d]{8,12}/)
    //  Validators.nullValidator
     
    ]),
    email:new FormControl('',[
      Validators.required,
      Validators.email
    ])
   
  });

  login()
  {
  //  let isValid= authService.login(this.form.value);
  //  if(!isValid)
  // //  {
  //     this.form.setErrors({
  //       invalidLogin:true
  //   })
  //  }


  }

  get username()
  {
    return this.form.get('username')
  }
  get email()
  {
    return this.form.get('email')
  }
  get password()
  {
    return this.form.get('password')
  }


}


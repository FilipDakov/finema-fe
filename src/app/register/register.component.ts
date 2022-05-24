import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { AuthenticationService } from 'src/security/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  error = '';
  passwordNotEquality = false;
  passwordIsInvalid = false;
  emailIsInvalid = false;

  constructor(private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
     private authenticationService: AuthenticationService
    ) { }
  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      passwordConfirm:['',Validators.required]
  });

  // get return url from route parameters or default to '/'
  this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  get f() { return this.loginForm.controls; }

  onSubmit(){
    this.submitted = true;
    this.passwordNotEquality = false;
    this.passwordIsInvalid = false;
    this.emailIsInvalid = false;

      // stop here if form is invalid
      if (this.loginForm.invalid) {
          return;
      }
      let emailRegEx =/^([\w-\.]+){1,64}@([\w&&[^_\]]+){2,255}.[a-z]{2,}$/;
      if(!emailRegEx.test(this.f.username.value)){
        this.emailIsInvalid = true;
        return;
      }

      let passwordRegEx = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&+=])(?=\S+$).{6,}/;
      if(!passwordRegEx.test(this.f.password.value)){
        this.passwordIsInvalid = true;
        return;
      }


      if(this.f.password.value != this.f.passwordConfirm.value){
        this.passwordNotEquality = true;
        return;
      }

      this.loading = true;
      this.authenticationService.signup(this.f.username.value, this.f.password.value)
          .pipe(first())
          .subscribe(
              data => {
                  this.router.navigate([this.returnUrl]);
              },
              error => {
                  this.error = "Invalid email or password";
                  this.loading = false;
              });
  }

}

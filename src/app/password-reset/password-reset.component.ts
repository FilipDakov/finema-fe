import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { AuthenticationService } from 'src/security/auth.service';



@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.css']
})
export class PasswordResetComponent implements OnInit {

  loginForm: FormGroup;
  loading = false;
  submitted = false;
  error = '';
  success = '';
  passwordNotEquality = false;
  passwordIsInvalid = false;

  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private authenticationService: AuthenticationService,
    private http: HttpClient, @Inject('BACKEND_URL') private backendUrl: string,
    private route: ActivatedRoute
  ) { }
  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      password: ['', Validators.required],
      passwordConfirm: ['', Validators.required]
    });

  }

  get f() { return this.loginForm.controls; }


  onSubmit() {
    this.submitted = true;
    this.passwordNotEquality = false;
    this.passwordIsInvalid = false;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }
    let password = this.f.password.value;
    let passwordRegEx = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&+=])(?=\S+$).{6,}/;
    if (!passwordRegEx.test(password)) {
      this.passwordIsInvalid = true;
      return;
    }


    if (password != this.f.passwordConfirm.value) {
      this.passwordNotEquality = true;
      return;
    }

    let email = "";
    let passResetToken = "";

    this.route.queryParams.subscribe(params => {
      email = params['email'];
      passResetToken = params['token'];
    });

    this.loading = true;
    this.http.post<any>(`${this.backendUrl}/resetPassword`, { email, password, passResetToken })
      .subscribe(
        data => {
          this.success = "password changed successfully";
          this.loading = false;
        },
        error => {
          console.log(error)
          this.error = "error in changing";
          this.loading = false;
        });

    // this.authenticationService.signup(this.f.username.value, this.f.password.value)
    // .pipe(first())
    // .subscribe(
    //     data => {
    //         console.log("password changed successfully")
    //     },
    //     error => {
    //         this.error = "error in changing";
    //         this.loading = false;
    //     });

  }

}

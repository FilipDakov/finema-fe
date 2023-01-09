import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { AuthenticationService } from 'src/security/auth.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    // constructor() { }

    // ngOnInit(): void {
    // }

    loginForm: FormGroup;
    loading = false;
    submitted = false;
    returnUrl: string;
    error = '';
    incorrectEmail = false;
    recoveryEmail: string;
    emailSend = false;
    success = '';
    loadingEmail = false;

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService,
        private http: HttpClient,
        @Inject('BACKEND_URL') private backendUrl: string,
    ) {
        // redirect to home if already logged in
        if (this.authenticationService.currentUserValue) {
            this.router.navigate(['/']);
        }
    }

    ngOnInit() {
        this.loginForm = this.formBuilder.group({
            username: ['', Validators.required],
            password: ['', Validators.required]
        });

        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }

    // convenience getter for easy access to form fields
    get f() { return this.loginForm.controls; }

    onSubmit() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.loginForm.invalid) {
            return;
        }

        this.loading = true;
        this.authenticationService.login(this.f.username.value, this.f.password.value)
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

    sendEmail() {
        let emailRegEx = /^([\w-\.]+){1,64}@([\w&&[^_\]]+){2,255}.[a-z]{2,}$/;
        this.emailSend = false;
        if (!emailRegEx.test(this.recoveryEmail)) {
            this.incorrectEmail = true;
            this.emailSend = false;
            return;
        }
        this.incorrectEmail = false;
        let url = "/emailSend?userEmail=" +  this.recoveryEmail;
        this.loadingEmail = true;
        this.http.get(this.backendUrl.concat(url)).subscribe(el => {
            this.emailSend = true;
            this.loadingEmail = false;
        });
    }

}

import { Page } from "tns-core-modules/ui/page";

import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

import { User } from "../shared/user/user.model";
import { UserService } from "../shared/user/user.service";

@Component({
    selector: "gr-login",
    templateUrl: "login/login.component.html",
    styleUrls: ["login/login.component.css"],
    providers: [UserService]
})
export class LoginComponent implements OnInit {
    isLoading = false;

    constructor(private router: Router, private page: Page, private userService: UserService) {
        this.user = new User();
        this.user.email = "blu";
        this.user.password = "aaaa";
    }

    ngOnInit() {
        this.page.actionBarHidden = true;
    }

    user: User;
    isLoggingIn = true;

    submit() {
        if (this.isLoggingIn) {
            this.login();
        } else {
            this.signUp();
        }
    }

    login() {
        this.isLoading = true;
        this.userService.login(this.user)
            .subscribe(
                () => {
                    this.router.navigate(["/list"]);
                    this.isLoading = false;
                },
                (error) => alert("Unfortunately we could not find your account.")
            );
    }

    signUp() {
        this.userService.register(this.user)
            .subscribe(
                () => {
                    alert("Your account was successfully created.");
                    this.toggleDisplay();
                },
                () => alert("Unfortunately we were unable to create your account.")
            );
    }

    toggleDisplay() {
        this.isLoggingIn = !this.isLoggingIn;
    }
}
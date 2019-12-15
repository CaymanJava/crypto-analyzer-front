import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { AuthService } from "../../../core/auth/auth.service";
import { TokenService } from "../../../core/auth/token.service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: 'app-auth-callback',
  templateUrl: './auth-callback.component.html',
  styleUrls: ['./auth-callback.component.scss']
})
export class AuthCallbackComponent implements OnInit {

  completeDataMode = false;
  submitted = false;
  completeDataForm: FormGroup;
  memberId: number;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private authService: AuthService,
              private fb: FormBuilder,
              private tokenService: TokenService) {
  }

  ngOnInit() {
    this.initForm();
    this.authService.processSocialAccess(this.route.snapshot.queryParams.state, this.route.snapshot.queryParams.code)
      .subscribe((result) => {
        if (result.accessToken) {
          this.tokenService.setTokens(result);
          window.close();
        } else {
          this.completeDataMode = true;
          this.memberId = result.memberId;
          this.completeDataForm.patchValue({
            name: result.name,
            surname: result.surname,
            email: result.email,
            phone: result.phone,
            avatarUrl: result.avatarUrl
          });
        }
      })
  }

  onSubmit() {
    this.submitted = true;
    this.authService.completeSocialTokenProcess(this.memberId, this.buildMemberUpdateRequest())
      .subscribe(result => {
        if (result.accessToken) {
          this.tokenService.setTokens(result);
        }
        window.close();
      })
  }

  private buildMemberUpdateRequest() {
    return {
      email: this.completeDataForm.get('email').value,
      phone: this.completeDataForm.get('phone').value,
      name: this.completeDataForm.get('name').value,
      surname: this.completeDataForm.get('surname').value
    };
  }

  private initForm() {
    this.completeDataForm = this.fb.group({
      name: ['', Validators.required],
      surname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      avatarUrl: [''],
    });
  }

}

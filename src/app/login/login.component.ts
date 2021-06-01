import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public loginForm: FormGroup;
  public loading = false;
  public submitted = false;
  public error = '';

  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private loginService: LoginService) {

    if (this.loginService.userValue) {
      this.router.navigate(['produtos']);
    }

    this.loginForm = this.formBuilder.group({
      usuario: ['', Validators.required],
      senha: ['', Validators.required]
    });
  }

  ngOnInit() {
  }

  get controls() { return this.loginForm.controls; }

  onSubmit() {
    this.submitted = true;

    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;

    this.loginService.login(this.controls.usuario.value, this.controls.senha.value)
      .pipe(first())
      .subscribe(
        resposta => {
          if (resposta.success) {
            this.router.navigate(['produtos']);
            return;
          }

          this.error = 'Usuário e/ou senha inválidos!';
          this.loading = false;
        },
        error => {
          this.error = error;
          this.loading = false;
        });
  }

}

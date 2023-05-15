import { Component, OnInit } from '@angular/core';

import { UsuarioService } from '../usuario.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  form: FormGroup;

  constructor(
    public usuarioService: UsuarioService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      nome:  new FormControl('', [ Validators.required, Validators.pattern('^[a-zA-ZÁáÀàÉéÈèÍíÌìÓóÒòÚúÙùÑñüÜ \-\']+') ]),
      data_nascimento: new FormControl('', [Validators.required, Validators.pattern(/^\d{4}-\d{2}-\d{2}$/)]),
      cep: new FormControl('', [ Validators.required, Validators.pattern("^[0-9]{5}-[0-9]{3}$") ])
    });
  }

  get f(){
    return this.form.controls;
  }

  submit(){
    console.log(this.form.value);
    this.usuarioService.create(this.form.value).subscribe(res => {
         console.log('Person created successfully!');
         this.router.navigateByUrl('usuario/index');
    })
  }

}

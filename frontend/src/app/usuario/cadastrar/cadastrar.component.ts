import { Component } from '@angular/core';

import { UsuarioService } from '../usuario.service';
//import { CepService } from '../cep.service';
import { VerificaIdadeService } from 'src/app/servico/verifica-idade.service';
import { VerificaCepService } from 'src/app/servico/verifica-cep.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators, AsyncValidatorFn } from '@angular/forms';

@Component({
  selector: 'app-cadastrar',
  templateUrl: './cadastrar.component.html',
  styleUrls: ['./cadastrar.component.css']
})
export class CadastrarComponent {
  form: FormGroup;

  constructor(
    public usuarioService: UsuarioService,
    public verificaIdadeService: VerificaIdadeService,
    //public cepService: CepService,
    public verificaCepService: VerificaCepService,
    private router: Router
  ) { }

  ngOnInit(): void {
    // Declaração da função validarCepAmazonas
    const validarCepAmazonas = (control: FormControl) => {
      const cep = control.value;

      // Verifica se o CEP possui o formato válido
      const cepValido = /^[0-9]{5}-[0-9]{3}$/.test(cep);

      if (!cepValido) {
        return Promise.resolve({ cepInvalido: true });
      }

      // Utiliza a API do ViaCEP para verificar o estado do CEP
      return this.verificaCepService.validarCep(cep).toPromise()
        .then((data: any) => {
          if (data.erro) {
            return { cepInvalido: true };
          } else if (data.uf !== 'AM') {
            return { cepNaoAmazonas: true };
          } else {
            return null;
          }
        });
    };

    this.form = new FormGroup({
      nome: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-ZÁáÀàÉéÈèÍíÌìÓóÒòÚúÙùÑñüÜ \-\']+')]),
      data_nascimento: new FormControl('', [Validators.required, Validators.pattern(/^\d{4}-\d{2}-\d{2}$/), this.verificaIdadeService.idadeMinimaValidator]),
      cep: new FormControl('', [Validators.required, Validators.pattern("^[0-9]{5}-[0-9]{3}$")], validarCepAmazonas)
    });
 
  }

  get f() {
    return this.form.controls;
  }

  submit() {
    console.log(this.form.value);
    this.usuarioService.create(this.form.value).subscribe(res => {
      console.log('Usuario cadastrado com sucesso!');
      this.router.navigateByUrl('usuario/listar');
    });
  }
}


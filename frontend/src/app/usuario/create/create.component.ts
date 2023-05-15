import { Component, OnInit } from '@angular/core';

import { UsuarioService } from '../usuario.service';
import { CepService } from '../cep.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators, AsyncValidatorFn } from '@angular/forms';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})


export class CreateComponent implements OnInit {

  form: FormGroup;

  constructor(
    public usuarioService: UsuarioService,
    public cepService: CepService,
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
      return this.cepService.validarCep(cep).toPromise()
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
      data_nascimento: new FormControl('', [Validators.required, Validators.pattern(/^\d{4}-\d{2}-\d{2}$/), idadeMinimaValidator]),
      cep: new FormControl('', [Validators.required, Validators.pattern("^[0-9]{5}-[0-9]{3}$")], validarCepAmazonas)
    });

    function idadeMinimaValidator(control: FormControl) {
      // Obtém a data de nascimento do campo
      const dataNascimento = new Date(control.value);

      // Obtém a data atual
      const dataAtual = new Date();

      // Calcula a diferença de idade em anos
      const diferencaAnos = dataAtual.getFullYear() - dataNascimento.getFullYear();

      // Verifica se a idade é menor que 18 anos
      if (diferencaAnos < 18) {
        // Retorna a validação personalizada
        return {
          idadeMinima: {
            valid: false
          }
        };
      }

      // A idade é válida, retorna null (sem erros)
      return null;
    }
  }

  get f() {
    return this.form.controls;
  }

  submit() {
    console.log(this.form.value);
    this.usuarioService.create(this.form.value).subscribe(res => {
      console.log('Person created successfully!');
      this.router.navigateByUrl('usuario/index');
    });
  }
}

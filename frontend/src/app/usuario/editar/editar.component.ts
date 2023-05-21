import { Component } from '@angular/core';

import { UsuarioService } from '../usuario.service';
import { VerificaIdadeService } from 'src/app/servico/verifica-idade.service';
import { VerificaCepService } from 'src/app/servico/verifica-cep.service'; 
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { Usuario } from '../usuario';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html',
  styleUrls: ['./editar.component.css']
})
export class EditarComponent {
  id: number;
  usuario: Usuario;
  form: FormGroup;

  constructor(
    public usuarioService: UsuarioService,
    public verificaIdadeService: VerificaIdadeService,
    public verificaCepService: VerificaCepService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['idUsuario'];
    
    this.usuarioService.find(this.id).subscribe((data: Usuario)=>{
      this.usuario = data;
    });

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
      nome:  new FormControl('', [ Validators.required, Validators.pattern('^[a-zA-ZÁáÀàÉéÈèÍíÌìÓóÒòÚúÙùÑñüÜ \-\']+') ]),
      data_nascimento: new FormControl('', [Validators.required, Validators.pattern(/^\d{4}-\d{2}-\d{2}$/), this.verificaIdadeService.idadeMinimaValidator]),
      cep: new FormControl('', [Validators.required, Validators.pattern("^[0-9]{5}-[0-9]{3}$")], validarCepAmazonas)
    });
 
  }

  get f(){
    return this.form.controls;
  }

  submit(){
    console.log(this.form.value);
    this.usuarioService.update(this.id, this.form.value).subscribe(res => {
         console.log('Usuário atualizado com sucesso!');
         this.router.navigateByUrl('usuario/listar');
    })
  }


}




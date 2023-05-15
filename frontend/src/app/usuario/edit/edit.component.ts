import { Component, OnInit } from '@angular/core';

import { UsuarioService } from '../usuario.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { Usuario } from '../usuario';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  id: number;
  usuario: Usuario;
  form: FormGroup;

  constructor(
    public usuarioService: UsuarioService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['idUsuario'];
    
    this.usuarioService.find(this.id).subscribe((data: Usuario)=>{
      this.usuario = data;
    });

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
    this.usuarioService.update(this.id, this.form.value).subscribe(res => {
         console.log('Person updated successfully!');
         this.router.navigateByUrl('usuario/index');
    })
  }


}

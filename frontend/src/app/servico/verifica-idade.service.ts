import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class VerificaIdadeService {

  constructor() { }

  idadeMinimaValidator(control: FormControl) {
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

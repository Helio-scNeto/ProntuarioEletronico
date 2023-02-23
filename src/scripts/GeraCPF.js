import ValidaCPF from './ValidaCPF';

export default class GeraCPF {
  rand(min = 100000000, max = 999999999) {
    return String(Math.floor(Math.random() * (max - min) + min));
  }

  formatado(text) {
    const badchars = /[^\d]/g;
    const mask = /(\d{3})(\d{3})(\d{3})(\d{2})/;
    const cpf = new String(text).replace(badchars, '');
    return cpf.replace(mask, '$1.$2.$3-$4');
  }
  
  geraNovoCpf() {
    const cpfSemDigito = this.rand();
    const digito1 = ValidaCPF.geraDigito(cpfSemDigito);
    const digito2 = ValidaCPF.geraDigito(cpfSemDigito + digito1);
    const novoCpf = cpfSemDigito + digito1 + digito2;
    return this.formatado(novoCpf);
  }
}

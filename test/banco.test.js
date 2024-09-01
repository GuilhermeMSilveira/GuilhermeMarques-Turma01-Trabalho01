/* const Banco = require("../src/banco");
describe('Testes da classe Banco', () => {
    let conta;
    beforeEach(() => {
        conta = new Banco('Conta Ugioni', 2);
    });
    test('Deve depositar dinheiro corretamente', () => {
        conta.depositar(7.7);
        expect(conta.obterSaldo()).toBe(9.7);
    });
}); */

const Banco = require('../src/banco'); // Ajuste o caminho conforme necessário

describe('Banco', () => {
  let banco1;

  beforeEach(() => {
    banco1 = new Banco('Banco1', 2000);  // Saldo inicial de 2000
  });

  test('deve depositar dinheiro corretamente', () => {
    banco1.depositar(500);  // Depósito de 500
    expect(banco1.obterSaldo()).toBe(2500);  // Saldo esperado após o depósito
    expect(banco1.obterHistorico()).toEqual([
      { tipo: 'Depósito', valor: 500 }
    ]);
  });

  test('deve sacar dinheiro corretamente', () => {
    banco1.sacar(300);  // Saque de 300
    expect(banco1.obterSaldo()).toBe(1700);  // Saldo esperado após o saque
    expect(banco1.obterHistorico()).toEqual([
      { tipo: 'Saque', valor: 300 }
    ]);
  });

  test('não deve permitir saque acima do saldo', () => {
    expect(() => banco1.sacar(2200)).toThrow('Saldo insuficiente');  // Tentativa de saque maior que o saldo deve lançar exceção
  });

  test('deve aplicar juros corretamente', () => {
    banco1.aplicarJuros(10);  // Aplicar 10% de juros sobre 2000
    expect(banco1.obterSaldo()).toBe(2200);  // Saldo esperado após aplicar os juros (2000 + 200)
    expect(banco1.obterHistorico()).toContainEqual({ tipo: 'Juros', valor: 200 });
  });

  test('deve pagar uma conta corretamente', () => {
    banco1.pagarConta(100, 'Conta de luz');  // Pagamento de 100
    expect(banco1.obterSaldo()).toBe(1900);  // Saldo esperado após o pagamento
    expect(banco1.obterHistorico()).toContainEqual({ tipo: 'Pagamento', valor: 100, descricao: 'Conta de luz' });
  });

  test('deve calcular o total depositado corretamente', () => {
    banco1.depositar(500);
    banco1.depositar(200);
    expect(banco1.obterTotalDepositado()).toBe(700);  // Total depositado deve ser 700
  });

  test('deve definir e verificar limite de saque', () => {
    banco1.definirLimiteDeSaque(500);  // Definindo limite de saque como 500
    expect(banco1.verificarLimiteDeSaque(300)).toBe(true);  // Saque de 300 está dentro do limite
    expect(() => banco1.verificarLimiteDeSaque(600)).toThrow('Saque acima do limite permitido');  // Saque de 600 excede o limite
  });
});

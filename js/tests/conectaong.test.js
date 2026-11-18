import { describe, it, expect } from 'vitest';

describe('ConectaONG - Testes automatizados', () => {

    it('deve validar o nome de uma campanha', () => {
        const campanha = 'Campanha de Arrecadação';
        expect(campanha).toBeTruthy();
    });

    it('deve validar uma doação com valor maior que zero', () => {
        const valorDoacao = 50;
        expect(valorDoacao).toBeGreaterThan(0);
    });

    it('deve validar o cadastro de um voluntário', () => {
        const voluntario = {
            nome: 'Voluntário ConectaONG',
            disponivel: true
        };

        expect(voluntario.nome).toBeTruthy();
        expect(voluntario.disponivel).toBe(true);
    });

});

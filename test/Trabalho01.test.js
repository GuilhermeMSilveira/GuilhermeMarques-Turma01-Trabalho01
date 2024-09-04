const GerenciadorDeTarefas = require('../src/GerenciadorDeTarefas');

describe('Testes da classe GerenciadorDeTarefas', () => {
    let gerenciador;

    beforeEach(() => {
        gerenciador = new GerenciadorDeTarefas();
    });

    test('Deve adicionar uma tarefa corretamente', () => {
        const tarefa = { id: 1, descricao: 'Nova tarefa', concluida: false };
        gerenciador.adicionarTarefa(tarefa);
        expect(gerenciador.contarTarefas()).toBe(1);
        expect(gerenciador.buscarTarefaPorId(1)).toEqual(tarefa);
    });

    test('Deve remover uma tarefa corretamente', () => {
        const tarefa = { id: 1, descricao: 'Tarefa a ser removida', concluida: false };
        gerenciador.adicionarTarefa(tarefa);
        gerenciador.removerTarefa(1);
        expect(gerenciador.contarTarefas()).toBe(0);
    });

    test('Deve buscar uma tarefa pelo ID', () => {
        const tarefa = { id: 1, descricao: 'Tarefa para buscar', prioridade: 1, concluida: false };
        gerenciador.adicionarTarefa(tarefa);
        const tarefaEncontrada = gerenciador.buscarTarefaPorId(1);
        expect(tarefaEncontrada).toEqual(tarefa);
        const tarefaNaoEncontrada = gerenciador.buscarTarefaPorId(999);
        expect(tarefaNaoEncontrada).toBeUndefined();
    });

    test('Deve atualizar uma tarefa corretamente', () => {
        const tarefa = { id: 1, descricao: 'Tarefa antiga', concluida: false };
        gerenciador.adicionarTarefa(tarefa);
        gerenciador.atualizarTarefa(1, { descricao: 'Tarefa atualizada' });
        const tarefaAtualizada = gerenciador.buscarTarefaPorId(1);
        expect(tarefaAtualizada.descricao).toBe('Tarefa atualizada');
    }); 

    test('Deve listar todas as tarefas', () => {
        const tarefa1 = { id: 1, descricao: 'Tarefa 1', concluida: false };
        const tarefa2 = { id: 2, descricao: 'Tarefa 2', concluida: true };
        gerenciador.adicionarTarefa(tarefa1);
        gerenciador.adicionarTarefa(tarefa2);
        const tarefas = gerenciador.listarTarefas();
        expect(tarefas).toHaveLength(2);
        expect(tarefas).toContainEqual(tarefa1);
        expect(tarefas).toContainEqual(tarefa2);
    });

    test('Deve contar corretamente o número de tarefas', () => {
        expect(gerenciador.contarTarefas()).toBe(0);
        const tarefa1 = { id: 1, descricao: 'Tarefa 1', concluida: false };
        const tarefa2 = { id: 2, descricao: 'Tarefa 2', concluida: true };
        gerenciador.adicionarTarefa(tarefa1);
        gerenciador.adicionarTarefa(tarefa2);
        expect(gerenciador.contarTarefas()).toBe(2);
        gerenciador.removerTarefa(1);
        expect(gerenciador.contarTarefas()).toBe(1);
    });

    test('Deve marcar uma tarefa como concluída corretamente', () => {
        const tarefa = { id: 1, descricao: 'Tarefa a ser concluída', prioridade: 1, concluida: false };
        gerenciador.adicionarTarefa(tarefa);
        expect(gerenciador.buscarTarefaPorId(1).concluida).toBe(false);
        gerenciador.marcarTarefaComoConcluida(1);
        expect(gerenciador.buscarTarefaPorId(1).concluida).toBe(true);
        gerenciador.marcarTarefaComoConcluida(999);
        expect(gerenciador.buscarTarefaPorId(999)).toBeUndefined();
    });

    test('Deve listar corretamente as tarefas concluídas', () => {                    
        const tarefa1 = { id: 1, descricao: 'Tarefa 1', concluida: true };
        const tarefa2 = { id: 2, descricao: 'Tarefa 2', concluida: false };
        gerenciador.adicionarTarefa(tarefa1);
        gerenciador.adicionarTarefa(tarefa2);
        const tarefasConcluidas = gerenciador.listarTarefasConcluidas();
        expect(tarefasConcluidas).toHaveLength(1);
        expect(tarefasConcluidas[0].id).toBe(1);
    });

    test('Deve listar corretamente as tarefas pendentes', () => {                   
        const tarefa1 = { id: 1, descricao: 'Tarefa 1', concluida: true };
        const tarefa2 = { id: 2, descricao: 'Tarefa 2', concluida: false };
        gerenciador.adicionarTarefa(tarefa1);
        gerenciador.adicionarTarefa(tarefa2);
        const tarefasPendentes = gerenciador.listarTarefasPendentes();
        expect(tarefasPendentes).toHaveLength(1);
        expect(tarefasPendentes[0].id).toBe(2);
    });
    
    test('Deve remover todas as tarefas concluídas', () => {
        const tarefa1 = { id: 1, descricao: 'Tarefa 1', concluida: true };
        const tarefa2 = { id: 2, descricao: 'Tarefa 2', concluida: false };
        const tarefa3 = { id: 3, descricao: 'Tarefa 3', concluida: true };
        gerenciador.adicionarTarefa(tarefa1);
        gerenciador.adicionarTarefa(tarefa2);
        gerenciador.adicionarTarefa(tarefa3);
        expect(gerenciador.contarTarefas()).toBe(3);
        gerenciador.removerTarefasConcluidas();
        expect(gerenciador.contarTarefas()).toBe(1);
        const tarefasRestantes = gerenciador.listarTarefas();
        expect(tarefasRestantes.length).toBe(1);
        expect(tarefasRestantes[0].id).toBe(2);
    });

    test('Deve buscar tarefas por descrição', () => {
        const tarefa1 = { id: 1, descricao: 'Tarefa importante', concluida: false };
        const tarefa2 = { id: 2, descricao: 'Tarefa secundária', concluida: false };
        const tarefa3 = { id: 3, descricao: 'Outra tarefa importante', concluida: true };
        gerenciador.adicionarTarefa(tarefa1);
        gerenciador.adicionarTarefa(tarefa2);
        gerenciador.adicionarTarefa(tarefa3);
        const tarefasEncontradas = gerenciador.buscarTarefaPorDescricao('importante');
        expect(tarefasEncontradas.length).toBe(2);
        expect(tarefasEncontradas).toContainEqual(tarefa1);
        expect(tarefasEncontradas).toContainEqual(tarefa3);
        expect(tarefasEncontradas).not.toContainEqual(tarefa2);
    });
    
    test('Deve adicionar uma tag a uma tarefa', () => {
        const tarefa = { id: 1, descricao: 'Tarefa com tag', concluida: false };
        gerenciador.adicionarTarefa(tarefa);
        gerenciador.adicionarTagATarefa(1, 'Urgente');
        expect(gerenciador.buscarTarefaPorId(1).tags).toContain('Urgente');
    });

    test('Deve remover uma tag de uma tarefa', () => {
        const tarefa = { id: 1, descricao: 'Tarefa com tag', tags: ['Urgente'], concluida: false };
        gerenciador.adicionarTarefa(tarefa);
        gerenciador.removerTagDaTarefa(1, 'Urgente');
        expect(gerenciador.buscarTarefaPorId(1).tags).not.toContain('Urgente');
    });

    test('Deve listar tarefas por tag', () => {
        const tarefa1 = { id: 1, descricao: 'Tarefa com tag 1', tags: ['Urgente'], concluida: false };
        const tarefa2 = { id: 2, descricao: 'Tarefa com tag 2', tags: ['Normal'], concluida: false };
        gerenciador.adicionarTarefa(tarefa1);
        gerenciador.adicionarTarefa(tarefa2);
        const tarefasUrgentes = gerenciador.listarTarefasPorTag('Urgente');
        expect(tarefasUrgentes).toHaveLength(1);
        expect(tarefasUrgentes[0].id).toBe(1);
    });

    test('Deve buscar tarefas por data', () => {
        const tarefa1 = { id: 1, descricao: 'Tarefa de reunião', data: '2024-09-01', concluida: false };
        const tarefa2 = { id: 2, descricao: 'Tarefa de limpeza', data: '2024-09-02', concluida: false };
        const tarefa3 = { id: 3, descricao: 'Tarefa de desenvolvimento', data: '2024-09-01', concluida: true };
        gerenciador.adicionarTarefa(tarefa1);
        gerenciador.adicionarTarefa(tarefa2);
        gerenciador.adicionarTarefa(tarefa3);
        const tarefasEncontradas = gerenciador.buscarTarefasPorData('2024-09-01');
        expect(tarefasEncontradas.length).toBe(2);
        expect(tarefasEncontradas).toContainEqual(tarefa1);
        expect(tarefasEncontradas).toContainEqual(tarefa3);
        expect(tarefasEncontradas).not.toContainEqual(tarefa2);
    });

    test('Deve atualizar a prioridade de uma tarefa', () => {
        const tarefa = { id: 1, descricao: 'Tarefa importante', prioridade: 2, concluida: false };
        gerenciador.adicionarTarefa(tarefa);
        gerenciador.atualizarPrioridade(1, 5);
        const tarefaAtualizada = gerenciador.buscarTarefaPorId(1);
        expect(tarefaAtualizada.prioridade).toBe(5);
    });
    
    
    test('Deve listar tarefas por prioridade', () => {
        const tarefa1 = { id: 1, descricao: 'Tarefa baixa prioridade', prioridade: 1, concluida: false };
        const tarefa2 = { id: 2, descricao: 'Tarefa alta prioridade', prioridade: 5, concluida: false };
        const tarefa3 = { id: 3, descricao: 'Outra tarefa alta prioridade', prioridade: 5, concluida: false };
        gerenciador.adicionarTarefa(tarefa1);
        gerenciador.adicionarTarefa(tarefa2);
        gerenciador.adicionarTarefa(tarefa3);
        const tarefasAltaPrioridade = gerenciador.listarTarefasPorPrioridade(5);
        expect(tarefasAltaPrioridade).toHaveLength(2);
        expect(tarefasAltaPrioridade).toContainEqual(tarefa2);
        expect(tarefasAltaPrioridade).toContainEqual(tarefa3);
        const tarefasBaixaPrioridade = gerenciador.listarTarefasPorPrioridade(1);
        expect(tarefasBaixaPrioridade).toHaveLength(1);
        expect(tarefasBaixaPrioridade).toContainEqual(tarefa1);
    });

    test('Deve contar tarefas por prioridade', () => {
        const tarefa1 = { id: 1, descricao: 'Tarefa baixa prioridade', prioridade: 1, concluida: false };
        const tarefa2 = { id: 2, descricao: 'Tarefa alta prioridade', prioridade: 5, concluida: false };
        const tarefa3 = { id: 3, descricao: 'Outra tarefa alta prioridade', prioridade: 5, concluida: false };
        const tarefa4 = { id: 4, descricao: 'Mais uma tarefa baixa prioridade', prioridade: 1, concluida: false };
        gerenciador.adicionarTarefa(tarefa1);
        gerenciador.adicionarTarefa(tarefa2);
        gerenciador.adicionarTarefa(tarefa3);
        gerenciador.adicionarTarefa(tarefa4);
        const countAltaPrioridade = gerenciador.contarTarefasPorPrioridade(5);
        expect(countAltaPrioridade).toBe(2);
        const countBaixaPrioridade = gerenciador.contarTarefasPorPrioridade(1);
        expect(countBaixaPrioridade).toBe(2); 
        const countPrioridadeInexistente = gerenciador.contarTarefasPorPrioridade(10);
        expect(countPrioridadeInexistente).toBe(0);
    });

    test('Deve reabrir uma tarefa corretamente', () => {
        const tarefa = { id: 1, descricao: 'Tarefa concluída', prioridade: 1, concluida: true };
        gerenciador.adicionarTarefa(tarefa);
        expect(gerenciador.buscarTarefaPorId(1).concluida).toBe(true);
        gerenciador.reabrirTarefa(1);
        expect(gerenciador.buscarTarefaPorId(1).concluida).toBe(false);
        gerenciador.reabrirTarefa(999);
        expect(gerenciador.buscarTarefaPorId(999)).toBeUndefined();
    });
    test('Deve ordenar tarefas por data', () => {
        const tarefa1 = { id: 1, descricao: 'Tarefa 1', data: '2024-09-05', concluida: false };
        const tarefa2 = { id: 2, descricao: 'Tarefa 2', data: '2024-09-04', concluida: false };
        gerenciador.adicionarTarefa(tarefa1);
        gerenciador.adicionarTarefa(tarefa2);
        gerenciador.ordenarTarefasPorData();
        const tarefas = gerenciador.listarTarefas();
        expect(tarefas[0].id).toBe(2);
        expect(tarefas[1].id).toBe(1);
    });

    test('Deve ordenar tarefas por prioridade', () => {
        const tarefa1 = { id: 1, descricao: 'Tarefa 1', prioridade: 2, concluida: false };
        const tarefa2 = { id: 2, descricao: 'Tarefa 2', prioridade: 1, concluida: false };
        gerenciador.adicionarTarefa(tarefa1);
        gerenciador.adicionarTarefa(tarefa2);
        gerenciador.ordenarTarefasPorPrioridade();
        const tarefas = gerenciador.listarTarefas();
        expect(tarefas[0].id).toBe(2);
        expect(tarefas[1].id).toBe(1);
    });

}); 
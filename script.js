document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('form-atividade');
    const imgAprovado = '<img src="images/aprovado.png" alt="Aprovado" class="status-icon">';
    const imgReprovado = '<img src="images/reprovado.png" alt="Reprovado" class="status-icon">';
    const atividades = [];
    const notas = [];
    
    // Solicitar nota mínima ao carregar
    let notaMinima;
    while (true) {
        const input = prompt("Digite a nota mínima para aprovação:");
        notaMinima = parseFloat(input);
        
        if (!isNaN(notaMinima) && notaMinima >= 0 && notaMinima <= 10) {
            break;
        }
        alert("Por favor, digite um valor válido entre 0 e 10");
    }

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const nomeAtividade = document.getElementById('nome-atividade');
        const notaAtividade = document.getElementById('nota-atividade');
        
        // Validações
        if (!nomeAtividade.value.trim()) {
            alert("Por favor, insira o nome da atividade");
            return;
        }
        
        if (notaAtividade.value === "" || isNaN(parseFloat(notaAtividade.value))) {
            alert("Por favor, insira uma nota válida");
            return;
        }
        
        const nota = parseFloat(notaAtividade.value);
        if (nota < 0 || nota > 10) {
            alert("A nota deve estar entre 0 e 10");
            return;
        }
        
        if (atividades.includes(nomeAtividade.value)) {
            alert(`A atividade "${nomeAtividade.value}" já foi adicionada`);
            return;
        }
        
        // Adiciona aos arrays
        atividades.push(nomeAtividade.value);
        notas.push(nota);
        
        // Atualiza a tabela
        atualizarTabela();
        
        // Limpa os campos
        nomeAtividade.value = '';
        notaAtividade.value = '';
        nomeAtividade.focus();
    });
    
    function atualizarTabela() {
        const corpoTabela = document.getElementById('corpo-tabela');
        const mediaFinalValor = document.getElementById('media-final-valor');
        const mediaFinalResultado = document.getElementById('media-final-resultado');
        
        // Limpa a tabela
        corpoTabela.innerHTML = '';
        
        // Adiciona as atividades
        atividades.forEach((atividade, index) => {
            const tr = document.createElement('tr');
            const status = notas[index] >= notaMinima ? 
                `${imgAprovado} <span class="aprovado">Aprovado</span>` : 
                `${imgReprovado} <span class="reprovado">Reprovado</span>`;
            
            tr.innerHTML = `
                <td>${atividade}</td>
                <td>${notas[index].toFixed(1)}</td>
                <td>${status}</td>
            `;
            
            corpoTabela.appendChild(tr);
        });
        
        // Calcula a média
        if (notas.length > 0) {
            const media = notas.reduce((a, b) => a + b, 0) / notas.length;
            mediaFinalValor.textContent = media.toFixed(1);
            
            if (media >= notaMinima) {
                mediaFinalResultado.innerHTML = `${imgAprovado} <span class="aprovado">Aprovado</span>`;
            } else {
                mediaFinalResultado.innerHTML = `${imgReprovado} <span class="reprovado">Reprovado</span>`;
            }
        } else {
            mediaFinalValor.textContent = '-';
            mediaFinalResultado.innerHTML = '';
        }
    }
});
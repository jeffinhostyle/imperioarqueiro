// Função para formatar valores em reais
function formatCurrency(value) {
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
        minimumFractionDigits: 2
    }).format(value);
}

// Módulo 1: Ganhar Frebet
function calcularFrebet() {
    const valorAposta = parseFloat(document.getElementById('valor-aposta').value);
    const oddBack = parseFloat(document.getElementById('odd-back').value);
    const oddLay = parseFloat(document.getElementById('odd-lay').value);
    const comissao = parseFloat(document.getElementById('comissao').value) / 100;

    if (isNaN(valorAposta) || isNaN(oddBack) || isNaN(oddLay)) {
        document.getElementById('resultado-frebet').innerHTML = 
            '<div class="result-item danger"><i class="fas fa-exclamation-triangle"></i><div><strong>Erro:</strong> Preencha todos os campos corretamente!</div></div>';
        return;
    }

    const valorLay = (valorAposta * oddBack) / (oddLay * (1 - comissao));
    const perdaMaxima = Math.abs(valorAposta - valorLay * (1 - comissao));

    document.getElementById('resultado-frebet').innerHTML = `
        <div class="result-item">
            <i class="fas fa-coins"></i>
            <div><strong>Valor do Lay:</strong> ${formatCurrency(valorLay)}</div>
        </div>
        <div class="result-item">
            <i class="fas fa-chart-line"></i>
            <div><strong>Perda Máxima:</strong> ${formatCurrency(perdaMaxima)}</div>
        </div>
        <div class="result-item success">
            <i class="fas fa-gift"></i>
            <div><strong>Frebet Ganha:</strong> ${formatCurrency(valorAposta)}</div>
        </div>
    `;
}

// Módulo 2: Converter Frebet
function converterFrebet() {
    const valorFrebet = parseFloat(document.getElementById('valor-frebet').value);
    const oddBack = parseFloat(document.getElementById('odd-back-frebet').value);
    const oddLay = parseFloat(document.getElementById('odd-lay-frebet').value);
    const comissao = parseFloat(document.getElementById('comissao-frebet').value) / 100;

    if (isNaN(valorFrebet) || isNaN(oddBack) || isNaN(oddLay)) {
        document.getElementById('resultado-converter').innerHTML = 
            '<div class="result-item danger"><i class="fas fa-exclamation-triangle"></i><div><strong>Erro:</strong> Preencha todos os campos corretamente!</div></div>';
        return;
    }

    const valorLay = (valorFrebet * (oddBack - 1)) / (oddLay * (1 - comissao));
    const lucro = valorFrebet * (oddBack - 1) - valorLay * oddLay * (1 - comissao);
    const roi = (lucro / valorFrebet) * 100;

    document.getElementById('resultado-converter').innerHTML = `
        <div class="result-item">
            <i class="fas fa-coins"></i>
            <div><strong>Valor do Lay:</strong> ${formatCurrency(valorLay)}</div>
        </div>
        <div class="result-item success">
            <i class="fas fa-chart-line"></i>
            <div><strong>Lucro Garantido:</strong> ${formatCurrency(lucro)}</div>
        </div>
        <div class="result-item">
            <i class="fas fa-percentage"></i>
            <div><strong>ROI:</strong> ${roi.toFixed(1)}%</div>
        </div>
    `;
}

// Módulo 3: Surebet
function calcularSurebet() {
    const valorBack = parseFloat(document.getElementById('valor-back-surebet').value);
    const oddBack = parseFloat(document.getElementById('odd-back-surebet').value);
    const oddLay = parseFloat(document.getElementById('odd-lay-surebet').value);
    const comissao = parseFloat(document.getElementById('comissao-surebet').value) / 100;

    if (isNaN(valorBack) || isNaN(oddBack) || isNaN(oddLay)) {
        document.getElementById('resultado-surebet').innerHTML = 
            '<div class="result-item danger"><i class="fas fa-exclamation-triangle"></i><div><strong>Erro:</strong> Preencha todos os campos corretamente!</div></div>';
        return;
    }

    const valorLay = (valorBack * oddBack) / (oddLay * (1 - comissao));
    const lucro = Math.min(valorBack * oddBack - valorLay * oddLay, valorLay * (1 - comissao) - valorBack);
    const isValid = lucro > 0;

    document.getElementById('resultado-surebet').innerHTML = `
        <div class="result-item">
            <i class="fas fa-coins"></i>
            <div><strong>Valor do Lay:</strong> ${formatCurrency(valorLay)}</div>
        </div>
        <div class="result-item ${isValid ? 'success' : 'danger'}">
            <i class="fas fa-${isValid ? 'check-circle' : 'times-circle'}"></i>
            <div><strong>Lucro Garantido:</strong> ${formatCurrency(lucro)}</div>
        </div>
        <div class="result-item">
            <i class="fas fa-shield-alt"></i>
            <div><strong>Arbitragem Válida:</strong> ${isValid ? 
                '<span style="color: #4CAF50;">✅ Sim</span>' : 
                '<span style="color: #f44336;">❌ Não</span>'}</div>
        </div>
    `;
}
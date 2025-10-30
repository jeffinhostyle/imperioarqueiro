// Função para converter números com vírgula ou ponto
function parseNumber(value) {
    if (typeof value !== 'string') return value;
    return parseFloat(value.replace(',', '.'));
}

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
    const valorAposta = parseNumber(document.getElementById('valor-aposta').value);
    const oddBack = parseNumber(document.getElementById('odd-back').value);
    const oddLay = parseNumber(document.getElementById('odd-lay').value);
    const comissao = parseNumber(document.getElementById('comissao').value) / 100;

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

// Módulo 2: Converter Frebet (CORRIGIDO)
function converterFrebet() {
    const valorFrebet = parseNumber(document.getElementById('valor-frebet').value);
    const oddBack = parseNumber(document.getElementById('odd-back-frebet').value);
    const oddLay = parseNumber(document.getElementById('odd-lay-frebet').value);
    const comissao = parseNumber(document.getElementById('comissao-frebet').value) / 100;

    if (isNaN(valorFrebet) || isNaN(oddBack) || isNaN(oddLay)) {
        document.getElementById('resultado-converter').innerHTML = 
            '<div class="result-item danger"><i class="fas fa-exclamation-triangle"></i><div><strong>Erro:</strong> Preencha todos os campos corretamente!</div></div>';
        return;
    }

    // Cálculo preciso com mais casas decimais
    const valorLay = (valorFrebet * (oddBack - 1)) / (oddLay * (1 - comissao));
    const lucroBruto = valorFrebet * (oddBack - 1);
    const perdaLay = valorLay * oddLay * (1 - comissao);
    const lucro = lucroBruto - perdaLay;
    const roi = (lucro / valorFrebet) * 100;

    document.getElementById('resultado-converter').innerHTML = `
        <div class="result-item">
            <i class="fas fa-coins"></i>
            <div><strong>Valor do Lay:</strong> ${formatCurrency(valorLay)}</div>
        </div>
        <div class="result-item ${lucro >= 0 ? 'success' : 'danger'}">
            <i class="fas fa-chart-line"></i>
            <div><strong>Lucro Garantido:</strong> ${formatCurrency(lucro)}</div>
        </div>
        <div class="result-item">
            <i class="fas fa-percentage"></i>
            <div><strong>ROI:</strong> ${roi.toFixed(4)}%</div>
        </div>
    `;
}

// Módulo 3: Surebet
function calcularSurebet() {
    const valorBack = parseNumber(document.getElementById('valor-back-surebet').value);
    const oddBack = parseNumber(document.getElementById('odd-back-surebet').value);
    const oddLay = parseNumber(document.getElementById('odd-lay-surebet').value);
    const comissao = parseNumber(document.getElementById('comissao-surebet').value) / 100;

    if (isNaN(valorBack) || isNaN(oddBack) || isNaN(oddLay)) {
        document.getElementById('resultado-surebet').innerHTML = 
            '<div class="result-item danger"><i class="fas fa-exclamation-triangle"></i><div><strong>Erro:</strong> Preencha todos os campos corretamente!</div></div>';
        return;
    }

    const valorLay = (valorBack * oddBack) / (oddLay * (1 - comissao));
    const lucroBack = valorBack * oddBack - valorBack;
    const perdaLay = valorLay * oddLay * (1 - comissao);
    const lucro = Math.min(lucroBack - perdaLay, valorLay * (1 - comissao) - valorBack);
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

google.charts.load('current', { 'packages': ['geochart'] });
google.charts.setOnLoadCallback(geoChart);

function geoChartMaker() {
    geoChartFill();
}


const ufContagem = {};

feedbacks.forEach(item => {
    if (ufContagem[item.estado]) {
        ufContagem[item.estado]++;
    } else {
        ufContagem[item.estado] = 1;
    }
});

const listaUfContagem = Object.entries(ufContagem).map(([uf, quantidade]) => ({ UF: uf, quantidade }));

debugger;
const geoData = [
    ['Estado', 'Nome do Produto', 'Quantidade de Feedbacks'],
    ['BR-AC', 'Ketchup', 200],
    ['BR-AL', 'Mostarda', 400],
    ['BR-AM', 'Milho', 600],
    ['BR-AP', 'Feijão', 300],
    ['BR-BA', 'Arroz', 800],
    ['BR-CE', 'Pão de Forma', 500],
    ['BR-DF', 'Café', 350],
    ['BR-ES', 'Leite', 550],
    ['BR-GO', 'Chocolate', 700],
    ['BR-MA', 'Macarrão', 450],
    ['BR-MG', 'Refrigerante', 900],
    ['BR-MS', 'Suco', 250],
    ['BR-MT', 'Manteiga', 600],
    ['BR-PA', 'Biscoito', 400],
    ['BR-PB', 'Sal', 550],
    ['BR-PE', 'Açúcar', 750],
    ['BR-PI', 'Bolacha', 350],
    ['BR-PR', 'Iogurte', 950],
    ['BR-RJ', 'Bolo', 400],
    ['BR-RN', 'Geléia', 300],
    ['BR-RO', 'Mel', 200],
    ['BR-RR', 'Bebida Energética', 500],
    ['BR-RS', 'Cerveja', 800],
    ['BR-SC', 'Vinho', 650],
    ['BR-SE', 'Chá', 350],
    ['BR-SP', 'Pão Francês', 1100],
    ['BR-TO', 'Molho de Tomate', 400]
];

function geoChart() {
    var data = google.visualization.arrayToDataTable(geoData);

    var options = {
        region: 'BR',
        resolution: 'provinces',
        colorAxis: { colors: ['lightgreen', 'darkgreen'] },
        backgroundColor: '#ffffff',
        datalessRegionColor: '#ffffff',
        defaultColor: '#f5f5f5',
        width: 800,
        height: 600
    };

    var chart = new google.visualization.GeoChart(document.getElementById('geochart'));
    chart.draw(data, options);
}
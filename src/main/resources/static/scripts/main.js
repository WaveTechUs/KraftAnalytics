google.charts.load('current', { 'packages': ['geochart'] });
google.charts.setOnLoadCallback(geoChartMaker);

function geoChartMaker(){
    let geoData = [
        ['Estado', 'Nome do Produto', 'Quantidade de Feedbacks']
    ];

    function fillData(){
        const feedbacksPorEstado = {};
        feedbacks.forEach((feedback) => {
            const estado = feedback.estado;
            if (!feedbacksPorEstado[estado]) {
                feedbacksPorEstado[estado] = {};
            }

            const produtoId = feedback.fk_produto.id;
            if (!feedbacksPorEstado[estado][produtoId]) {
                feedbacksPorEstado[estado][produtoId] = {
                    nome: feedback.fk_produto.nome,
                    quantidade: 0
                };
            }

            feedbacksPorEstado[estado][produtoId].quantidade++;
        });

        for (const estado in feedbacksPorEstado) {
            const produtos = feedbacksPorEstado[estado];
            let produtosMaisFeedbacks = [];
            let maxQuantidade = 0;

            for (const produtoId in produtos) {
                const quantidade = produtos[produtoId].quantidade;

                if (quantidade > maxQuantidade) {
                    produtosMaisFeedbacks = [{ id: produtoId, nome: produtos[produtoId].nome }];
                    maxQuantidade = quantidade;
                } else if (quantidade === maxQuantidade) {
                    produtosMaisFeedbacks.push({ id: produtoId, nome: produtos[produtoId].nome });
                }
            }

            geoData.push([estado, produtosMaisFeedbacks[0].nome,maxQuantidade])
        }
    }
    fillData();

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
    geoChart();
}
google.charts.load('current', {'packages':['line']});
google.charts.setOnLoadCallback(drawChart);

function formataData(dataSemFormatacao){
    const dateString = dataSemFormatacao;
    const dateObj = new Date(dateString);
    const day = dateObj.getDate().toString().padStart(2, "0");
    const month = (dateObj.getMonth() + 1).toString().padStart(2, "0");
    const year = dateObj.getFullYear().toString().slice(-2);
    const formattedDate = `${day}/${month}/${year}`;
    return formattedDate;
}

function ordenaHash(itensOrginais){
    const itensOrdenados = {};

    Object.keys(itensOrginais)
        .sort() // Ordena as chaves (datas)
        .forEach(key => {
            itensOrdenados[key] = itensOrginais[key];
        });
    return itensOrdenados;
}
function drawChart() {

    let data = new google.visualization.DataTable();
    data.addColumn('string', 'Dias');
    data.addColumn('number', 'Quantidades de Feedback');
    const  objetosPorData = {};

    feedbacks.forEach((objeto) => {
        const data = objeto.data;
        const dataFormatada = formataData(data);
        objetosPorData[dataFormatada] = (objetosPorData[dataFormatada] || 0) + 1;
    });
    const objetosPorDataFormatada = ordenaHash(objetosPorData);


    Object.keys(objetosPorDataFormatada).forEach((dataFormatada) => {
        data.addRows([
            [dataFormatada,  objetosPorDataFormatada[dataFormatada]]
        ]);
    });
    console.log(objetosPorData)
    let options = {
        chart: {
            title: 'Feedbacks ao longo do tempo',
            subtitle: ''
        },
        width: 900,
        height: 500,
        vAxis: {
            viewWindow: {
                min: 0,
                max: 10
            }
        }
    }

    let chart = new google.charts.Line(document.getElementById('chart_div'));

    chart.draw(data, google.charts.Line.convertOptions(options));
}

google.charts.load('current', { 'packages': ['geochart'] });
google.charts.setOnLoadCallback(drawChart2);

function drawChart2() {

    let geoData = [
        ['Estado', 'Tipo ESG', 'Quantidade de Feedbacks']
    ];
    function fillData(){
        const feedbacksPorEstado = {};
        feedbacks.forEach((feedback) => {
            const estado = feedback.estado;
            if (!feedbacksPorEstado[estado]) {
                feedbacksPorEstado[estado] = {};
            }

            const tipoFeedback = feedback.tipo_esg;
            if (!feedbacksPorEstado[estado][tipoFeedback]) {
                feedbacksPorEstado[estado][tipoFeedback] = {
                    nome: feedback.tipo_esg,
                    quantidade: 0
                };
            }

            feedbacksPorEstado[estado][tipoFeedback].quantidade++;
        });

        for (const estado in feedbacksPorEstado) {
            const tiposEsg = feedbacksPorEstado[estado];
            let tipoEsgMaisFeedbacks = [];
            let maxQuantidade = 0;

            for (const index in tiposEsg) {
                const quantidade = tiposEsg[index].quantidade;

                if (quantidade > maxQuantidade) {
                    tipoEsgMaisFeedbacks= [{ nome: tiposEsg[index].nome }];
                    maxQuantidade = quantidade;
                } else if (quantidade === maxQuantidade) {
                    tipoEsgMaisFeedbacks.push({ nome: tiposEsg[index].nome });
                }
            }
            geoData.push([estado, tipoEsgMaisFeedbacks[0].nome,maxQuantidade])
        }
    }
    fillData();

    function geoChart() {
        let data = google.visualization.arrayToDataTable(geoData);

        let options = {
            region: 'BR',
            resolution: 'provinces',
            colorAxis: { colors: ['lightgreen', 'darkgreen'] },
            backgroundColor: '#ffffff',
            datalessRegionColor: '#ffffff',
            defaultColor: '#f5f5f5',
            width: 800,
            height: 600
        };

        let chart = new google.visualization.GeoChart(document.getElementById('geochart2'));
        chart.draw(data, options);
    }
    geoChart();
}

google.charts.load('current', {'packages':['corechart']});
google.charts.setOnLoadCallback(drawChart3);
var atualTipoTendencia = 'linear';
function drawChart3() {

    let data = new google.visualization.DataTable();
    data.addColumn('date', 'Dias');
    data.addColumn('number', 'Quantidades de Feedback');
    const  objetosPorData = {};

    feedbacks.forEach((objeto) => {
        const data = objeto.data;
        const dataFormatada = formataData(data);
        objetosPorData[dataFormatada] = (objetosPorData[dataFormatada] || 0) + 1;
    });
    const objetosPorDataFormatada = ordenaHash(objetosPorData);


    Object.keys(objetosPorDataFormatada).forEach((dataFormatada) => {

        var dataSeparada = dataFormatada.split('/');
        var dia = parseInt(dataSeparada[0], 10);
        var mes = parseInt(dataSeparada[1], 10) - 1;
        var ano = 2000 + parseInt(dataSeparada[2], 10);
        console.log(objetosPorDataFormatada[dataFormatada])
        data.addRows([
            [new Date(ano, mes, dia),  objetosPorDataFormatada[dataFormatada]]
        ]);
    });


    var options = {
        chart: {
            title: 'Feedbacks ao longo do tempo',
            subtitle: ''
        },
        width: 900,
        height: 500,
        vAxis: {
            viewWindow: {
                min: 0,
                max: 10
            }
        },
        hAxis: {
            title: 'Data',
            ticks:[
                new Date(2023, 6, 17),
                new Date(2023, 6, 18),
                new Date(2023, 6, 19),
                new Date(2023, 6, 20),
                new Date(2023, 6, 21)
            ],
            format: "dd/MM/YY"
        },
        trendlines: {
            0: {
                type: atualTipoTendencia,
                lineWidth: 2,
                opacity: 0.7,
                color: "green"
            }
        }
    };

    var chart = new google.visualization.ScatterChart(document.getElementById('chart_div2'));
    chart.draw(data, options);
}

function mudaTipoTendencia(type) {
    atualTipoTendencia = type;
    drawChart3();
}
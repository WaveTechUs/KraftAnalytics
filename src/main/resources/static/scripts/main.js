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

function drawChart() {

    var data = new google.visualization.DataTable();
    data.addColumn('string', 'Dias');
    data.addColumn('number', 'Quantidades de Feedback');

    //TODO: FAZER LÓGICA DE SOMA POR DIA DOS FEEDBACKS
    feedbacks.forEach((item)=>{
        console.log(data);
        const dateString = item.data;
        const dateObj = new Date(dateString);
        const day = dateObj.getDate().toString().padStart(2, "0");
        const month = (dateObj.getMonth() + 1).toString().padStart(2, "0");
        const year = dateObj.getFullYear().toString().slice(-2);
        const formattedDate = `${day}/${month}/${year}`;
        data.addRows([
            [formattedDate,  10]
        ]);
    })

    var options = {
        chart: {
            title: 'Feedbacks ao longo do tempo',
            subtitle: ''
        },
        width: 900,
        height: 500
    };

    var chart = new google.charts.Line(document.getElementById('chart_div'));

    chart.draw(data, google.charts.Line.convertOptions(options));
}
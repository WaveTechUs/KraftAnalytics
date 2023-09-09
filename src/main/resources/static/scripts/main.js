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
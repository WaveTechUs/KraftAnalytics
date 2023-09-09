
let typeEsg = document.getElementById("esg");

let  typeChart = document.getElementById("chart");

let selectedChart ='lineChart';
let  selectedEsg = 'padrao';

//Gerar grafrico especifico
const filaBom ={};
const filaRuim ={};
const geofilaBom ={};
const geofilaRuim ={};
const todosDias =["Jul 17, 2023, 12:00:00 AM", "Jul 18, 2023, 12:00:00 AM", "Jul 19, 2023, 12:00:00 AM", "Jul 20, 2023, 12:00:00 AM"];

let atualTipoTendencia = "linear";

let btLinear = document.getElementById('button_linear');
let btExpo = document.getElementById('button_expo');
let btPoly = document.getElementById('button_poly');

const listaTipoEsgPelaData = esgInfoAllPelaData();

// Chamar functions
buttonShowOrNot();
esgEspecifico();


typeChart.addEventListener("change", function () {
    selectedChart = typeChart.value;
    gerarChart(selectedEsg, selectedChart);
});

typeEsg.addEventListener("change", function () {
    selectedEsg = typeEsg.value;
    gerarChart(selectedEsg, selectedChart);
});

function mudaTipoTendencia(type) {
    atualTipoTendencia = type;
    gerarChart(selectedEsg, selectedChart);
}
function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
function buttonShowOrNot(){
    if(selectedChart == "lineChart"){
        if(selectedEsg == "ambiental" || selectedEsg=="social" || selectedEsg=="governanca") {
            btLinear.style.display = 'inline-block';
            btPoly.style.display = 'inline-block';
            btExpo.style.display = 'inline-block';
        }
        else{
            btLinear.style.display = 'none';
            btPoly.style.display = 'none';
            btExpo.style.display = 'none';
        }
    }
    else {
        btLinear.style.display = 'none';
        btPoly.style.display = 'none';
        btExpo.style.display = 'none';
    }


}
function gerarChart(selectedEsg= 'padrao', selectedChart = 'lineChart') {
    if (selectedChart == 'lineChart') {
        switch (selectedEsg) {
            case 'ambiental':
                drawLogScalesEspecifico();
                buttonShowOrNot();
                break;
            case 'governanca':
                drawLogScalesEspecifico();
                buttonShowOrNot();
                break;
            case 'social':
                drawLogScalesEspecifico();
                buttonShowOrNot();
                break;
            case 'padrao':
                drawLogScales();
                buttonShowOrNot();
                break;
        }
    }
    else {
        switch (selectedEsg) {
            case 'ambiental':
                drawGeoMapEspecifico();
                buttonShowOrNot();
                break;
            case 'governanca':
                drawGeoMapEspecifico();
                buttonShowOrNot();
                break;
            case 'social':
                drawGeoMapEspecifico();
                buttonShowOrNot();
                break;
            default:
                drawGeoMapAll();
                buttonShowOrNot();
                break;
        }
    }

}

function esgEspecifico() {
    feedbacks.forEach((feedback) => {
        const data = feedback.data;
        filaRuim[data] = {};
        filaBom[data] = {};
    })
    Object.keys(filaBom).forEach((dia) => {
        feedbacks.forEach((feedback) => {
            let feedback_data = feedback.data;
            const nota = feedback.nota;
            const tipo_esg = feedback.tipo_esg.toLowerCase();
            if (nota > 5) {
                if (!filaBom[dia][tipo_esg]) {
                    filaBom[dia][tipo_esg] = {
                        quantidade: 0
                    };
                }
                if (dia == feedback_data) {
                    filaBom[dia][tipo_esg].quantidade++;
                }

            } else {
                if (!filaRuim[dia][tipo_esg]) {
                    filaRuim[dia][tipo_esg] = {
                        quantidade: 0
                    };
                }
                if (dia == feedback_data) {
                    filaRuim[dia][tipo_esg].quantidade++;
                }
            }

        });
    })

}

function esgInfoAllPelaData() {
    const listaTipoEsg = {};
    feedbacks.forEach((feedback) => {
        const data = feedback.data;
        listaTipoEsg[data] = {};
    });

    Object.keys(listaTipoEsg).forEach((dia) => {
        feedbacks.forEach((feedback) => {
            const feedback_dia = feedback.data;
            const tipo_esg = feedback.tipo_esg.toLowerCase();
            if (!listaTipoEsg[dia][tipo_esg]) {
                listaTipoEsg[dia][tipo_esg] = {
                    quantidade: 0
                };
            }
            if (dia === feedback_dia) {
                listaTipoEsg[dia][tipo_esg].quantidade++;
            }
        });
    });
    return listaTipoEsg;
}

google.charts.load('current', {packages: ['corechart']});
google.charts.setOnLoadCallback(drawLogScales);
function drawLogScales() {
    var data = new google.visualization.DataTable();
    data.addColumn('date', 'Dias');
    data.addColumn('number', 'Ambiental');
    data.addColumn('number', 'Governanca');
    data.addColumn('number', 'Social');
    rows = [];
    todosDias.forEach((dias) => {
        let objetoDia = listaTipoEsgPelaData[dias];
        let ambiental = objetoDia['ambiental'].quantidade;
        let governanca = objetoDia['governanca'].quantidade;
        let social = objetoDia['social'].quantidade;
        rows.push([new Date(dias), ambiental, governanca, social]);

    });

    data.addRows(rows);

    let options = {
        title: "Gráfico Geral por ESG",
        height: 800,
        width: 1000,
        colors: ['#007129', '#F59203', '#07A8B0'],
        vAxis: {
            title: 'Quantidade de Feedback',
            ticks: [0, 2, 4, 6, 8, 10]
        },
        hAxis: {
            title: 'Data',
            ticks: [
                new Date(2023, 6, 17),
                new Date(2023, 6, 18),
                new Date(2023, 6, 19),
                new Date(2023, 6, 20),
                new Date(2023, 6, 21)
            ],
            format: "dd/MM/yy"
        }
    };

    let chart = new google.visualization.LineChart(document.getElementById('chart_div'));
    chart.draw(data, options);
}

function drawLogScalesEspecifico() {
    var data = new google.visualization.DataTable();
    data.addColumn('date', 'Dias');
    data.addColumn('number', 'Feedback Bom');
    data.addColumn('number', 'Feedback Ruim');
    rows = [];
    todosDias.forEach((dias) => {
        let bom = filaBom[dias][selectedEsg].quantidade;
        let ruim = filaRuim[dias][selectedEsg].quantidade;
        rows.push([new Date(dias), bom, ruim]);
    });
    data.addRows(rows);
    var options = {
        title: "Gráfico de Tendência " + capitalize(atualTipoTendencia),
        height: 800,
        width: 1000,
        colors: ['#145A32', '#FF2424'],
        vAxis: {
            title: 'Quantidade de Feedback',
            ticks: [0, 2, 4, 6, 8, 10]
        },
        hAxis: {
            title: 'Data',
            ticks: [
                new Date(2023, 6, 17),
                new Date(2023, 6, 18),
                new Date(2023, 6, 19),
                new Date(2023, 6, 20),
                new Date(2023, 6, 21)
            ],
            format: "dd/MM/yy"
        },
        trendlines: {
            0: {
                type: atualTipoTendencia,
                lineWidth: 2,
                opacity: 1,
                color: "#7DCEA0"
            },
            1: {
                type: atualTipoTendencia,
                lineWidth: 2,
                opacity: 1,
                color: "#F1948A"
            }
        }
    };

    var chart = new google.visualization.LineChart(document.getElementById('chart_div'));
    chart.draw(data, options);
}

google.charts.load('current', {'packages': ['geochart']});
google.charts.setOnLoadCallback(drawGeoMapEspecifico());

function drawGeoMapEspecifico() {

    let geoData = [
        ['Estado', 'Tipo ESG', 'Quantidade de Feedbacks']
    ];

    function fillData() {
        const feedbacksPorEstado = {};
        feedbacks.forEach((feedback) => {
            const estado = feedback.estado;
            geofilaRuim[estado] = {};
            geofilaBom[estado] = {};
        })
        Object.keys(geofilaBom).forEach((estado) => {
            feedbacks.forEach((feedback) => {
                let feedback_estado = feedback.estado;
                const nota = feedback.nota;
                const tipo_esg = feedback.tipo_esg.toLowerCase();
                if (nota > 5) {
                    if (!geofilaBom[estado][tipo_esg]) {
                        geofilaBom[estado][tipo_esg] = {
                            quantidade: 0
                        };
                    }
                    if (estado == feedback_estado) {
                        geofilaBom[estado][tipo_esg].quantidade++;
                    }

                } else {
                    if (!geofilaRuim[estado][tipo_esg]) {
                        geofilaRuim[estado][tipo_esg] = {
                            quantidade: 0
                        };
                    }
                    if (estado == feedback_estado) {
                        geofilaRuim[estado][tipo_esg].quantidade++;
                    }
                }

            });
        });
    }

    fillData();

    Object.keys(geofilaBom).forEach((estado) => {
        let qtdRuim = geofilaRuim[estado][selectedEsg].quantidade;
        let qtdBom = geofilaBom[estado][selectedEsg].quantidade;
        if (qtdRuim > qtdBom) {
            geoData.push([estado, "Ruim", qtdRuim]);
        } else {
            geoData.push([estado, "Bom", qtdBom]);
        }

    });

    function geoChart() {
        let data = google.visualization.arrayToDataTable(geoData);

        let options = {
            region: 'BR',
            resolution: 'provinces',
            colorAxis: {colors: ['lightgreen', 'darkgreen']},
            backgroundColor: '#ffffff',
            datalessRegionColor: '#ffffff',
            defaultColor: '#f5f5f5',
            width: 800,
            height: 600
        };

        let chart = new google.visualization.GeoChart(document.getElementById('chart_div'));
        chart.draw(data, options);
    }

    geoChart();
}

function drawGeoMapAll() {

    let geoData = [
        ['Estado', 'Bom ou Ruim', 'Quantidade de Feedbacks']
    ];

    function fillData() {
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
                    tipoEsgMaisFeedbacks = [{nome: tiposEsg[index].nome}];
                    maxQuantidade = quantidade;
                } else if (quantidade === maxQuantidade) {
                    tipoEsgMaisFeedbacks.push({nome: tiposEsg[index].nome});
                }
            }
            geoData.push([estado, tipoEsgMaisFeedbacks[0].nome, maxQuantidade])
        }
    }

    fillData();

    function geoChart() {
        let data = google.visualization.arrayToDataTable(geoData);

        let options = {
            region: 'BR',
            resolution: 'provinces',
            colorAxis: {colors: ['lightgreen', 'darkgreen']},
            backgroundColor: '#ffffff',
            datalessRegionColor: '#ffffff',
            defaultColor: '#f5f5f5',
            width: 800,
            height: 600
        };

        let chart = new google.visualization.GeoChart(document.getElementById('chart_div'));
        chart.draw(data, options);
    }

    geoChart();
}
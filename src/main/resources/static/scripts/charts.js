
let typeEsg = document.getElementById("esg");

let  typeChart = document.getElementById("chart");

let selectedChart ='lineChart';
let  selectedEsg = 'padrao';
//Visão geral dos graficos
let total = feedbacks.length;
let totalAmbiental = 0;
let totalSocial = 0;
let totalGovernanca = 0;
const contagemEstados = {};
const contagemEstadosBons = {};
const contagemEstadosRuins = {};
//Gerar grafico especifico
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
fillTotal();
detailDefaultLine();
top3States();

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
    clearDetails();
    if (selectedChart == 'lineChart') {
        switch (selectedEsg) {
            case 'ambiental':
                drawLogScalesEspecifico();
                buttonShowOrNot();
                detailSpeficLine(totalAmbiental, selectedEsg);
                break;
            case 'governanca':
                drawLogScalesEspecifico();
                buttonShowOrNot();
                detailSpeficLine(totalGovernanca, selectedEsg);
                break;
            case 'social':
                drawLogScalesEspecifico();
                buttonShowOrNot();
                detailSpeficLine(totalSocial, selectedEsg);
                break;
            case 'padrao':
                drawLogScales();
                buttonShowOrNot();
                detailDefaultLine();
                break;
        }
    }
    else {
        switch (selectedEsg) {
            case 'ambiental':
                drawGeoMapEspecifico();
                buttonShowOrNot();
                detailSpeficGeo(totalAmbiental, selectedEsg);
                break;
            case 'governanca':
                drawGeoMapEspecifico();
                buttonShowOrNot();
                detailSpeficGeo(totalGovernanca, selectedEsg);
                break;
            case 'social':
                drawGeoMapEspecifico();
                buttonShowOrNot();
                detailSpeficGeo(totalSocial, selectedEsg);
                break;
            default:
                drawGeoMapAll();
                buttonShowOrNot();
                detailDefaultGeo();
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
        height: 600,
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
        height: 600,
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
            backgroundColor: '#FBFBFB',
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
            backgroundColor: '#FBFBFB',
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

function fillTotal(){
    feedbacks.forEach((feedback)=>{
        let esg = feedback.tipo_esg;
        if(esg == "Ambiental"){totalAmbiental++}
        if(esg == "Social"){totalSocial++}
        if(esg == "Governanca"){totalGovernanca++}
    });
}

function top3States(){
    for (const feedback of feedbacks) {
        const estado = feedback.estado;
        contagemEstados[estado] = (contagemEstados[estado] || 0) + 1;
    }
    for (const feedback of feedbacks) {
        const estado = feedback.estado;
        const nota = feedback.nota;

        if (nota > 6) {
            contagemEstadosBons[estado] = (contagemEstadosBons[estado] || 0) + 1;
        }
    }
    for (const feedback of feedbacks) {
        const estado = feedback.estado;
        const nota = feedback.nota;

        if (nota > 6) {
            contagemEstadosRuins[estado] = (contagemEstadosRuins[estado] || 0) + 1;
        }
    }
}
function clearDetails(){
    for(let i =1; i<9; i++){
        const field = document.querySelector('#field-'+i);
        field.innerHTML = "";
    }

}
function detailDefaultLine(){
    const totalElementos = document.querySelector('#field-1');
    const ambiental = document.querySelector('#field-2');
    const social = document.querySelector('#field-3');
    const governanca = document.querySelector('#field-4');

    totalElementos.innerHTML = "Total: <br>" + total;
    ambiental.innerHTML = "Ambiental: <br>" + totalAmbiental + " / " + Math.round((totalAmbiental/total)*100) +"%";
    social.innerHTML = "Social: <br>" + totalSocial  + " / " + Math.round((totalSocial/total)*100) +"%";
    governanca.innerHTML = "Governança: <br>" + totalGovernanca  + " / " + Math.round((totalGovernanca/total)*100) +"%";

}

function detailDefaultGeo(){
    const totalElementos = document.querySelector('#field-1');
    const ambiental = document.querySelector('#field-2');
    const social = document.querySelector('#field-3');
    const governanca = document.querySelector('#field-4');
    const top3Title = document.querySelector('#field-5');
    const top1State = document.querySelector('#field-6');
    const top2State = document.querySelector('#field-7');
    const top3State = document.querySelector('#field-8');

    //Array do top 3
    const arrayContagem = Object.entries(contagemEstados);
    arrayContagem.sort((a, b) => b[1] - a[1]);

    totalElementos.innerHTML = "Total: <br>" + total;
    ambiental.innerHTML = "Ambiental: <br>" + totalAmbiental + " / " + Math.round((totalAmbiental/total)*100) +"%";
    social.innerHTML = "Social: <br>" + totalSocial  + " / " + Math.round((totalSocial/total)*100) +"%";
    governanca.innerHTML = "Governança: <br>" + totalGovernanca  + " / " + Math.round((totalGovernanca/total)*100) +"%";
    top3Title.innerHTML= "<h6>Top 3 Estados Com Mais Feedbacks:</h6>";
    top1State.innerHTML = "1- " + arrayContagem[0][0] + "-" + arrayContagem[0][1] +"<br>";
    top2State.innerHTML = "2- " + arrayContagem[1][0] + "-" + arrayContagem[1][1] +"<br>";
    top3State.innerHTML = "3- " + arrayContagem[2][0] + "-" + arrayContagem[2][1] +"<br>";
}

function detailSpeficGeo(total, tipo_esg){
    const totalElementos = document.querySelector('#field-1');
    const feedbacksBons = document.querySelector('#field-2');
    const feedbacksRuins = document.querySelector('#field-3');
    const top3Title = document.querySelector("#field-4");
    const top1State = document.querySelector('#field-5');
    const top2State = document.querySelector('#field-6');
    const top3State = document.querySelector('#field-7');

    let totalBons =0;
    let totalRuins = 0;
    Object.keys(filaBom).forEach((dia) =>{
        totalBons+= filaBom[dia][tipo_esg].quantidade;
        totalRuins+= filaRuim[dia][tipo_esg].quantidade;
    });

    //Array do top 3
    const arrayContagemBom = Object.entries(contagemEstadosBons);
    arrayContagemBom.sort((a, b) => b[1] - a[1]);
    const arrayContagemRuim = Object.entries(contagemEstadosRuins);
    arrayContagemRuim.sort((a, b) => b[1] - a[1]);

    totalElementos.innerHTML = "Total: <br>" + total;
    feedbacksBons.innerHTML = "Feedbacks Positivos: <br>" + totalBons + " / " + Math.round((totalBons/total)*100) +"%";
    feedbacksRuins.innerHTML = "Feedbacks Negativos: <br>" + totalRuins + " / " + Math.round((totalRuins/total)*100) +"%";
    top3Title.innerHTML= "<h6>Top 3 Estados Com Mais Feedbacks:</h6>";
    top1State.innerHTML = "1- " + arrayContagemBom[0][0] + "-" + arrayContagemBom[0][1] + " | " + "1- " + arrayContagemRuim[0][0] + "-" + arrayContagemRuim[0][1] +  "<br>";
    top2State.innerHTML = "2- " + arrayContagemBom[1][0] + "-" + arrayContagemBom[1][1] + " | " + "2- " + arrayContagemRuim[1][0] + "-" + arrayContagemRuim[1][1] +  "<br>";
    top3State.innerHTML = "3- " + arrayContagemBom[2][0] + "-" + arrayContagemBom[2][1] + " | " + "3- " + arrayContagemRuim[2][0] + "-" + arrayContagemRuim[2][1] +  "<br>";
}
function detailSpeficLine(total, tipo_esg){
    const totalElementos = document.querySelector('#field-1');
    const feedbacksBons = document.querySelector('#field-2');
    const feedbacksRuins = document.querySelector('#field-3');
    const r2 = document.querySelector("#field-4");

    let totalBons =0;
    let totalRuins = 0;
    Object.keys(filaBom).forEach((dia) =>{
        totalBons+= filaBom[dia][tipo_esg].quantidade;
        totalRuins+= filaRuim[dia][tipo_esg].quantidade;
    });

    //Array do top 3
    const arrayContagemBom = Object.entries(contagemEstadosBons);
    arrayContagemBom.sort((a, b) => b[1] - a[1]);
    const arrayContagemRuim = Object.entries(contagemEstadosRuins);
    arrayContagemRuim.sort((a, b) => b[1] - a[1]);

    totalElementos.innerHTML = "Total: <br>" + total;
    feedbacksBons.innerHTML = "Feedbacks Positivos: <br>" + totalBons + " / " + Math.round((totalBons/total)*100) +"%";
    feedbacksRuins.innerHTML = "Feedbacks Negativos: <br>" + totalRuins + " / " + Math.round((totalRuins/total)*100) +"%";

}


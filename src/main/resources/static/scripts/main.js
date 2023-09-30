google.charts.load('current', { 'packages': ['geochart'] });
google.charts.setOnLoadCallback(geoChartMaker);
let geoData = [
    ['Estado', 'Nome do Produto', 'Quantidade de Feedbacks']
];
let produtoMaisPopular  = null;
let produtoQuantidadeMaisPopular = 0;
let allDataProduto = {};
let esgMaisPopular  = null;
let esgQuantidadeMaisPopular = 0;
let allDataEsg ={};
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
function geoChartMaker(){
    fillData();
    function geoChart() {
        var data = google.visualization.arrayToDataTable(geoData);

        var options = {
            region: 'BR',
            resolution: 'provinces',
            colorAxis: { colors: ['lightgreen', 'darkgreen'] },
            backgroundColor: '#FBFBFB',
            datalessRegionColor: '#ffffff',
            defaultColor: '#f5f5f5',
            width: 800,
            height: 600
        };


        var chart = new google.visualization.GeoChart(document.getElementById('geochart'));
        chart.draw(data, options);
    }
    geoChart();

    popularProduct();
    popularEsg();
}

function popularProduct(){
    feedbacks.forEach((feedback) =>{
        const estado = feedback.estado;
        const produtoNome = feedback.fk_produto.nome;
        const tipoEsg = feedback.tipo_esg;
        const nota = feedback.nota;
        const produtoId = feedback.fk_produto.id;
        if(!allDataProduto[produtoId]){
            allDataProduto[produtoId] = {
                quantidade: 1,
                estado: estado,
                produtoNome: produtoNome,
                tipoEsg: tipoEsg,
                nota: nota,
                ambiental_qtd: 0,
                social_qtd: 0,
                governanca_qtd: 0
            };
        }
        else{
            allDataProduto[produtoId].quantidade++;
            allDataProduto[produtoId].nota += nota;
        }
        if(!allDataProduto[produtoId].estado.includes(estado)){
            allDataProduto[produtoId].estado +=  ', ' + estado;
        }
        if(tipoEsg == "Ambiental"){allDataProduto[produtoId].ambiental_qtd++}
        if(tipoEsg == "Social"){allDataProduto[produtoId].social_qtd++}
        if(tipoEsg == "Governaca"){allDataProduto[produtoId].governanca_qtd++}
    });

    Object.keys(allDataProduto).forEach((produtoId)=>{
        let hash = allDataProduto[produtoId];
        hash.nota = Math.round(hash.nota/hash.quantidade);
        if(hash.ambiental_qtd > hash.social_qtd && hash.ambiental_qtd > hash.governanca_qtd){
            hash.tipoEsg = "Ambiental";
        }
        else if(hash.social_qtd > hash.ambiental_qtd && hash.social_qtd > hash.governanca_qtd){
            hash.tipoEsg = "Social";
        }
        else{
            hash.tipoEsg = "Governança";
        }
    });
    Object.keys(allDataProduto).forEach((produtoId) =>{
        let hash = allDataProduto[produtoId];
        if (hash.quantidade > produtoQuantidadeMaisPopular) {
            produtoQuantidadeMaisPopular = hash.quantidade;
            produtoMaisPopular = hash;
        }
    });


    detailProduct();
}

function detailProduct(){

    const productName = document.querySelector('#name-product');
    const quantFeedback = document.querySelector('#quant-feedback-product');
    const state = document.querySelector('#state-product');
    const grade = document.querySelector('#average-product-grade');
    const esg = document.querySelector('#average-product-esg');

    productName.innerHTML = "Produto Com Mais Feedbacks: <br>";
    quantFeedback.innerHTML = "Quantidade de Feedbacks: <br>";
    state.innerHTML = "Estados: <br>";
    grade.innerHTML = "Média da Nota: <br>";
    esg.innerHTML = "Tipo ESG Mais Comum: <br>";

    productName.innerHTML += produtoMaisPopular.produtoNome;
    quantFeedback.innerHTML += produtoMaisPopular.quantidade;
    state.innerHTML += produtoMaisPopular.estado;
    grade.innerHTML += produtoMaisPopular.nota;
    esg.innerHTML += produtoMaisPopular.tipoEsg;
}

function popularEsg(){
    feedbacks.forEach((feedback) =>{
        const estado = feedback.estado;
        const tipoEsg = feedback.tipo_esg;
        const nota = feedback.nota;
        if(!allDataEsg[tipoEsg]){
            allDataEsg[tipoEsg] = {
                quantidade: 1,
                estado: estado,
                tipoEsg: tipoEsg,
                nota: nota
            };
        }
        else{
            allDataEsg[tipoEsg].quantidade++;
            allDataEsg[tipoEsg].nota += nota;
        }
        if(!allDataEsg[tipoEsg].estado.includes(estado)){
            allDataEsg[tipoEsg].estado +=  ', ' + estado;
        }
    });
    Object.keys(allDataEsg).forEach((tipoEsg)=>{
        let hash = allDataEsg[tipoEsg];
        hash.nota = Math.round(hash.nota/hash.quantidade);
    });

    Object.keys(allDataEsg).forEach((tipoEsg) =>{
        let hash = allDataEsg[tipoEsg];
        if (hash.quantidade > esgQuantidadeMaisPopular) {
            esgQuantidadeMaisPopular = hash.quantidade;
            esgMaisPopular = hash;
        }
    });
    console.log(allDataEsg);
    detailEsg();
}

function detailEsg(){
    const esgName = document.querySelector('#name-esg');
    const quantFeedback = document.querySelector('#quant-feedback-esg');
    const state = document.querySelector('#state-esg');
    const grade = document.querySelector('#average-esg-grade');

    esgName.innerHTML = "Tipo Esg Com Mais Feedbacks: <br>";
    quantFeedback.innerHTML = "Quantidade de Feedbacks: <br>";
    state.innerHTML = "Estados: <br>";
    grade.innerHTML = "Média da Nota: <br>";

    esgName.innerHTML += esgMaisPopular.tipoEsg;
    quantFeedback.innerHTML += esgMaisPopular.quantidade;
    state.innerHTML += esgMaisPopular.estado;
    grade.innerHTML += esgMaisPopular.nota;
}
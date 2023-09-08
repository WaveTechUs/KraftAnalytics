fillTable(feedbacks)
function fillTable(feedbacks){
    let linhas = [];
    feedbacks.forEach(feedback => {
        feedback.data = feedback.data.replace(/\u202F/g, ' ');
        var date = new Date(feedback.data);
        const dataFormatada = date.toLocaleDateString('pt-BR', {
            year: 'numeric',
            month: 'numeric',
            day: 'numeric',
        });

        let linha = {
            "Data": dataFormatada,
            "Produto": feedback.fk_produto.nome,
            "ESG": feedback.tipo_esg,
            "Nota": feedback.nota,
        }
        linhas.push(linha);
    })

    const table =   document.querySelector('#feedback-table');

    linhas.map( linha => {
        let row = table.insertRow();
        let data = row.insertCell(0);
        data.innerHTML = linha["Data"];
        let produto = row.insertCell(1);
        produto.innerHTML = linha["Produto"];
        let ESG = row.insertCell(2);
        ESG.innerHTML = linha["ESG"];
        let nota = row.insertCell(3);
        nota.innerHTML = linha["Nota"];
        let detalhe = row.insertCell(4);
        detalhe.innerHTML = "Ver detalhes";
    })
}

const selectElement = document.getElementById("esg");

selectElement.addEventListener("change", function() {
    const selectedValue = selectElement.value;
    console.log("Opção selecionada: " + selectedValue);

    // Coloque aqui o código que você deseja executar quando uma opção for selecionada
});
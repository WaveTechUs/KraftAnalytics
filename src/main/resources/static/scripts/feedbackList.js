fillTable(feedbacks)
function fillTable(feedbacks){
    const table = document.querySelector('#feedback-table');

    while (table.firstChild) {
        table.removeChild(table.firstChild);
    }

    let linhas = [];
    feedbacks.forEach(feedback => {
        const dataFormatada = formataData(feedback.data);

        let linha = {
            "Data": dataFormatada,
            "Produto": feedback.fk_produto.nome,
            "ESG": feedback.tipo_esg,
            "Nota": feedback.nota,
            "Id" : feedback.id,
        }
        linhas.push(linha);
    })

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
        let button = document.createElement("button");
        button.type = "button";
        button.className = "btn btn-primary";
        button.setAttribute("data-toggle", "modal");
        button.setAttribute("onclick", `detail(${linha.Id})`);
        button.setAttribute("data-target", "#exampleModal");
        button.textContent = "Ver detalhes";
        detalhe.appendChild(button);
    })
}


const selectElement = document.getElementById('esg');
const produtoInput = document.getElementById('product-input');

let esgSelected = 'Todos';
const selectedDefault = document.querySelector('#esg')
selectedDefault.value = 'Todos'
selectElement.addEventListener("change", function() {
    const selectedValue = selectElement.value;
    esgSelected = selectedValue;
    const searchText = document.querySelector('#product-input')
    search(searchText.value);
});

produtoInput.addEventListener('input', function(event) {
    const textoDigitado = event.target.value;
    search(textoDigitado);
});

function search(searchText) {
    const feedbackFiltered = feedbacks.filter( (f) => {
        const productName = f.fk_produto.nome.toLowerCase();
        if(esgSelected == 'Todos')
            return productName.includes(searchText.toLowerCase());

        return productName.includes(searchText.toLowerCase()) && f.tipo_esg == esgSelected;
    });
    fillTable(feedbackFiltered);
}

function detail(feedbackId){
    const feedbackSelected = feedbacks.filter(f => f.id == feedbackId);
    const date = document.querySelector('#date');
    const state = document.querySelector('#state');
    const esg = document.querySelector('#esg-detail');
    const productName = document.querySelector('#product-name');
    const comment = document.querySelector('#comment');
    const grade = document.querySelector('#grade');

    date.innerHTML = "<b>Data:</b> <br>";
    state.innerHTML = "<b>Estado:</b> <br>";
    esg.innerHTML = "<b>Nota:</b> <br>";
    productName.innerHTML = "<b>Nome produto:</b> <br>";
    comment.innerHTML = "<b>Comentário:</b> <br>";
    grade.innerHTML = "<b>Nota:</b> <br>";

    date.innerHTML += formataData(feedbackSelected[0].data);
    state.innerHTML += feedbackSelected[0].estado;
    esg.innerHTML += feedbackSelected[0].tipo_esg;
    productName.innerHTML += feedbackSelected[0].fk_produto.nome;
    comment.innerHTML += feedbackSelected[0].comentario;
    grade.innerHTML += feedbackSelected[0].nota;
}

function formataData(feedbackData){
    feedbackData = feedbackData.replace(/\u202F/g, ' ');
    var date = new Date(feedbackData);
    const dataFormatada = date.toLocaleDateString('pt-BR', {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
    });
    return dataFormatada;
}

// Certifique-se de que a variável feedbacks contenha os dados corretos antes de chamar esta função
function fillTable(feedbacks) {
    const tableBody = document.querySelector('#feedback-table tbody');
    tableBody.innerHTML = ''; // Limpa o conteúdo atual da tabela

    feedbacks.forEach(feedback => {
        const dataFormatada = formataData(feedback.data);

        let linha = {
            "Data": dataFormatada,
            "Produto": feedback.fk_produto.nome,
            "ESG": feedback.tipo_esg,
            "Nota": feedback.nota,
            "Id": feedback.id,
        };

        let row = tableBody.insertRow();
        let data = row.insertCell(0);
        data.textContent = linha["Data"];
        let produto = row.insertCell(1);
        produto.textContent = linha["Produto"];
        let ESG = row.insertCell(2);
        ESG.textContent = linha["ESG"];
        let nota = row.insertCell(3);
        nota.textContent = linha["Nota"];
        let detalhe = row.insertCell(4);
        let button = document.createElement("button");
        button.type = "button";
        button.className = "btn btn-primary";
        button.setAttribute("data-toggle", "modal");
        button.setAttribute("onclick", `detail(${linha.Id})`);
        button.setAttribute("data-target", "#exampleModal");
        button.textContent = "Ver detalhes";
        detalhe.appendChild(button);
    });
}

$(document).ready(function () {
    let dataTable = null; // Armazenar uma referência ao DataTables

    // Função para preencher a tabela
    function fillTable(feedbacks) {
        // Preencha a tabela aqui
    }

    // Função para inicializar o DataTables
    function initDataTable() {
        // Certifique-se de que a variável feedbacks contenha os dados corretos antes de chamar esta função
        fillTable(feedbacks);

        // Inicialize o DataTables
        if ($.fn.DataTable) {
            if (dataTable !== null) {
                // Se já existe um DataTables, destrua-o antes de criar um novo
                dataTable.destroy();
            }

            // Inicialize o DataTables com um limite fixo de 5 linhas por página
            dataTable = $('#feedback-table').DataTable({
                "paging": true,
                "pageLength": 5,
                "lengthChange": false, // Impede a alteração de comprimento
                "searching": true, // Ativar a pesquisa
                "language": {
                    "searchPlaceholder": "Procure pelo nome do produto"
                }
            });

            // Mova o campo de pesquisa para a esquerda da tabela
            $('#feedback-table_wrapper .dataTables_filter').css('float', 'left');
        } else {
            console.error("DataTables não está disponível. Verifique se você incluiu a biblioteca corretamente.");
        }
    }

    // Chame a função para inicializar o DataTables na inicialização da página
    initDataTable();

    // Manipulador de eventos para o <select> que atualiza o DataTables quando a seleção muda
    $('#esg').on('change', function () {
        if (dataTable !== null) {
            const selectedValue = this.value;
            // Aplicar filtro com base no valor selecionado
            if (selectedValue !== "Todos") {
                dataTable.columns(2).search(selectedValue).draw();
            } else {
                // Limpar o filtro e mostrar todas as linhas
                dataTable.columns(2).search('').draw();
            }
        }
    });

        $('.dataTables_filter label').contents().filter(function () {
            return this.nodeType === 3; // 3 representa nós de texto
        }).remove();
});

const urlapiGet = "https://localhost:7199/api/Product";
const urlapiSet = "https://localhost:7199/api/Product";

function formatCurrency(value) {
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    }).format(value);
}

function getUser() {
    axios.get(urlapiGet)
        .then(response => {
            const data = response.data;
            const tableBody = document.getElementById("productsTableBody");
            if (tableBody) {
                tableBody.innerHTML = '';
                data.forEach(product => {
                    const row = document.createElement('tr');
                    row.innerHTML = `
                        <td>${product.id}</td>
                        <td>${product.nome}</td>
                        <td>${formatCurrency(product.preco)}</td>
                        <td>${product.estoque}</td>
                        <td>
                            <div class="action-buttons">
                                <button onclick="editProduct(${product.id})" class="btn-edit">Editar</button>
                                <button onclick="deleteUser(${product.id})" class="btn-delete">Excluir</button>
                            </div>
                        </td>
                    `;
                    tableBody.appendChild(row);
                });
            }
        })
        .catch(error => {
            console.log("Erro ao buscar dados:", error);
            alert("Erro ao carregar produtos. Verifique o console para mais detalhes.");
        });
}

function addNewUser() {
    const nome = document.getElementById('nome').value;
    const preco = parseFloat(document.getElementById('preco').value);
    const estoque = parseInt(document.getElementById('estoque').value);

    if (!nome || isNaN(preco) || isNaN(estoque)) {
        alert("Por favor, preencha todos os campos corretamente.");
        return;
    }

    const newProduct = {
        nome: nome,
        preco: preco,
        estoque: estoque
    };

    axios.post(urlapiSet, newProduct)
        .then(response => {
            alert("Produto adicionado com sucesso!");
            clearForm();
            getUser();
        })
        .catch(error => {
            console.log("Erro ao adicionar novo produto:", error);
            alert("Erro ao adicionar produto. Verifique o console para mais detalhes.");
        });
}

function editProduct(id) {
    const nome = document.getElementById('nome').value;
    const preco = parseFloat(document.getElementById('preco').value);
    const estoque = parseInt(document.getElementById('estoque').value);

    if (!nome || isNaN(preco) || isNaN(estoque)) {
        alert("Por favor, preencha todos os campos corretamente.");
        return;
    }

    const updateProduct = {
        nome: nome,
        preco: preco,
        estoque: estoque
    };

    axios.put(`${urlapiGet}/${id}`, updateProduct)
        .then(response => {
            alert("Produto atualizado com sucesso!");
            clearForm();
            getUser();
        })
        .catch(error => {
            console.log("Erro ao atualizar produto:", error);
            alert("Erro ao atualizar produto. Verifique o console para mais detalhes.");
        });
}

function deleteUser(id) {
    if (confirm("Tem certeza que deseja excluir este produto?")) {
        axios.delete(`${urlapiSet}/${id}`)
            .then(response => {
                alert("Produto excluído com sucesso!");
                getUser();
            })
            .catch(error => {
                console.log("Erro ao excluir produto:", error);
                alert("Erro ao excluir produto. Verifique o console para mais detalhes.");
            });
    }
}

function clearForm() {
    document.getElementById('nome').value = '';
    document.getElementById('preco').value = '';
    document.getElementById('estoque').value = '';
}

function filterProducts() {
    const searchInput = document.getElementById('searchInput');
    const filter = searchInput.value.toLowerCase();
    const tableBody = document.getElementById("productsTableBody");
    const rows = tableBody.getElementsByTagName('tr');

    for (let i = 0; i < rows.length; i++) {
        const cells = rows[i].getElementsByTagName('td');
        let found = false;

        for (let j = 0; j < cells.length; j++) {
            const cell = cells[j];
            if (cell) {
                const text = cell.textContent || cell.innerText;
                if (text.toLowerCase().indexOf(filter) > -1) {
                    found = true;
                    break;
                }
            }
        }

        rows[i].style.display = found ? '' : 'none';
    }
}

// Carrega a lista de produtos ao iniciar a página
document.addEventListener('DOMContentLoaded', getUser);

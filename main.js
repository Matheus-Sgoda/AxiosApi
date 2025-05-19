const urlapiGet = "https://localhost:7199/api/Product";
const urlapiSet = "https://localhost:7199/api/Product";
const urlapiEdit = "https://localhost:7199/api/Product/4";
const urlapiDelete = "https://localhost:7199/api/Product/2"; // corrigido nome
const newUser = {
    nome: "banana",
    preco: 10,
    estoque: 2
};

function getUser() {
    axios.get(urlapiGet)
        .then(response => {
            const data = response.data;
            const renderResults = document.getElementById("renderResults"); // você precisa ter esse elemento no HTML
            if (renderResults) {
                renderResults.textContent = JSON.stringify(data, null, 2); // formatado
            } else {
                console.warn("Elemento com id 'renderResults' não encontrado.");
            }
        })
        .catch(error => console.log("Erro ao buscar dados:", error));
}

function addNewUser() {

    axios.post(urlapiSet, newUser) // corrigido nome da variável (era "url")
        .then(response => {
            alert(JSON.stringify(response.data)) // corrigido "Response" para "response"
        })
        .catch(error => {
            console.log("Erro ao adicionar novo usuário:", error); // corrigido "erro" para "error"
        });
}

updateUser{
    axios.put()
}

getUser();
addNewUser();

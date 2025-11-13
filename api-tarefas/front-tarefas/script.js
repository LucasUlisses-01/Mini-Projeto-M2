console.log("Script carregado com sucesso!");

// Seleciona os elementos do HTML
const inputTarefa = document.getElementById('nova-tarefa');
const btnAdicionar = document.getElementById('adicionar');
const listaTarefas = document.getElementById('lista-tarefas');

// 🔹 Função para buscar tarefas do servidor
async function carregarTarefas() {
  const resposta = await fetch("http://localhost:3000/tarefas");
  const tarefas = await resposta.json();

  listaTarefas.innerHTML = "";

  tarefas.forEach(tarefa => {
    const li = document.createElement('li');
    li.textContent = tarefa.titulo;

    if (tarefa.status === 'concluida') {
      li.classList.add('concluida');
    }

    // botão de remover
    const btnRemover = document.createElement('button');
    btnRemover.textContent = 'Remover';
    btnRemover.classList.add('remover');
    btnRemover.addEventListener('click', async () => {
      await fetch(`http://localhost:3000/tarefas/${tarefa.id}`, {
        method: "DELETE"
      });
      carregarTarefas();
    });

    // clique pra marcar como concluída
    li.addEventListener('click', async () => {
      const novoStatus = li.classList.contains('concluida') ? 'pendente' : 'concluida';
      await fetch(`http://localhost:3000/tarefas/${tarefa.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: novoStatus })
      });
      carregarTarefas();
    });

    li.appendChild(btnRemover);
    listaTarefas.appendChild(li);
  });
}

// 🔹 Adicionar nova tarefa
btnAdicionar.addEventListener('click', async () => {
  const titulo = inputTarefa.value.trim();

  if (titulo === '') {
    alert('Digite uma tarefa antes de adicionar!');
    return;
  }

  await fetch("http://localhost:3000/tarefas", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ titulo, status: "pendente" })
  });

  inputTarefa.value = '';
  carregarTarefas();
});

// 🔹 Carregar tarefas ao iniciar
carregarTarefas();


document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('taskForm') || document.querySelector('form');
  const input = document.getElementById('task');
  const list = document.getElementById('taskList');

  // garante que botões estáticos tenham type="button" (evita submits inesperados)
  list.querySelectorAll('button').forEach(b => b.type = 'button');

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const taskText = input.value.trim();
    if (!taskText) return;

    const li = document.createElement('li');
    // cria botões com data-action (padronizado)
    li.innerHTML = `${escapeHtml(taskText)} <button type="button" data-action="concluir">Concluir</button> <button type="button" data-action="excluir">Excluir</button>`;
    list.appendChild(li);
    input.value = '';
    input.focus();
  });

  // Delegation: 1 listener para todos os botões dentro da lista
  list.addEventListener('click', (e) => {
    const btn = e.target.closest('button');
    if (!btn) return;
    const li = btn.closest('li');
    if (!li) return;

    // aceita data-action OU texto do botão (grupo legado)
    const actionRaw = (btn.dataset.action || btn.textContent || '').trim().toLowerCase();

    if (actionRaw.includes('excluir') || actionRaw.includes('remov') || actionRaw === 'delete') {
      li.remove();
      return;
    }

    if (actionRaw.includes('concluir') || actionRaw.includes('conclu') || actionRaw === 'done') {
      li.classList.toggle('done');
      return;
    }
  });

  function escapeHtml(text) {
    return text
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }
});




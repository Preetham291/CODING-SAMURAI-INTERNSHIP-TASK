const form = document.getElementById('form');
const input = document.getElementById('input');
const list = document.getElementById('list');
const totalEl = document.getElementById('total');
const doneEl = document.getElementById('done');
const filters = document.querySelectorAll('.filters button');
const clockEl = document.getElementById('clock');

let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
let filter = 'all';

updateClock();
setInterval(updateClock, 1000);
render();
updateStats();
form.addEventListener('submit', e => {
    e.preventDefault();
    const txt = input.value.trim();
    if (!txt) return;
    tasks.unshift({
        id: Date.now(),
        text: txt,
        completed: false
    });
    save();
    render();
    updateStats();
    input.value = '';
});
filters.forEach(btn => {
    btn.addEventListener('click', () => {
        filters.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        filter = btn.dataset.filter;
        render();
    });
});

function save() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function updateStats() {
    totalEl.textContent = tasks.length;
    doneEl.textContent = tasks.filter(t => t.completed).length;
}

function updateClock() {
    const d = new Date();
    clockEl.textContent = d.toLocaleTimeString();
}

function render() {
    list.innerHTML = '';
    const filtered = tasks.filter(t => {
        if (filter === 'all') return true;
        return filter === 'completed' ? t.completed : !t.completed;
    });
    filtered.forEach(t => {
        const li = document.createElement('li');
        li.className = 'task-item' + (t.completed ? ' completed' : '');
        const cb = document.createElement('div');
        cb.className = 'checkbox' + (t.completed ? ' checked' : '');
        cb.onclick = () => toggle(t.id);
        const span = document.createElement('span');
        span.className = 'text';
        span.textContent = t.text;
        const actions = document.createElement('div');
        actions.className = 'actions';
        const editBtn = document.createElement('button');
        editBtn.innerHTML = '✏️';
        editBtn.onclick = () => startEdit(t, span);
        const delBtn = document.createElement('button');
        delBtn.innerHTML = '🗑️';
        delBtn.onclick = () => remove(t.id);
        actions.append(editBtn, delBtn);

        li.append(cb, span, actions);
        list.append(li);
    });
}

function toggle(id) {
    tasks = tasks.map(t => t.id === id ? {
        ...t,
        completed: !t.completed
    } : t);
    save();
    render();
    updateStats();
}

function remove(id) {
    tasks = tasks.filter(t => t.id !== id);
    save();
    render();
    updateStats();
}

function startEdit(task, span) {
    const inp = document.createElement('input');
    inp.type = 'text';
    inp.value = task.text;
    inp.className = 'edit-input';
    span.replaceWith(inp);
    inp.focus();
    inp.onblur = finish;
    inp.onkeydown = e => {
        if (e.key === 'Enter') finish();
        if (e.key === 'Escape') render();
    };

    function finish() {
        const txt = inp.value.trim();
        if (txt) {
            tasks = tasks.map(t => t.id === task.id ? {
                ...t,
                text: txt
            } : t);
            save();
        }
        render();
        updateStats();
    }
}
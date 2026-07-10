const API = 'http://127.0.0.1:8000/api';

function getToken() {
    return localStorage.getItem('token');
}

function setToken(token) {
    localStorage.setItem('token', token);
}

function removeToken() {
    localStorage.removeItem('token');
}

function showApp() {
    document.getElementById('auth-section').style.display = 'none';
    document.getElementById('app-section').style.display = 'block';
    loadSnippets();
}

function showAuth() {
    document.getElementById('auth-section').style.display = 'block';
    document.getElementById('app-section').style.display = 'none';
}

document.getElementById('show-register').addEventListener('click', () => {
    document.getElementById('login-form').style.display = 'none';
    document.getElementById('register-form').style.display = 'block';
});

document.getElementById('show-login').addEventListener('click', () => {
    document.getElementById('register-form').style.display = 'none';
    document.getElementById('login-form').style.display = 'block';
});

document.getElementById('login-btn').addEventListener('click', async () => {
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    const res = await fetch(`${API}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    });

    const data = await res.json();

    if (res.ok) {
        setToken(data.token);
        showApp();
    } else {
        alert(data.message);
    }
});

document.getElementById('register-btn').addEventListener('click', async () => {
    const name = document.getElementById('register-name').value;
    const email = document.getElementById('register-email').value;
    const password = document.getElementById('register-password').value;
    const password_confirmation = document.getElementById('register-password-confirm').value;

    const res = await fetch(`${API}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password, password_confirmation })
    });

    const data = await res.json();

    if (res.ok) {
        setToken(data.token);
        showApp();
    } else {
        alert(JSON.stringify(data.errors));
    }
});

document.getElementById('logout-btn').addEventListener('click', async () => {
    await fetch(`${API}/logout`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${getToken()}`
        }
    });

    removeToken();
    showAuth();
});

document.getElementById('save-btn').addEventListener('click', async () => {
    const title = document.getElementById('snippet-title').value;
    const content = document.getElementById('snippet-content').value;

    const res = await fetch(`${API}/snippets`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${getToken()}`
        },
        body: JSON.stringify({ title, content })
    });

    if (res.ok) {
        document.getElementById('snippet-title').value = '';
        document.getElementById('snippet-content').value = '';
        loadSnippets();
    }
});

async function loadSnippets() {
    const res = await fetch(`${API}/snippets`, {
        headers: {
            'Authorization': `Bearer ${getToken()}`
        }
    });

    const snippets = await res.json();
    const list = document.getElementById('snippets-list');
    list.innerHTML = '';

    snippets.forEach(snippet => {
        const card = document.createElement('div');
        card.className = 'snippet-card';
        card.innerHTML = `
            <h3>${snippet.title}</h3>
            <p>${snippet.content}</p>
            <button class="delete-btn" data-id="${snippet.id}">Delete</button>
        `;
        list.appendChild(card);
    });

    document.querySelectorAll('.delete-btn').forEach(btn => {
        btn.addEventListener('click', async () => {
            const id = btn.getAttribute('data-id');
            await fetch(`${API}/snippets/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${getToken()}`
                }
            });
            loadSnippets();
        });
    });
}

if (getToken()) {
    showApp();
} else {
    showAuth();
}
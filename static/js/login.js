function clearInputs() {
    document.getElementsByClassName('input is-success')[0].value = ''
    document.getElementsByClassName('input is-success')[1].value = ''
}

async function login() {
    const login = document.getElementsByClassName('input is-success')[0].value
    const password = document.getElementsByClassName('input is-success')[1].value

    const result = await fetch('/', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ login, password })
    })

    if (result.status !== 201) {
        alert('Invalid login or password')
        return
    }

    document.location = '/users-page'
}

async function logout() {
    const result = await fetch('/', {
        method: 'DELETE',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })

    if (result.status === 200) document.location = '/'
}

function clearInputs() {
    document.getElementsByClassName('input is-success')[0].value = ''
    document.getElementsByClassName('input is-success')[1].value = ''
}

function login() {
    const login = document.getElementsByClassName('input is-success')[0].value
    const password = document.getElementsByClassName('input is-success')[1].value

    console.log(login, password)
}
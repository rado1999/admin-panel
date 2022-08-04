async function patch(url) {
    const labels = document.getElementsByClassName('label')
    const inputs = document.getElementsByClassName('input is-primary')

    const result = {}

    for (let i = 0; i < labels.length; i++) {
        result[labels[i].textContent.trim()] = inputs[i].value.trim()
    }

    await fetch(url, {
        method: 'PATCH',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(result)
    })

    const back = url.split('/')[1]
    document.location = `/${back}s-page`
}

async function create(url) {
    const labels = document.getElementsByClassName('label')
    const inputs = document.getElementsByClassName('input is-primary')

    const result = {}

    for (let i = 0; i < labels.length; i++) {
        const key = labels[i].textContent.trim()
        const value = inputs[i].value.trim()
        result[key] = value
    }

    await fetch(url, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(result)
    })

    const back = url.split('/')[1]
    document.location = `/${back}s-page`
}

async function remove(url) {
    await fetch(url, {
        method: 'DELETE',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })

    const back = url.split('/')[1]
    document.location = `/${back}s-page`
}

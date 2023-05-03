const { app, BrowserWindow } = require('electron')

const createWindow = () => {
    const window = new BrowserWindow({
        width: 1700,
        height: 800
    })

    window.loadFile('view/index.html')
}

app.whenReady()
    .then(() => createWindow())
    .catch(() => console.log('Algo deu errado ao carregar o app!'))
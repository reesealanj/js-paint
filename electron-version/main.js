const electron = require('electron');
const url = require('url');
const path = require('path');

const {app, Menu, BrowserWindow} = electron;

let mainWindow; 

// On Ready, run Initialization Logic
app.on('ready', function() {
    // Create Window
    mainWindow = new BrowserWindow({});
    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'main_window.html'),
        protocol: 'file:',
        slashes: true
    }));

    // Create and Insert Menu
    const menuBar = Menu.buildFromTemplate(mainMenu);
    Menu.setApplicationMenu(menuBar);

    // Quit whole application if window closed
    mainWindow.on('closed', function() {
        app.quit();
    });
});
// Menu Template
const mainMenu = [
    {
        label: "File",
        submenu: [
            {
                label: 'Save Drawing as PNG',
                accelerator: 'CmdOrCtrl+S',
                click() {
                    saveScreen();
                }
            },
            {
                label: 'Quit', 
                accelerator: 'CmdOrCtrl+Q', 
                click() {
                    app.quit();
                }
            }
        ]
    },
    {
        label: "Edit",
        submenu: [
            {
                label: 'Clear Canvas',
                accelerator: 'CmdOrCtrl+N',
                click() {
                    clearCanvas();
                }
            }
        ]
    },
    {
        label: "Help",
        submenu: [
            {
                label: "View Web Version",
                click() {
                    electron.shell.openExternal("https://www.rjones.dev/js-paint/");
                }
            },
            {
                label: "Source Code",
                click() {
                    electron.shell.openExternal("https://www.github.com/reesealanj/js-paint/");
                }
            }, 
            {
                label: "Creator",
                click() {
                    electron.shell.openExternal("http://www.linkedin.com/in/reesealanj");
                }
            }
        ]
    }
];

if(process.platform == 'darwin') {
    mainMenu.unshift({
        label: ""
    });
}

if(process.env.NODE_ENV !== 'production') {
    mainMenu.push({
        label: "Developer Tools", 
        submenu: [
            {
                label: 'Toggle Dev Tools',
                accelerator: 'CmdOrCtrl+I',
                click(item, focusedWindow) {
                    focusedWindow.toggleDevTools();
                }
            }, 
            {
                role: 'reload'                
            }
        ]
    });
}

function saveScreen() {

}

function clearCanvas() {

}
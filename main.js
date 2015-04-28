var app = require('app'),
    BrowserWindow = require('browser-window'),
    Tray = require('tray');

require('crash-reporter').start();

var mainWindow = null;

app.on('window-all-closed', function() {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('ready', function() {
    if (app.dock) {
        app.dock.hide();
    }

    var tray = new Tray('icon.png');

    tray.on('clicked', function clicked() {
        if(mainWindow && mainWindow.isVisible()){
            return hide();
        }
        show();
    });

    var show = function(){
        if (mainWindow && !mainWindow.isVisible()) {
            return mainWindow.show();
        }

        var atomScreen = require('screen'),
            size = atomScreen.getPrimaryDisplay(),
            x = size.workArea.width - 500 - 250,
            y = size.workArea.y

        mainWindow = new BrowserWindow({
            width: 500, 
            height: 400,
            show: true,
            frame: false
        });
        mainWindow.setPosition(x, y);

        mainWindow.loadUrl('file://' + __dirname + '/index.html');

        mainWindow.on('blur', hide);

        mainWindow.on('close', function() {
            mainWindow = null;
        });
    };

    var hide = function(){
        mainWindow.hide();
    };
});
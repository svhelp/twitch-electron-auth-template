import { app, BrowserWindow, Menu, session } from 'electron';
import { runAuthService } from 'main/modules/auth-service';
import { configureUpdater } from 'main/modules/updater';
import { createWindow } from 'main/modules/main-window';

const appId = "com.squirrel.twitch.notifier.desktop.TwitchElectronAuthTemplate";

const gotTheLock = app.requestSingleInstanceLock();
const unableToStart = require('electron-squirrel-startup') || !gotTheLock

let mainWindow: BrowserWindow = null

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
// Close secondary windows.
if (unableToStart) {
  app.quit();
}

if (process.platform === 'win32')
{
  app.setAppUserModelId(appId)
}

Menu.setApplicationMenu(null);

/**
 * Add event listeners...
 */

app.on('second-instance', () => {
  // Someone tried to run a second instance, we should focus our window.
  if (!mainWindow) {
    return
  }
  
  if (mainWindow.isMinimized()) {
    mainWindow.restore()
  }

  mainWindow.focus()
})

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', async () => {

  // Skip running modules on force quit.
  if (unableToStart) {
    return;
  }

  session.defaultSession.webRequest.onHeadersReceived((details, callback) => {
    callback({
      responseHeaders: {
        ...details.responseHeaders,
        'Content-Security-Policy': ['default-src \'self\'; style-src \'unsafe-inline\'; connect-src \'self\' https://api.twitch.tv/; img-src \'self\' https://*.jtvnw.net/']
      }
    })
  })

  mainWindow = await createWindow();
  
  const updateWindowToken = (token: string) => {
    if (!mainWindow){
      return;
    }

    //log("Window token updated.");

    mainWindow.webContents.send("token_updated", token);
    mainWindow.focus();
  }

  runAuthService().onAccessGranted(updateWindowToken)
  configureUpdater();
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', async () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    mainWindow = await createWindow();
  }
});


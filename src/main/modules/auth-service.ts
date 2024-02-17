
import express from 'express';
import { initAccessToken, removeAccessToken, updateAccessToken } from 'main/utils/token-storage';
import { getStaticPath } from 'main/utils/path-utils';
import { ipcMain } from 'electron';

type AccessGrantedCallback = (token: string) => void

const log = (message: string) => {
    console.log(`***Auth service: ${message}`);
}

export const runAuthService = () => {
  log("Starting server.");

  let onAccessGranted: AccessGrantedCallback

  const expressServer = express();

  expressServer.use(express.static(getStaticPath()));
  
  expressServer.get('/access_gathered', (_req, _res) => {
    _res.status(200);
    _res.send();
  
    console.log("Got access token");
  
    const token = _req.query.access_token as string;
    
    updateAccessToken(token);
    onAccessGranted?.(token);
  });
  
  expressServer.listen(1213);

  log("Server started.");

  ipcMain.handle('request_token', () => {
    return initAccessToken();
  })
  
  ipcMain.on('remove_token', async () => {
    removeAccessToken();
  });

  return {
    onAccessGranted: (callback: AccessGrantedCallback) => {
      onAccessGranted = callback
    }
  }
}
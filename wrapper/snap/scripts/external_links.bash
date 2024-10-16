#!/bin/bash
cd $(dirname "$0")/../res/electron/ || exit 1
browserWindow="$(cat settings.json | perl -0pe 's/[\n|\s"]//g' | sed 's/[^:]*://' | sed 's/}}}$/,preload:path.join(app.getAppPath(),"cdv-electron-preload.js")}}/')"
cd ../../platforms/electron/platform_www/ || exit 2
file=cdv-electron-main.js
content=$(cat "$file" | perl -0pe "s#/\* MOROway Code \*/.*##g")
echo "$content" > "$file"
echo  "/* MOROway Code */function resolveURL(url) {return new Promise(resolve => {resolve(url)})};" >> "$file"
echo  "/* MOROway Code */ipcMain.handle('openExternalLink', async (event, arg) => {const url = await resolveURL(arg); require('electron').shell.openExternal(url);});" >> "$file"
echo  "/* MOROway Code */ipcMain.handle('openNormalLink', async (event, arg) => {const url = await resolveURL(arg); (new (require('electron').BrowserWindow)($browserWindow)).loadURL(basePath+'/'+url);});" >> "$file"
echo  "/* MOROway Code */ipcMain.handle('exitApp', async (event) => {app.quit();});" >> "$file"
file=cdv-electron-preload.js
content=$(cat "$file" | perl -0pe "s#/\* MOROway Code \*/.*##g")
echo "$content" > "$file"
echo "/* MOROway Code */contextBridge.exposeInMainWorld('_openExternalLink', {exec: (url) => ipcRenderer.invoke('openExternalLink', url)});" >> "$file"
echo "/* MOROway Code */contextBridge.exposeInMainWorld('_openNormalLink', {exec: (url) => ipcRenderer.invoke('openNormalLink', url)});" >> "$file"
echo "/* MOROway Code */contextBridge.exposeInMainWorld('_exitApp', {exec: () => ipcRenderer.invoke('exitApp')});" >> "$file"

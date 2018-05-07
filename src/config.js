const appConfig = require('application-config')('bedbug')
const path = require('path')
const electron = require('electron')
const arch = require('arch')

const APP_NAME = 'bedbug'
const APP_TEAM = 'bedbug, LLC'
const APP_VERSION = require('../package.json').version

const IS_TEST = isTest()
const PORTABLE_PATH = IS_TEST
  ? path.join(process.platform === 'win32' ? 'C:\\Windows\\Temp' : '/tmp', 'bedbug')
  : path.join(path.dirname(process.execPath), 'Portable Settings')
const IS_PRODUCTION = isProduction()
const IS_PORTABLE = isPortable()

const UI_HEADER_HEIGHT = 38
const UI_TORRENT_HEIGHT = 100
const WEB_HOST = "http://www.basezhushou.com"
const USER_AGENT= {
  andriod: 'Mozilla/5.0 (Linux; U; Android 7.0; zh-cn; STF-AL00 Build/HUAWEISTF-AL00) AppleWebKit/537.36 (KHTML, like Gecko)Version/4.0 Chrome/37.0.0.0 MQQBrowser/7.9 Mobile Safari/537.36',
  iPhone: 'Mozilla/5.0 (iPhone 84; CPU iPhone OS 10_3_3 like Mac OS X) AppleWebKit/603.3.8 (KHTML, like Gecko) Version/10.0 MQQBrowser/7.8.0 Mobile/14G60 Safari/8536.25 MttCustomUA/2 QBWebViewType/1 WKType/1'
}
module.exports = {
  ANNOUNCEMENT_URL: WEB_HOST+'/announcement',
  AUTO_UPDATE_URL: WEB_HOST+'/update',
  CRASH_REPORT_URL: WEB_HOST+'/crash-report',
  TELEMETRY_URL: WEB_HOST+'/telemetry',
  SOCKET_PORT: 4324,
  LOCAL_HTTP_PORT:4544,
  PLUG_PATH:path.join(__dirname, '..', 'static', 'plug'),
  WEBVIEW_SRC: 'about:blank',
  APP_COPYRIGHT: 'Copyright © 2014-2018 ' + APP_TEAM,
  APP_FILE_ICON: path.join(__dirname, '..', 'static', 'bedbugFile'),
  APP_ICON: path.join(__dirname, '..', 'static', 'bedbug'),
  APP_NAME: APP_NAME,
  APP_TEAM: APP_TEAM,
  APP_VERSION: APP_VERSION,
  APP_WINDOW_TITLE: APP_NAME,

  CONFIG_PATH: getConfigPath(),

  DEFAULT_PLUG: ['video'],

  DELAYED_INIT: 3000 /* 3 seconds */,

  DEFAULT_DOWNLOAD_PATH: getDefaultDownloadPath(),

  GITHUB_URL: 'https://github.com/chouchong',
  GITHUB_URL_ISSUES: 'https://github.com/chouchong/issues',
  GITHUB_URL_RAW: 'https://raw.githubusercontent.com/chouchong/master',

  HOME_PAGE_URL: WEB_HOST,

  IS_PORTABLE: IS_PORTABLE,
  IS_PRODUCTION: IS_PRODUCTION,
  IS_TEST: IS_TEST,

  OS_SYSARCH: arch() === 'x64' ? 'x64' : 'ia32',

  POSTER_PATH: path.join(getConfigPath(), 'Posters'),
  ROOT_PATH: path.join(__dirname, '..'),
  STATIC_PATH: path.join(__dirname, '..', 'static'),

  WINDOW_ABOUT: 'file://' + path.join(__dirname, '..', 'static', 'about.html'),
  WINDOW_MAIN: 'file://' + path.join(__dirname, '..', 'static', 'main.html'),
  WINDOW_CATCH: 'file://' + path.join(__dirname, '..', 'static', 'catch.html'),

  WINDOW_INITIAL_BOUNDS: {
    width: 800,
    height: UI_HEADER_HEIGHT + (UI_TORRENT_HEIGHT * 6) // header + 6 torrents
  },
  WINDOW_MIN_HEIGHT: UI_HEADER_HEIGHT + (UI_TORRENT_HEIGHT * 2), // header + 2 torrents
  WINDOW_MIN_WIDTH: 400,

  UI_HEADER_HEIGHT: UI_HEADER_HEIGHT,
  UI_TORRENT_HEIGHT: UI_TORRENT_HEIGHT,
  CURRENT_USER_AGENT:USER_AGENT.andriod
}

function getConfigPath () {
  if (IS_PORTABLE) {
    return PORTABLE_PATH
  } else {
    return path.dirname(appConfig.filePath)
  }
}

function getDefaultDownloadPath () {
  if (IS_PORTABLE) {
    return path.join(getConfigPath(), 'Downloads')
  } else {
    return getPath('downloads')
  }
}

function getPath (key) {
  if (!process.versions.electron) {
    // Node.js process
    return ''
  } else if (process.type === 'renderer') {
    // Electron renderer process
    return electron.remote.app.getPath(key)
  } else {
    // Electron main process
    return electron.app.getPath(key)
  }
}

function isTest () {
  return process.env.NODE_ENV === 'test'
}

function isPortable () {
  if (IS_TEST) {
    return true
  }

  if (process.platform !== 'win32' || !IS_PRODUCTION) {
    // Fast path: Non-Windows platforms should not check for path on disk
    return false
  }

  const fs = require('fs')

  try {
    // This line throws if the "Portable Settings" folder does not exist, and does
    // nothing otherwise.
    fs.accessSync(PORTABLE_PATH, fs.constants.R_OK | fs.constants.W_OK)
    return true
  } catch (err) {
    return false
  }
}

function isProduction () {
  if (!process.versions.electron) {
    // Node.js process
    return false
  }
  if (process.platform === 'darwin') {
    return !/\/Electron\.app\//.test(process.execPath)
  }
  if (process.platform === 'win32') {
    return !/\\electron\.exe$/.test(process.execPath)
  }
  if (process.platform === 'linux') {
    return !/\/electron$/.test(process.execPath)
  }
}

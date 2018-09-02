/**
 * @file uaParser.js
 * @author
 */

import Parser from 'ua-parser-js'

const parser = new Parser()
const {
  browser,
  device,
  os,
  ua
} = parser.getResult()
// ua吐到window
const isMobile = device.type === 'mobile' || browser.name === 'WeChat' || os.name === 'Android' || os.name === 'iOS'
const isIOS = os.name === 'iOS'
const isOldBrowserPc = !((browser.name === 'Chrome' && browser.major > 55) || (browser.name === 'Firefox' && browser.major > 31) || ((browser.name === 'Safari' || browser.name === 'Mobile Safari') && browser.major > 5) || (browser.name === 'WeChat' && os.name === 'iOS'))
const isIe = window.ActiveXObject || 'ActiveXObject' in window || (/Edge/i).test(ua)
const isWechat = browser.name === 'WeChat'

window.ua = {
  isMobile,
  isOldBrowserPc,
  isIe,
  isWechat,
  isIOS
}

export {
  isMobile,
  isOldBrowserPc,
  isIe,
  isWechat,
  isIOS
}

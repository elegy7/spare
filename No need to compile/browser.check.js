;(function() {
    function bower() {
        var userAgent = navigator.userAgent,
            rMsie = /(msie\s|trident.*rv:)([\w.]+)/,
            rFirefox = /(firefox)\/([\w.]+)/,
            rOpera = /(opera).+version\/([\w.]+)/,
            rChrome = /(chrome)\/([\w.]+)/,
            rSafari = /version\/([\w.]+).*(safari)/
        var browser
        var version

        function uaMatch(ua) {
            var match = rMsie.exec(ua)
            if (match != null) {
                return {
                    browser: 'ie',
                    version: match[2] || '0'
                }
            }
            match = rFirefox.exec(ua)
            if (match != null) {
                return {
                    browser: match[1] || '',
                    version: match[2] || '0'
                }
            }
            match = rOpera.exec(ua)
            if (match != null) {
                return {
                    browser: match[1] || '',
                    version: match[2] || '0'
                }
            }
            match = rChrome.exec(ua)
            if (match != null) {
                return {
                    browser: match[1] || '',
                    version: match[2] || '0'
                }
            }
            match = rSafari.exec(ua)
            if (match != null) {
                return {
                    browser: match[2] || '',
                    version: match[1] || '0'
                }
            }
            if (match != null) {
                return {
                    browser: '',
                    version: '0'
                }
            }
        }
        var browserMatch = uaMatch(userAgent.toLowerCase())
        if (browserMatch.browser) {
            browser = browserMatch.browser
            version = browserMatch.version
        }
        var obj = {}
        obj[browser] = version
        return obj
    }
    var ver = bower()
    var height = document.documentElement.clientHeight || document.getElementsByTagName("body")[0].clientHeight
    if (ver.ie < 10) {
        document.writeln("<div class=\'main\' style=\'width: 100%;height:100%;min-height: " + height + "px;position:relative;white-space: nowrap;margin: 0 auto; text-align: center; background-color: white;\'>");
        document.writeln("        <div style=\'margin-top:-110px; top:50%;position: absolute; width: 800px;left:50%;margin-left: -400px; text-align: center;\'>");
        document.writeln("            <h2 style=\'font-weight: normal;color: #333;\'>您正在使用的浏览器版本过低，将不能正常浏览和访问网页。</h2>");
        document.writeln("            <h2 style=\'font-weight: normal;color: #333;margin-bottom:100px;\'>请使用现代浏览器以支持HTML5以及CSS3</h2>");
        document.writeln("            <div style=\'width:25%;display: inline-block;float: left;\'>");
        document.writeln("                <img src=\'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEgAAABICAMAAABiM0N1AAAAY1BMVEUAeNf///8Ac9YAddaEr+YAcdUAb9UAaNOkwesAbdQAatR2pOLO3vTs8/u2ze/3+v0wg9rH2PJdl9+uyO3Y5PY8iNtonuEnf9nm7/qYuul9qeTB1PEAXNFJjdyMsuff6PcAYtIDSpwzAAAC+klEQVRYhaXX2cKqIBAAYBYBITXNLe1Y//s/5VFzAR0IitvqaxiYARB2jLSIo2bIW4TaoYnK5Or4LrJ+8rgQxQmhFE2DUkqkyJ9VIPS6KP4WjDFi7Hn3h5JBAcoyiBgSP+jlYua41PDygHrhZmZK9J+girKPzDQYrZxQJ7yYaYjOAV2kt4OQbKzQ4DetbXqDBQp0TEmDbqHOKN0AqOfBDkK8P0GZgr86FplrX6nsAN3P606ZVILmdZ0jITixSakJtfSAKHIpk3SNNy0iKsHIaG1AnZFoovL4XE1FDmZRlhqU6hNj3NIpcAzmUWrQbY+aoxJW5qCgnc+6Daq2gBjbmRJoOxkkyQ1aA6Lqqf2kOzsYN0DGWbxA69KzfMvNK1c3yMEpmPAF6t//ooXTKSpTEAJDkskbmteCyi0l15ojEsEOmG96maFs2kOk3SK4TzUhLTsAX6EtLmdoSjXZG0I1/SUdLA7GNTS3aoKE0Q5ec+g8s0I9tG7dCBVcd9J3rTBLqvGxmpYk3UYoItq8luJdKxEaJdT/5AjltNXifqeSnI6tfTygnaRShIXcLxnJUpXMUW8JVCU8QdU/raS2OTeRdUA7ErEMldos9jxSYh1ge2Md0ksz/BhZB3ki7RYWfw/RSD8g268dRHsNApfDF7poUG87cUKh7xkTuluO2mAo+37NTCj6IUUGdPt8B/WDfthFJvRLigzI/z4bAFkPI/uAIdo4fhIEOXr2R8goWep6432AjORJ6CXlCQ36hgxPknbPNnY2t539nyHz4KPw9cgHepltRDqONjeED0Xrl++0OEPHa4YswJ/q4xr9xWfo1Py1uyAcTS8IA6BzI2GtY3pVI8hyoz1CwAGphgccTNy+3/QghIFmOz5lnsewkq4W6xUAhmLwEk2kGPr4kSRVUmRxXwvJ9mWBoeNja4+LMMallJyxwzPQAlXBbdIC4Wfow9YGmT3gF+iKwiQrhFP4bhcO4dT5PA+A8DUPOCtd0Pgm87/huCGcec9Orq+f//fnIdPaLOYQAAAAAElFTkSuQmCC\' width=\'72\' style=\'margin-bottom:10px;\'><br>");
        document.writeln("                <a href=\'https://www.microsoft.com/zh-cn/download/internet-explorer.aspx\' target=\'_blank\' style=\'color: #333;text-decoration: none;\'>升级至IE10+版本</a>");
        document.writeln("            </div>");
        document.writeln("            <div style=\'width:25%;display: inline-block;float: left;\'>");
        document.writeln("                <img src=\'data:image/jpg;base64,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\' width=\'72\' style=\'margin-bottom:10px;\'><br>");
        document.writeln("                <a href=\'https://www.google.com/chrome/\' target=\'_blank\' style=\'color: #333;text-decoration: none;\'>下载Chrome</a>");
        document.writeln("            </div>");
        document.writeln("            <div style=\'width:25%;display: inline-block;float: left;\'>");
        document.writeln("                <img src=\'data:image/jpg;base64,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\' width=\'76\' style=\'margin-bottom:10px;\'><br>");
        document.writeln("                <a href=\'http://www.firefox.com.cn/\' target=\'_blank\' style=\'color: #333;text-decoration: none;\'>下载火狐浏览器</a>");
        document.writeln("            </div>");
        document.writeln("            <div style=\'width:25%;display: inline-block;float: left;\'>");
        document.writeln("                <img src=\'data:image/png;base64,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\' width=\'75\' style=\'margin-bottom:10px;\'><br>");
        document.writeln("                <a href=\'https://browser.qq.com/?adtag=SEM170314003\' target=\'_blank\' style=\'color: #333;text-decoration: none;\'>其他Chrome内核浏览器</a>");
        document.writeln("            </div>");
        document.writeln("        </div>");
        document.writeln("    </div>");
    }
})()
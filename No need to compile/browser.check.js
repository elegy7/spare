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
        document.writeln("                <img src=\'./1.png\' width=\'72\' style=\'margin-bottom:10px;\'><br>");
        document.writeln("                <a href=\'https://www.microsoft.com/zh-cn/download/internet-explorer.aspx\' target=\'_blank\' style=\'color: #333;text-decoration: none;\'>升级至IE10+版本</a>");
        document.writeln("            </div>");
        document.writeln("            <div style=\'width:25%;display: inline-block;float: left;\'>");
        document.writeln("                <img src=\'./2.jpg\' width=\'72\' style=\'margin-bottom:10px;\'><br>");
        document.writeln("                <a href=\'https://www.google.com/chrome/\' target=\'_blank\' style=\'color: #333;text-decoration: none;\'>下载Chrome</a>");
        document.writeln("            </div>");
        document.writeln("            <div style=\'width:25%;display: inline-block;float: left;\'>");
        document.writeln("                <img src=\'./3.jpg\' width=\'76\' style=\'margin-bottom:10px;\'><br>");
        document.writeln("                <a href=\'http://www.firefox.com.cn/\' target=\'_blank\' style=\'color: #333;text-decoration: none;\'>下载火狐浏览器</a>");
        document.writeln("            </div>");
        document.writeln("            <div style=\'width:25%;display: inline-block;float: left;\'>");
        document.writeln("                <img src=\'./4.png\' width=\'75\' style=\'margin-bottom:10px;\'><br>");
        document.writeln("                <a href=\'https://browser.qq.com/?adtag=SEM170314003\' target=\'_blank\' style=\'color: #333;text-decoration: none;\'>其他Chrome内核浏览器</a>");
        document.writeln("            </div>");
        document.writeln("        </div>");
        document.writeln("    </div>");
    }
})()
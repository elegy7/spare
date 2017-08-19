define(function(require, exports, module){
	module.exports = function() {
		var Sys = {};
		var ua = navigator.userAgent.toLowerCase();
		var s;
		(s = ua.match(/msie ([\d.]+)/)) ? Sys.ie = s[1] :
		(s = ua.match(/firefox\/([\d.]+)/)) ? Sys.firefox = s[1] :
		(s = ua.match(/chrome\/([\d.]+)/)) ? Sys.chrome = s[1] :
		(s = ua.match(/opera.([\d.]+)/)) ? Sys.opera = s[1] :
		(s = ua.match(/version\/([\d.]+).*safari/)) ? Sys.safari = s[1] : 0;
		var ieversion;
		if (Sys.ie){
		ieversion = parseInt(Sys.ie);
		if(ieversion<8) {
		alert("尊敬的用户！\n\n  您目前使用的Internet Explorer版本为:"+Sys.ie+"");
		setIsTextReadOnly(true);
		}
		} else if (Sys.firefox) {
		ieversion = Sys.firefox;
		//setIsTextReadOnly(true);
		} else if (Sys.chrome) {
		ieversion = Sys.chrome;
		} else if (Sys.opera) {
		ieversion = Sys.opera;
		}  else if (Sys.safari) {
		ieversion = Sys.safari;
		}
		return Sys;
	}
});
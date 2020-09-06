
// 存缓存
function setSessionStorage(key, value) {
	sessionStorage.setItem(key, JSON.stringify(value))
}
// 获取缓存
function getSessionStorage(key) {
	return JSON.parse(sessionStorage.getItem(key))
}
function delSessionStorage(key) {
	sessionStorage.removeItem(key)
}

function getUrlParam(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
	var r = window.location.search.substr(1).match(reg);  //匹配目标参数
	if (r != null) return unescape(r[2]);
	return null; //返回参数值
}

function sendAjax(type, url, param, datatype, callback) {
	$.ajax({
		type: type,
		url: url,
		data: param,
		dataType: datatype,
		success: callback,
		error: function (result) {
			console.log(result);
		}
	});
}
function sendkyAjax(type, url, data, dataType, jsonp, callback, error) {
	$.ajax({
		type: type,
		url: url,
		data: data,
		dataType: dataType,
		jsonp: jsonp,
		async: false,
		xhrFiled: {
			withCredentials: true
		},
		success: callback,
		error: error
	});
}

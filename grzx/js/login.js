// function checkPassword() {
// 	var pass1 = document.getElementById("Password");
// 	var pass2 = document.getElementById("Repassword");
// 	if (pass1.value != pass2.value) {
// 		alert("两次输入密码不一致！")
// 		pass1.value = "";
// 		pass1.innerHTML = "";
// 		pass2.value = "";
// 		pass2.innerHTML = "";
// 	}
// }


window.onload = function () {
	$(".wjlmm").hide();
	$(".zc").hide();
	$(".dr").show();
	$(".mask").show();
}



$(".lmw_dr").click(function () {
	$(".wjlmm").hide();
	$(".zc").hide();
	$(".dr").show();
	$(".mask").show();
})
$(".lmw_register").click(function () {
	$(".wjlmm").hide();
	$(".dr").hide();
	$(".zc").show();
	$(".mask").show();
})
$(".lmw_forget").click(function () {
	$(".zc").hide();
	$(".dr").hide();
	$(".wjlmm").show();
	$(".mask").show();
})

$(function () {
	$(".wjlmm").hide();
	$(".dr").hide();
	$(".mask").hide();
	$(".zc").hide();
})

function login(type, url, data, dataType, jsonp, callback, error) {
	let account = parseInt($("input[name='account']").val());
	let password = $("input[name='loginpassword']").val();
	// http://localhost:10086/tiku/user/userlogin.do
	// http://192.168.0.120:1008/tiku/user/userlogin.do
	type = "post";
	url = "https://abc.com/tiku/user/userlogin.do";
	// url = `http://localhost:10086/tiku/user/userlogin.do`;

	data = {
		"account": account,
		"password": password,
	};
	dataType = 'jsonp';
	jsonp = "jsoncallback";
	callback = function (data) {
		// console.log("正确");
		// console.log(data)
		if (data.V != null) {
			setSessionStorage('account', account);
			setSessionStorage('password', "ik1988&" + password);
			sessionStorage.setItem('userInfo', JSON.stringify(data.V))
			window.location.href = "index.html";
		} else {
			alert("账号或者密码错误")
		}
	};
	error = function (result) {
		console.log("错误");
		// console.log(result)
	}
	sendkyAjax(type, url, data, dataType, jsonp, callback, error);
}

$("#login").click(function () {
	login();
})
// function zibo(type, url, data, dataType, jsonp, callback, error) {
// 	type = "post";
// 	url = "http://localhost:10086/tiku/course/getChapterQuestionIdTypes.do";
// 	data = {
// 		"subcourseId": 259
// 	};
// 	console.log(data)
// 	dataType = 'jsonp';
// 	jsonp = "jsoncallback";
// 	callback = function(data) {
// 		console.log("正确");
// 		console.log(data)
// 	};
// 	error = function(result) {
// console.log("错误");
// console.log(result)
// 	}
// 	sendkyAjax(type, url, data, dataType, jsonp, callback, error);
// }

// 注册	

let regitel
let regcode
let regpass
let regconfirmpass
// let bklevel


// bklevel = $(".bklevel").val();   //报考选择框


// 点击注册

function register(type, url, data, dataType, jsonp, callback, error) {
	type = "post";
	url = "https://tk.360xkw.com/tiku/user/regist.do";
	data = {
		"account": $(".regitel").val(),
		"password": $(".regpass").val(),
		"checksms": $(".regcode").val(),
		"flagSource": "1",
		"suid": "0"
	};
	dataType = 'jsonp';
	jsonp = "jsoncallback";
	callback = function (data) {
		console.log(data)
		if (data == "1") {
			alert("注册成功")
		}
		else if (data.S == "0") {
			alert("注册错误")
		}
		else if (data.S == "-1") {
			alert("注册错误")
		}
		else if (data.S == "1005") {
			alert("此账号已经被注册")

		} else if (data.S == "1001") {
			alert("注册超时")
		} else if (data.S == "1002") {
			alert("注册错误")
		} else if (data.S == "1003") {
			alert("发送的验证码验证不一致")
		} else if (data.S == "1004") {
			alert("发送的验证码验证不一致")
		} else if (data.S == "1006") {
			alert("密码或账号错误，请重新检查一次")
		} else {
			alert("注册错误")
		}

		registerHongbao()
	};
	error = function (result) {
		console.log(result)
		// console.log("获取数据错误")
	}
	sendkyAjax(type, url, data, dataType, jsonp, callback, error);
}



// 获取新人红包
function registerHongbao() {
	type = "post";
	url = "https://tk.360xkw.com/tiku/jzCoupon/registerCoupon.do";
	data = {
		'stuId': 1,
		'dlId': 0
	};
	dataType = 'jsonp';
	jsonp = "jsoncallback";
	callback = function (data) {

	};
	error = function (result) {
		// console.log(result)
		console.log("获取数据错误")
	}
	sendkyAjax(type, url, data, dataType, jsonp, callback, error);
}


// $.ajax({
//      
// 	    url : "http://test360xkw.free.vipnps.vip/tiku/user/regist.do",
// 	    type : "post",
// 	    dataType : "jsonp",  
// 	    jsonp : "jsoncallback",
// 	    data:{
// 	      account:"19965412404",
// 	      password:"123456",
// 		  checksms: "077153",
// 		  flagSource: "1",
// 		  suid: "0"
// 	    },
// 	    async : false,
// 	    success : function(data){
// 	       console.log(data);
// 	 }
//   });






















var flag

$(".gyh_register_btn").click(function () {

	if (!(/^1[3456789]\d{9}$/.test($(".regitel").val())) || !$(".regitel").val()) {
		alert("请填写正确的手机号")
	} else {
		if (!$(".regcode").val()) {
			alert("请填写正确的验证码")
			return

		} else {
			if (!(/^([a-zA-Z0-9!@#$%^&*()_?<>{}]){6,16}$/.test($(".regpass").val())) || !$(".regpass").val()) {
				alert("密码只能6-16个字符")
				return
			} else {
				if (!(/^([a-zA-Z0-9!@#$%^&*()_?<>{}]){6,16}$/.test($(".regconfirmpass").val()))) {
					alert("确认密码只能6-16个字符")
				} else {
					if ($(".regpass").val() == $(".regconfirmpass").val()) {
						register()
					} else {
						alert("密码不一致")
					}
				}
			}
		}
	}
})

let maxwidth = $(".huakuaibox").width();
let selfwidth = $(".huakuai").width();
let max = maxwidth - selfwidth
var huakuai = $(".huakuai");
var body = $('body');
var index = 0;
var x1;
var num
var that
// huakuaimove()

// function huakuaimove(){
huakuai.mousedown(function () {
	index = 1;              //鼠标按下才能触发onmousemove方法
	var x = event.clientX;     //鼠标点击的坐标值，x
	var left = this.style.left;
	left = left.substr(0, left.length - 2);   //去掉px
	x1 = parseInt(x - left);
	// try {
	huakuai.mousemove(function () {
		if (index === 1) {
			this.style.left = event.clientX - x1 + 'px';

			if (this.style.left.substr(0, this.style.left.length - 2) < 0) {
				this.style.left = 0;
			};
			if (this.style.left.substr(0, this.style.left.length - 2) > max) {
				this.style.left = 0
			};
			num = event.clientX - x1
			// console.log(num)
		};
	});
	// }catch (TypeError) {
	// huakuai.mousemove = false;
	// }finally{
	huakuai.mouseup(function () {
		getcode()
		that = this
		this.style.left = 0
		index = 0;
		huakuai.mousemove = null;
	});
	// }
});
// }

// 点击获取手机验证码
$("#verificationcode").click(function () {
	if (!$(".regitel").val()) {
		alert("请务必填写手机号")
	} else {
		// 获取背景滑动验证图
		let url = `url(https://tk.360xkw.com/unlock/captcha-image-NoLogin.do?v=` + Math.random() + `)`;
		$(".huakuaibox").css("background", url);
		$(".huakuaibox").show()
		$(".huakuai").css("left", `0px`)
		$(".huakuai").css("background", `url(./img/toScroll.gif) 5px 12px no-repeat`);

	}
})

// 获取验证码
function getcode(type, url, data, dataType, jsonp, callback, error) {
	type = "post";
	var tel = $(".regitel").val()
	url = "https://tk.360xkw.com/tiku/sms/sendRandCumSMSForWebXKWByUnlockNoLogin.do";
	data = {
		// jsoncallback:"jQuery18308529625156915429_1594697199867",
		"phone": tel,
		"verifyCode": num
	};
	dataType = 'jsonp';
	jsonp = "jsoncallback";
	callback = function (data) {
		console.log(data)
		if (data.S == 1) {
			console.log(that)
			$(".huakuai").css("background", `url(./img/success.gif) 5px 12px no-repeat`);
			$(".huakuai").css("left", `${num}px`)
			setTimeout(() => {
				$(".huakuaibox").hide();
			}, 1000)
		} else {
			console.log("操作错误")
		}
	};
	error = function (result) {
		console.log("错误");
		console.log(result)
	}
	sendkyAjax(type, url, data, dataType, jsonp, callback, error);
}
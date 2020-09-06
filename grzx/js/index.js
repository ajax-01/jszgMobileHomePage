const grzx = "img/icon_home.png";
const grzx1 = "img/icon_home1.png";

const kstk = "img/icon_class.png";
const kstk1 = "img/icon_class1.png";

const tkjl = "img/icon_record.png";
const tkjl1 = "img/icon_record1.png";

const kczx = "img/icon_center.png";
const kczx1 = "img/icon_center1.png";

const kszt = "img/icon_write.png";
const kszt1 = "img/icon_write1.png";

// const ztjl = "img/icon_record.png";
// const ztjl1 = "img/icon_record1.png";

const lnzt = "img/icon_history.png";
const lnzt1 = "img/icon_history1.png";

const jczx = "img/icon_material.png";
const jczx1 = "img/icon_material1.png";

const gwc = "img/shopcar.png";
const gwc1 = "img/shopcar1.png";

const wddd = "img/icon_order.png";
const wddd1 = "img/icon_order1.png";

const wallet = "img/icon_wallet.png";
const wallet1 = "img/icon_wallet1.png";


const zhaq = "img/icon_security.png";
const zhaq1 = "img/icon_security1.png";

var _iframe = window.parent;
var zhaqBox = _iframe.document.getElementsByClassName('tipsdialogbox1')[0];
var connent1 = _iframe.document.getElementsByClassName('connent1')[0];
$(connent1).html("您已经退出登录，是否去登录?")


let list = [grzx, kstk, tkjl, kczx, kszt, lnzt, gwc, wddd, wallet, zhaq];
let changelist = [grzx1, kstk1, tkjl1, kczx1, kszt1, lnzt1, gwc1, wddd1, wallet1, zhaq1];
let active = $(".active");

active.click(function () {
	let num = active.index(this);
	let change = changelist[num];
	for (let i = 0; i < list.length; i++) {
		active.eq(i).find("img").attr('src', list[i]);
	}
	active.eq(num).find("img").attr('src', change);
	active.eq(num).addClass("changebg");
	active.not(this).removeClass("changebg");
})


$(".tipsdialogbox .close").click(function () {
	$(".tipsdialogbox").hide()
})

// // 每日一练交卷隐藏操作
$(".dialogbox .close").click(function () {
	$(".dialogbox").hide()
})

$('.close1').click(function () {
	$('.tipsdialogbox1').hide()
})
$('.queren1').click(function () {
	window.location.href = "https://tk.360xkw.com/grzx/login.html"
})
$('.quxiao1').click(function () {
	$('.tipsdialogbox1').hide()
})
// mryl()
// function mryl() {
// 	let ti = JSON.parse(sessionStorage.getItem('makequesList'))
// 	$('.dialogbox .num').text(ti.examScore);
// }
$('.dialogbox .submit').click(function () {
	let ti = JSON.parse(sessionStorage.getItem('makequesList'))
	let curriculum = JSON.parse(sessionStorage.getItem('mr'))
	window.open("page/wdtk/zt.html?questionIds=" + ti.didQuestionIdSet + "&name=" + "每日一练" + "&subcourseId=" +
		curriculum.subcourseId + "&type=" + '2' + "&names=" + curriculum.subcourseName + "&aniw=" + ti.didAnswerSet)
})
$(".tlk_close").click(function () {
	$(".tlk_tipsdialogbox").hide()
})
$('.tlk_queren').click(function () {
	$(".tlk_tipsdialogbox").hide()
})

// 去购物
function gotogouwu() {
	var _iframe = window.parent;
	var _iframe = window.parent;
	var active = _iframe.document.getElementsByClassName('active');
	active[6].click(function () {
		alert()
		let num = active.index(this);
		let change = changelist[num];
		for (let i = 0; i < list.length; i++) {
			active.eq(i).find("img").attr('src', list[i]);
		}
		active.eq(num).find("img").attr('src', change);
		active.eq(num).addClass("changebg");
		active.not(this).removeClass("changebg");

	})
}



// 去课程
function gotokec() {
	var _iframe = window.parent;
	var _iframe = window.parent;
	var active = _iframe.document.getElementsByClassName('active');
	active[3].click(function () {
		alert()
		let num = active.index(this);
		let change = changelist[num];
		for (let i = 0; i < list.length; i++) {
			active.eq(i).find("img").attr('src', list[i]);
		}
		active.eq(num).find("img").attr('src', change);
		active.eq(num).addClass("changebg");
		active.not(this).removeClass("changebg");

	})
}
// 去题库
function gototik() {
	var _iframe = window.parent;
	var _iframe = window.parent;
	var active = _iframe.document.getElementsByClassName('active');
	active[4].click(function () {
		alert()
		let num = active.index(this);
		let change = changelist[num];
		for (let i = 0; i < list.length; i++) {
			active.eq(i).find("img").attr('src', list[i]);
		}
		active.eq(num).find("img").attr('src', change);
		active.eq(num).addClass("changebg");
		active.not(this).removeClass("changebg");

	})
}

// 去书店	
function gotoshud() {
	var _iframe = window.parent;
	var _iframe = window.parent;
	var active = _iframe.document.getElementsByClassName('active');
	active[3].click(function () {
		alert()
		let num = active.index(this);
		let change = changelist[num];
		for (let i = 0; i < list.length; i++) {
			active.eq(i).find("img").attr('src', list[i]);
		}
		active.eq(num).find("img").attr('src', change);
		active.eq(num).addClass("changebg");
		active.not(this).removeClass("changebg");

	})
}


// 去直播
function gotozhib() {
	alert("很抱歉，功能正在火速开发")
}




geturl()

function geturl() {
	var dizhi = window.location.href
	dizhi = dizhi.split("?")[1]
	if (dizhi == "" || dizhi == undefined || dizhi == null) {
		// console.log("没有参数")
	} else if (dizhi.split("=")[1] == 1) {
		// console.log(dizhi)
		dizhi = dizhi.split("=")[1]
		if (dizhi == "1") {
			active[3].click(function () {
				let num = active.index(this);
				let change = changelist[num];
				for (let i = 0; i < list.length; i++) {
					active.eq(i).find("img").attr('src', list[i]);
				}
				active.eq(num).find("img").attr('src', change);
				active.eq(num).addClass("changebg");
				active.not(this).removeClass("changebg");
			})
		} else {
			// console.log("没有参数")
		}
	} else if (dizhi.split("=")[1] == 2) {
		dizhi = dizhi.split("=")[1]
		if (dizhi == "2") {
			// console.log(dizhi)

			active[4].click(function () {
				let num = active.index(this);
				let change = changelist[num];
				for (let i = 0; i < list.length; i++) {
					active.eq(i).find("img").attr('src', list[i]);
				}
				active.eq(num).find("img").attr('src', change);
				active.eq(num).addClass("changebg");
				active.not(this).removeClass("changebg");
			})
		} else {
			// console.log("没有参数")
		}
	} else if (dizhi.split("=")[1] == 3) {
		dizhi = dizhi.split("=")[1]
		if (dizhi == "3") {
			// console.log(dizhi)
			active[6].click(function () {
				let num = active.index(this);
				let change = changelist[num];
				for (let i = 0; i < list.length; i++) {
					active.eq(i).find("img").attr('src', list[i]);
				}
				active.eq(num).find("img").attr('src', change);
				active.eq(num).addClass("changebg");
				active.not(this).removeClass("changebg");
			})
		} else {
			// console.log("没有参数")
		}
	}
	else if (dizhi.split("=")[1] == 4) {
		dizhi = dizhi.split("=")[1]
		if (dizhi == "4") {
			// console.log(dizhi)
			active[7].click(function () {
				let num = active.index(this);
				let change = changelist[num];
				for (let i = 0; i < list.length; i++) {
					active.eq(i).find("img").attr('src', list[i]);
				}
				active.eq(num).find("img").attr('src', change);
				active.eq(num).addClass("changebg");
				active.not(this).removeClass("changebg");
			})
		} else {
			// console.log("没有参数")
		}
	}




}


// 登录   退出
$(".sign_out").click(function () {
	// let userInfo = JSON.parse(sessionStorage.getItem("userInfo"))
	sessionStorage.removeItem("userInfo")

	$.ajax({
		type: "get",
		url: "https://tk.360xkw.com/tiku/user/logout.do",
		data: {
		},
		dataType: "jsonp",
		jsonp: "jsoncallback",
		success: function (data) {

			if (data.S == "1001") {
				$(connent1).html("您已经退出登录，是否去登录?")
				zhaqBox.style.display = 'block'
				alert()

			}
		},
		error: function () {
			zhaqBox.style.display = 'block'
		}
	});
	$(".sign_out").hide()
	$(".sign_in").show()
})
$(".sign_in").click(function () {
	$(".sign_out").hide()
	$(".sign_in").show()
	parent.location.href = "https://tk.360xkw.com/grzx/login.html"

})
// if (JSON.parse(sessionStorage.getItem("userInfo"))) {
// 	$(".sign_out").show()
// 	$(".sign_in").hide()

// 	// 说明登录
// } else {

// }

// var userInfo = (sessionStorage.getItem("userInfo"))
var userInfo = JSON.parse(sessionStorage.getItem("userInfo"))
$(".nickName").html(userInfo.nickName)
$(".nickName2").html(userInfo.nickName)



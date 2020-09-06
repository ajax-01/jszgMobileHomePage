

var _iframe = window.parent;
var zhaqBox = _iframe.document.getElementsByClassName('tipsdialogbox1')[0];

var timu
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
function jxzt() {
	console.log(timu)
	// var questionIdTypeList = []
	// val.selected.forEach((e, index) => {
	// 	questionIdTypeList.push(e[0])
	// })
	// const questionIdTypeString = questionIdTypeList.join(',')
	// window.open("zt.html?questionIds=" + questionIdTypeString + "&name=" + "章节练习" + "&subcourseId=" + this.curriculumId + "&chapterId=" + val.id + "&type=" + index + "&names=" + this.curriculum + "&paperName=" + val.name)
}
//直播

function zibo(type, url, data, dataType, jsonp, callback, error) {
	$(zhaqBox).hide()

	type = "post";
	url = "https://tk.360xkw.com/tiku/app/getVideoTeachListNoLogin.do";
	data = {
		"courseId": 11
	};
	dataType = 'jsonp';
	jsonp = "jsoncallback";
	callback = function (data) {
		let videohistory = data.V.videoTeachs;
		//console.log(videohistory);
		let datalength = videohistory.length;
		//console.log(datalength);
		//最后一次直播的对象
		let accept = videohistory[datalength - 1];
		//brime 开始时间
		let btime = accept.bTime;
		//获取开始时间的年月日
		let btimearray = btime.split(" ")[0].split("-");
		let btimeyear = btimearray[0]; //年
		let btimemonth = btimearray[1]; //月
		let btimedate = btimearray[2]; //日
		// console.log(btimeyear);
		// console.log(btimemonth);
		// console.log(btimedate);
		//拆分时间
		let btimearray2 = btime.split(" ")[1].split(":");
		let btimehour = btimearray2[0]; //开始时间的小时
		let btimeminute = btimearray2[1]; //开始时间的分钟
		// console.log(btimehour);
		// console.log(btimeminute);
		//etime 结束时间
		let etime = accept.eTime;
		let etimearray = etime.split(" ")[1].split(":");
		// console.log(etimearray);
		let etimehour = etimearray[0]; //结束时间的小时
		let etimeminute = etimearray[1]; //结束时间的分钟
		// console.log(etimehour);
		// console.log(etimeminute);
		$(".lmw_ajaxtime").html(" ");
		let timestr = "";
		let ajaxtime = btimeyear + '年' + btimemonth + '月' + btimedate + '日' + ' ' + btimehour + ':' + btimeminute + '-' +
			etimehour + ':' + etimeminute + '，' + accept.title;
		$(".lmw_ajaxtime").append(ajaxtime);
		if (data.S == "1001") {
			$(zhaqBox).show()

		}
	};
	error = function (result) {
		$(zhaqBox).show()

		// console.log("错误");
	}
	sendkyAjax(type, url, data, dataType, jsonp, callback, error);
}
//免费视频
function freevideo(type, url, data, dataType, jsonp, callback, error) {
	$(zhaqBox).hide()


	type = "post";
	url = "https://tk.360xkw.com/tiku/course/getItemsCourseByCourseIdNoLogin.do"
	data = {
		"courseId": 11
	}
	dataType = 'jsonp';
	jsonp = "jsoncallback";
	callback = function (data) {
		//console.log(data);
		let freevideo = "";
		let freev = data.V;
		if (data.S == "1001") {
			$(zhaqBox).show()

		} else {
			$(".ajaxstar").html("");
			for (var i = 0; i < freev.length; i++) {
				freevideo +=
					`<div class="star">
				<img src='http://www.360xkw.com/` + freev[i].bigPicUrl +
					`' class='img1 fl'>
				<div class='fl cetern'>
					<p class='zuti'>` + freev[i].kcname +
					`</p>
				</div>
				<div class="fr star-right">
					<div class="btn-ksxx"style="color"white"  onclick="b()">
					开始学习
					</div>
				</div>
			</div>`;
			}
			$(".ajaxstar").append(freevideo)
		}

	}

	error = function (result) {
		$(zhaqBox).show()


		// console.log("错误");
	}
	sendkyAjax(type, url, data, dataType, jsonp, callback, error);
}
// //练习记录
// function exercises(type, url, data, dataType, jsonp, callback, error) {
// 	$(zhaqBox).hide()


// 	let account = getSessionStorage('account');
// 	type = "post";
// 	url = "http://www.360xkw.com/tiku/user/getUserQuestionRecordsByConditionJZ.do";
// 	data = {
// 		"page": 1,
// 		"rows": 1
// 	}
// 	dataType = 'jsonp';
// 	jsonp = "jsoncallback";
// 	callback = function (data) {
// 		$(zhaqBox).hide()

// 		if (data.S == "1001") {
// 			$(zhaqBox).show()

// 		}
// 		else {
// 			// console.log(data)
// 			let timer = $(".lmw_ajaxlxjl");
// 			let ajaxbigtitle = $(".lmw_ajaxbigtitle");
// 			let ajaxtitle = $(".lmw_ajaxtitle");
// 			timer.html(" ");
// 			ajaxbigtitle.html(" ");
// 			ajaxtitle.html(" ");
// 			let timestr = "";
// 			let bigtitle = "";
// 			let titlestr = "";
// 			if (data.V != null) {
// 				let timeobj = data.V.rows[0].recordTime.split(" ")[0]
// 				let titleobj = data.V.rows[0].reportTitle.split("-")[0];
// 				let bigtitleobj = data.V.rows[0].courseName;
// 				let subCourseId = data.V.rows[0].subCourseId;
// 				let alltopic = 0;
// 				//console.log(bigtitleobj);
// 				timestr += timeobj;
// 				bigtitle += bigtitleobj + `>`;
// 				titlestr += titleobj;
// 				$.ajax({
// 					type: 'post',
// 					url: 'http://www.360xkw.com/tiku/didRecord/getUserDidSummry.do',
// 					data: {
// 						"subcourseId": subCourseId,
// 						'doTypeId': 1
// 					},
// 					dataType: 'jsonp',
// 					jsonp: 'jsoncallback',
// 					async: false,
// 					success: function (data) {
// 						if (data.S == "1001") {
// 							$(zhaqBox).show()

// 						}
// 						//console.log(data)
// 						alltopic = data.V.chapters.length
// 						//console.log(alltopic)
// 					},
// 					error: function (result) {
// 						$(zhaqBox).show()

// 						console.log("错误");
// 					},
// 				});



// 				timer.append(timestr);
// 				ajaxbigtitle.append(bigtitle);
// 				ajaxtitle.append(titlestr);
// 			}
// 		}

// 	}
// 	error = function (result) {
// 		$(zhaqBox).show()

// 		console.log("错误");
// 	}
// 	sendkyAjax(type, url, data, dataType, jsonp, callback, error);
// }


// 购物车
function shopcar(type, url, data, dataType, jsonp, callback, error) {
	$(zhaqBox).hide()
	$.ajax({
		type: 'post',
		url: 'https://tk.360xkw.com/tiku/app/getShoppingCartDetial.do?page=1&limit=10&dlId=2',
		dataType: 'jsonp',
		jsonp: 'jsoncallback',
		async: false,
		success: function (data) {
			// console.log(data);
			let ajaxshop = $(".lmw_ajaxshop");
			ajaxshop.html(" ");
			let str = "";
			if (data.S == "1001") {
				$(zhaqBox).show()
			}
			if (data.V != null) {
				let shopcarobj = data.V[0];
				str +=
					`<img src='http://www.360xkw.com/` + shopcarobj.item.bigPicUrl +
					`' class="img7 fl">
				<div class="fl"><p class="text6">` + shopcarobj.item.kcname +
					`</p>
				<p class="text7">¥<span class="money">` + shopcarobj.item.disPrice + `</span><del>¥` + shopcarobj.item
						.price + `</del></p>
				</div>`;
				ajaxshop.append(str);
			} else {
				str += `<p>快去添加一件商品吧！</p>`
				ajaxshop.append(str);
			}

			//console.log(str)
		},
		error: function (result) {
			$(zhaqBox).show()

			console.log("错误");
		},
	});
}
function getdate() {
	var myDate = new Date;
	var year = myDate.getFullYear(); //获取当前年
	var mon = myDate.getMonth() + 1; //获取当前月
	var date = myDate.getDate(); //获取当前日
	// var h = myDate.getHours();//获取当前小时数(0-23)
	// var m = myDate.getMinutes();//获取当前分钟数(0-59)
	// var s = myDate.getSeconds();//获取当前秒
	var week = myDate.getDay();
	var weeks = ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"];
	// console.log(year, mon, date, weeks[week])
	// console.log(year + "年" + mon + "月" + date + "日" + weeks[week]);
	$(".wek").html(weeks[week]);
	$(".riqi").html(mon + "月" + date + "日");
}
$(function () {
	zibo();
	freevideo();
	// exercises()
	shopcar();
	getdate();
	// test()

})


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


var list = [grzx, kstk, tkjl, kczx, kszt, lnzt, gwc, wddd, wallet, zhaq];
var changelist = [grzx1, kstk1, tkjl1, kczx1, kszt1, lnzt1, gwc1, wddd1, wallet1, zhaq1];
var _iframe = window.parent;
var active = _iframe.document.getElementsByClassName('active');
// console.log(active[1])
function a() {
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
}
function b() {
	active[1].click(function () {

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
function c() {
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
}


$(".btn-jrlx").click(function () {
	a()

})

// 我的订单已付款订单
$('.rb-left').click(function () {
	var _iframe = window.parent;
	var _iframe = window.parent;
	var active = _iframe.document.getElementsByClassName('active');
	// console.log(active)
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
})
$('.rb-right').click(function () {
	var _iframe = window.parent;
	var _iframe = window.parent;
	var active = _iframe.document.getElementsByClassName('active');
	// console.log(active)
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
})
function gotogouwu() {
	var _iframe = window.parent;
	var _iframe = window.parent;
	var active = _iframe.document.getElementsByClassName('active');
	// console.log(active)
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
}

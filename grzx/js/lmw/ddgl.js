
var _iframe = window.parent;
var zhaqBox = _iframe.document.getElementsByClassName('tipsdialogbox1')[0];

var ddgl = new Vue({
	el: '#ddgl',
	data: {
		orderDetails: []
	},
	created() {
		this.getMyOrderList()
	},
	methods: {
		gotobuy() {
			var _iframe = window.parent;
			var _iframe = window.parent;
			var active = _iframe.document.getElementsByClassName('active');
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
		},
		// 订单数据
		getMyOrderList() {
			this.orderDetails = []
			const that = this
			zhaqBox.style.display = 'none'
			$.ajax({
				type: "get",
				// url: "http://www.360xkw.com/tiku/app/getAppCommentByCourseIdNoLogin.do",
				url: "https://tk.360xkw.com/tiku/app/getMyOrderList.do",
				data: {
					'pageIndex': 1
				},
				dataType: 'jsonp',
				jsonp: "jsoncallback",
				async: false,
				success: function (data) {
					// console.log(data)
					if (data.S === '1') {
						if (data.V) {
							that.orderDetails = data.V
							that.orderDetails.forEach(e => {
								e.Img = 'http://www.360xkw.com/' + e.orderDetials[0].picUrl
							})
						} else {
							that.orderDetails = []
						}
						if (data.S == "1001") {
							zhaqBox.style.display = 'block'

						}
					}
				},
				error: function () {
					// alert("系统错误!");
					zhaqBox.style.display = 'block'
				}
			})
		}
	}
})

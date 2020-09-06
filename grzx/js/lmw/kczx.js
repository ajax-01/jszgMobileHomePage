var _iframe = window.parent;
var zhaqBox = _iframe.document.getElementsByClassName('tipsdialogbox1')[0];
var kczx = new Vue({
	el: '#kczx',
	data: {
		nowIndex: 0,
		tabsParam: ['最热', '全科', '单科'],
		allcurriculmList: []
	},
	created() {
		this.allcurriculm()


	},
	methods: {
		// tab切换
		toggleTabs(index) {
			this.nowIndex = index
		},
		buyButton(val) {
			// console.log(val)
			// 做题记录的跳转
			window.open("kcxq.html?config=" + val.config + "&bxid=" + val.banxingType + "&id=" + val.id + "&courseId=" + val.courseId)
		},
		allcurriculm() {
			const that = this
			zhaqBox.style.display = 'none'
			$.ajax({
				type: "post",
				url: "https://tk.360xkw.com/tiku/app/getItemListByBanXingTypeNoLogin.do",
				data: {
					"courseId": 11
				},
				dataType: 'jsonp',
				jsonp: "jsoncallback",
				async: false,
				success: function (data) {
					if (data.V) {
						that.allcurriculmList = data.V
						that.allcurriculmList.forEach(item => {
							item.items.forEach(e => {
								e.bigSrc = 'https://tk.360xkw.com/' + e.picUrl
							})
						})
					} else {
						that.allcurriculmList = []
					}
					if (data.S == "1001") {
						zhaqBox.style.display = 'block'

					}
					// console.log(that.allcurriculmList)
				},
				error: function () {
					console.log("系统错误!");
					zhaqBox.style.display = 'block'

				},

			});
		}
	}
})

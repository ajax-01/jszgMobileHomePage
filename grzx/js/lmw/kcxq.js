var kcxq = new Vue({
	el: '#kcxq',
	data: {
		nowIndex: 0,
		ids: null,
		nowIndex1: 0,
		centerDialogVisible: false,
		tabsIndex: 0,
		courseId: null,
		buys: null,
		tabsParam: ['最热', '全科', '单科'],
		classroomList: [],
		classroomChilds: {},
		texts: '',
		config: null,
		bxid: null,
		comments: [],
		contentLoading: false,
		gyhVistie: false
	},
	created() {
		this.getUrlParam()
	},
	methods: {
		// 去结算
		goIndexGWC() {
			window.location.href = "https://tk.360xkw.com/grzx/index.html?goum=3"
		},
		getUrlParam() {
			let value = [];
			window.location.search.substring(1).split('&').forEach(n => {
				value[decodeURI(n.split('=')[0])] = decodeURI(n.split('=')[1]);
				value.length++;
			})
			this.bxid = value.bxid
			this.config = value.config
			this.ids = value.id
			this.courseId = value.courseId
			this.allcurriculms(value.courseId, value.bxid, value.id)
			this.getAppCommentByCourseIdNoLogin(value.courseId)
		},
		// 免费试听
		freeAudition() {
			window.open("zbkc.html?config=" + this.config + "&courseId=" + this.courseId + "&bxid=" + this.bxid + "&id=" + this.ids)
		},
		goReturn() {
			this.gyhVistie = false
			window.location.href = "https://tk.360xkw.com/grzx/login.html"
		},
		// 评论
		getAppCommentByCourseIdNoLogin(val) {
			const that = this
			that.gyhVistie = false
			$.ajax({
				type: "get",
				// url: "http://www.360xkw.com/tiku/app/getAppCommentByCourseIdNoLogin.do",
				url: "https://tk.360xkw.com/tiku/app/getAppCommentByCourseIdNoLogin.do",
				data: {
					'courseId': val,
					'pageIndex': 1
				},
				dataType: 'jsonp',
				jsonp: "jsoncallback",
				// async: false,
				success: function (data) {
					// console.log(data)
					if (data.S === '1') {
						// console.log(data)
						that.comments = data.V
						that.comments.forEach(e => {
							e.user.smalImageUrl = 'http://www.360xkw.com/' + e.user.smalImageUrl
						})
						// console.log(that.comments)
					}
					if (data.S == "1001") {
						that.gyhVistie = true

					}
				},
				error: function () {
					// alert("系统错误!");
					that.gyhVistie = true

				}
			})
		},
		// 评论数据
		getAppCommentByCourseIdNoLogin(val) {
			const that = this
			that.gyhVistie = false
			$.ajax({
				type: "get",
				// url: "http://www.360xkw.com/tiku/app/getAppCommentByCourseIdNoLogin.do",
				url: "https://tk.360xkw.com/tiku/app/getAppCommentByCourseIdNoLoginJZ.do",
				data: {
					'courseId': val,
					'pageIndex': 1
				},
				dataType: 'jsonp',
				jsonp: "jsoncallback",
				async: true,
				success: function (data) {
					// console.log(data)
					if (data.S === '1') {
						// console.log(data)
						that.comments = data.V
						that.comments.forEach(e => {
							e.user.smalImageUrl = 'http://www.360xkw.com/' + e.user.smalImageUrl
						})
						// console.log(that.comments)
					}
					if (data.S == "1001") {
						that.gyhVistie = true
					}
				},
				error: function () {
					that.gyhVistie = true
				}
			})
		},
		// 发表评论
		submitAppComment() {
			const that = this
			that.gyhVistie = false
			$.ajax({
				type: "get",
				// url: "http://www.360xkw.com/tiku/app/getAppCommentByCourseIdNoLogin.do",
				url: "https://tk.360xkw.com/tiku/app/submitAppComment.do",
				data: {
					'courseId': that.courseId,
					'content': that.texts
				},
				// dataType: 'jsonp',
				jsonp: "jsoncallback",
				async: true,
				success: function (data) {
					// console.log(data)
					if (data.V) {
						that.getAppCommentByCourseIdNoLogin(that.courseId)
					} else if (data.S == "1001") {
						that.gyhVistie = true
					}
				},
				error: function () {
					// alert("系统错误!");
					that.gyhVistie = true

				}
			})
			that.getAppCommentByCourseIdNoLogin(that.courseId)
		},
		// 购买收藏
		buyButton() {
			const that = this
			that.gyhVistie = false
			$.ajax({
				type: "get",
				// url: "http://www.360xkw.com/tiku/app/getAppCommentByCourseIdNoLogin.do",
				url: "https://tk.360xkw.com/tiku/app/addShoppingCartJZ.do",
				data: {
					'id': that.ids
				},
				dataType: 'jsonp',
				jsonp: "jsoncallback",
				// async: false,
				success: function (data) {
					that.centerDialogVisible = true
					if (data.S === '-1') {
						that.buys = true
						// console.log(that.buys)
					} else if (data.S === '1') {
						that.buys = false
						// console.log(that.buys)
					}
					if (data.S == "1001") {
						that.buys = false
						that.gyhVistie = true
					}
				},
				error: function () {
					that.centerDialogVisible = false
					// alert("系统错误!");
					that.gyhVistie = true
				}
			})
			// this.$forceUpdate()
		},
		// tab头切换
		toggleTabs(val, index) {
			if (this.nowIndex !== index) {
				this.nowIndex1 = 0
			}
			this.nowIndex = index
			this.classroomChilds = this.classroomList[this.nowIndex].childs[this.nowIndex1]
			// console.log(this.classroomChilds)
			this.bxid = this.classroomChilds.banxingType
			this.config = this.classroomChilds.config
			this.ids = this.classroomChilds.id
			this.courseId = this.classroomChilds.courseId
			this.classroomChilds.picUrl1 = 'http://www.360xkw.com/' + this.classroomChilds.picUrl
			this.classroomChilds.bigPicUrl1 = 'http://www.360xkw.com/' + this.classroomChilds.bigPicUrl
		},
		toggleTabs1(val, index) {
			this.nowIndex1 = index
			this.classroomChilds = this.classroomList[this.nowIndex].childs[this.nowIndex1]
			this.bxid = this.classroomChilds.banxingType
			this.config = this.classroomChilds.config
			this.ids = this.classroomChilds.id
			this.courseId = this.classroomChilds.courseId
			this.classroomChilds.picUrl1 = 'http://www.360xkw.com/' + this.classroomChilds.picUrl
			this.classroomChilds.bigPicUrl1 = 'http://www.360xkw.com/' + this.classroomChilds.bigPicUrl
		},
		// 切换课程和学员评论
		keButton(index) {
			if (index === '1') {
				this.tabsIndex = 0
			} else {
				this.tabsIndex = 1
			}
		},
		// 直播班数据
		allcurriculms(courseId, bxid, id) {
			const that = this
			that.gyhVistie = false
			that.contentLoading = true
			$.ajax({
				type: "post",
				url: "https://tk.360xkw.com/tiku/app/getItemListNoLogin.do",
				data: {
					"courseId": courseId
				},
				dataType: 'jsonp',
				jsonp: "jsoncallback",
				// async: false,
				success: function (data) {
					if (data.V) {
						const arr = []
						data.V.forEach(item => {
							const parent = arr.find(cur => cur.banxingTypeName === item.banxingTypeName)
							if (parent) {
								parent.childs.push(item)
							} else {
								const obj = {
									banxingType: item.banxingType,
									banxingTypeName: item.banxingTypeName,
									childs: [item]
								}
								arr.push(obj)
							}
						})
						var arr1 = []
						that.classroomList = arr.reverse()
						arr1[0] = that.classroomList[1]
						arr1[1] = that.classroomList[0]
						that.classroomList[0] = arr1[0]
						that.classroomList[1] = arr1[1]
						const seeIndex = that.classroomList.findIndex(e => e.banxingType === Number(bxid))
						that.nowIndex = seeIndex
						const childIndex = that.classroomList[that.nowIndex].childs.findIndex(e => e.id === Number(id))
						that.nowIndex1 = childIndex
						that.classroomChilds = that.classroomList[that.nowIndex].childs[that.nowIndex1]
						that.classroomChilds.picUrl1 = 'http://www.360xkw.com/' + that.classroomChilds.picUrl
						that.classroomChilds.bigPicUrl1 = 'http://www.360xkw.com/' + that.classroomChilds.bigPicUrl
					} else {
						that.classroomList = []
					}
					if (data.S == "1001") {
						that.gyhVistie = false
					}


				},
				error: function () {
					alert("系统错误!");
					that.gyhVistie = false
				}
			});
			// var kk
			// kk = that.classroomList[0].childs[0].config.split('|')
			that.contentLoading = false
		},

	}
})

var _iframe = window.parent;

var _iframe = window.parent;
var zhaqBox = _iframe.document.getElementsByClassName('tipsdialogbox1')[0];
var tipsdialogbox = _iframe.document.getElementsByClassName('tipsdialogbox');
var close1 = _iframe.document.getElementsByClassName('close');
var quxiao = _iframe.document.getElementsByClassName('quxiao');
var queren = _iframe.document.getElementsByClassName('queren');
var connent = _iframe.document.getElementsByClassName('connent');

$(quxiao).click(function () {
	$(tipsdialogbox).hide()
})
$(queren).click(function () {
	$(tipsdialogbox).hide()
})
var zhaqBox = _iframe.document.getElementsByClassName('tipsdialogbox1')[0];

const vm = new Vue({
	el: "#app",
	data: {
		value1: false,
		value2: true,
		honbaoLoading: false,
		honMoney: 0,
		tabListLength: 0,
		list: [],
		tabList: [],
		multipleSelection: [],
		listLoading: false,
		checked: false,
		allMoney: 0,
		numberCilum: 0,
		olderMoney: 0,
		allOldMoney: 0,
		orderID: undefined
	},
	created() {
		this.tableList()
		this.getSutu()
		this.getValidJzCouponByStuId()
	},
	filters: {
		youhuaTime: function (value) {
			if (!value) {
				return value = ""
			} else {
				var time = value
				time = time.split(" ")[0]
				return time
			}

		},
	},
	methods: {
		// 列表数据
		tableList() {
			zhaqBox.style.display = 'none'
			this.listLoading = true
			const that = this
			$.ajax({
				url: "https://tk.360xkw.com/tiku/app/getShoppingCartDetial.do",
				type: "get",
				data: {},
				dataType: "jsonp",
				jsonp: "jsoncallback",
				success: function (data) {
					if (data.V) {
						that.$nextTick(() => {
							that.tabList = data.V
							that.tabList.forEach(e => {
								e.item.bigPicUrl = 'http://360xkw.com/' + e.item.bigPicUrl
							})
							that.tabListLength = that.tabList.length
							that.heights()
						});
					} else if (data.S === '1001') {
						zhaqBox.style.display = 'block'
					}
				},
				error: function () {
					console.log("系统崩溃，数据出错");
					zhaqBox.style.display = 'block'
					that.heights()
				}
			})
			this.listLoading = false
		},
		// 全选删除选择的数据
		checkedButton(val) {
			// console.log(val)
			if (val === true) {
				// console.log(this.tabList)
				this.$refs.multipleTable.toggleAllSelection(this.tabList)
				this.multipleSelection = this.tabList
			} else {
				this.$refs.multipleTable.clearSelection()
			}
		},
		handleSelec(selection) {
			// console.log(selection)
		},
		onTableSelect(val, row) {
			// console.log(val, row)
		},
		// 优惠卷数据
		getValidJzCouponByStuId() {
			zhaqBox.style.display = 'none'
			this.list = []
			const that = this
			$.ajax({
				url: "https://tk.360xkw.com/tiku/jzCoupon/getValidJzCouponByStuId.do",
				type: "get",
				data: {
					'dlId': 0
				},
				dataType: "jsonp",
				jsonp: "jsoncallback",
				success: function (data) {
					if (data.V) {
						that.list = data.V
						that.list.forEach((e, i) => {
							e.xuanze = false
							var time = e.failureTime
							var myDate = new Date();
							var year = myDate.getFullYear();        //获取当前年
							var month = myDate.getMonth() + 1;   //获取当前月
							var date = myDate.getDate() - 1;
							var day;
							var time1 = time.split(" ")[0]
							time1 = time1.split("-")
							// const daytime = countdowntime + ""
							var gyh_yarn = time1[0]
							var gyh_mon = time1[1]
							var gyh_day = time1[2]
							var newdatr = new Date(gyh_yarn, gyh_mon, gyh_day, "00", "00", "00", "00");//初始化目标时间(这里的05实际上是六月)
							// var nowhms =new Date();//当前时间转换毫秒
							var nowhms = new Date(year, month, date, "00", "00", "00", "00"); //目标时间转换毫秒
							var cha = newdatr - nowhms;      //时间差（毫秒数）
							day = parseInt(cha / (1000 * 60 * 60 * 24));//计算天数
							day == 1 ? that.fail_time = true : that.fail_time = false
							that.list[i].fail_time = that.fail_time
						});
					}
					if (data.S == "1001") {
						zhaqBox.style.display = 'block'

					}
				},
				error: function () {
					console.log("系统崩溃，数据出错");
					zhaqBox.style.display = 'block'
				}
			})
		},
		// 全选删除
		deleButton() {
			zhaqBox.style.display = 'none'
			var idsList = []
			var _iframe = window.parent;
			var tipsdialogbox = _iframe.document.getElementsByClassName('tipsdialogbox')[0];
			tipsdialogbox.style.display = 'block'
			var connent = _iframe.document.getElementsByClassName('connent')[0];
			var close1 = _iframe.document.getElementsByClassName('close')[0];
			var quxiao = _iframe.document.getElementsByClassName('quxiao')[0];
			var queren = _iframe.document.getElementsByClassName('queren')[0];
			if (this.multipleSelection.length === 0) {
				tipsdialogbox.style.display = 'block'
				connent.innerText = '请选择商品'
				return
			}
			connent.innerText = '确认要全部删除吗？'
			const that = this
			queren.onclick = function () {
				that.tabList.forEach(e => {
					idsList.push(e.id)
					// console.log(idsList)
				})
				tipsdialogbox.style.display = 'none'
				$.ajax({
					url: "https://tk.360xkw.com/tiku/app/delShoppingCartJZ.do",
					type: "post",
					data: {
						'ids': idsList
					},
					dataType: "jsonp",
					jsonp: "jsoncallback",
					success: function (data) {
						tipsdialogbox.style.display = 'block'
						if (data.S == "1") {
							connent.innerText = '删除成功,确认关闭？'
							queren.onclick = function () {
								tipsdialogbox.style.display = 'none'
								window.location.reload()
							}
						}
						if (data.S == "1001") {
							zhaqBox.style.display = 'block'

						}
					},
					error: function () {
						// console.log("系统崩溃，数据出错");
						zhaqBox.style.display = 'block'
					}
				})
			}
		},
		// 单个删除
		sanButton(val) {
			zhaqBox.style.display = 'none'
			var _iframe = window.parent;
			var tipsdialogbox = _iframe.document.getElementsByClassName('tipsdialogbox')[0];
			tipsdialogbox.style.display = 'block'
			var connent = _iframe.document.getElementsByClassName('connent')[0];
			var close1 = _iframe.document.getElementsByClassName('close')[0];
			var quxiao = _iframe.document.getElementsByClassName('quxiao')[0];
			var queren = _iframe.document.getElementsByClassName('queren')[0];
			connent.innerText = '确认要删除吗？'
			const that = this
			queren.onclick = function () {
				tipsdialogbox.style.display = 'none'
				$.ajax({
					url: "https://tk.360xkw.com/tiku/app/delShoppingCart.do",
					type: "post",
					data: {
						'ids': val.id
					},
					dataType: "jsonp",
					jsonp: "jsoncallback",
					success: function (data) {
						tipsdialogbox.style.display = 'block'
						if (data.S == "1") {
							connent.innerText = '删除成功,确认关闭？'
							queren.onclick = function () {
								tipsdialogbox.style.display = 'none'
								window.location.reload()
							}
						}
						if (data.S == "1001") {
							zhaqBox.style.display = 'block'

						}
						// console.log('点击到了')
					},
					error: function () {
						// console.log("系统崩溃，数据出错");
						zhaqBox.style.display = 'block'
					}
				})
			}
		},
		// 红包数据
		getSutu() {
			zhaqBox.style.display = 'none'
			const that = this
			$.ajax({
				url: "https://tk.360xkw.com/tiku/jzCoupon/getSutUserRedEnvelopeSum.do",
				type: "get",
				data: {},
				dataType: "jsonp",
				jsonp: "jsoncallback",
				success: function (data) {
					if (data.V) {
						that.honMoney = data.V
					} else {
						that.honMoney = 0
					}
					if (data.S == "1001") {
						zhaqBox.style.display = 'block'

					}
				},
				error: function () {
					// console.log("系统崩溃，数据出错");
					zhaqBox.style.display = 'block'
				}
			})
		},
		// 挑选课程
		goCilum() {
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
			window.location.href = "https://tk.360xkw.com/grzx/index.html?goum=1"
		},
		// 全选
		handleSelectionChange(val) {
			if (val.length === 0) {
				this.value1 = false
				this.checked = false
				this.list.forEach(item => {
					item.xuanze = false
				})
			}
			if (val.length === this.tabList.length) {
				this.checked = true
			}
			this.multipleSelection = val
			// console.log(val)
			const selecList = []
			val.forEach(e => {
				selecList.push(e.item.disPrice)
			})
			this.numberCilum = val.length
			this.allMoney = eval(selecList.join("+"))
			this.allOldMoney = this.allMoney
			this.suanprice('0')
		},
		// 使用优惠卷
		couponButton(val) {
			var _iframe = window.parent;
			var tipsdialogbox = _iframe.document.getElementsByClassName('tipsdialogbox')[0];
			var queren = _iframe.document.getElementsByClassName('queren');
			var connents = _iframe.document.getElementsByClassName('connent')[0];
			if (this.multipleSelection.length === 0) {
				tipsdialogbox.style.display = 'block'
				connents.innerText = "请选择课程"
				return
			}
			// console.log(val)
			if (Number(this.allMoney) < Number(val.withAmount) && val.xuanze !== true) {
				tipsdialogbox.style.display = 'block'
				connents.innerText = "所选课程金额未达到此优惠卷满减条件"
				return
			}
			if (val.xuanze === true) {
				val.xuanze = false
			} else {
				this.list.forEach(e => {
					e.xuanze = false
				})
				val.xuanze = true
			}
			this.suanprice('2')
			this.$forceUpdate()
		},
		// 优惠卷计算
		suanprice(valIndex) {
			this.allMoney = this.allOldMoney
			var _iframe = window.parent;
			var tipsdialogbox = _iframe.document.getElementsByClassName('tipsdialogbox')[0];
			var queren = _iframe.document.getElementsByClassName('queren');
			var connents = _iframe.document.getElementsByClassName('connent')[0];
			const index = this.list.findIndex(item => item.xuanze === true)
			// console.log(index)
			// console.log(valIndex)
			// console.log(this.value1)
			// console.log(this.allMoney)
			var zhuan = false
			var mei = false
			var man = false
			this.multipleSelection.forEach(e => { // 用来判断是否是专用课程卷
				if (index !== -1) {
					if (this.list[index].withSn !== '') {
						if (this.list[index].withSn.indexOf(e.item.id) > -1) {
							// console.log('这个是课程专用的')
							zhuan = true
						} else {
							mei = true

						}
					}
				}
			})
			// console.log(zhuan, mei)
			if (zhuan === false && mei === true) {
				tipsdialogbox.style.display = 'block'
				connents.innerText = "请选择专用优惠卷所对应的课程"
				this.list[index].xuanze = false
				return
			}
			if (index !== -1) {
				if (Number(this.allMoney) < Number(this.list[index].withAmount)) {
					man = true
				}
			}
			if (man === true) {
				this.list[index].xuanze = false
			}
			if (index !== -1) {
				if (this.list[index].type !== 3) {
					// console.log('这是通用的优惠卷')
					if (Number(this.allMoney) >= Number(this.list[index].withAmount)) {
						this.allMoney = Number(this.allMoney) - Number(this.list[index].usedAmount)
					}
				} else if (this.list[index].type === 3) {
					// console.log('这是打折的优惠卷', '打折打折')
					if (this.value1 === true) {
						this.allMoney = Number(this.allMoney) * (Number(this.list[index].usedAmount) / 10)
						if (Number(this.allMoney) >= Number(this.honMoney)) {
							this.allMoney = Number(this.allMoney) - Number(this.honMoney)
						} else {
							this.allMoney = 0
						}
					} else if (this.value1 === false) {
						this.allMoney = Number(this.allMoney) * (Number(this.list[index].usedAmount) / 10)
					}
				} else if (this.list[index].type === 2) {
					// console.log('无条件立减卷')
					this.allMoney = Number(this.allMoney) - Number(this.list[index].usedAmount)
				}
			}
			if (index !== -1 && this.value1 === true && this.list[index].type !== 3) {
				if (Number(this.allMoney) >= Number(this.honMoney)) {
					this.allMoney = Number(this.allMoney) - Number(this.honMoney)
				} else {
					this.allMoney = 0
				}
			}
			if (this.value1 === true && index === -1) {
				if (Number(this.allMoney) >= Number(this.honMoney)) {
					this.allMoney = Number(this.allMoney) - Number(this.honMoney)
				} else {
					this.allMoney = 0
				}
			}
			// console.log(this.allMoney)
		},
		// 是否使用滚动条
		switchs(val) {
			this.allMoney = this.allOldMoney
			var _iframe = window.parent;
			var tipsdialogbox = _iframe.document.getElementsByClassName('tipsdialogbox')[0];
			var queren = _iframe.document.getElementsByClassName('queren');
			var connents = _iframe.document.getElementsByClassName('connent')[0];
			if (this.multipleSelection.length === 0) {
				tipsdialogbox.style.display = 'block'
				connents.innerText = "请选择课程"
				this.value1 = false
				return
			}
			this.suanprice('1')
		},
		// 重置高度
		heights() {
			console.log('我触发了')
			const that = this
			this.$nextTick(() => {
				if (this.tabList.length === 0 || this.tabList === undefined) {
					this.$set(parent.document.getElementsByClassName("changehtml")[0], 'height', 670)
				} else {
					this.$set(parent.document.getElementsByClassName("changehtml")[0], 'height', window.document.body.scrollHeight)
				}
			})
			this.$forceUpdate()
		},

		// 去结算
		gwcButton() {
			zhaqBox.style.display = 'none'
			// console.log(this.multipleSelection)
			if (this.multipleSelection.length === 0) {
				return
			}
			const finalyarray = []
			// console.log(this.multipleSelection)
			this.multipleSelection.map(item => {
				finalyarray.push(Object.assign({}, {
					kcname: item.item.kcname,
					courseId: String(item.item.courseId),
					disPrice: String(item.item.disPrice),
					id: String(item.itemsId),
					config: item.item.config,
					cartIds: String(item.id)
				}))
			})
			let isUserRedEnvelope = '2'
			if (this.value1 === true) {
				isUserRedEnvelope = '1'
			}
			const index = this.list.findIndex(item => item.xuanze === true)
			var couponId
			if (index === -1) {
				couponId = ''
			} else {
				couponId = Number(this.list[index].id)
			}
			const that = this
			let json = JSON.stringify(finalyarray)
			// console.log(json)
			zhaqBox.style.display = 'none'

			$.ajax({
				url: "https://tk.360xkw.com/jz/pay/getOrderOfShoppingCart.do",
				type: "get",
				data: {
					'test': json,
					'isUserRedEnvelope': String(isUserRedEnvelope),
					'couponId': couponId
				},
				dataType: "jsonp",
				jsonp: "jsoncallback",
				success: function (data) {
					if (data.V) {
						that.orderID = data.V.orderID
						const monryId = {
							orderID: data.V.orderID,
							allMoney: that.allMoney
						}
						sessionStorage.setItem('ordercode', JSON.stringify(monryId))
						window.open("gwc_qrdd.html")
					}
					if (data.S == "1001") {
						zhaqBox.style.display = 'block'

					}
				},
				error: function () {
					// console.log("系统崩溃，数据出错");
					zhaqBox.style.display = 'block'
				}
			})
		},
		// 触碰
		mouseover() {
			this.$refs.SJ.style.display = 'block'
			this.$refs.hongbao.style.color = 'red'
		},
		mouseLeave() {
			this.$refs.SJ.style.display = 'none'
			this.$refs.hongbao.style.color = '#161616'
		},
		// 点击字体显示
		hongbaoButton() {
			// console.log('出发了')
			this.honbaoLoading = !this.honbaoLoading
		}
	}
})

var userInfo = JSON.parse(sessionStorage.getItem("userInfo"))
$(".nickName").html(userInfo.nickName)

function gotoshop() {
	console.log('触发了')
	window.location.href = "https://tk.360xkw.com/grzx/index.html?goum=3"
}

var vm = new Vue({
	el: '#mnkszb',
	data: {
		mnksList1: [],
		mnksString: {},
		danxuanLength: 0,
		duoxuanLength: 0,
		panduanLength: 0,
		budingLength: 0,
		jiandaLength: 0,
		questionIds: null,
		previousPage: null,
		subcourseId: null,
		PaperId: null,
		gyhVistie: false
	},
	created() {
		this.getUrlParam()
	},
	methods: {
		// 获取传过来的url参数
		getUrlParam() {
			let value = [];
			window.location.search.substring(1).split('&').forEach(n => {
				value[decodeURI(n.split('=')[0])] = decodeURI(n.split('=')[1]);
				value.length++;
			})
			this.PaperId = value.PaperId
			this.subcourseId = value.subcourseId
			if (value.typeName === "模拟考试") {
				// console.log('模拟考试')
				this.mockTest(value.subcourseId, Number(value.PaperId))
			} else if (value.typeName === "历年真题") {
				this.lnztTest(value.subcourseId, Number(value.PaperId))
			}
			this.questionIds = value.questionIds
		},
		// 模拟考试数据
		lnztTest(subcourseId, PaperId) {
			const that = this
			that.gyhVistie = false
			var mnksList = {}
			that.mnksList1 = []
			that.mnksString = {}
			zhaqBox.style.display = 'none'
			$.ajax({
				type: "get",
				url: "https://tk.360xkw.com/tiku/paper/getPaperQuestionIdTypes.do",
				data: {
					"subcourseId": subcourseId,
					'PaperTypeId': 4
				},
				dataType: 'jsonp',
				jsonp: "jsoncallback",
				async: false,
				success: function (data) {
					if (data.V) {
						that.mnksList1 = data.V.papers
						that.mnksList1.forEach(e => {
							if (e.paper.id === PaperId) {
								mnksList = e
								that.mnksString = e.paper
							}
						})
						// console.log(that.mnksString)
						that.previousPage = data.V.subcourse.name
					} else {
						mnksList = {}
						that.mnksList1 = []
						that.mnksString = {}
					}
					if (data.S == "1001") {
						that.gyhVistie = true

					}
					let danxuan = []
					let duoxuan = []
					let panduan = []
					let buding = []
					let jianda = []
					mnksList.questionIdTypes.forEach(e => {
						// console.log(e[1])
						if (e[1] === 1) {
							danxuan.push(e[1])
						} else if (e[1] === 2) {
							duoxuan.push(e[1])
						} else if (e[1] === 3) {
							panduan.push(e[1])
						} else if (e[1] === 4) {
							buding.push(e[1])
						} else if (e[1] === 5) {
							jianda.push(e[1])
						}
					})
					that.danxuanLength = danxuan.length
					that.duoxuanLength = duoxuan.length
					that.panduanLength = panduan.length
					that.budingLength = buding.length
					that.jiandaLength = jianda.length
				},
				error: function () {
					that.gyhVistie = true

					// alert("系统错误!");
				}
			})
		},
		// 模拟考试数据
		mockTest(subcourseId, PaperId) {
			const that = this
			var mnksList = {}
			that.mnksList1 = []
			that.mnksString = {}
			that.gyhVistie = false

			$.ajax({
				type: "get",
				url: "https://tk.360xkw.com/tiku/paper/getPaperQuestionIdTypes.do",
				data: {
					"subcourseId": subcourseId,
					'materiaProper': 1
				},
				dataType: 'jsonp',
				jsonp: "jsoncallback",
				async: false,
				success: function (data) {
					if (data.V) {
						that.mnksList1 = data.V.papers
						that.mnksList1.forEach(e => {
							if (e.paper.id === PaperId) {
								mnksList = e
								that.mnksString = e.paper
							}
						})
						// console.log(that.mnksList1)
						that.previousPage = data.V.subcourse.name
					} else {
						that.mnksList1 = []
						that.mnksString = {}
					}
					if(data.S=="1001"){
						that.gyhVistie = true

					}
					// console.log(that.mnksString)
					let danxuan = []
					let duoxuan = []
					let panduan = []
					let buding = []
					let jianda = []
					mnksList.questionIdTypes.forEach(e => {
						// console.log(e[1])
						if (e[1] === 1) {
							danxuan.push(e[1])
						} else if (e[1] === 2) {
							duoxuan.push(e[1])
						} else if (e[1] === 3) {
							panduan.push(e[1])
						} else if (e[1] === 4) {
							buding.push(e[1])
						} else if (e[1] === 5) {
							jianda.push(e[1])
						}
					})
					that.danxuanLength = danxuan.length
					that.duoxuanLength = duoxuan.length
					that.panduanLength = panduan.length
					that.budingLength = buding.length
					that.jiandaLength = jianda.length
				},
				error: function () {
					that.gyhVistie = true

					// alert("系统错误!");
				}
			})
		},
		goReturn() {
			this.gyhVistie = false
			window.location.href = "https://tk.360xkw.com/grzx/login.html"
		},
		// 开始考试
		mnksButton(val, name, answerTime) {
			// console.log(val)
			let type = '1'
			if (answerTime === undefined) {
				answerTime = 120
			}
			// console.log(val.answerTime)
			window.open("zt.html?questionIds=" + val + "&answerTime=" + answerTime + "&subcourseId=" + this.subcourseId + "&type=" + type + "&PaperId=" + this.PaperId + "&reportName=" + name + "&paperName=" + this.mnksString.paperName + "&name=" + "模拟考试")
		}
	}
})

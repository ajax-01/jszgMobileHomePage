
// var zhaqBox = document.getElementsByClassName('gyh_tipsdialogbox1')[0]
var mnks = new Vue({
	el: '#mnks',
	data: {
		intDiff: 7200,
		timecount: 0,
		countDown: null,
		ti: [],
		selectedQuestionIdSetList: [],
		TimiList: [],
		danxuanList: [],
		duoxuanList: [],
		panduanList: [],
		budingList: [],
		jiandaList: [],
		name: undefined,
		titles: undefined,
		subcourseId: null,
		PaperId: null,
		topicContent: 0
	},
	created() {
		this.getUrlParam()
		this.timecounts()
		this.$nextTick(() => {
			this.times()
		})
	},
	methods: {
		getUrlParam() {
			let value = []
			window.location.search.substring(1).split('&').forEach(n => {
				value[decodeURI(n.split('=')[0])] = decodeURI(n.split('=')[1]);
				value.length++;
			})
			this.name = value.reportName
			this.titles = value.paperName
			this.PaperId = value.PaperId
			this.subcourseId = value.subcourseId
			this.mrylList(value.questionIds)
			// console.log(value)
		},
		// 倒计时定时器
		timecounts() {
			var hour = 0,
				minute = 0,
				second = 0;
			if (this.intDiff > 0) {
				hour = Math.floor(this.intDiff / (60 * 60))
				minute = Math.floor(this.intDiff / 60) - (hour * 60)
				second = Math.floor(this.intDiff) - (hour * 60 * 60) - (minute * 60)
			}
			if (hour <= 9) hour = '0' + hour
			if (minute <= 9) minute = '0' + minute
			if (second <= 9) second = '0' + second
			this.countDown = hour + ':' + minute + ':' + second
		},
		times() {
			this.timecount = setInterval(() => {
				this.intDiff--
				if (this.intDiff >= 0) {
					this.timecounts()
				} else {
					// console.log('结束')
					window.clearInterval(this.timecount)
					this.handPapers()
				}
			}, 1000)
		},
		// 收藏
		collection(val, index) {
			if (val.src === '../../img/kszt/icon_Collect.png') {
				this.$set(val, 'src', '../../img/kszt/icon_Collect1.png')
			} else {
				this.$set(val, 'src', '../../img/kszt/icon_Collect.png')
			}
			this.$forceUpdate()
		},
		// 选题
		mnksButton(val, minval, type, index) {
			// console.log(index)
			if (type === 1) {
				var a = false
				val.xuanze.forEach(e => {
					if (e.state === false || e.state === true) {
						a = true
					}
				})
				if (a === true) {
					return
				}
				val.depositAnswer = minval.xuan
				if (val.obAnswer === minval.xuan) {
					this.$set(minval, 'state', true)
					this.$set(minval, 'src', '../../img/kszt/icon_true.png')
					this.$set(val, 'answerCorrect', 2)
				} else {
					val.xuanze.forEach(e => {
						if (e.xuan === val.obAnswer) {
							this.$set(e, 'state', true)
							this.$set(e, 'src', '../../img/kszt/icon_true.png')
						}
					})
					this.$set(minval, 'state', false)
					this.$set(minval, 'src', '../../img/kszt/icon_false.png')
					this.$set(val, 'answerCorrect', 4)
				}
			} else {
				// 多选
				val.depositAnswerList = Array.from(new Set(val.depositAnswerList))
				if (val.depositAnswerList.length === 4) {
					return
				}
				const daan = val.obAnswer.split(',')
				val.depositAnswerList.push(minval.xuan)
				// console.log(val.depositAnswerList)
				if (val.obAnswer.indexOf(minval.xuan) !== -1) {
					this.$set(minval, 'state', true)
					this.$set(minval, 'src', '../../img/kszt/icon_true.png')
				} else {
					this.$set(minval, 'state', false)
					this.$set(minval, 'src', '../../img/kszt/icon_false.png')
				}
				const result = daan.length === val.depositAnswerList.length && daan.every(a => val.depositAnswerList.some(b => a === b)) && val.depositAnswerList.every(_b => daan.some(_a => _a === _b))
				if (result === false) {
					this.$set(val, 'answerCorrect', 4)
				} else {
					this.$set(val, 'answerCorrect', 2)
				}
				val.depositAnswer = val.depositAnswerList.join(',')
			}
			if (type !== 5) {
				if (val.answerCorrect === 2) {
					this.$refs.bgcolors[index].style.background = '#06bb86'
				} else {
					this.$refs.bgcolors[index].style.background = '#ec3934'
				}
			}
			this.$forceUpdate()
		},
		// 立即交卷
		handPapers() {
			window.clearInterval(this.times)
			// console.log(this.TimiList)
			const didAnswerSetList = []
			const answerCorrectSetList = []
			const dIdQuestionIdSetList = []
			const examScoreList = []
			this.TimiList.forEach(e => {
				if (e.answerCorrect === 2) {
					examScoreList.push(e.score)
				}
				if (e.depositAnswer) {
					answerCorrectSetList.push(e.answerCorrect)
					didAnswerSetList.push(e.depositAnswer)
					// console.log(didAnswerSetList)
					dIdQuestionIdSetList.push(e.id)
				}
				if (e.questionTypeId === 5 && e.mainDesc !== '' && e.mainDesc !== undefined) {
					dIdQuestionIdSetList.push(e.id)
					answerCorrectSetList.push(1)
					didAnswerSetList.push(e.mainDesc)
				}
			})
			const didAnswerSet = didAnswerSetList.join('|')
			const answerCorrectSet = answerCorrectSetList.join('|')
			const dIdQuestionIdSet = dIdQuestionIdSetList.join(',')
			const selectedQuestionIdSet = this.selectedQuestionIdSetList.join(',')
			const examScore = eval(examScoreList.join("+")) // 正确分数总和
			const params = {
				didAnswerSet: didAnswerSet, // 已做题目选择的那一项
				answerCorrectSet: answerCorrectSet, // 已做题目对错集合（0 未做 1已做 2 对 3半对 4 错误）
				selectedQuestionIdSet: selectedQuestionIdSet, //看过的题目ID
				subcourseId: this.subcourseId, //课程ID
				didQuestionIdSet: dIdQuestionIdSet, // 已做题目id
				PaperId: this.PaperId,
				doTypeId: 3,
				examScore: examScore || 0,
				usedTime: 7200 - this.intDiff,
				isComplete: true, // 固定
				isAutoNext: 1,// 固定
				markQuestionIdSet: ''
			}
			// if (params.didAnswerSet === '') {
			// 	alert("您还没有做试卷，请继续做题!")
			// 	return
			// }
			window.clearInterval(this.timecount)
			// console.log(params)
		},
		// 上一题
		pro(val, index) {
			// console.log(val)
			if (this.topicContent === 0) {
				this.topicContent = 0
			} else {
				this.topicContent -= 1
			}
		},
		// 下一题
		next(val, index) {
			// console.log(val)
			// console.log(this.topicContent)
			if (this.topicContent < this.TimiList.length - 1) {
				this.topicContent += 1
			}
			// 获取用户题目看到哪里，也就是下一题翻页翻到过那个地方
			this.selectedQuestionIdSetList.push(this.TimiList[this.topicContent].id)
			this.selectedQuestionIdSetList = Array.from(new Set(this.selectedQuestionIdSetList));
		},
		// 钩子
		goAnchor(index) {
			this.topicContent = index - 1
			this.selectedQuestionIdSetList.push(this.TimiList[this.topicContent].id)
			this.selectedQuestionIdSetList = Array.from(new Set(this.selectedQuestionIdSetList));
		},
		// 去除标签
		delHtmlTag(str) {
			if (str !== undefined) {
				return str.replace(/<[^>]+>/g, "");
			}
		},
		charFilter(str) {
			if (str !== undefined) {
				let fileType = "";
				//非可见字符asc,多个就可以用数组
				const ascNum = [
					32, 10
				];
				for (let i = 0; i < str.length; i++) {
					if (ascNum.every(n => str.charCodeAt(i) != n)) {
						fileType += str.charAt(i);
					}
				}
				return fileType;
			}
		},
		// 获取题目数据
		mrylList(val) {
			const that = this
			that.TimiList = []
			zhaqBox.style.display = 'none'
			$.ajax({
				type: "get",
				url: "http://192.168.0.120:1008/tiku/questionLib/getQuestionListByIds.do",
				data: {
					"questionIds": val,
				},
				dataType: 'jsonp',
				jsonp: "jsoncallback",
				async: false,
				success: function (data) {
					// console.log(data)
					if (data.V) {
						that.TimiList = data.V
						that.selectedQuestionIdSetList.push(that.TimiList[0].id) // 默认插入客户看的第一个题目id
						that.danxuanList = []
						that.duoxuanList = []
						that.panduanList = []
						that.budingList = []
						that.jiandaList = []
						that.TimiList.forEach((e, index) => {
							e.numberIndex = index + 1
							if (e.questionType.id === 1) {
								that.danxuanList.push(e)
							}
							if (e.questionType.id === 2) {
								that.duoxuanList.push(e)
							}
							if (e.questionType.id === 3) {
								that.panduanList.push(e)
							}
							if (e.questionType.id === 4) {
								that.budingList.push(e)
							}
							if (e.questionType.id === 5) {
								that.jiandaList.push(e)
							}
							e.depositAnswerList = []
							e.src = '../../img/kszt/icon_Collect.png'
							e.xuanze = []
							if (e.questionType.id === 1 || e.questionType.id === 2 || e.questionType.id === 3 || e.questionType.id === 4) {
								e.xuanze.push({
									he: that.charFilter(that.delHtmlTag(e.a)),
									xuan: 'A',
									state: undefined,
									src: '../../img/kszt/yuan.png'
								}, {
									he: that.charFilter(that.delHtmlTag(e.b)),
									xuan: 'B',
									state: undefined,
									src: '../../img/kszt/yuan.png'
								}, {
									he: that.charFilter(that.delHtmlTag(e.c)),
									xuan: 'C',
									state: undefined,
									src: '../../img/kszt/yuan.png'
								}, {
									he: that.charFilter(that.delHtmlTag(e.d)),
									xuan: 'D',
									state: undefined,
									src: '../../img/kszt/yuan.png'
								}, {
									he: that.charFilter(that.delHtmlTag(e.e)),
									xuan: 'E',
									state: undefined,
									src: '../../img/kszt/yuan.png'
								}, {
									he: that.charFilter(that.delHtmlTag(e.f)),
									xuan: 'F',
									state: undefined,
									src: '../../img/kszt/yuan.png'
								}, {
									he: that.charFilter(that.delHtmlTag(e.g)),
									xuan: 'G',
									state: undefined,
									src: '../../img/kszt/yuan.png'
								})
							}
						})
					}
					if (data.S == "1001") {
						zhaqBox.style.display = 'block'

					}
					// console.log(that.TimiList)
				},
				error: function () {
					zhaqBox.style.display = 'block'

					// alert("系统错误!");
				}
			})
		}
	}
})

var _iframe = window.parent;
var zhaqBox = _iframe.document.getElementsByClassName('tipsdialogbox1')[0];
var vm = new Vue({
	el: '#app',
	data: {
		curriculum: '综合素质（幼儿）',
		nowTime: undefined,
		millisecond: 0,
		intDiff: 0,
		timecount: 0,
		timers: null,
		rightNum: undefined,
		selectedQuestionIdSetList: [],
		num: 0,
		dialogVisible: false,
		isshow: false,
		zjlx: true,
		current: 0,
		leftContent: 0,
		rightContent: undefined,
		listLoading: false,
		topicContent: 0,
		fraction: 0,
		curriculumId: undefined,
		accuracyL: undefined,
		curriculumList: [], // 切换课程数据
		zjlxList: [],
		dailyPracticeSetId: undefined, // 每日一练ID
		titleLeftList: [{
			id: 1,
			src: '../../img/kszt/icon_practice.png',
			name: '章节练习'
		}, {
			id: 2,
			src: '../../img/kszt/icon_daily.png',
			name: '每日一练'
		}, {
			id: 3,
			src: '../../img/kszt/icon_simulation.png',
			name: '模拟考试'
		}, {
			id: 4,
			src: '../../img/kszt/icon_truetopic.png',
			name: '历年真题'
		}],
		titleRightList: [{
			id: 1,
			src: '../../img/kszt/icon_assessment.png',
			name: '智能评估'
		}, {
			id: 2,
			src: '../../img/kszt/icon_record拷贝2.png',
			name: '错题本'
		}, {
			id: 3,
			src: '../../img/kszt/icon_collection.png',
			name: '试题收藏'
		}, {
			id: 4,
			src: '../../img/kszt/icon_record拷贝2.png',
			name: '做题记录'
		}],
		tableData: [], // 章节练习
		mnksList: [],
		lnztList: [], // 历年真题
		lxrw: [], // 练习任务
		ksrw: {}, // 考试任务
		stsc: [], // 试题收藏
		ztjl: [], // 做题记录
		znTime: undefined,
		ctb: [], // 错题本
		ti: [] // 每日一练
	},
	created() {
		this.getTime()
		this.curriculumButton()
		this.getUrlParamZT()
	},
	methods: {
		// 接受上一个页面的参数
		getUrlParamZT() {
			let value = [];
			window.location.search.substring(1).split('&').forEach(n => {
				value[decodeURI(n.split('=')[0])] = decodeURI(n.split('=')[1]);
				value.length++;
			})
			// console.log(value);
			// if (value.num !== undefined) {
			//   this.num = Number(value.num)	
			// }
		},
		// 切换课程的数据
		curriculumButton() {
			const that = this
			that.curriculumList = []
			zhaqBox.style.display = 'none'
			$.ajax({
				type: "get",
				url: "http://www.360xkw.com/tiku/course/getKMByPidAndLevelNoLogin.do",
				data: {
					"pid": 11
				},
				dataType: 'jsonp',
				jsonp: "jsoncallback",
				async: false,
				success: function (data) {
					console.log(data)
					that.curriculumList = data.V
					that.chaprcises(that.curriculumList[0].id)
					that.curriculumId = that.curriculumList[0].id
					that.curriculum = that.curriculumList[0].name
					if (data.S == "1001") {
						zhaqBox.style.display = 'block'

					}
				},
				error: function () {
					zhaqBox.style.display = 'none'

					// alert("系统错误!");
				}
			});
		},
		// 切换课程显示隐藏
		qiehuan() {
			this.isshow = !this.isshow
			this.$nextTick(() => {
				this.$set(parent.document.getElementsByClassName("changehtml")[0], 'height', window.document.body.scrollHeight)
			});
		},
		// 切换课程
		choice(val, index) {
			this.current = index;
			this.curriculum = val.name
			this.isshow = false
			if (this.num === 0) {
				// 章节练习
				this.chaprcises(val.id)
			} else if (this.num === 1) {
				// 每日一练
				window.clearInterval(this.timecount)
				this.intDiff = 0
				this.timecounts()
				this.$nextTick(() => {
					this.times()
				})
				this.dailyPractice(val.id)
				this.topicContent = 0
			} else if (this.num === 2) {
				// 模拟考试
				this.mockTest(val.id)
			} else if (this.num === 3) {
				// 历年真题
				this.realTopic(val.id)
			}
			if (this.rightNum === 0) {
				// 智能评估
				this.assessment(val.id)
			} else if (this.rightNum === 1) {
				// 错题本
				this.wrongBook(val.id)
			} else if (this.rightNum === 2) {
				// 试题收藏
				this.testCollection(val.id)
			} else if (this.rightNum === 3) {
				// 做题记录
				this.makeNotes(val.id)
			}
			this.curriculumId = val.id
		},
		// 章节练习数据
		chaprcises(subcourseId) {
			this.listLoading = true
			const that = this
			zhaqBox.style.display = 'none'
			$.ajax({
				type: "get",
				// url: "http://www.360xkw.com/tiku/course/getChapterQuestionIdTypes.do",
				url: "https://tk.360xkw.com/tiku/course/getChapterQuestionIdTypes.do",
				data: {
					"subcourseId": subcourseId
				},
				dataType: 'jsonp',
				jsonp: "jsoncallback",
				async: false,
				success: function (data) {
					if (data.V) {
						that.zjlxList = data.V.chapters
						that.zjlxList.forEach(e => {
							e.questionIdTypesLenght = e.questionIdTypes.length
							e.selected = []
							e.shuffled = e.questionIdTypes.sort(() => 0.5 - Math.random());
							e.selected = e.shuffled.slice(0, 100);
						})
					} else {
						that.zjlxList = []
					}
					if (data.S == "1001") {
						zhaqBox.style.display = 'block'

					}
					that.zjlxList.forEach((value, index) => {
						that.zjlxList[index]['selected'] = value['selected'].sort((last, next) => {
							return last[1] - next[1];
						})
					})
					that.wrongTopic(subcourseId, 1)
				},
				error: function () {
					// alert("系统错误!");
					zhaqBox.style.display = 'block'

					that.listLoading = false
				}
			});
		},
		// 题目的总题状态
		wrongTopic(subcourseId, doTypeId) {
			const that = this
			var allTi = []
			zhaqBox.style.display = 'none'

			$.ajax({
				type: "get",
				// url: "http://www.360xkw.com/tiku/didRecord/getUserDidSummry.do",
				url: "https://tk.360xkw.com/tiku/didRecord/getUserDidSummry.do",
				data: {
					'subcourseId': subcourseId,
					'doTypeId': doTypeId
				},
				dataType: 'jsonp',
				jsonp: "jsoncallback",
				async: false,
				success: function (data) {
					if (data.V) {
						allTi = data.V.chapters
					}
					that.tableData = []
					if (doTypeId === 1) {
						allTi.forEach(e => {
							that.zjlxList.forEach(item => {
								if (e.id === item.id) {
									if (e.didQuestionIds === undefined) {
										item.didQuestionIdsList = 0
										item.state = '未完成'
									} else {
										if (e.didQuestionIds.length <= item.questionIdTypes.length) {
											item.didQuestionIdsList = e.didQuestionIds.length
										} else {
											item.didQuestionIdsList = item.questionIdTypesLenght
										}
										if (e.didQuestionIds.length >= item.questionIdTypes.length) {
											item.state = '已完成'
										} else {
											item.state = '未完成'
										}
									}
								}
							})
						})
					} else {
						that.zjlxList = []
					}
					if (data.S == "1001") {
						zhaqBox.style.display = 'block'

					}
					that.tableData = that.zjlxList
					// console.log(that.tableData)
					that.listLoading = false
					that.heights()
				},
				error: function () {
					// alert("系统错误!");
					zhaqBox.style.display = 'block'

					that.listLoading = false
				}
			});
		},
		// 每日一练
		dailyPractice(subcourseId) {
			const that = this
			zhaqBox.style.display = 'none'

			$.ajax({
				type: "POST",
				url: "https://tk.360xkw.com/tiku/app/getDailyPracticeBySubCourseId.do",
				// url: "http://www.360xkw.com/tiku/app/getDailyPracticeBySubCourseId.do",
				data: {
					"subCourseId": subcourseId,
				},
				dataType: 'jsonp',
				jsonp: "jsoncallback",
				async: false,
				success: function (data) {
					if (data.V) {
						that.dailyPracticeSetId = data.V.dailyPracticeSetId
						if (data.V.appDailyPracticeSet.questionIdSet) {
							that.mrylList(data.V.appDailyPracticeSet.questionIdSet)
						} else {
							that.ti = []
						}
					}
					if (data.S == "1001") {
						zhaqBox.style.display = 'block'

					}
					that.heights()
				},
				error: function () {
					zhaqBox.style.display = 'block'

					// alert("系统错误!");
				}
			})
		},
		// 每日一练开始做题数据
		mrylList(val) {
			const that = this
			that.ti = []
			zhaqBox.style.display = 'none'

			$.ajax({
				type: "get",
				// url: "http://www.360xkw.com/tiku/questionLib/getQuestionListByIds.do",`
				url: "https://tk.360xkw.com/tiku/questionLib/getQuestionListByIds.do",
				data: {
					"questionIds": val,
				},
				dataType: 'jsonp',
				jsonp: "jsoncallback",
				async: false,
				success: function (data) {
					if (data.V) {
						that.ti = data.V
						that.selectedQuestionIdSetList.push(that.ti[0].id) // 默认插入客户看的第一个题目id
						that.ti.forEach(e => {
							e.xuanze = []
							e.depositAnswerList = []
							// console.log(e)
							if (e.questionType.id === 1 || e.questionType.id === 2 || e.questionType.id === 3 || e.questionType.id ===
								4) {
								e.xuanze.push({
									he: that.charFilter(that.delHtmlTag(e.a)),
									xuan: 'A',
									state: undefined
								}, {
									he: that.charFilter(that.delHtmlTag(e.b)),
									xuan: 'B',
									state: undefined
								}, {
									he: that.charFilter(that.delHtmlTag(e.c)),
									xuan: 'C',
									state: undefined
								}, {
									he: that.charFilter(that.delHtmlTag(e.d)),
									xuan: 'D',
									state: undefined
								}, {
									he: that.charFilter(that.delHtmlTag(e.e)),
									xuan: 'E',
									state: undefined
								}, {
									he: that.charFilter(that.delHtmlTag(e.f)),
									xuan: 'F',
									state: undefined
								}, {
									he: that.charFilter(that.delHtmlTag(e.g)),
									xuan: 'G',
									state: undefined
								})
							} else {
								// console.log('hehe')
							}
						})
						that.heights()
					}
					if (data.S == "1001") {
						zhaqBox.style.display = 'block'

					}
				},
				error: function () {
					zhaqBox.style.display = 'block'

					// alert("系统错误!");
				}
			});
		},
		// 模拟考试数据
		mockTest(subcourseId) {
			const that = this
			that.mnksList = []
			zhaqBox.style.display = 'none'

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
						that.mnksList = data.V.papers
						that.mnksList.sort((a, b) => { return b.paper.state - a.paper.state });
						// console.log(that.mnksList)
						// that.mnksList.forEach(e => {
						// 	e.selected = []
						// 	e.shuffled = e.questionIdTypes.sort(() => 0.5 - Math.random());
						// 	e.selected = e.shuffled.slice(0, 100);
						// })
					} else {
						that.mnksList = []
					}
					if (data.S == "1001") {
						zhaqBox.style.display = 'block'

					}
					that.mnksList.forEach((value, index) => {
						that.mnksList[index]['questionIdTypes'] = value['questionIdTypes'].sort((last, next) => {
							return last[1] - next[1];
						})
					})
					that.heights()
				},
				error: function () {
					zhaqBox.style.display = 'block'

					// alert("系统错误!");
				}
			});
		},
		// 历年真题数据
		realTopic(subcourseId) {
			const that = this
			that.lnztList = []
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
						that.lnztList = data.V.papers
						that.lnztList.sort((a, b) => { return b.paper.state - a.paper.state });
					} else {
						that.lnztList = []
					}
					if (data.S == "1001") {
						zhaqBox.style.display = 'block'

					}
					that.lnztList.forEach((value, index) => {
						that.lnztList[index]['questionIdTypes'] = value['questionIdTypes'].sort((last, next) => {
							return last[1] - next[1];
						})
					})
					that.heights()
				},
				error: function () {
					zhaqBox.style.display = 'block'

					// alert("系统错误!");
				}
			});
		},
		// 智能评估数据
		assessment(subcourseId) {
			const that = this
			that.lnztList = []
			zhaqBox.style.display = 'none'

			$.ajax({
				type: "get",
				url: "https://tk.360xkw.com/tiku/report/getReportSummary.do",
				data: {
					"subcourseId": subcourseId
				},
				dataType: 'jsonp',
				jsonp: "jsoncallback",
				async: false,
				success: function (data) {
					if (data.V) {
						that.lxrw = data.V.chapters
						that.ksrw = data.V.paper
						that.znTime = data.V.userColligationScore.editTime
						that.lxrw.forEach(e => {
							e.record = []
							e.show1 = false
						})
						that.ksrw.show2 = false
						that.ksrw.record = []
					}
					if (data.S == "1001") {
						zhaqBox.style.display = 'block'

					}

					that.heights()
				},
				error: function () {
					zhaqBox.style.display = 'block'

					// alert("系统错误!");
				}
			});
		},
		// 错题本数据
		wrongBook(subcourseId) {
			this.ctb = []
			const that = this
			zhaqBox.style.display = 'none'
			$.ajax({
				type: "get",
				url: "https://tk.360xkw.com/tiku/wrongReview/getSubcourseCountJZ.do",
				// url: "http://www.360xkw.com/tiku/wrongReview/getSubcourseCountJZ.do",
				data: {
					"subcourseId": subcourseId,
					"courseId": 11
				},
				dataType: 'jsonp',
				jsonp: "jsoncallback",
				async: false,
				success: function (data) {
					if (data.V) {
						const dataList = data.V
						dataList.map(item => {
							if (item.pid === subcourseId) {
								that.ctb.push(Object.assign({}, {
									id: item.id,
									level: item.level,
									pid: item.pid,
									wrongNum: item.wrongNum,
									name: item.name
								}))
							}
						})
					} else {
						that.ctb = []
					}
					if (data.S == "1001") {
						zhaqBox.style.display = 'block'

					}
					that.heights()
				},
				error: function () {
					zhaqBox.style.display = 'block'

					// alert("系统错误!");
				},

			});
		},
		// 试题收藏数据
		testCollection(subcourseId) {
			const that = this
			that.stsc = []
			zhaqBox.style.display = 'none'

			$.ajax({
				type: "get",
				url: "https://tk.360xkw.com/tiku/userCollection/getSubcourseCountJZ.do",
				data: {
					"courseId": 11
				},
				dataType: 'jsonp',
				jsonp: "jsoncallback",
				async: false,
				success: function (data) {
					// console.log(data)
					if (data.V) {
						if (data.V) {
							const dataList = data.V
							dataList.map(item => {
								if (item.pid === subcourseId) {
									that.stsc.push(Object.assign({}, {
										id: item.id,
										level: item.level,
										pid: item.pid,
										collectNum: item.collectNum,
										name: item.name
									}))
								}
							})
						} else {
							that.stsc = []
						}
					}
					if (data.S == "1001") {
						zhaqBox.style.display = 'block'

					}
					that.heights()
				},
				error: function () {
					zhaqBox.style.display = 'block'

					// alert("系统错误!");
				}
			});
		},
		// 做题记录数据
		makeNotes(subcourseId) {
			const that = this
			that.ztjl = []
			zhaqBox.style.display = 'none'

			$.ajax({
				type: "get",
				url: "https://tk.360xkw.com/tiku/report/getChapterPaperReportDetialJZ.do",
				// url: "http://www.360xkw.com/tiku/report/getChapterPaperReportDetialJZ.do",
				data: {
					"doTypeId": 3,
					"subcourseId": subcourseId,

				},
				dataType: 'jsonp',
				jsonp: "jsoncallback",
				async: false,
				success: function (data) {
					// console.log(data)
					if (data.V) {
						that.ztjl = data.V
					}
					if (data.S === '2000') {

					}
					if (data.S == "1001") {
						zhaqBox.style.display = 'block'

					}
					that.heights()
				},
				error: function () {
					// alert("系统错误!");
				}
			});
		},
		// 左侧tab
		leftTab(val, index) {
			this.rightNum = undefined
			this.num = index
			this.rightContent = undefined
			this.leftContent = index
			if (this.num === 0) {
				// 章节练习
				this.chaprcises(this.curriculumId)
			} else if (this.num === 1) {
				window.clearInterval(this.timecount)
				this.intDiff = 0
				this.timecounts()
				this.$nextTick(() => {
					this.times()
				})
				this.dailyPractice(this.curriculumId)
			} else if (this.num === 2) {
				// 模拟考试
				this.mockTest(this.curriculumId)
			} else if (this.num === 3) {
				// 历年真题
				this.realTopic(this.curriculumId)
			}
			this.heights()
		},
		// 右侧上方tab
		rightTab(val, index) {
			this.num = undefined
			this.rightNum = index
			this.leftContent = undefined
			this.rightContent = index
			// window.clearInterval
			if (this.rightNum === 0) {
				// 智能评估
				this.assessment(this.curriculumId)
			} else if (this.rightNum === 1) {
				// 错题本
				this.wrongBook(this.curriculumId)
			} else if (this.rightNum === 2) {
				// 试题收藏
				this.testCollection(this.curriculumId)
			} else if (this.rightNum === 3) {
				// 做题记录
				this.makeNotes(this.curriculumId)
			}
			this.heights()
		},
		// 获取body高度
		heights() {
			this.$nextTick(() => {
				this.$set(parent.document.getElementsByClassName("changehtml")[0], 'height', window.document.body.scrollHeight)
			})
			this.$forceUpdate()
		},
		pro(val, index) {
			if (this.topicContent === 0) {
				this.topicContent = 0
			} else {
				this.topicContent -= 1
			}
			this.heights()
		},
		next(val, index) {
			if (this.topicContent < this.ti.length - 1) {
				this.topicContent += 1
			}
			// 获取用户题目看到哪里，也就是下一题翻页翻到过那个地方
			this.selectedQuestionIdSetList.push(this.ti[this.topicContent].id)
			this.selectedQuestionIdSetList = Array.from(new Set(this.selectedQuestionIdSetList));
			this.heights()
		},
		// 选择的题目
		selectTopic(val, tval, index, tindex, type) {
			if (type === 1) {
				// 单选
				var a = false
				val.xuanze.forEach(e => {
					if (e.state === false || e.state === true) {
						a = true
					}
				})
				if (a === true) {
					return
				}
				val.depositAnswer = tval.xuan
				if (val.obAnswer === tval.xuan) {
					this.$set(tval, 'state', true)
					this.$set(val, 'answerCorrect', 2)
				} else {
					val.xuanze.forEach(e => {
						if (e.xuan === val.obAnswer) {
							this.$set(e, 'state', true)
						}
					})
					this.$set(tval, 'state', false)
					this.$set(val, 'answerCorrect', 4)
				}
			} else {
				// console.log(tval)
				// 多选
				val.depositAnswerList = Array.from(new Set(val.depositAnswerList))
				if (val.depositAnswerList.length === 4) {
					return
				}
				const daan = val.obAnswer.split(',')
				val.depositAnswerList.push(tval.xuan)
				// console.log(val.depositAnswerList)
				if (val.obAnswer.indexOf(tval.xuan) !== -1) {
					this.$set(tval, 'state', true)
				} else {
					this.$set(tval, 'state', false)
				}
				const result = daan.length === val.depositAnswerList.length && daan.every(a => val.depositAnswerList.some(b => a ===
					b)) && val.depositAnswerList.every(_b => daan.some(_a => _a === _b))
				if (result === false) {
					this.$set(val, 'answerCorrect', 4)
				} else {
					this.$set(val, 'answerCorrect', 2)
				}
				val.depositAnswer = val.depositAnswerList.join(',')
			}
			// console.log(val)
			this.$forceUpdate()
		},
		// 模拟考试
		mnksButton(val, index, name) {
			// console.log(val)
			var questionIdTypeList = []
			val.questionIdTypes.forEach((e, index) => {
				questionIdTypeList.push(e[0])
			})
			const questionIdTypeString = questionIdTypeList.join(',')
			window.open("mnkszb.html?subcourseId=" + val.paper.subCourseId + "&PaperId=" + val.paper.id + "&questionIds=" +
				questionIdTypeString + "&typeName=" + name)
		},
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
		// 做题计时器
		timecounts() {
			var hour = 0,
				minute = 0,
				second = 0;
			hour = Math.floor(this.intDiff / (60 * 60))
			minute = Math.floor(this.intDiff / 60) - (hour * 60)
			second = Math.floor(this.intDiff) - (hour * 60 * 60) - (minute * 60)
			if (hour <= 9) hour = '0' + hour
			if (minute <= 9) minute = '0' + minute
			if (second <= 9) second = '0' + second
			this.timers = hour + ':' + minute + ':' + second
		},
		times() {
			this.timecount = setInterval(() => {
				this.intDiff++
				this.timecounts()
			}, 1000)
		},
		// 交卷
		handPapers() {
			window.clearInterval(this.timecount)
			// console.log(this.ti)
			const didAnswerSetList = []
			const answerCorrectSetList = []
			const didQuestionIdSetList = []
			const selectedQuestionIdSetList = []
			const examScoreList = []
			var report
			this.ti.forEach(e => {
				if (e.answerCorrect === 2) {
					examScoreList.push(e.score)
				}
				if (e.depositAnswer) {
					answerCorrectSetList.push(e.answerCorrect)
					didAnswerSetList.push(e.depositAnswer)
					// console.log(didAnswerSetList)
					didQuestionIdSetList.push(e.id)
				}
				if (e.questionTypeId === 5 && e.mainDesc !== '' && e.mainDesc !== undefined) {
					didQuestionIdSetList.push(e.id)
					answerCorrectSetList.push(1)
					didAnswerSetList.push(e.mainDesc)
				}
			})
			const didAnswerSet = didAnswerSetList.join('|')
			const answerCorrectSet = answerCorrectSetList.join('|')
			const didQuestionIdSet = didQuestionIdSetList.join(',')
			const selectedQuestionIdSet = this.selectedQuestionIdSetList.join(',')
			const examScore = eval(examScoreList.join("+")) // 正确分数总和
			if (didAnswerSet === '') {
				alert("您还没有做试卷，请继续做题!")
				return
			}
			zhaqBox.style.display = 'none'

			$.ajax({
				type: "get",
				// url: "http://www.360xkw.com//tiku/app/submitAppDailyPractice.do",
				url: "https://tk.360xkw.com/tiku/app/submitAppDailyPractice.do",
				data: {
					'didAnswerSet': didAnswerSet, // 已做题目选择的那一项
					'answerCorrectSet': answerCorrectSet, // 已做题目对错集合（0 未做 1已做 2 对 3半对 4 错误）
					'selectedQuestionIdSet': selectedQuestionIdSet, //所有题目id
					'subcourseId': this.curriculumId, //课程ID
					'didQuestionIdSet': didQuestionIdSet, // 已做题目id
					'dailyPracticeSetId': this.dailyPracticeSetId, // 每日一练id
					'doTypeId': 1, //固定
					'markQuestionIdSet': '',
					'examScore': examScore || 0,
					'usedTime': this.intDiff,
					'isComplete': true, // 固定
					'isAutoNext': 1 // 固定
				},
				dataType: 'jsonp',
				jsonp: "jsoncallback",
				async: false,
				success: function (data) {
					// console.log(data)
					report = data.V
					if (data.S == "1001") {
						zhaqBox.style.display = 'block'
					}

				},
				error: function () {
					zhaqBox.style.display = 'block'
					// alert("系统错误!");
				}
			})
			this.getViewAnswerByReportId(report)
		},
		// 交卷完成后返回的数据
		getViewAnswerByReportId(report) {
			const that = this
			that.alldoneList = []
			that.doneList = []
			zhaqBox.style.display = 'none'

			$.ajax({
				type: "get",
				// url: "http://www.360xkw.com/tiku/didRecord/getViewAnswerByReportId.do",
				url: "https://tk.360xkw.com/tiku/didRecord/getViewAnswerByReportId.do",
				data: {
					'reportId': report.reportId
				},
				dataType: 'jsonp',
				jsonp: "jsoncallback",
				async: false,
				success: function (data) {
					if (data.V) {
						// console.log(data.V)
						let mr = {
							subcourseId: that.curriculumId,
							subcourseName: that.curriculum
						}
						sessionStorage.setItem('makequesList', JSON.stringify(data.V))
						sessionStorage.setItem('mr', JSON.stringify(mr))
						var _iframe = window.parent;
						var num = _iframe.document.getElementsByClassName('num')[0];
						num.innerText = data.V.examScore
						var dialogbox = _iframe.document.getElementsByClassName('dialogbox')[0];
						dialogbox.style.display = 'block'
					}
					if (data.S == "1001") {
						zhaqBox.style.display = 'block'

					}


				},
				error: function () {
					zhaqBox.style.display = 'block'

					// alert("系统错误!");
				}
			})
		},
		// 智能评估下拉
		znpgButton1(val) {
			val.show1 = !val.show1
			if (val.show1 === true) {
				const that = this
				zhaqBox.style.display = 'none'


				$.ajax({
					type: "get",
					// url: "http://www.360xkw.com/tiku/report/getChapterPaperReportDetialJZ.do",
					url: "https://tk.360xkw.com/tiku/report/getChapterPaperReportDetialJZ.do",
					data: {
						'chapterId': val.id,
						'subcourseId': that.curriculumId
					},
					dataType: 'jsonp',
					jsonp: "jsoncallback",
					async: false,
					success: function (data) {
						that.$set(val, 'record', data.V)
						// val.record = data.V
						if (data.S == "1001") {
							zhaqBox.style.display = 'block'

						}
						that.$forceUpdate()
					},
					error: function () {
						zhaqBox.style.display = 'block'

						// alert("系统错误!");
					}
				})
			}
			this.$forceUpdate()
		},
		znpgButton2(val) {
			val.show2 = !val.show2
			if (val.show2 === true) {
				const that = this
				zhaqBox.style.display = 'none'

				$.ajax({
					type: "get",
					// url: "http://www.360xkw.com/tiku/report/getChapterPaperReportDetialJZ.do",
					url: "https://tk.360xkw.com/tiku/report/getChapterPaperReportDetialJZ.do",
					data: {
						'doTypeId': 3,
						'subcourseId': that.curriculumId
					},
					dataType: 'jsonp',
					jsonp: "jsoncallback",
					async: false,
					success: function (data) {
						// val.record = data.V
						if (data.S == "1001") {
							zhaqBox.style.display = 'block'

						}

						that.$set(val, 'record', data.V)
						that.$forceUpdate()
					},
					error: function () {
						zhaqBox.style.display = 'block'
						// alert("系统错误!");
					}
				})
			}
			this.$forceUpdate()
		},
		buyNow() {
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
		// 试题收藏跳转
		tryCollection(val, index) {
			// curriculum
			window.open("zt.html?subcourseId=" + val.pid + "&paperId=" + val.id + "&level=" + val.level + "&name=" + "试题收藏" + "&type=" + index + "&names=" + this.curriculum + "&paperName=" + val.name)
		},
		// 智能评估
		znpgButtons(val, id, index) {
			window.open("zt.html?didRecordId=" + id + "&name=" + "智能评估" + "&type=" + index + "&doTypeId=" + val.doTypeId)
		},
		// 做题记录的跳转
		ztjlButton(val, id, index) {
			window.open("zt.html?didRecordId=" + id + "&name=" + "做题记录" + "&type=" + index + "&doTypeId=" + val.doTypeId)
		},
		// 错题本重做跳转
		redoButton(val, index) {
			window.open("zt.html?subcourseId=" + val.pid + "&paperId=" + val.id + "&level=" + val.level + "&name=" + "错题" + "&type=" + index + "&names=" + this.curriculum + "&paperName=" + val.name)
		},
		// 章节练习的跳转
		zjlxButton(val, index) {
			var questionIdTypeList = []
			val.selected.forEach((e, index) => {
				questionIdTypeList.push(e[0])
			})
			const questionIdTypeString = questionIdTypeList.join(',')
			window.open("zt.html?questionIds=" + questionIdTypeString + "&name=" + "章节练习" + "&subcourseId=" + this.curriculumId + "&chapterId=" + val.id + "&type=" + index + "&names=" + this.curriculum + "&paperName=" + val.name)
		},
		getTime() {
			setInterval(() => {
				let nowDate = new Date()
				let date = {
					year: nowDate.getFullYear(),
					month: nowDate.getMonth() + 1,
					date: nowDate.getDate()
				}
				this.nowTime = date.year + '-' + date.month + '-' + date.date
			}, 1000)
		}
	}
})

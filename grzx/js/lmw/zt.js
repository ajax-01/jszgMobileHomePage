
var thiskc = new Vue({
	el: '#tlk_zt',
	data: {
		putAway: false,
		jiexi: false,
		stopChoose: false,
		showAnswer: undefined,
		reportId: undefined,
		reportList: {},
		topicContent: 0,
		intDiff: 0,
		judgeType: undefined,
		selectedQuestionIdSetList: [],
		tiLenght: undefined,
		ti: [],
		timers: 0,
		xuniTime: 0,
		chapterId: undefined,
		anwShow: false,
		names: null,
		titles: null,
		paper: {},
		jlName: undefined,
		countDown: undefined,
		subcourseId: null,
		PaperId: undefined,
		centerDialogVisible: false,
		centerDialogVisible1: true,
		percentages: 0,
		completeing: [],
		danxuanList: [],
		duoxuanList: [],
		panduanList: [],
		budingList: [],
		jiandaList: [],
		doTypeId: undefined,
		buttonLoading: false,
		doneList: [],
		alldoneList: [],
		accuracyL: 0,
		piandi: false,
		allcurriculmList: [],
		didAnswerSet: [],
		allanswer: {},
		cuoti: false,
		videoList: [],
		level: undefined,
		recoCourses: {}, // 推荐的课程
		gyhVistie: false
	},
	created() {
		this.getUrlParamZT()
		this.getItemListByBanXingTypeNoLogin()
		if (this.showAnswer === false) {
			this.timecounts()
			this.$nextTick(() => {
				this.times()
			})
		}
		// this.mrylList()
	},
	methods: {
		open(val) {
			console.log(val)
			this.$set(val, 'putAway', true)
			this.$forceUpdate()
		},
		shou(val) {
			this.$set(val, 'putAway', false)
			this.$forceUpdate()
		},
		// 做题记录的考试内容数据
		ztjlList(val, type, AI) {
			const that = this
			var ztjl = []
			that.paper = {}
			that.gyhVistie = false
			$.ajax({
				type: "get",
				// url: "http://www.360xkw.com/tiku/didRecord/getRedoQuestionIdTypes.do",
				url: "https://tk.360xkw.com/tiku/didRecord/getRedoQuestionIdTypes.do",
				dataType: "jsonp",
				jsonp: "jsoncallback",
				data: {
					'didRecordId': val,
				},
				// async: false,
				xhrFiled: {
					withCredentials: true
				},
				success: function (data) {
					if (data.V) {
						if (AI === 'AI') {
							if (data.V.chapter) {
								that.paper.paperName = data.V.chapter.name
								that.chapterId = data.V.chapter.id
							} else {
								that.paper.paperName = data.V.paper.paperName
								that.doTypeId = data.V.doTypeId
								that.intDiff = data.V.paper.answerTime * 60 || 7200
								that.xuniTime = data.V.paper.answerTime * 60 || 7200
								that.judgeType = 3
								that.PaperId = data.V.paper.id
								that.jlName = '智能评估模拟'
							}
							that.names = data.V.subcourse.name
							that.subcourseId = data.V.subcourse.id
						} else {
							that.doTypeId = data.V.doTypeId
							that.judgeType = 3
							that.PaperId = data.V.paper.id
							that.intDiff = data.V.paper.answerTime * 60 || 7200
							that.xuniTime = data.V.paper.answerTime * 60 || 7200
							that.paper = data.V.paper
							that.names = data.V.subcourse.name
							that.subcourseId = data.V.subcourse.id
						}
						// that.intDiff = (data.V.paper.answerTime) * 60
						ztjl.push(data.V)
						ztjl.forEach((value, index) => {
							ztjl[index]['questionIdTypes'] = value['questionIdTypes'].sort((last, next) => {
								return last[1] - next[1];
							})
						})
						let questionIdTypeList = []
						ztjl[0].questionIdTypes.forEach((e, index) => {
							questionIdTypeList.push(e[0])
						})
						that.mrylList(questionIdTypeList.join(','), type)
					}
					if (data.S == "1001") {
						that.gyhVistie = true
					}
				},
				error: function () {
					that.gyhVistie = true
				}
			});
		},
		// 做题数据
		mrylList(valList, type) {
			this.gyhVistie = false
			const that = this
			that.ti = []
			$.ajax({
				type: "get",
				url: "https://tk.360xkw.com/tiku/questionLib/getQuestionListByIds.do",
				data: {
					"questionIds": valList,
				},
				dataType: 'jsonp',
				jsonp: "jsoncallback",
				// async: false,
				success: function (data) {
					if (data.V) {
						that.ti = data.V
						that.danxuanList = []
						that.duoxuanList = []
						that.panduanList = []
						that.budingList = []
						that.jiandaList = []
						that.tiLenght = that.ti.length
						that.selectedQuestionIdSetList.push(that.ti[0].id) // 默认插入客户看的第一个题目id
						that.ti.forEach((e, index) => {
							if (e.difficulty === 1) {
								e.Imgs = ['../../img/kszt/icon_Collect1.png', '../../img/kszt/icon_Collect.png', '../../img/kszt/icon_Collect.png', '../../img/kszt/icon_Collect.png', '../../img/kszt/icon_Collect.png']
							} else if (e.difficulty === 2) {
								e.Imgs = ['../../img/kszt/icon_Collect1.png', '../../img/kszt/icon_Collect1.png', '../../img/kszt/icon_Collect.png', '../../img/kszt/icon_Collect.png', '../../img/kszt/icon_Collect.png']
							} else if (e.difficulty === 3) {
								e.Imgs = ['../../img/kszt/icon_Collect1.png', '../../img/kszt/icon_Collect1.png', '../../img/kszt/icon_Collec1t.png', '../../img/kszt/icon_Collect.png', '../../img/kszt/icon_Collect.png']
							} else if (e.difficulty === 4) {
								e.Imgs = ['../../img/kszt/icon_Collect1.png', '../../img/kszt/icon_Collect1.png', '../../img/kszt/icon_Collect1.png', '../../img/kszt/icon_Collect.png1', '../../img/kszt/icon_Collect.png']
							} else if (e.difficulty === 5) {
								e.Imgs = ['../../img/kszt/icon_Collect1.png', '../../img/kszt/icon_Collect1.png', '../../img/kszt/icon_Collect.png1', '../../img/kszt/icon_Collect.png1', '../../img/kszt/icon_Collect.png1']
							}
							if (that.cuoti === true) {
								that.didAnswerSet.forEach((did, didindex) => {
									if (index === didindex) {
										e.didAnswerSet = did
									}
								})
							}
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
							if (that.jlName === "试题收藏") {
								e.src = '../../img/kszt/icon_Collect1.png'
							} else {
								e.src = '../../img/kszt/icon_Collect.png'
							}
							e.xuanze = []
							e.depositAnswerList = []
							if (type === '1') {
								e.putAway = false
							} else {
								e.putAway = true
							}
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
								console.log('hehe')
							}
						})
						// console.log(that.ti)
						if (type === '2') {
							that.ti.forEach(tiItem => {
								tiItem.xuanze.forEach(xuans => {
									if (tiItem.obAnswer.indexOf(xuans.xuan) !== -1) {
										that.$set(xuans, 'state', true)
									}
								})
							})
						}
					}
					if (data.S == "1001") {
						that.gyhVistie = true
					}
				},
				error: function () {
					that.gyhVistie = true
					console.log(that.gyhVistie)
					that.$forceUpdate()
				}
			});
		},
		// 错题
		questionLibIdList(subcourseId, paperId, type) {
			const that = this
			// console.log(that.level)
			that.gyhVistie = false
			if (that.level === 'undefined') {
				that.PaperId = paperId
				// console.log('错题')
				$.ajax({
					type: "get",
					url: "https://tk.360xkw.com/tiku/wrongReview/getWrongReviewsJZ.do",
					dataType: "jsonp",
					jsonp: "jsoncallback",
					data: {
						'courseId': 11,
						'subcourseId': subcourseId,
						'paperId': paperId
					},
					// async: false,
					// xhrFiled: {
					// 	withCredentials: true
					// },
					success: function (data) {
						if (data.V) {
							let questionIds = []
							const wrongReview = data.V
							wrongReview.sort((a, b) => { return a.questionTypeId - b.questionTypeId })
							wrongReview.forEach(e => {
								questionIds.push(e.questionLibId)
							})
							that.mrylList(questionIds.join(','), type)
						}
						if (data.S == "1001") {
							that.gyhVistie = true

						}
					},
					error: function () {
						that.gyhVistie = true

					}
				});
			} else {
				that.chapterId = paperId
				$.ajax({
					type: "get",
					url: "https://tk.360xkw.com/tiku/wrongReview/getWrongReviewsJZ.do",
					dataType: "jsonp",
					jsonp: "jsoncallback",
					data: {
						'courseId': 11,
						'subcourseId': subcourseId,
						'chapterId': paperId
					},
					// async: false,
					// xhrFiled: {
					// 	withCredentials: true
					// },
					success: function (data) {
						if (data.V) {
							let questionIds = []
							const wrongReview = data.V
							wrongReview.sort((a, b) => { return a.questionTypeId - b.questionTypeId })
							wrongReview.forEach(e => {
								questionIds.push(e.questionLibId)
							})
							that.mrylList(questionIds.join(','), type)
						}
						if (data.S == "1001") {
							that.gyhVistie = true

						}
					},
					error: function () {
						that.gyhVistie = true

					}
				});
			}
		},
		// 选择的题目
		selectTopic(val, tval, index, tindex, type) {
			if (this.stopChoose === true) {
				return
			}
			if (this.showAnswer === true) {
				return
			}
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
				// 多选
				let xuanLength = []
				val.xuanze.forEach(items => {
					if (items.he !== '') {
						xuanLength.push(items.he)
					}
				})
				val.depositAnswerList = Array.from(new Set(val.depositAnswerList))
				if (val.depositAnswerList.length === xuanLength.length) {
					return
				}
				const daan = val.obAnswer.split(',')
				val.depositAnswerList.push(tval.xuan)
				val.depositAnswerList = Array.from(new Set(val.depositAnswerList))
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
			if (type === 1 || type === 3) {
				if (this.showAnswer !== true) {
					if (val.answerCorrect === 2) {
						this.$refs.bgcolors[index].style.background = '#06bb86'
						this.$refs.bgcolors[index].style.color = 'white'
					} else {
						this.$refs.bgcolors[index].style.background = '#ec3934'
						this.$refs.bgcolors[index].style.color = 'white'
					}
				}
			} else if (type === 2 || type === 4) {
				if (this.showAnswer !== true) {
					this.$refs.bgcolors[index].style.background = '#e6a23c'
					this.$refs.bgcolors[index].style.color = 'white'
				}
			}
			// 用来判断已完成进度
			// this.completeing = []
			this.ti.forEach(com => {
				if (com.answerCorrect) {
					this.completeing.push(com)
				}
			})
			this.completeing = Array.from(new Set(this.completeing))
			this.percentages = parseInt((this.completeing.length / this.ti.length) * 100)
			// console.log(this.completeing)
			const that = this
			// this.$nextTick(() => {
			setTimeout(() => {
				that.next()
			}, 1000)
			// })
			this.$forceUpdate()
		},
		mainDescButton(val) {
			if (val.mainDesc !== '') {
				this.completeing.push(val)
			}
			// console.log(Array.from(new Set(this.completeing)))
			this.completeing = Array.from(new Set(this.completeing))
			this.percentages = parseInt((this.completeing.length / this.ti.length) * 100)
		},
		// 收藏接口
		collectionStat(subcourseId, paperId, questionLibId) {
			console.log(this.PaperId)
			console.log(this.chapterId)
			const that = this
			that.gyhVistie = false
			if (that.PaperId) {
				$.ajax({
					type: "get",
					// url: "http://www.360xkw.com/tiku/userCollection/editUserCollection.do",
					url: "https://tk.360xkw.com/tiku/userCollection/editUserCollection.do",
					// dataType: "jsonp",
					// jsonp: "jsoncallback",
					data: {
						'subcourseId': subcourseId,
						'paperId': that.PaperId,
						'questionLibId': questionLibId
					},
					// async: false,
					// xhrFiled: {
					// 	withCredentials: true
					// },
					success: function (data) {
						if (data.S === "1001") {
							that.gyhVistie = true
						}
					},
					error: function () {
						that.gyhVistie = true
					}
				});
			} else {
				$.ajax({
					type: "get",
					// url: "http://www.360xkw.com/tiku/userCollection/editUserCollection.do",
					url: "https://tk.360xkw.com/tiku/userCollection/editUserCollection.do",
					// dataType: "jsonp",
					// jsonp: "jsoncallback",
					data: {
						'subcourseId': subcourseId,
						'chapterId': that.chapterId,
						'questionLibId': questionLibId
					},
					// async: false,
					success: function (data) {
						if (data.S == "1001") {
							that.gyhVistie = true
						}
					},
					error: function () {
						that.gyhVistie = true

					}
				});
			}
		},
		// 收藏试题数据
		getUserCollections(subcourseId, paperId, type) {
			const that = this
			that.gyhVistie = false
			if (that.level === 'undefined') {
				$.ajax({
					type: "get",
					url: "https://tk.360xkw.com/tiku/userCollection/getUserCollectionsJZ.do",
					dataType: "jsonp",
					jsonp: "jsoncallback",
					data: {
						'courseId': 11,
						'subcourseId': subcourseId,
						'paperId': paperId
					},
					// async: false,
					success: function (data) {
						// console.log(data)
						let questionIds = []
						if (data.S == "1001") {
							that.gyhVistie = true
						}
						data.V.forEach(e => {
							questionIds.push(e.questionLibId)
						})
						that.mrylList(questionIds.join(','), type)
					},
					error: function () {
						that.gyhVistie = true

					}
				});
			} else {
				$.ajax({
					type: "get",
					url: "https://tk.360xkw.com/tiku/userCollection/getUserCollectionsJZ.do",
					dataType: "jsonp",
					jsonp: "jsoncallback",
					data: {
						'courseId': 11,
						'subcourseId': subcourseId,
						'chapterId': paperId
					},
					// async: false,
					xhrFiled: {
						withCredentials: true
					},
					success: function (data) {
						// console.log(data)
						if (data.S == "1001") {
							that.gyhVistie = true

						}
						let questionIds = []
						data.V.forEach(e => {
							questionIds.push(e.questionLibId)
						})
						that.mrylList(questionIds.join(','), type)
					},
					error: function () {
						that.gyhVistie = true

					}
				});
			}
		},
		// 收藏
		collection(val, index) {
			if (val.src === '../../img/kszt/icon_Collect.png') {
				this.$set(val, 'src', '../../img/kszt/icon_Collect1.png')
				this.collectionStat(this.subcourseId, this.PaperId, val.id)
			} else {
				this.$set(val, 'src', '../../img/kszt/icon_Collect.png')
				this.collectionStat(this.subcourseId, this.PaperId, val.id)
			}
			this.$forceUpdate()
		},
		// 右侧点击
		choiceButton(index) {
			this.topicContent = index - 1
			console.log(this.ti)
			if (this.ti[this.topicContent].answerCorrect === undefined) {
				if (this.showAnswer !== true) {
					this.$refs.bgcolors[this.topicContent].style.background = '#b1b6bf'
					this.$refs.bgcolors[this.topicContent].style.color = 'white'
				} else {
					this.$refs.bgcolors.forEach(e => {
						e.style.background = 'white'
						e.style.color = 'black'
					})
					this.$refs.bgcolors[this.topicContent].style.background = '#06bb86'
					this.$refs.bgcolors[this.topicContent].style.color = 'white'
				}
			}
			this.selectedQuestionIdSetList.push(this.ti[this.topicContent].id)
			this.selectedQuestionIdSetList = Array.from(new Set(this.selectedQuestionIdSetList));
		},
		pro(val, index) {
			if (this.topicContent === 0) {
				this.topicContent = 0
			} else {
				this.topicContent -= 1
			}
			this.selectedQuestionIdSetList.push(this.ti[this.topicContent].id)
			this.selectedQuestionIdSetList = Array.from(new Set(this.selectedQuestionIdSetList));
		},
		next(val, index) {
			if (this.topicContent < this.ti.length - 1) {
				this.topicContent += 1
			}
			if (this.ti[this.topicContent].answerCorrect === undefined) {
				if (this.showAnswer !== true) {
					this.$refs.bgcolors[this.topicContent].style.background = '#b1b6bf'
					this.$refs.bgcolors[this.topicContent].style.color = 'white'
				} else {
					this.$refs.bgcolors.forEach(e => {
						e.style.background = 'white'
						e.style.color = 'black'
					})
					this.$refs.bgcolors[this.topicContent].style.background = '#06bb86'
					this.$refs.bgcolors[this.topicContent].style.color = 'white'
				}
			}
			// 获取用户题目看到哪里，也就是下一题翻页翻到过那个地方
			this.selectedQuestionIdSetList.push(this.ti[this.topicContent].id)
			this.selectedQuestionIdSetList = Array.from(new Set(this.selectedQuestionIdSetList));
		},
		jiaojuanButton() {
			this.buttonLoading = false
			if (this.stopChoose === true) {
				this.$notify({
					title: '',
					message: '已提交过一次，请勿重复交卷',
					type: 'warning'
				});
				return
			}
			this.centerDialogVisible = true
		},
		// 交卷
		handPapers() {
			this.gyhVistie = false
			this.buttonLoading = true
			window.clearInterval(this.timecount)
			const didAnswerSetList = []
			const answerCorrectSetList = []
			const dIdQuestionIdSetList = []
			const selectedQuestionIdSetList = []
			const examScoreList = []
			this.ti.forEach(e => {
				if (e.answerCorrect === 2) {
					examScoreList.push(e.score)
				}
				if (e.depositAnswer) {
					answerCorrectSetList.push(e.answerCorrect)
					didAnswerSetList.push(e.depositAnswer)
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
			if (didAnswerSet === '') {
				this.$notify({
					title: '',
					message: '您还没有做试卷，请继续做题!',
					type: 'error'
				});
				return
			}
			this.stopChoose = true
			const that = this
			// const loading = that.$loading({
			// 	lock: true,
			// 	text: 'Loading',
			// 	spinner: 'el-icon-loading',
			// 	background: 'rgba(0, 0, 0, 0.7)'
			// });
			if (that.judgeType === 1) {
				zhaqBox.style.display = 'none'
				$.ajax({
					type: "post",
					// url: "http://www.360xkw.com/tiku/app/submitAppDailyPractice.do",
					url: "https://tk.360xkw.com/tiku/app/submitAppDailyPractice.do",
					data: {
						'didAnswerSet': didAnswerSet, // 已做题目选择的那一项
						'answerCorrectSet': answerCorrectSet, // 已做题目对错集合（0 未做 1已做 2 对 3半对 4 错误）
						'selectedQuestionIdSet': selectedQuestionIdSet, //所有题目id
						'subcourseId': that.subcourseId, //课程ID
						'didQuestionIdSet': dIdQuestionIdSet, // 已做题目id
						'dailyPracticeSetId': 0, // 每日一练id // 当不是每日一练调取了这个接口时，默认0
						'doTypeId': that.doTypeId, //固定
						'markQuestionIdSet': '',
						'examScore': examScore || 0,
						'usedTime': that.intDiff,
						'isComplete': true, // 固定
						'isAutoNext': 1 // 固定
					},
					dataType: 'jsonp',
					jsonp: "jsoncallback",
					// async: true,
					success: function (data) {
						if (data.V) {
							that.reportId = data.V.reportId

							that.getViewAnswerByReportId(that.reportId)
							// loading.close()
							that.buttonLoading = false
							that.centerDialogVisible = false
							that.$refs.submitBox.style.display = 'block'
							// that.buttonLoading = false
						} else if (data.S === '1001' || data.S === '2000') {
							that.buttonLoading = false
							that.centerDialogVisible = false
						}
						if (data.S == "1001") {
							that.gyhVistie = true
						}
					},
					error: function () {
						that.gyhVistie = true
						that.buttonLoading = false
						that.centerDialogVisible = false
						alert("系统错误!");
					}
				})
			} else if (that.judgeType === 2) {
				$.ajax({

					type: "post",
					// url: "http://www.360xkw.com/tiku/currentState/saveUserCurrentState.do",
					url: "https://tk.360xkw.com/tiku/currentState/saveUserCurrentStateJz.do",
					data: {
						'didAnswerSet': didAnswerSet, // 已做题目选择的那一项
						'answerCorrectSet': answerCorrectSet, // 已做题目对错集合（0 未做 1已做 2 对 3半对 4 错误）
						'selectedQuestionIdSet': selectedQuestionIdSet, //所有题目id
						'subcourseId': that.subcourseId, //课程ID
						'didQuestionIdSet': dIdQuestionIdSet, // 已做题目id
						'chapterId': that.chapterId,
						'doTypeId': that.doTypeId,
						'markQuestionIdSet': '',
						'examScore': examScore || 0,
						'usedTime': that.intDiff,
						'isComplete': true, // 固定
						'isAutoNext': 1 // 固定
					},
					dataType: 'jsonp',
					jsonp: "jsoncallback",
					// async: true,
					success: function (data) {
						if (data.V) {
							that.reportId = data.V.reportId
							that.getViewAnswerByReportId(that.reportId)
							that.buttonLoading = false
							that.centerDialogVisible = false
							// loading.close()
							that.$refs.submitBox.style.display = 'block'
							// that.buttonLoading = false
						} else if (data.S === '2000') {
							that.buttonLoading = false
							that.centerDialogVisible = false
						} else if (data.S === '1001') {
							that.gyhVistie = true
						}
					},
					error: function () {
						that.gyhVistie = true
						that.buttonLoading = false
						that.centerDialogVisible = false
					}
				})
			} else {
				$.ajax({
					type: "post",
					// url: "http://www.360xkw.com/tiku/currentState/saveUserCurrentState.do",
					url: "https://tk.360xkw.com/tiku/currentState/saveUserCurrentStateJz.do",
					data: {
						'didAnswerSet': didAnswerSet, // 已做题目选择的那一项
						'answerCorrectSet': answerCorrectSet, // 已做题目对错集合（0 未做 1已做 2 对 3半对 4 错误）
						'selectedQuestionIdSet': selectedQuestionIdSet, //所有题目id
						'subcourseId': that.subcourseId, //课程ID
						'didQuestionIdSet': dIdQuestionIdSet, // 已做题目id
						'paperId': that.PaperId,
						'doTypeId': that.doTypeId,
						'markQuestionIdSet': '',
						'examScore': examScore || 0,
						'usedTime': that.xuniTime - that.intDiff,
						'isComplete': true, // 固定
						'isAutoNext': 1 // 固定
					},
					dataType: 'jsonp',
					jsonp: "jsoncallback",
					// async: true,
					success: function (data) {
						if (data.V) {
							that.reportId = data.V.reportId
							that.getViewAnswerByReportId(that.reportId)
							// that.buttonLoading = false
							// loading.close()
							that.buttonLoading = false
							that.centerDialogVisible = false
							that.$refs.submitBox.style.display = 'block'
							// that.buttonLoading = false
						} else if (data.S === '2000') {
							that.buttonLoading = false
							that.centerDialogVisible = false
						} else if (data.S === '1001') {
							that.gyhVistie = true
						}
					},
					error: function () {
						that.buttonLoading = false
						that.centerDialogVisible = false
						that.gyhVistie = true
						// alert("系统错误!");
					}
				})
			}
		},
		// 交卷完成后返回的数据
		getViewAnswerByReportId(reportId) {
			const that = this
			that.alldoneList = []
			that.doneList = []
			// that.recoCourses = {}
			that.gyhVistie = false
			$.ajax({
				type: "get",
				// url: "http://www.360xkw.com/tiku/didRecord/getViewAnswerByReportId.do",
				url: "https://tk.360xkw.com/tiku/didRecord/getViewAnswerByReportId.do",
				data: {
					'reportId': reportId
				},
				dataType: 'jsonp',
				jsonp: "jsoncallback",
				success: function (data) {
					// console.log(data)
					if (data.V) {
						that.allanswer = data.V
						that.alldoneList = data.V.answerCorrectSet.split('|')
						// console.log(that.alldoneList)
						that.alldoneList.forEach(e => { //判断正确率
							if (e === '2') {
								that.doneList.push(e)
							}
						})
						// console.log(that.doneList)
						// const accuracyL = (that.doneList.length / that.alldoneList.length) * 100
						that.accuracyL = data.V.examScore
						if (that.names.indexOf('幼儿') !== -1) {
							that.recoCourses = that.allcurriculmList[0].items[0]
						} else if (that.names.indexOf('小学') !== -1) {
							that.recoCourses = that.allcurriculmList[0].items[1]
						} else if (that.names.indexOf('中学') !== -1) {
							that.recoCourses = that.allcurriculmList[0].items[2]
						} else if (that.names.indexOf('面试') !== -1) {
							that.recoCourses = that.allcurriculmList[0].items[3]
						} else if (that.names.indexOf('语文') !== -1) {
							that.allcurriculmList[0].items.forEach(e => {
								if (e.kcname.indexOf('语文')) {
									that.recoCourses = e
								}
							})
						} else if (that.names.indexOf('数学') !== -1) {
							that.allcurriculmList[0].items.forEach(e => {
								if (e.kcname.indexOf('数学')) {
									that.recoCourses = e
								}
							})
						} else if (that.names.indexOf('英语') !== -1) {
							that.allcurriculmList[0].items.forEach(e => {
								if (e.kcname.indexOf('英语')) {
									that.recoCourses = e
								}
							})
						} else {
							that.recoCourses = that.allcurriculmList[0].items[0]
						}
						if (that.accuracyL < 50) {
							that.piandi = true
							// console.log(that.recoCourses)
						}
						// that.names
						// that.recoCourses = {}
						//that.allcurriculmList
					}
					if (data.S == "1001") {
						that.gyhVistie = true
					}
				},
				error: function () {
					that.gyhVistie = true

					// alert("系统错误!");
				}
			})
		},
		// 了解课程
		understandButton(val) {
			window.location.href = `https://tk.360xkw.com/grzx/page/wdkc/kcxq.html?config=${val.config}&bxid=${val.banxingType}&id=${val.id}&courseId=${val.courseId}`
		},
		// 课程
		getItemListByBanXingTypeNoLogin() {
			const that = this
			that.gyhVistie = false
			that.videoList = []
			$.ajax({
				type: "post",
				url: "http://www.360xkw.com/tiku/app/getItemListByBanXingTypeNoLogin.do",
				data: {
					"courseId": 11
				},
				dataType: 'jsonp',
				jsonp: "jsoncallback",
				// async: false,
				success: function (data) {
					if (data.V) {
						// http://www.360xkw.com/static/itemsThumb/2019/01/11/1548467493648.jpg
						that.allcurriculmList = data.V
						that.allcurriculmList.forEach(item => {
							item.items.forEach(e => {
								e.bigSrc = 'http://www.360xkw.com/' + e.picUrl
							})
						})
						// console.log(Nfour)
					} else {
						that.allcurriculmList = []
					}
					if (data.S == "1001") {
						that.gyhVistie = true

					}
				},
				error: function () {
					// alert("系统错误!");
					that.gyhVistie = true

				},
			});
		},
		// 计时定时器
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
			const that = this
			this.timecount = setInterval(() => {
				if (that.jlName === '模拟考试' || that.jlName === '做题记录' || that.jlName === '智能评估模拟') {
					this.intDiff--
					if (this.intDiff >= 0) {
						this.timecounts()
					} else {
						window.clearInterval(this.timecount)
						this.handPapers()
					}
				} else {
					that.intDiff++
					that.timecounts()
				}
			}, 1000)
		},
		// 去除标签方法
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
		forkButton() {
			this.$refs.submitBox.style.display = 'none'
		},
		// 查看解析
		viewResolution() {
			this.showAnswer = true
			this.stopChoose = true
			this.anwShow = true
			this.$refs.submitBox.style.display = 'none'
			this.topicContent = 0
			this.$refs.bgcolors.forEach(e => {
				e.style.background = 'white'
			})
			let value = [];
			window.location.search.substring(1).split('&').forEach(n => {
				value[decodeURI(n.split('=')[0])] = decodeURI(n.split('=')[1]);
				value.length++;
			})
			var questionIds = ''
			if (value.questionIds) {
				questionIds = value.questionIds
				this.mrylList(questionIds, '2')
			} else if (value.didRecordId) {
				this.judgeType = 2
				this.doTypeId = value.doTypeId
				this.ztjlList(value.didRecordId, '2', 'AI')
			} else {
				this.judgeType = 1
				this.doTypeId = 1
				this.names = value.names
				this.paper.paperName = value.paperName
				this.subcourseId = value.subcourseId
				this.questionLibIdList(value.subcourseId, value.paperId, '2')
			}
			this.showAnswer = true
			this.$refs.bgcolors.forEach(e => {
				e.style.background = 'white'
				e.style.color = 'black'
			})
			console.log(this.showAnswer)
		},
		// 查看本次错题
		wrongQuestions() {
			this.stopChoose = true
			this.showAnswer = true
			this.anwShow = true
			this.cuoti = true
			this.topicContent = 0
			console.log(this.$refs.bgcolors)
			this.$refs.bgcolors.forEach(e => {
				e.style.background = 'white'
			})
			this.didAnswerSet = this.allanswer.didAnswerSet.split('|')
			this.mrylList(this.allanswer.didQuestionIdSet, '2')
			this.$refs.submitBox.style.display = 'none'
			this.$refs.bgcolors.forEach(e => {
				e.style.background = 'white'
				e.style.color = 'black'
			})
		},
		// 返回
		gotozuoti() {
			window.location.href = "https://tk.360xkw.com/grzx/index.html?goum=2"
		},
		goReturn() {
			this.gyhVistie = false
			window.location.href = "https://tk.360xkw.com/grzx/login.html"
		},
		// 接受上一个页面的参数
		getUrlParamZT() {
			let value = [];
			window.location.search.substring(1).split('&').forEach(n => {
				value[decodeURI(n.split('=')[0])] = decodeURI(n.split('=')[1]);
				value.length++;
			})
			this.jlName = value.name
			if (value.name === '做题记录') {
				this.judgeType = 3 //页面交卷一共是两种交卷的接口，其中一个接口两种不同参数，以此来判断3个状态
				this.doTypeId = value.doTypeId
				this.ztjlList(value.didRecordId, value.type)
			} else if (value.name === '智能评估') {
				this.judgeType = 2
				this.doTypeId = value.doTypeId
				this.ztjlList(value.didRecordId, value.type, 'AI')
			} else if (value.name === '章节练习') {
				this.judgeType = 2
				this.doTypeId = 1
				this.names = value.names
				this.chapterId = value.chapterId
				this.subcourseId = value.subcourseId
				this.paper.paperName = value.paperName
				this.mrylList(value.questionIds, value.type)
			} else if (value.name === '错题') {
				this.judgeType = 1
				this.doTypeId = 1
				this.names = value.names
				this.paper.paperName = value.paperName
				this.subcourseId = value.subcourseId
				this.level = value.level
				this.questionLibIdList(value.subcourseId, value.paperId, value.type)
			} else if (value.name === "模拟考试") {
				this.judgeType = 3
				this.doTypeId = 3
				this.intDiff = value.answerTime * 60 || 7200
				this.xuniTime = value.answerTime * 60 || 7200
				this.names = value.reportName
				this.paper.paperName = value.paperName
				this.subcourseId = value.subcourseId
				this.PaperId = value.PaperId
				this.mrylList(value.questionIds, value.type)
			} else if (value.name === "试题收藏") {
				this.names = value.names
				this.paper.paperName = value.paperName
				this.level = value.level
				this.getUserCollections(value.subcourseId, value.paperId, value.type)
			} else if (value.name === "每日一练") {
				this.stopChoose = true
				this.anwShow = true
				this.cuoti = true
				this.didAnswerSet = value.aniw.split('|')
				this.names = value.names
				this.paper.paperName = value.name
				this.mrylList(value.questionIds, value.type)
			}
			if (value.type === '1') {
				this.showAnswer = false
			} else {
				this.showAnswer = true
			}
			// this.$forceUpdate()
		}
	}
})

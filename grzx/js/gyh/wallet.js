
var _iframe = window.parent;
var zhaqBox = _iframe.document.getElementsByClassName('tipsdialogbox1')[0];

$(function () {
    $(".coupon_info").hide()

})
// 红包优惠券切换
$(".wallet_nav div").each(function (item, index) {
    $(this).click(function () {
        $(this).addClass("gyh_bottom_red")
        $(this).siblings().removeClass("gyh_bottom_red")
        // 红包
        if (item == 0) {
            $(".wallet_info").fadeTo("fast", "1", function () {
                $(this).show()
            })
            $(".wallet_total").fadeTo("fast", "1", function () {
                $(this).show()
            })

            $(".coupon_info").hide()
            $(".coupon_nav").hide()
        } else {
            // 优惠券
            $(".wallet_info").hide()
            $(".wallet_total").hide()
            $(".coupon_nav").fadeTo("fast", "1", function () {
                $(this).show()

            })
            $(".coupon_info").fadeTo("fast", "1", function () {
                $(this).show()
            })
            $(".wallet_conn").css("margin-top", "0rem")
        }
    })
})



var vm = new Vue({
    el: "#app",
    data: {
        list: [],
        redPaper: [],
        total: 0,
        listLoading: false,
        listQuery: {
            currentPage: 1,
            pageSize: 20
            // skuList: ''
        },
        hongbao: "",
        flag_1: true,
        flag_2: false,
        fail_list: [],
        succ_failureTime: "",
        fail_failureTime: "",
        succ_num: "",
        fail_num: "",
        fail_time: true,
        tips: "",
        target_time: "",
        succ_show: false,
        succ_show2: false,
        fail_show: false,
        fail_show2: false,
        time: false,
    },
    methods: {
        coupon_succ() {
            this.flag_1 = true
            this.flag_2 = false
            var that = this
            zhaqBox.style.display = 'none'
            $.ajax({

                type: "get",
                url: "https://tk.360xkw.com/tiku/jzCoupon/getValidJzCouponByStuId.do",
                data: {
                    "dlId": "0"
                },
                dataType: "jsonp",
                jsonp: "jsoncallback",
                success: function (data) {
                    that.list = data.V
                    if (that.list.length > 0) {
                        that.succ_show = true
                        that.succ_show2 = false
                        that.succ_num = that.list.length
                        that.list.forEach((e, i) => {
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
                    } else {
                        that.succ_show = false
                        that.succ_show2 = true
                        that.succ_num = that.list.length
                    }
                    if (data.S == "1001") {
                        zhaqBox.style.display = 'block'

                    }
                },
                error: function () {
                    console.log("系统崩溃，数据出错");
                    zhaqBox.style.display = 'block'
                }
            });
        },
        coupon_fail() {
            zhaqBox.style.display = 'none'

            this.flag_1 = false
            this.flag_2 = true
            that = this
            $.ajax({
                type: "get",
                // url: "http://test1.360xkw.com:8081/tiku/jzCoupon/getLoseJzCouponByStuId.do",

                url: "https://tk.360xkw.com/tiku/jzCoupon/getValidJzCouponByStuId.do",
                data: {
                    "dlId": "0"
                },
                dataType: "jsonp",
                jsonp: "jsoncallback",
                success: function (data) {
                    that.fail_list = data.V

                    if (that.fail_list.length > 0) {
                        that.fail_num = that.fail_list.length
                        that.fail_show = true
                        that.fail_show2 = false
                    } else {
                        that.fail_num = that.fail_list.length
                        that.fail_show = false
                        that.fail_show2 = true
                    }
                    if (data.S == "1001") {
                        zhaqBox.style.display = 'block'

                    }

                },
                error: function () {
                    zhaqBox.style.display = 'block'
                }
            });

        },
        getRedEnvelopePage() {
            zhaqBox.style.display = 'none'
            const that = this
            $.ajax({
                type: "get",
                url: "https://tk.360xkw.com/tiku/jzCoupon/getRedEnvelopePage.do",
                data: {
                    'page': that.listQuery.currentPage,
                    'rows': that.listQuery.pageSize
                },
                dataType: "jsonp",
                jsonp: "jsoncallback",
                success: function (data) {
                    if (data.S === '1') {
                        that.redPaper = data.V.rows
                        that.total = data.V.total
                        that.listQuery.currentPage = data.V.pageIndex
                    } else {
                        data
                    }
                    // console.log(data)
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
        // 获取代理优惠卷
        getCouponByDlId() {
            zhaqBox.style.display = 'none'
            var that = this
            $.ajax({
                type: "POST",
                url: "https://tk.360xkw.com/tiku/jzCoupon/getCouponByDlId.do",
                data: {
                    'dlId': 0,
                    'withSn': '195'
                },
                dataType: "jsonp",
                jsonp: "jsoncallback",
                success: function (data) {
                    if (data.V) {
                        // console.log(data.V)
                    }
                    if (data.S == "1001") {
                        zhaqBox.style.display = 'block'

                    }
                },
                error: function () {
                    zhaqBox.style.display = 'block'
                }
            })
        },
        // 获取代理的红包
        honbaoList() {
            zhaqBox.style.display = 'none'
            var that = this
            $.ajax({
                type: "POST",
                url: "https://tk.360xkw.com/tiku/jzCoupon/getRedEnvelopeByDlId.do",
                data: {
                    'dlId': 0,
                    'redEnvelopeType': 2
                },
                dataType: "jsonp",
                jsonp: "jsoncallback",
                success: function (data) {
                    if (data.V) {
                        // console.log(data.V)
                    }
                    if (data.S == "1001") {
                        zhaqBox.style.display = 'block'

                    }
                },
                error: function () {
                    zhaqBox.style.display = 'block'
                }
            })
        },
        // 领取红包
        getEnvelopes() {
            zhaqBox.style.display = 'none'

            var that = this
            $.ajax({
                type: "POST",
                url: "https://tk.360xkw.com/tiku/jzCoupon/addRedEnvelope.do",
                data: {
                    'couponId': '',
                    'dlId': 0
                },
                dataType: "jsonp",
                jsonp: "jsoncallback",
                success: function (data) {
                    if (data.V) {
                        // console.log(data.V)
                    }
                    if (data.S == "1001") {
                        zhaqBox.style.display = 'block'

                    }
                },
                error: function () {
                    zhaqBox.style.display = 'block'

                }
            })

        },
        // 领取优惠卷
        getCoupon() {
            var that = this
            zhaqBox.style.display = 'none'

            $.ajax({
                type: "get",
                url: "https://tk.360xkw.com/tiku/jzCoupon/addStuCoupon.do",
                data: {
                    'couponId': '',
                    'dlId': 0
                },
                dataType: "jsonp",
                jsonp: "jsoncallback",
                success: function (data) {
                    // console.log(data.V)
                    if (data.V) {
                        that.hongbao = data.V
                    } else {
                        that.hongbao = 0
                    }
                    if (data.S == "1001") {
                        zhaqBox.style.display = 'block'

                    }
                },
                error: function () {
                    zhaqBox.style.display = 'block'

                }
            })
        },
        // 分页
        handleSizeChange(val) {
            this.listQuery.pageSize = val
            this.getRedEnvelopePage()
        },
        handleCurrentChange(val) {
            this.listQuery.currentPage = val
            this.getRedEnvelopePage()
        },
        getHongBao() {
            zhaqBox.style.display = 'none'
            var that = this
            $.ajax({
                type: "get",
                url: "https://tk.360xkw.com/tiku/jzCoupon/getSutUserRedEnvelopeSum.do",
                data: {
                },
                dataType: "jsonp",
                jsonp: "jsoncallback",
                success: function (data) {
                    // console.log(data.V)
                    if (data.V) {
                        that.hongbao = data.V
                    } else {
                        that.hongbao = 0
                    }
                    if (data.S == "1001") {
                        zhaqBox.style.display = 'block'

                    }
                },
                error: function () {
                    zhaqBox.style.display = 'block'
                }
            });
        }


    },
    filters: {
        // 有效时间格式化
        youhuaTime: function (value) {
            if (!value) {
                return value = ""
            } else {
                var time = value
                time = time.split(" ")[0]
                return time
            }

        },
        // 过期时间提醒格式化
        getFailureTime: function (value) {
            // var time = value
            // if (!time) {
            //     return value = ''
            // } else {
            //     var myDate = new Date();
            //     var year = myDate.getFullYear();        //获取当前年
            //     var month = myDate.getMonth() + 1;   //获取当前月
            //     var date = myDate.getDate() - 1;
            //     var day;
            //     var time1 = time.split(" ")[0]
            //     time1 = time1.split("-")
            //     // const daytime = countdowntime + ""
            //     var gyh_yarn = time1[0]
            //     var gyh_mon = time1[1]
            //     var gyh_day = time1[2]
            //     var newdatr = new Date(gyh_yarn, gyh_mon, gyh_day, "00", "00", "00", "00");//初始化目标时间(这里的05实际上是六月)
            //     // var nowhms =new Date();//当前时间转换毫秒
            //     var nowhms = new Date(year, month, date, "00", "00", "00", "00"); //目标时间转换毫秒
            //     var cha = newdatr - nowhms;      //时间差（毫秒数）
            //     day = parseInt(cha / (1000 * 60 * 60 * 24));//计算天数
            //     // $(".countdown .data").html(day)
            //     if (day == 1) {
            //         console.log("即将到期")
            //         this.fail_time = true
            //         return value = '即将到期'

            //     } else if (day < 0) {
            //         this.fail_time = false
            //         console.log("已经过期")
            //         return value = ''
            //     }
            //     else {
            //         this.fail_time = false
            //         console.log("还有很久")
            //         return value = ''
            //     }
            // }

        }
    },
    created() {
        this.coupon_fail()
        this.coupon_succ()
        this.getHongBao()
        this.getRedEnvelopePage()



        // this.honbaoList()
        // this.getCouponByDlId()
    },

})













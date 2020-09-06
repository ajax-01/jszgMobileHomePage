
var userInfo = JSON.parse(sessionStorage.getItem("userInfo"))
$(".nickName").html(userInfo.nickName)

var _iframe = window.parent;
const vm = new Vue({
  el: "#app",
  data: {
    zf: [
      {
        name: "支付宝 ",
        value: 1,
        id: 1,
        checked: false
      },
      {
        name: "微信",
        value: 2,
        id: 2,
        checked: false

      },

    ],
    // 订单数量
    ordernum: "",
    objlist: [],
    // 订单码
    ordercode: '',
    // 订单码下的购书车详情
    ordercarcode: "",
    // 总价格
    totalMoney: "",
    length: "",
    // 获取是否是支付宝1还是微信2
    value: "",
    // 购物车数据  传给微信支付
    courseId: "",
    kcname: "",
    itemsId: "",
    // 等于ordercode
    orderID: "",
    domain: "",
    // 当前时间
    nowtime: "",
    gyhVistie: false, // 重新登录弹框

  },
  methods: {
    gotogouwu() {
      window.location.href = "https://tk.360xkw.com/grzx/index.html?goum=3"

    },
    goReturn() {
      this.gyhVistie = false
      window.location.href = "https://tk.360xkw.com/grzx/login.html"
    },
    currentTime() {

      var date = new Date();
      function getTimer() {
        var y = date.getFullYear();
        var m = date.getMonth() + 1;
        var d = date.getDate();
        var w = date.getDay();
        var w1 = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六']
        var h = date.getHours();
        h = h < 10 ? '0' + h : h;
        var min = date.getMinutes();
        min = min < 10 ? '0' + min : min;
        var s = date.getSeconds();
        s = s < 10 ? '0' + s : s;

        return y + '-' + m + '-' + d + ' ' + h + ':' + min + ':' + s + '  '
      }
      this.nowtime = getTimer()
      sessionStorage.setItem('wxCodeTime', JSON.stringify(this.nowtime))

      // console.log(this.nowtime)
    },
    // 选择支付方式
    check_zf(value) {
      if (value == "" || value == undefined || value == null) {
        // alert(value)
        $(".lmw_go").css("background-image", "linear-gradient(0deg, #d4d4d4 0%, #d8d8d8 100%)")
        // $(".lmw_go").mouseover(()=>{
        //   $(this).css("background-image", "linear - gradient(0deg, rgb(218 218 218) 0 %, rgb(243 242 242) 100 %)")
        // })
        this.value = value
      } else {
        $(".lmw_go").css("background-image", " linear-gradient(0deg, #ff403a 0%, #ff6949 100%)")

        this.value = value
      }

    },
    // 去付款按钮
    gotozf() {

      this.courseId = ""
      this.kcname = ""
      this.itemsId = ""
      // 支付宝支付
      if (this.value == 1) {
        sessionStorage.setItem('value', JSON.stringify("1"))
        // sessionStorage.setItem('wxCodeUrl', JSON.stringify(data.code_url))
        // sessionStorage.setItem('wxCodePrice', JSON.stringify(that.totalMoney))
        var that = this
        that.objlist.forEach(function (item, index) {
          that.courseId += item.courseId + ","
          that.kcname += item.kcname + ","
          that.itemsId += item.itemsId + ","
        })
        var that = this

        that.gyhVistie = false
        // window.location.href = "https://tk.360xkw.com/grzx/page/ali_code.html"
        $.ajax({
          type: "get",
          url: 'https://tk.360xkw.com/jz/pay/toPayOfAlipayDaili.do',
          data: {
            "cartId": that.ordercarcode.substring(1, that.ordercarcode.length - 1),
            // "courseId": that.courseId,
            // "kcname": that.kcname,
            "itemIdStr": that.itemsId,
            "orderID": that.ordercode,
            "domain": '3365282bk7.wicp.vip',
            "price": this.totalMoney,
            "xkwMoney": "0",
            // 跳转地址
            // 'return_url': "http://www.360xkw.com"
            'return_url': "http://www.baidu.com?success=1"
          },
          // dataType: "jsonp",
          // jsonp: "jsoncallback",

          // 

          success: function (data) {
            if (data.S == "1001") {
              that.gyhVistie = true

            }
            var data = JSON.parse(data)
            var formHtml = data.V.HTML.split("<script>")[0]
            // console.log(formHtml)
            // formHtml = formHtml.replace(/&quot;/g, "'");
            sessionStorage.setItem('formHtml', formHtml)
            // console.log(formHtml)

            sessionStorage.setItem('wxCodeUrl', JSON.stringify(data.code_url))
            sessionStorage.setItem('wxCodePrice', JSON.stringify(that.totalMoney))
            sessionStorage.setItem('value', JSON.stringify("2"))

            window.location.href = `https://tk.360xkw.com/grzx/page/ali_code.html`
          },
          error: function () {
            // console.log("错误");
            that.gyhVistie = true

          }
        })
      } else if (this.value == 2) {
        // 微信支付
        var that = this
        that.objlist.forEach(function (item, index) {
          that.courseId += item.courseId + ","
          that.kcname += item.kcname + ","
          that.itemsId += item.itemsId + ","
          // domain.push(item.courseId)
        })
        var that = this
        that.gyhVistie = false

        $.ajax({
          type: "get",
          url: 'https://tk.360xkw.com/jz/pay/toPayOfWeiXinDaili.do',
          data: {
            "cartId": that.ordercarcode.substring(1, that.ordercarcode.length - 2),
            "courseId": that.courseId.substring(0, that.courseId.length - 1),
            "kcname": that.kcname.substring(0, that.kcname.length - 1),
            "itemsId": that.itemsId.substring(0, that.itemsId.length - 1),
            "orderID": that.ordercode,
            "domain": '3365282bk7.wicp.vip',

          },
          // dataType: "jsonp",
          // jsonp: "jsoncallback",
          success: function (data) {
            if (data.S == "1001") {
              that.gyhVistie = true

            }
            sessionStorage.setItem('wxCodeUrl', JSON.stringify(data.code_url))
            sessionStorage.setItem('wxCodePrice', JSON.stringify(that.totalMoney))
            sessionStorage.setItem('value', JSON.stringify("2"))

            window.location.href = "https://tk.360xkw.com/grzx/page/wx_code.html"

          },
          error: function () {
            that.gyhVistie = true

            // console.log("错误");
          }
        })

      }
    }
  },
  mounted() {
    this.currentTime()
    this.value = JSON.parse(sessionStorage.getItem("value"))
    this.zf[1].checked = true
    this.zf[0].checked = false
    console.log(this.value)
    this.check_zf(this.value * 1)
    let value = []
    // console.log(window.location.search.substring(1))
    window.location.search.substring(1).split('&').forEach(n => {
      value[decodeURI(n.split('=')[0])] = decodeURI(n.split('=')[1]);
      value.length++;
    })
    this.ordercode = JSON.parse(sessionStorage.getItem("ordercode"))
    this.totalMoney = JSON.parse(sessionStorage.getItem("ordercode"))
    this.ordercode = this.ordercode.orderID
    this.totalMoney = this.totalMoney.allMoney
    // console.log(this.ordercode, this.totalMoney)
    var that = this
    that.gyhVistie = false
    $.ajax({
      type: "get",
      url: 'https://tk.360xkw.com/tiku/app/getCartIdsByOrderIdJZ.do',
      data: {
        "orderId": this.ordercode
      },
      dataType: "jsonp",
      jsonp: "jsoncallback",
      success: function (data) {
        that.ordercarcode = data.V
        sessionStorage.setItem('carID', that.ordercarcode.substring(1, that.ordercarcode.length - 2))

        var thats = that
        $.ajax({
          type: "get",
          url: 'https://tk.360xkw.com/tiku/app/getOrderDetialByOrderID.do',
          data: {
            "orderID": thats.ordercode
          },
          dataType: "jsonp",
          jsonp: "jsoncallback",
          success: function (data) {
            if (data.S == 0) {
              alert("订单号错误，找不到正确的数据")
            } else {
              that.length = data.V.orderdetials.length

              if (data.V.orderdetials.length > 0) {
                that.objlist = data.V.orderdetials
              } else {
                alert("订单为空")

              }
            }
            if (data.S == "1001") {
              that.gyhVistie = true

            }
          },
          error: function (erro) {
            that.gyhVistie = true

          }
        })
      },
      error: function (erro) {
        that.gyhVistie = true

      }
    })



  }
})




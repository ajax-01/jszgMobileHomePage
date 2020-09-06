
var _iframe = window.parent;
var zhaqBox = _iframe.document.getElementsByClassName('tipsdialogbox1')[0];
$("#text").val(JSON.parse(sessionStorage.getItem("wxCodeUrl")))
$(".wx_title_num").html(JSON.parse(sessionStorage.getItem("wxCodePrice")))

var ordercode = JSON.parse(sessionStorage.getItem("ordercode"))
ordercode = ordercode.orderID
// console.log(ordercode)

var num = 60
var time
time = setInterval(() => {
    num--
    $(".wx_pay_tips_num").html(num)
    $.ajax({
        type: "get",
        url: 'https://tk.360xkw.com/tiku/app/getOrderOfPayEnd.do',
        data: {
            "orderID": ordercode,
        },
        // dataType: "jsonp",
        // jsonp: "jsoncallback",
        success: function (data) {
            var data = JSON.parse(data)
            if (data.S == 1) {
                window.location.href = "https://tk.360xkw.com/grzx/page/grgl/gwc_zfwc.html?success=1"
            }
            if (num == 0) {
                window.location.href = "https://tk.360xkw.com/grzx/index.html?goum=3"
            }
        },
        error: function () {
            console.log("错误");
        }
    })

}, 1000);

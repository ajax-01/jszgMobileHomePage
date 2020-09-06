function gotogouwu() {
    window.location.href = "https://tk.360xkw.com/grzx/index.html?goum=3"

}

var ordercode = JSON.parse(sessionStorage.getItem("ordercode"))
ordercode = ordercode.orderID
var wxCodePrice = JSON.parse(sessionStorage.getItem("wxCodePrice"))
$(".orderid").html(ordercode)
$(".price").html(wxCodePrice)
var nowTime = JSON.parse(sessionStorage.getItem("wxCodeTime"))
$("#current-time").html(nowTime)

// console.log(ordercode, wxCodePrice)
var url = window.location.href.split("?")[1].split("=")[1]
// 支付失败

if (url == "-1") {
    $(".lmw_img img").attr("src", "../../img/grgl_img/icon_loser.png")
    $(".lmw_back a").css("background", "rgb(208 208 208)")
    $(".lmw_wc").css("color", "rgb(36 149 154)")
    $(".lmw_wc").html("支付失败")
    $(".lmw_back a").hover(function () {
        $(this).css("background", "rgb(162 159 159)")
    }, function () {
        $(this).css("background", "rgb(208 208 208)")

    })
}
// 成功
else if (url == "1") {
    $(".lmw_img img").attr("src", "../../img/grgl_img/icon_over.png")
    $(".lmw_back a").css("background-image", "linear-gradient(0deg, #ff403a 0%, #ff6949 100%)")
    $(".lmw_back a").hover(function () {
        $(this).css("background-image", "linear-gradient(0deg, rgb(234 21 14) 0%, rgb(214 72 41) 100%)")
    }, function () {
        $(this).css("background-image", "linear-gradient(0deg, #ff403a 0%, #ff6949 100%)")

    })
}

var idsList = (sessionStorage.getItem("carID").split(","))
function gotoorder() {
    zhaqBox.style.display = 'none'
    $.ajax({
        url: "https://tk.360xkw.com/tiku/app/delShoppingCartJZ.do",
        type: "post",
        data: {
            'ids': this.idsList
        },
        dataType: "jsonp",
        jsonp: "jsoncallback",
        success: function (data) {
            if (data.S == "1") {
                // console.log("删除成功");
                window.location.href = "https://tk.360xkw.com/grzx/index.html?goum=4"
            } else {
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




}
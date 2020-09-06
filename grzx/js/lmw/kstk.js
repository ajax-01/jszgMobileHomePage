var _iframe = window.parent;
var zhaqBox = _iframe.document.getElementsByClassName('tipsdialogbox1')[0];

$(".lmw_show").hide();
$(".lmw_show").eq(0).show();

function mycourse(type, url, data, dataType, jsonp, callback, error) {

  $(zhaqBox).hide()

  let account = getSessionStorage('account');
  // console.log(account)
  type = "post";
  url = "https://tk.360xkw.com/tiku/app/getMyItemList.do";
  data = {
    "account": account
  };
  dataType = 'jsonp';
  jsonp = "jsoncallback";
  var gyh_num = []
  var gyh_i = 0
  var gyh_shuzu
  callback = function (data) {
    if (data.S == "1001") {
      $(zhaqBox).show()

    }
    if (data.V != null) {
      let lmw_ajaximg = $(".lmw_ajaximg")
      lmw_ajaximg.html("");
      let obj = data.V;
      let str = '';
      let str2 = "";
      $(".ajax_show");
      // console.log(obj)
      // 获取视频接口
      obj.forEach(function (item) {
        item["config"].split("|").forEach(function (it) {
          // val = 
          gyh_num.push(it.split(",")[0])
          // console.log(gyh_num)
        })
      })



      gyh_num.forEach(function (g) {
        gyh_i = g
        // console.log( gyh_i )
      })
      for (let i = 0; i < data.V.length; i++) {

        gyh_shuzu = obj[i].config.split("|")
        // console.log(gyh_shuzu)
        for (let j = 0; j < obj[i].courses.length; j++) {
          //  (gyh_shuzu[j].split(",")[0]) 获取每个点击开始学习视频的ID
          str2 +=
            `<li>
              <span class="fs16 fl coursesname">`+ obj[i].courses[j].name + `</span>
                <i style='cursor: pointer;' class="fl lmw_starstudy" onclick="gotovideo(${gyh_shuzu[j].split(",")[0]})">开始学习</i>
             </li>`
        }
        str +=
          `<div><div class="lmw_nr1">
          <div class="clearfix lmw_bigdiv">
             <div class="lmw_ajaximg fl lmw_imgandtext">
              <img src="http://www.360xkw.com/`+ obj[i].bigPicUrl + `" class="lmw_img1">
                <div class="lmw_topright ajax_kcmc">
                <p class="lmw_ftcolor lmw_fs18">`+ obj[i].kcname + `</p>
                </div>
              </div>
                <div class="fl">
                  <ul class="lmw_topul">
                    <li class="lmw_zbkt">
                      <a href="#" class="lmw_a">
                        <img src="../../img/icon_broadcast.png">
                        <div class="lmw_mt10">直播课程</div>
                      </a>
                    </li>
                    <li class="lmw_wxq">
                      <a href="#" class="lmw_a">
                        <img src="../../img/icon_group.png">
                         <div class="lmw_mt10">微信群</div>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
                <div class="lmw_upandown">
                  <img src="../../img/icon_down(1).png" alt="" class="lmw_imgdown">
                  <img src="../../img/icon_on(1).png" alt="" class="lmw_imgup">
                </div>
              </div>
              <div class="lmw_nr2">
                <ul class="lmw_outsideul">`+ str2 + `</ul>
              </div>
             </div>
           </div>`
        str2 = "";
      }

      //console.log(str2)
      //console.log(str)

      $(".ajax_show").html("").append(str);
      $(".lmw_imgup").hide();
      $(".lmw_nr2").hide();
      $(".lmw_imgup").click(function () {
        $(this).parent().parent().siblings(".lmw_nr2").slideUp();
        $(this).siblings(".lmw_imgdown").show()
        $(this).hide();
      })

      $(".lmw_imgdown").click(function () {
        $(this).parent().parent().siblings(".lmw_nr2").slideDown();
        $(this).siblings(".lmw_imgup").show()
        $(this).hide();
      })
      $(".layui-progress-bar").css("width", "20%");
    }


  }
  error = function (result) {

    $(zhaqBox).show()
    console.log("error");

    console.log(result);
  }
  sendkyAjax(type, url, data, dataType, jsonp, callback, error);
}
mycourse();
$(function () {

})



function gotovideo(val) {
  window.open("zbkc.html?subCourselds=" + val)
  // console.log(val)

}
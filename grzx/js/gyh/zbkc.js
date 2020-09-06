
// var _iframe = window.parent;
// var zhaqBox = _iframe.document.getElementsByClassName('tipsdialogbox1')[0];
const vm = new Vue({
    el: "#app",
    data: {
        options: [
            {
                value: 1,
                "name": "精讲视频"
            }, {
                value: 2,
                "name": "直播视频"
            },
        ],
        value: '',
        centerDialogVisible: false,
        url: "",
        url0: "",
        vider_id: "",
        confignum: "",
        obj: "",
        objlist: "",
        html: '',
        html2: '',
        num: 0,
        flag: false,
        config: "",
        video_title: "",
        showselect: false,
        isshow: undefined,
        isclass: 0,
        iskcclass: -1,
        fake_url: "",
        a: "",
        state: false,
        url_arr: [],
        // 直播视频
        live_arr: [],
        // 精讲视频
        fine_arr: [],
        valueflag: 2,
        // 选择的课程
        item_id: [],
        // 视频集合
        videos_arr: [],
        id: "",
        video_box: [],
        // 选择课程的视频
        video_info: [],
        // 初始value
        vavalue: 1,
        // 初始title
        checktitle: "",
        open_png: "",
        gyhVistie: false,
        // 用户信息
        userInfo: ""
    },


    created() {
        this.state = 4
        this.isshow = false;
        this.url = window.location.href;
        this.url = this.url.split("?")[1];
        this.url = this.url.split("=");
        this.config = this.url[0];
        this.confignum = this.url[1];
        this.vider_id = this.confignum;

        this.userInfo = JSON.parse(sessionStorage.getItem("userInfo"))
        this.userInfo = this.userInfo.nickName

        if (this.config == "subCourselds") {
            this.gyhVistie = false
            var that = this;
            this.showselect = false;
            $.ajax({
                url: "https://tk.360xkw.com/tiku/app/getSubcourseIdAndMateriaProperAndVideoNoLogin.do",
                type: "post",
                data: {
                    "subCourseIds": this.vider_id
                },
                dataType: "jsonp",
                jsonp: "jsoncallback",
                success: function (data) {
                    that.obj = data.V;
                    // console.log(that.obj)
                    if (that.obj.subCourse.length >= 1) {
                        that.video_title = that.obj.subCourse[0].name;
                        that.objlist = that.obj.video[that.vider_id][1];
                        that.objlist.forEach(function (item, index) {
                            item.videos.forEach(function (ite, ind) {
                                ite.classname = false
                            })
                        })
                    } else {
                        that.video_title = '暂无课程视频';
                        //弹出该课程需要购买才能观看

                        that.state = 'gyh'
                        // console.log(that.state)
                        return that.state
                    }
                    if (data.S == "1001") {
                        that.gyhVistie = true

                        // }

                        // if (that.objlist[0].videos[0].length > 0) {
                        that.objlist[0].videos[0].classname = true
                        that.fake_url = that.objlist[0].videos[0].videoUrl.split("http://tk.360xkw.com")[1]; //虚假url
                        that.isclass = !that.objlist[0].videos[0].classname
                        that.fake_url = `http://s1.v.360xkw.com` + that.fake_url;  // 转化真实url
                        // 初始showvideolist    
                        // 初始化添加class
                        that.num = 0
                        that.showvideo("0")
                        that.isshow = 0
                        // } else {
                        //     that.video_title = "暂无课程视频"

                    }

                },
                error: function () {
                    that.gyhVistie = true
                    console.log("系统崩溃，数据出错");

                }
            })
        } else if (this.config == "config") {
            this.showselect = true;
            this.url = window.location.href;
            this.url = this.url.split("?")[1];
            this.url = this.url.split("=");
            this.url = this.url[1]
            this.url = this.url.split("&")[0];
            this.url = this.url.split("|");
            this.url.forEach((item, index) => {
                this.url_arr.push(item.split(",")[0])
            })
            this.url_arr = this.url_arr.join(",")
            this.vavalue = this.url_arr.split(",")[0]
            var that = this;
            // zhaqBox.style.display = 'none'
            that.gyhVistie = false

            $.ajax({
                url: "https://tk.360xkw.com/tiku/app/getSubcourseIdAndMateriaProperAndVideoNoLogin.do",
                type: "post",
                data: {
                    "subCourseIds": this.url_arr
                },
                dataType: "jsonp",
                jsonp: "jsoncallback",
                success: function (data) {
                    that.obj = data.V;
                    // console.log(data.V)
                    if (that.obj.length == 0) {
                    } else {
                        that.live_arr = that.obj.live
                        that.fine_arr = that.obj.subCourse
                        that.videos_arr = that.obj.video
                        that.valueflag = 2
                        that.video_title = that.fine_arr[0].name
                        that.video_box = that.videos_arr[that.vavalue][1]
                        that.ckeck_video_play()
                    }
                    if (data.S == "1001") {
                        that.gyhVistie = true

                    }

                },
                error: function () {
                    console.log("系统崩溃，数据出错");
                    that.gyhVistie = true


                }
            })
        }

    },
    methods: {
        // 多选初始播放
        ckeck_video_play() {
            this.videos_arr[this.vavalue][1][0].videos.forEach(function (ite, ind) {
                ite.classname = false
            })
            this.videos_arr[this.vavalue][1][0].videos[0].classname = true
            this.fake_url = this.videos_arr[this.vavalue][1][0].videos[0].videoUrl
            // this.isclass = this.fake_url
            this.fake_url = this.fake_url.split("http://tk.360xkw.com")[1]; //虚假url
            this.fake_url = `http://s1.v.360xkw.com` + this.fake_url;  // 转化真实url
            // 初始showvideolist
            // 初始化添加class
            this.num = 0
            this.showvideo("0")
            this.isshow = 0
        },
        // 单选初始播放
        video_play() {

        },
        getname(value) {
            if (value == 1) {
                this.valueflag = 2
                // 精讲
            } else if (value == 2) {
                this.valueflag = 1
                // 直播
            }
        },
        // 点击目录
        showvideo(index) {
            this.num++;
            if (this.num % 2 !== 0) {
                this.isshow = undefined;
            } else {
                this.isshow = index;
            }
        },
        // 播放视频
        playvideo(val, value, ind) {
            // 单
            if (this.config == "subCourselds") {
                if (this.objlist.length > 0) {

                    this.objlist.forEach(function (item, index) {
                        item.videos.forEach(function (ite, inde) {
                            ite.classname = false
                        })
                    })
                    val.classname = true
                    this.state = val.state
                    if (!value || value == undefined || value == "") {
                        val.classname = false
                        return false;
                    } else {
                        this.fake_url = value.split("http://tk.360xkw.com")[1];
                        this.fake_url = `http://s1.v.360xkw.com` + this.fake_url;  // 转化真实url
                    }
                } else {
                    this.video_title = "暂无课程视频"

                }

            } else {
                // 多
                // console.log(value)
                if (this.video_box.length > 0) {
                    this.video_box.forEach(function (item, index) {
                        item.videos.forEach(function (ite, inde) {
                            ite.classname = false
                        })
                    })
                    val.classname = true
                    // this.video_box[0].videos[0].classname = true
                    if (!value || value == undefined || value == "") {
                        val.classname = false
                        this.state = "1"
                        return false;
                    } else {
                        this.state = "4"
                        this.fake_url = value.split("http://tk.360xkw.com")[1];
                        this.fake_url = `http://s1.v.360xkw.com` + this.fake_url;  // 转化真实url
                    }
                } else {
                    this.video_title = "暂无课程视频"

                }


            }

        },
        // 购买课程
        goindexGM() {
            window.location.href = "https://tk.360xkw.com/grzx/index.html?goum=1"
        },
        goReturn() {
            this.gyhVistie = false
            window.location.href = "https://tk.360xkw.com/grzx/login.html"
        },
        // 选择课程
        check_ck(value, item_id, item_name) {
            this.item_id = item_id
            this.iskcclass = value;
            this.video_title = item_name
        },
        confirm_kc() {
            this.centerDialogVisible = false
            if (this.valueflag == 2) {
                // 精良
                // console.log(this.item_id)
                this.video_box = this.videos_arr[this.item_id][1]
                if (this.video_box.length > 0) {
                    this.ckeck_video_play()

                } else {
                    this.video_title = "暂无课程视频"
                }
            }
            else if (this.valueflag == 1) {
                // 直播
                this.video_box = this.videos_arr[this.item_id][4]
                if (this.video_box.length > 0) {
                    this.ckeck_video_play()

                } else {
                    this.video_title = "暂无课程视频"
                }
            }

        }
    },
})



var _iframe = window.parent;
var tlk_tipsdialogbox1 = _iframe.document.getElementsByClassName('tlk_tipsdialogbox1')[0];
var tlk_tipsdialogbox = _iframe.document.getElementsByClassName('tlk_tipsdialogbox')[0];
var connent = _iframe.document.getElementsByClassName('tlk_connent')[0];
var tlk_queren = _iframe.document.getElementsByClassName('tlk_queren')[0];
var tlk_close1 = _iframe.document.getElementsByClassName('tlk_close1')[0];
var oldpassword = _iframe.document.getElementsByClassName('oldpasswordspan')[0];
var newpassword = _iframe.document.getElementsByClassName('newpasswordspan')[0];
var tlk_quxiao1 = _iframe.document.getElementsByClassName('tlk_quxiao1')[0];
var tlk_queren1 = _iframe.document.getElementsByClassName('tlk_queren1')[0];
var zhaqBox = _iframe.document.getElementsByClassName('tipsdialogbox1')[0];

$(tlk_close1).click(function () {
    tlk_tipsdialogbox1.style.display = 'none'

})

$(tlk_quxiao1).click(function () {
    $(newpassword).val()
    tlk_tipsdialogbox1.style.display = 'none'
})

$(tlk_queren1).click(function () {
    zhaqBox.style.display = 'none'
    // $(newpassword).change(function () {
    this.newpasswordval = $(this).val()
    if ($(newpassword).val() == $(oldpassword).val()) {
        $(tlk_tipsdialogbox).show()
        $(connent).html("新密码与旧密码相同")
    } else if ($(newpassword).val().length >= 6) {
        zhaqBox.style.display = 'none'
        $.ajax({
            type: "get",
            url: "https://tk.360xkw.com/tiku/user/editWebUser.do",
            data: {
                "account": JSON.parse(sessionStorage.getItem('account')),
                "password": $(newpassword).val(),
                "id": JSON.parse(sessionStorage.getItem('id'))
            },
            dataType: "jsonp",
            jsonp: "jsoncallback",
            success: function (data) {
                if (data.S == 1) {
                    $(tlk_tipsdialogbox).show()
                    var num = 3
                    $(connent).html(`修改成功！${num}S后自动跳转登录`)
                    $(tlk_queren).hide()
                    setInterval(() => {
                        num--
                        $(connent).html(`修改成功！${num}S后自动跳转登录`)
                        if (num == 0) {
                            $(tlk_tipsdialogbox).hide()
                            sessionStorage.removeItem("userInfo")
                            sessionStorage.removeItem("account")
                            sessionStorage.removeItem("password")
                            parent.location.href = "https://tk.360xkw.com/grzx/login.html"
                        }

                    }, 1000);
                } else if (data.S === '1001') [
                    zhaqBox.style.display = 'block'
                ]
            },
            error: function () {
                zhaqBox.style.display = 'block'
            }
        });
    } else {
        $(tlk_tipsdialogbox).show()
        $(connent).html("请输入六个字符以上的密码")
    }
    // })


    tlk_tipsdialogbox1.style.display = 'none'
})






const checkPrice = (rule, value, callback) => {
    console.log(value)
    if (value) {
      var rgx = /^([a-zA-Z\d])(\w|\-)+@[a-zA-Z\d]+\.[a-zA-Z]{2,4}$/
      if (String(value).match(rgx) === null) {
        return callback(new Error('请检查输入格式'))
      } else {
        callback()
      }
    } else if (value === '') {
        return callback(new Error('邮箱不能为空'))
    } else {
        callback()
    }
  }
  
const checkPhone = (rule, value, callback) => {
    if (value) {
      var rgx = /^1[3456789]\d{9}$/
      if (String(value).match(rgx) === null || Number(value) === '') {
        return callback(new Error('请输入正确的手机号格式'))
      } else {
        callback()
      }
    }
  }

  const checkQq = (rule, value, callback) => {
    if (value) {
      var rgx = /[1-9][0-9]{4,}/
      if (String(value).match(rgx) === null || Number(value) === '') {
        return callback(new Error('请输入正确的qq号格式'))
      } else {
        callback()
      }
    }
  }
var myvue = new Vue({
    el: '#zhaq',
    data: {
        oursIn: {},
        kk: false,
        ruleForm: {
            id: '',
            account: '',
            email: '',
            nickName: '',
            fullName: '',
            gender: '',
            phone: '',
            qq: '',
            password: '',
            oldpasswordval: "",
            newpasswordval: "",

        },
        rules: {
            email: [{ required: false, validator: checkPrice, trigger: 'change' }],
            qq: [{ required: false, validator: checkQq, trigger: 'change' }],
            phone: [{
                required: true,
                validator: checkPhone,
                trigger: 'change'
            }],
            nickName: [{
                required: true,
                message: '请填写昵称',
                trigger: 'blur'
            }]
        }
    },
    created() {
        this.oursIn = JSON.parse(sessionStorage.getItem('userInfo'))
        const { account, email, gender, fullName, password, nickName, phone, qq, id } = this.oursIn
        this.ruleForm = { account, email, gender, fullName, password, nickName, phone, qq, id }
        if (this.ruleForm.gender === undefined) {
            this.ruleForm.gender = '0'
        } else {
            this.ruleForm.gender = String(this.ruleForm.gender)
        }
        this.res_login()
    },
    methods: {
        // 修改密码
        xiugai() {
            var _iframe = window.parent;
            var tlk_tipsdialogbox1 = _iframe.document.getElementsByClassName('tlk_tipsdialogbox1')[0];
            tlk_tipsdialogbox1.style.display = 'block'

        },
        // 关闭修改密码弹窗
        close() {
            var _iframe = window.parent;
            var tlk_tipsdialogbox1 = _iframe.document.getElementsByClassName('tlk_tipsdialogbox1')[0];
            tlk_tipsdialogbox1.style.display = 'none'
        },
        // 提示
        tips() {
            var _iframe = window.parent;
            var tlk_tipsdialogbox = _iframe.document.getElementsByClassName('tlk_tipsdialogbox')[0];
            tlk_tipsdialogbox.style.display = 'block'
        },
        // 单独修改密码
        changePassword() {
            const that = this
            // console.log($(newpassword).val())


            // window.location.reload();
        },
        // decodeURI
        // 保存
        preservation() {
            console.log('触发了')
            zhaqBox.style.display = 'none'
            // this.ruleForm.nickName;
            // sessionStorage.removeItem('userInfo')
            this.$refs['ruleForm'].validate((valid) => {
                console.log('触发了')
                if (valid) {
                    console.log('触发了')
                    var that = this
                    $.ajax({
                        type: "get",
                        url: "https://tk.360xkw.com/tiku/user/editUser.do",
                        data: {
                            "account": that.ruleForm.account,
                            "email": that.ruleForm.email,
                            // "fullName": encodeURI(that.ruleForm.fullName),
                            // "nickName": encodeURI(that.ruleForm.nickName),
                            "fullName": that.ruleForm.fullName,
                            "nickName": that.ruleForm.nickName,
                            "gender": that.ruleForm.gender,
                            "phone": that.ruleForm.phone,
                            "qq": that.ruleForm.qq,
                        },
                        dataType: "json",
                        // jsonp: "jsoncallback",
                        success: function (data) {
                            that.logins()
                            if (data.S === '1') {
                                var _iframe = window.parent;
                                var tlk_tipsdialogbox = _iframe.document.getElementsByClassName('tlk_tipsdialogbox')[0];
                                tlk_tipsdialogbox.style.display = 'block'
                                var tlk_connent = _iframe.document.getElementsByClassName('tlk_connent')[0];
                                // console.log(tlk_connent)
                                tlk_connent.innerText = "保存成功"
                            } else {
                                var _iframe = window.parent;
                                var tlk_tipsdialogbox = _iframe.document.getElementsByClassName('tlk_tipsdialogbox')[0];
                                tlk_tipsdialogbox.style.display = 'block'
                                var tlk_connent = _iframe.document.getElementsByClassName('tlk_connent')[0];
                                // console.log(tlk_connent)
                                tlk_connent.innerText = "保存失败"
                            }
                        },
                        error: function () {
                            zhaqBox.style.display = 'block'
                            // alert("系统错误!");
                        },
                    });
                } else {
                }
            });
        },
        logins() {
            const that = this
            zhaqBox.style.display = 'none'
            $.ajax({
                type: "post",
                url: `https://tk.360xkw.com/tiku/user/userlogin.do`,
                data: {
                    "account": that.ruleForm.account,
                    "password": that.ruleForm.password,
                },
                dataType: "jsonp",
                jsonp: "jsoncallback",
                success: function (data) {
                    // console.log(data.V)
                    if (data.V) {
                        // console.log(data.V)
                        // data.V.fullName = decodeURI(data.V.fullName)
                        // data.V.nickName = decodeURI(data.V.nickName)
                        sessionStorage.setItem('userInfo', JSON.stringify(data.V))
                        // that.oldpassword = that.password
                        // console.log(that.oldpassword)
                        window.location.reload();
                    }
                    if (data.S == "1001") {
                        zhaqBox.style.display = 'block'

                    }
                },
                error: function () {
                    // alert("系统错误!");
                    zhaqBox.style.display = 'block'
                }
            });
        },
        res_login() {
            const that = this
            zhaqBox.style.display = 'none'

            $.ajax({
                type: "post",
                url: `https://tk.360xkw.com/tiku/user/userlogin.do`,
                data: {
                    "account": that.ruleForm.account,
                    "password": that.ruleForm.password,
                },
                dataType: "jsonp",
                jsonp: "jsoncallback",
                success: function (data) {
                    // console.log(data.V)
                    if (data.V) {
                        $(oldpassword).val(data.V.password)
                        sessionStorage.setItem('userInfo', JSON.stringify(data.V))
                    }
                    if (data.S == "1001") {
                        zhaqBox.style.display = 'block'

                    }
                },
                error: function () {
                    // alert("系统错误!");
                    zhaqBox.style.display = 'block'

                }
            });
        }
    }
})
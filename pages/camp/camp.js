// mine.js
const App = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hidePopup: true,
    userInfo: App.globalData.userInfo,
    items: [{
      icon: '../../static/images/mine/camp/apply.png',
        text: '申请入驻',
        path: '/pages/aboutus/aboutus'
      },
      {
        icon: '../../static/images/mine/camp/management.png',
        text: '职位管理',
        path: '/pages/feedBack/feedBack'
      },
      {
        icon: '../../static/images/mine/camp/verify.png',
        text: '报名审核',
        path: '/pages/feedBack/feedBack'
      },

    ],

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    wx.getStorage({
      key: 'phoneNumber',
      success: function(res) {
        that.setData({
          mynumber: res.data
        })
      },
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {
    return {
      title: "番薯青年派",
      path: "/pages/home/home"
    }
  },
  //获取用户信息
  // getUserInfo: function() {
  //   var userInfo = App.globalData.userInfo
  //   var that = this;

  //   if (userInfo) {
  //     that.setData({
  //       userInfo: userInfo
  //     })
  //     return
  //   }

  //   userInfo = App.getUserInfo();
  //   console.log(userInfo);
  //   that.setData({
  //     userInfo: userInfo
  //   })
  // },

  bindtap(e) {},
  navigateTo: function(e) {
    const index = e.currentTarget.dataset.index;
    const path = e.currentTarget.dataset.path;
    switch (index) {
      case 3:
        this.showPopupTap();
        break;
        // case 4:
        //   wx.makePhoneCall({
        //     phoneNumber: path
        //   })
        break;
      default:
        console.log(path);
        // console.log(typeof path);
        wx.navigateTo({
          url: path
        });
    };
  },

  closePopupTap: function() {
    this.setData({
      hidePopup: true
    })
  },
  showPopupTap: function() {
    this.setData({
      hidePopup: false
    })
  },
  formSubmit: function(e) {
    // console.log(e);
    // const phoneNumber = e.detail.value.phoneNumber;
    // if (phoneNumber.length != 11 && phoneNumber.length != 8) {
    //   wx.showModal({
    //     title: '提示',
    //     content: '电话号码不正确，请确认后重新输入。',
    //   });
    //   return;
    // }
    // this.setData({
    //   phoneNumber: e.detail.value.phoneNumber
    // });
    // wx.setStorageSync({
    //   key: "phoneNumber",
    //   data: phoneNumber
    // });
    // this.closePopupTap();
  },
  bind: function() {
    wx.redirectTo({
      url: 'test?id=1'
    })
  },

  getPhoneNumber: function(e) { //点击获取手机号码按钮
    wx.login({
      success: function(res) {
        var code = res.code
        if (code) {
          var that = this;
          wx.checkSession({
            success: function() {
              console.log(e.detail.errMsg)
              console.log(e.detail.iv)
              console.log(e.detail.encryptedData)
              var ency = e.detail.encryptedData;
              var iv = e.detail.iv;
              var sessionk = that.data.sessionKey;

              if (e.detail.errMsg == 'getPhoneNumber:fail user deny') {
                that.setData({
                  modalstatus: true
                });

              } else { //同意授权
                wx.request({
                  method: "post",
                  url: 'http://loclahost:8080/user/get2',
                  data: {
                    encrypdata: ency,
                    ivdata: iv,
                    code: code
                  },

                  header: {
                    'content-type': 'application/json' // 默认值
                  },

                  success: (res) => {
                    console.log("解密成功~~~~~~~将解密的号码保存到本地~~~~~~~~");
                    console.log(res);
                    var phone = res.data.phoneNumber;
                    console.log(phone);
                    this.setData({
                      mynumber: phone
                    })
                  },
                  fail: function(res) {
                    console.log("解密失败~~~~~~~~~~~~~");
                    console.log(res);
                  }
                });
              }
            },

            fail: function() {
              console.log("session_key 已经失效，需要重新执行登录流程");
              that.wxlogin(); //重新登录
            }
          });
        }
      }
    });
  },

  viewApplyDetail: function() {
    wx.showToast({
      title: '操作失败',
      icon: 'none',
      duration: 2000
    })
    wx.navigateTo({
      url: 'page/home/home'
    })
  },
  check: function() {
    wx.showToast({
      title: '权限不够哟',
      icon: 'none',
      duration: 2000
    })
  }
})
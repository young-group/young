// mine.js
const App = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hidePopup: true,
    userInfo: {},
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    editTrue: true,
    showModalStatus: false,
    items: [{
      icon: '../../static/images/mine/myresume.png',
        text: '我的简历',
        path: '/pages/resume/resume'
      },
      {
        icon: '../../static/images/mine/enroll.png',
        text: '我的报名',
        // path: '/pages/deliver/deliver'
        path: '/pages/myInterview/myInterview'

      },
      {
        icon: '../../static/images/mine/collection.png',
        text: '收藏',
        path: '/pages/collection/collection'
      },
      {
        icon: '../../static/images/mine/camp.png',
        text: '营地入驻（商家入口）',
        path: '/pages/camp/camp'
      },
      {
        icon: '../../static/images/mine/config.png',
        text: '设置',
        path: '/pages/config/config'
      },
    ],

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

    var tmp = wx.getStorageSync('basicUser').uid;
    // console.log(tmp+"----------")
    if(tmp){
      var that = this;
      that.setData({
        editTrue: false,
      })
    }
    
    // var tmp = App.globalData.userInfo.openId;
    wx.getSetting({
      success: function(res) {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称
          wx.getUserInfo({
            success: function(res) {
              // console(res.userInfo)
            }
          })
        }
      }
    })
  },

  // 获取个人信息成功，然后处理剩下的业务或跳转首页
  setUserInfoAndNext(res) {
    wx.showLoading({
      title: '登录中'
    })
    // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
    // 所以此处加入 callback 以防止这种情况
    // if (this.userInfoReadyCallback) {
    //   this.userInfoReadyCallback(res)
    // }

    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.login({
            success: function(res) {
              var code = res.code; //登录凭证
              if (code) {
                //2、调用获取用户信息接口
                wx.getUserInfo({
                  success: function(res) {
                    console.log({
                      encryptedData: res.encryptedData,
                      iv: res.iv,
                      code: code
                    })
                    //3.请求自己的服务器，解密用户信息 获取unionId等加密信息
                    
                    wx.request({
                      url: App.globalData.urlHead+'users/getUserInfo', //自己的服务接口地址
                      method: 'get',
                      header: {
                        'content-type': 'application/x-www-form-urlencoded'
                      },
                      data: {
                        encryptedData: res.encryptedData,
                        iv: res.iv,
                        code: code
                      },
                      success: function(data) {

                        //4.解密成功后 获取自己服务器返回的结果
                        if (data.data.status == 1) {
                          
                          var userInfo_ = data.data.userInfo;
                          wx.setStorage({
                            key: 'userInfo',
                            data: userInfo_,
                          })
                          App.globalData.userInfo = userInfo_;
                          // console.log(App.globalData.userInfo.openId + "成功啦---------")

                          var basicUser_ = data.data.basicUser
                          wx.setStorageSync('basicUser', basicUser_)
                          App.globalData.basicUser = basicUser_;
                          // console.log(wx.getStorageSync('basicUser').uname+"--------")
                          // var that = this;
                          // that.setData({
                          //   editTrue: false,
                          // })
                          wx.hideLoading()
                        } else {
                          console.log('解密失败')
                          wx.hideLoading()
                        }
                      },
                      fail: function() {
                        console.log('系统错误')
                        wx.hideLoading()
                      }
                    })
                  },
                  fail: function() {
                    console.log('获取用户信息失败')
                    wx.hideLoading()
                  }
                })
              } else {
                console.log('获取用户登录态失败！' + r.errMsg)
                wx.hideLoading()
              }
            },
            fail: function() {
              console.log('登陆失败')
              wx.hideLoading()
            }
          })
        } else {
          console.log('获取用户信息失败')
          wx.hideLoading()
        }
      }
    })
    
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
  getUserInfo: function() {
    // var userInfo = App.globalData.userInfo
    // var that = this;

    // if (userInfo) {
    //   that.setData({
    //     userInfo: userInfo
    //   })
    // }else{
    //   userInfo = App.getUserInfo();
    //   console.log(userInfo);
    //   that.setData({
    //     userInfo: userInfo
    //   })
    // }
  },

  bindtap(e) {},
  navigateTo: function(e) {
    const index = e.currentTarget.dataset.index;
    const path = e.currentTarget.dataset.path;
    switch (index) {
      // case 3:
      //   this.showPopupTap();
      //   break;
      // case 4:
      //   wx.makePhoneCall({
      //     phoneNumber: path
      //   })
      // break;
      default: console.log(path);
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

  // 编辑
  showedit: function() {

    var tmp = wx.getStorageSync('userInfo').openId;
    var that = this;

    if (tmp ) {
      that.setData({
        editTrue: false,
      })

    } else {
      that.setData({
        editTrue: true,
      })
    }
  },




})
Page({

  /**
   * 页面的初始数据
   */
  data: {
    favor:wx.getStorageSync('basicUser').uspecialty
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    // wx.request({
    //   url: '',
    //   method: 'post',
    //   data: {
    //     openid: wx.getStorageSync('userInfo').openId
    //   },
    //   header: {
    //     'content-type': 'application/x-www-form-urlencoded',
    //   },
    //   success(res) {
    //     console.log(res.data);
    //     that.setData({
    //       information: {
    //         favor: ""
    //       }
    //     })
    //   },
    //   fail(e) {
    //     console.log(e.errMsg)
    //     that.setData({
    //       information: {
    //         favor: ""
    //       }
    //     })
    //   }
    // })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  /**
   * 获取表单提交过来的参数
   */
  formSubmit: function (e) {
    console.log(e.detail.value.favor);
    var basicUser=wx.getStorageSync('basicUser')
    basicUser.uspecialty = e.detail.value.favor
    wx.clearStorageSync()
    wx.setStorageSync('basicUser', basicUser)

    var that = this;
    wx.request({
      url: 'http://localhost:8080/users/post',
      method: 'post',
      data: {
        basicUserJson: JSON.stringify(wx.getStorageSync('basicUser')),
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded',
      },
      success(res) {
        console.log(res.data);
        wx.showToast({
          title: '已提交',
        });
        that.setData({
          information: {
            result: res.data.res,
          }
        })
      },
      fail(e) {
        console.log(e.errMsg)
        that.setData({

        })
      }
    })
  },

})
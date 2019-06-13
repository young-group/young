Page({

  /**
   * 页面的初始数据
   */
  data: {
    feedBack:{
      content:"",
      uid:wx.getStorageSync('basicUser').uid
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
    console.log(e.detail.value.content);
    if (e.detail.value.content==""){
      wx.showToast({
        icon: 'none',
        title: '请填写意见',
      });
      return
    }
    var that=this
    that.setData({
        'feedBack.content':e.detail.value.content
    })


    console.log(that.data.feedBack.content + "---------")
    wx.request({
      url: 'http://localhost:8080/feedBacks/',
      method: 'post',
      data: {
        content: that.data.feedBack.content,
        uid: that.data.feedBack.uid
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded',
      },
      success(res) {
        console.log(res.data);
        wx.showToast({
          title: '已提交',
        });
      },
      fail(e) {
        console.log(e.errMsg)
        wx.showToast({
          icon:'none',
          title: '失败啦',
        });
      }
    })
  },
  bindDateChange: function (e) {
    console.log(e.detail.value)
    this.setData({
      dates: e.detail.value
    })
  }

})
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
    var that=this
    that.setData({
        'feedBack.content':e.detail.value.content
    })


    console.log(that.data.feedBack.content + "---------")

    wx.request({
      url: 'http://localhost:8080/feedBack/put',
      method: 'get',
      data: {
        feedBackJson: JSON.stringify(that.data.feedBack),
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded',
      },
      success(res) {
        console.log(res.data);
        wx.showToast({
          title: '成功',
          icon: 'success',
          duration: 2000
        })
      },
      fail(e) {
        console.log(e.errMsg)
        wx.showToast({
          title: '操作失败',
          icon:'none',
          duration: 2000
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
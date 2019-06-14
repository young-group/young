// pages/mineEdit/mineEdit.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    show: false, //控制下拉列表的显示隐藏，false隐藏、true显示
    selectData: ['男', '女'], //下拉列表的数据
    index: 0, //选择的下拉列 表下标,
    uschoolName: wx.getStorageSync('basicUser').uschoolName,
    uschoolProfession: wx.getStorageSync('basicUser').uschoolProfession,
    utel: wx.getStorageSync('basicUser').utel,
    uemail: wx.getStorageSync('basicUser').uemail,
    usex: wx.getStorageSync('basicUser').usex,
    result: "fail",
    uuname: wx.getStorageSync('basicUser').uname,
    ubirthday: wx.getStorageSync('basicUser').ubirthday,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.loadData()
  },
  loadData: function(e) {
    var usex = wx.getStorageSync('basicUser').usex;
    if (usex == '男') {
      var that = this;
      that.setData({
        index: 0,
      })
    } else {
      var that = this;
      that.setData({
        index: 1,
      })
    }
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

  },
  /**
   * 获取表单提交过来的参数
   */
  formSubmit: function(e) {
    var basicUser = wx.getStorageSync('basicUser')
    basicUser.uname = e.detail.value.uuname
    basicUser.ubirthday = e.detail.value.ubirthday
    basicUser.usex = e.detail.value.usex
    basicUser.uschoolName = e.detail.value.uschoolName
    basicUser.uschoolProfession = e.detail.value.uschoolProfession
    basicUser.utel = e.detail.value.utel
    basicUser.uemail = e.detail.value.uemail
    basicUser.ubirthday = e.detail.value.ubirthday
    var that = this;
    var index = that.data.index
    if (index == 0) {
      basicUser.usex = "男"
    } else {
      basicUser.usex = "女"
    }
    wx.clearStorageSync()
    wx.setStorageSync('basicUser', basicUser)

    var that = this;
    wx.request({
      url: app.globalData.urlHead +'users/post1',
      method: 'get',
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
            result: res.data,
          }
        })
      },
      fail(e) {
        console.log(e.errMsg)
        wx.showToast({
          icon:none,
          title: '操作失败',
        });
      }
    })
  },
  // 点击下拉显示框
  selectTap() {
    this.setData({
      show: !this.data.show,
    });
  },
  // 点击下拉列表
  optionTap(e) {
    let Index = e.currentTarget.dataset.index; //获取点击的下拉列表的下标
    this.setData({
      index: Index,
      show: !this.data.show

    });
  },

  showText: function() {
    var that = this;
    that.setData({
      show: (!that.data.showView)
    })
  },
  bindDateChange: function(e){
    this.setData({
      ubirthday:e.detail.value
    });
  }


})
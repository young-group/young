// pages/positionDetail/positionDetail.js
var http = require('../../utils/http')
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
   company:{}
  },

  /**
   * 查看公司详细招聘信息
   */
  viewCompanyDetail: (e) => {
    console.log(e.currentTarget.dataset.pid);
    app.navTo('companyDetail', {
      pid: e.currentTarget.dataset.pid
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  //获取传递过来的参数pid 代表营地公司的编号
  onLoad: function(options) {
    this.loadData(options.cid)
  },
  /**
   * 加载这家营地发布的需求数据
   */
  loadData: function(cid1) {
    console.log("-------cid--"+cid1+"---------")
    var that = this;
    wx.request({
      url: app.globalData.urlHead +'company/getCompany/'+cid1, // 仅为示例，并非真实的接口地址
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        console.log(res.data);
        that.setData({
          company:res.data
        })

      }
    })
  }
})
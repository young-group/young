// pages/deliver/deliver.js
var http = require('../../utils/http.js')
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentTab: 0,
  },

  /**
   * 查看投递详情
   */
  viewDeliverDetail: () => {
    //去对应营地的信息
    getApp().navTo('deliverDetail')
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.loadData()
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
  swichNav: function(e) {
    console.log(e);
    var that = this;
    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current,
      })
    }
  },
  swiperChange: function(e) {
    console.log(e);
    this.setData({
      currentTab: e.detail.current,
    })
  },
  loadData: function(e) {
    var that = this;
    wx.request({
      url: 'http://localhost:8080/deliver/getDeliver',
      method: 'post',
      header: {
        'content-type': 'application/json',
      },
      success(res) {
        console.log(res.data);
        that.setData({
          information: {
            uid: "",
          },
          positionList: [{
              name: "xxx营地",
              job: "营地指导员",
              place: "南山科技园讯美广场1号楼6楼6105",
              status: "已投递"
            },
            {
              name: "xxx营地",
              job: "营地指导员",
              place: "南山科技园讯美广场1号楼6楼6105",
              status: "已投递"
            }
          ]
        })
      },
      fail(e) {
        console.log(e.errMsg)
        that.setData({
          information: {
            uid: "",
          },
          positionList: [{
              name: "xx营地",
              job: "营地指导员",
              place: "南山科技园讯美广场1号楼6楼6105",
              status: "已投递"
            },
            {
              name: "xxxx营地",
              job: "营地指导员",
              place: "南山科技园讯美广场1号楼6楼6105",
              status: "已投递"
            },
            {
              name: "xxxxx营地",
              job: "营地指导员",
              place: "南山科技园讯美广场1号楼6楼6105",
              status: "已投递"
            },
            {
              name: "xxxxxx营地",
              job: "营地指导员",
              place: "南山科技园讯美广场1号楼6楼6105",
              status: "已投递"
            }
          ]
        })
      }
    })
  },

})
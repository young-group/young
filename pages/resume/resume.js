// pages/resume/resume.js
//获取应用实例
var http = require('../../utils/http.js')
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    workList:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.loadData()
    // var that = this;
    // if (wx.getStorageSync('basicUser').workList[0]){
    // that.setData({
    //   beginTime: wx.getStorageSync('basicUser').workList[0].beginTime,
    //   endTime: wx.getStorageSync('basicUser').workList[0].endTime,
    //   // job: wx.getStorageSync('basicUser').workList[0].job,
    //   workDescribe: wx.getStorageSync('basicUser').workList[0].workDescribe
    // })
    // }

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
  editBaseImformation: function() {
    wx.navigateTo({
      url: '../mineEdit/mineEdit'
    })
  },
  editExperience: function() {
    wx.navigateTo({
      url: '../introduceExperience/introduceExperience'
    })
  },
  editEvaluation: function() {
    wx.navigateTo({
      url: '../evaluation/evaluation'
    })
  },
  loadData: function(e) {

    var that = this;
    var uid=wx.getStorageSync('basicUser').uid
    wx.request({
      url: app.globalData.urlHead+'users/' + uid,
      method: 'get',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
      },
      success(res) {
        wx.setStorageSync('basicUser', res.data)
        // console.log(res.data)
        that.setData({
          information: {
            name: res.data.uname,
            sex: res.data.usex,
            birth: res.data.ubirthday,
            currentCity: res.data.ucity,
            univercity: res.data.uschoolName,
            major: res.data.uschoolProfession,
            tel: res.data.utel,
            email: res.data.uemail,
            favor: res.data.uspecialty,
            
          }
        })

        if (res.data.workList){

          that.setData({
            // workList: [{
            //   startTime: res.data.workList[0].beginTime,
            //   endTime: res.data.workList[0].endTime,
            //   job: "营地指导员",
            //   detail: res.data.workList[0].workDescribe
            // },
            // // {
            // //   startTime: "xxxx.x",
            // //   endTime: "xxxx.x",
            // //   job: "营地指导员",
            // //   detail: "负责很多很多"
            // // }
            // ]
            workList: res.data.workList,
          })

        }
      },
      fail(e) {
        console.log(e.errMsg)
        that.setData({
          information: {
            // name: "青年派",
            // sex: "男",
            // birth: "1997.12",
            // currentCity: "哈尔滨",
            // univercity: "黑龙江科技大学",
            // major: "计算机科学与技术",
            // tel: "133****6829",
            // email: "739**820@qq.com",
            // favor: "平时喜欢看编程书籍以及名人博客，至今看过犀牛书、JavaScript高级程序设计3、JavaScript设计模式、You Don't Know JS系列等，时常关注阮一峰、张鑫旭、王福朋等大神博客。基础知识扎实，擅长vue.js，有个人和公司的项目经验支撑，也可转向原生或其他框架学习。"
          },
          positionList: [{
            beginTime: "xxxx.x",
            endTime: "xxxx.x",
            job: "营地指导员",
            workDescribe: "负责很多很多"
            },
            // {
            //   startTime: "2018.6",
            //   endTime: "2019.2",
            //   job: "营地指导员",
            //   detail: "负责公司的一些前端业务，帮助公司完成客户的需求，自主学习前端主流技术来解决实际工作中遇到的问题，并能帮遇到相同问题的人解决自己遇到过的问题。"
            // }
          ]
        })
      }
    })
  },
  viewDetail: (e) => {
    app.navTo('positionDetail', {
      positionId: e.currentTarget.dataset.pid
    })
  },
  // //下拉触发事件
  // onPageScroll: function () {
  //   var that = this;
  //   this.loadData()
  // },
  onShow: function () {
    this.loadData()
  }
  

})
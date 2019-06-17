// pages/mineEdit/mineEdit.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    beginTime: "",
    endTime: "",
    job: "",
    workDescribe: "",
    startdate:"",
    enddate:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    // console.log(wx.getStorageSync('basicUser').workList[0].beginTime+"-------")
    if (wx.getStorageSync('basicUser').workList[0]) {
      var beginRes = wx.getStorageSync('basicUser').workList[0].beginTime
      var begin = beginRes.replace('.', '-');
      begin = begin+"-01"
      // console.log(begin)

      var endRes = wx.getStorageSync('basicUser').workList[0].endTime
      var end = endRes.replace('.', '-');
      end = end + "-01"
      // console.log(end)
      that.setData({
        startdate: begin,
        enddate: end,
        job: wx.getStorageSync('basicUser').workList[0].job,
        workDescribe: wx.getStorageSync('basicUser').workList[0].workDescribe
      })
    }
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
    // console.log(e.detail.value);
    
    // if (wx.getStorageSync('basicUser').workList[0]) {
    // var basicUser = wx.getStorageSync('basicUser')
    // // basicUser.workList[0].job = e.detail.value.job
    // basicUser.workList[0].beginTime = e.detail.value.startdate
    // basicUser.workList[0].endTime = e.detail.value.enddate
    // basicUser.workList[0].workDescribe = e.detail.value.workDescribe
    // basicUser.workList[0].uid = basicUser.uid
    // wx.clearStorageSync()
    // wx.setStorageSync('basicUser', basicUser)
    // }

    var experience ={};
    experience.beginTime = e.detail.value.startdate
    experience.endTime = e.detail.value.enddate
    experience.workDescribe = e.detail.value.workDescribe
    experience.uid = wx.getStorageSync('basicUser').uid
    experience.job = e.detail.value.job
    // experience.id = e.detail.value.job
    wx.setStorageSync('experience', experience)
    
    var that = this;
    wx.request({
      url: app.globalData.urlHead +'users/workList/modify',
      method: 'post',
      data: {
        experienceJson: JSON.stringify(wx.getStorageSync('experience')),
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded',
      },
      success(res) {
        console.log(res.data);
        that.setData({
          information: {
            result: res.data,
          }
        })
        var basicUser=wx.getStorageSync('basicUser')
        basicUser.workList[0]=experience
        wx.clearStorageSync()
        wx.setStorageSync('basicUser', basicUser)
        wx.showToast({
          title: '已提交',
        });
      },
      fail(e) {
        console.log(e.errMsg)
        wx.showToast({
          icon: none,
          title: '操作失败',
        });
      }
    })
  },
  bindStartDateChange: function (e) {
    console.log(e.detail.value)
    this.setData({
      startdate: e.detail.value
    })
  },
  bindEndDateChange: function (e) {
    console.log(e.detail.value)
    this.setData({
      enddate: e.detail.value
    })
  },
  save:function(e){
    // console.log(e.detail.value);
    // var work = wx.getStorageSync('basicUser').workList[0]
    // // work.job = e.detail.value.job
    // work.beginTime = e.detail.value.startdate
    // work.endTime = e.detail.value.enddate
    // work.workDescribe = e.detail.value.workDescribe
    // work.uid = wx.getStorageSync('basicUser').uid
    // wx.setStorageSync('basicUser', basicUser)

    // var that = this;
    // wx.request({
    //   url: 'http://localhost:8080/user/post2',
    //   method: 'get',
    //   data: {
    //     experienceJson: JSON.stringify(wx.getStorageSync('basicUser').workList[0]),
    //   },
    //   header: {
    //     'content-type': 'application/x-www-form-urlencoded',
    //   },
    //   success(res) {
    //     console.log(res.data);
    //     that.setData({
    //       information: {
    //         result: res.data,
    //       }
    //     })
    //   },
    //   fail(e) {
    //     console.log(e.errMsg)
    //   }
    // })
  },
  del: function (e) {
    // console.log(e.detail.value)

  },
  formReset: function () {
    var id = wx.getStorageSync('basicUser').workList[0].id
    wx.request({
      url: app.globalData.urlHead +'users/workList/'+id,
      method: 'delete',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
      },
      success(res) {
        console.log(res.data);
        wx.showToast({
          title: '已删除',
        });
      },
      fail(e) {
        console.log(e.errMsg)
        wx.showToast({
          icon: none,
          title: '操作失败',
        });
      }
    })
  }

})
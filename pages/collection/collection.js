// pages/collection/collection.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    curid: '',
    isClick: true,
    positionList: []
  },
  haveSave(e) {
    var that = this
    that.setData({
      curid: e.currentTarget.dataset.pid
    })

    wx.showModal({
      title: '提示',
      content: '确定取消收藏?',
      success: function(sm) {
        if (sm.confirm) {
          var array = that.data.positionList
          var pid = e.currentTarget.dataset.pid
          for (var i = 0; i < array.length; i++) {
            console.log(array[i])
            if (pid == array[i].pid) {
              array.splice(i, 1)
            }
          }
          that.setData({
            positionList: array
          })
          var uid = wx.getStorageSync('basicUser').uid
          var pid = e.currentTarget.dataset.pid
          wx.request({
            url: 'http://localhost:8080/collections/' + uid + '/' + pid,
            method: 'delete',
            header: {
              'content-type': 'application/x-www-form-urlencoded',
            },
            success(res) {}
          })
        }
      }
    })
    return

    // if (!this.data.isClick == true) {

    //   wx.request({
    //     url: 'http://localhost:8080/collection/put',
    //     data: {
    //       uid: wx.getStorageSync('basicUser').uid,
    //       pid: e.currentTarget.dataset.pid
    //     },
    //     method: 'get',
    //     header: {
    //       'content-type': 'application/x-www-form-urlencoded',
    //     },
    //     success(res) {
    //       console.log(res.data)
    //     },
    //     fail(e) {
    //       console.log(e.errMsg)
    //     }
    //   })
    //   wx.showToast({
    //     title: '已收藏',
    //   });
    // } else {

    //   wx.request({
    //     url: 'http://localhost:8080/collection/delete',
    //     data: {
    //       uid: wx.getStorageSync('basicUser').uid,
    //       pid: e.currentTarget.dataset.pid
    //     },
    //     method: 'get',
    //     header: {
    //       'content-type': 'application/x-www-form-urlencoded',
    //     },
    //     success(res) {
    //       console.log(res.data)
    //     },
    //     fail(e) {
    //       console.log(e.errMsg)
    //     }
    //   })
    //   wx.showToast({
    //     title: '已取消',
    //   });
    // }

    // this.setData({
    //   isClick: !this.data.isClick
    // })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(option) {
    // console.log(wx.getStorageSync('jobData'));
    var that = this;
    var uid = wx.getStorageSync('basicUser').uid
    wx.request({
      url: 'http://localhost:8080/collections/' + uid,
      method: 'get',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
      },
      success(res) {
        console.log(res.data)
        if (res.data) {
          that.setData({
            positionList: that.data.positionList.concat(res.data),
          })
        }
      },
      fail(e) {
        console.log(e.errMsg)
        wx.showToast({
          title: '数据加载失败',
          icon: 'none',
          duration: 2000

        })
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

  },

  focusFavoriteTab: function(e) {
    // console.log("---------")
    // var that = this;
    // var isFocus = that.data.isFocus;
    // console.log("isFocus", isFocus)
    // var itemId = that.data.itemId;
    // if (isFocus) {
    //   favoriteService.cancel(that, itemId).then((res) => {
    //     wx.showToast({
    //       title: "取消收藏",
    //       icon: 'success',
    //       duration: 1000
    //     });
    //     that.setData({
    //       isFocus: false,
    //     });
    //   })
    // } else {
    //   favoriteService.add(that, itemId).then((res) => {
    //     wx.showToast({
    //       title: res.data == 1 ? "收藏成功" : "收藏失败",
    //       icon: 'success',
    //       duration: 1000
    //     });
    //     that.setData({
    //       isFocus: true,
    //     });
    //   });
    // }
  },
  /**
   * 查看职位详情
   */
  viewPositionDetail: (e) => {
    console.log(e)
    app.navTo('positionDetail', {
      positionId: e.currentTarget.dataset.pid
    })
  },

})
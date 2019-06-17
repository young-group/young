const app = getApp()
var startX, endX;
var moveFlag = true; // 判断执行滑动事件

Page({
  data: {
    page: 1,
    ani1: '',
    ani2: '',
    positionList1:[],
    positionList2: [],
    //  currentTab: 0,
  },

  onLoad: function() {
    this.loadData()
  },

  swichNav: function (e) {
    console.log(e);
    var that = this;
    if (this.data.page === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        page: e.target.dataset.current + 1,
      })
    }

  },

  touchStart: function(e) {
    startX = e.touches[0].pageX; // 获取触摸时的原点
    moveFlag = true;
  },

  // 触摸移动事件
  touchMove: function(e) {

    endX = e.touches[0].pageX; // 获取触摸时的原点
    if (moveFlag) {
      if (endX - startX > 50) {
        console.log("move right");
        this.move2right();
        moveFlag = false;
      }

      if (startX - endX > 50) {
        console.log("move left");
        this.move2left();
        moveFlag = false;
      }
    }
  },

  swiperChange: function(e) {
    console.log(e);
    this.setData({
      page: e.detail.current,
    })
  },

  // 触摸结束事件
  touchEnd: function(e) {
    var that = this;
    moveFlag = true; // 回复滑动事件
    // swiperChange(e);
  },

  //向左滑动操作

  move2left() {

    var that = this;
    if (this.data.page == 2) {
      return
    }

    var animation = wx.createAnimation({
      duration: 250,
      timingFunction: 'ease',
      delay: 50
    });

    animation.opacity(0.2).translate(-250, 0).step()
    this.setData({
      ani1: animation.export()
    })

    setTimeout(function() {
      that.setData({
        page: 2,
        ani2: ''
      });
    }, 350)
  },

  //向右滑动操作
  move2right() {
    var that = this;
    if (this.data.page == 1) {
      return
    }

    var animation = wx.createAnimation({
      duration: 250,
      timingFunction: 'ease',
      delay: 50
    });

    animation.opacity(0.2).translate(250, 0).step()
    this.setData({
      ani2: animation.export()
    })

    setTimeout(function() {
      that.setData({
        page: 1,
        ani1: ''
      });
    }, 350)
  },

  loadData: function(e) {
    var that = this;
    var uid = wx.getStorageSync('basicUser').uid

      wx.request({
        url: app.globalData.urlHead +'enrolls/1/' + uid,
        method: 'get',
        header: {
          'content-type': 'application/x-www-form-urlencoded',
        },
        success(res) {
          // console.log(res.data);
          var enroll = res.data[0];
          that.setData({
            information: {
              uid: "",
            },
            positionList1: that.data.positionList1.concat(res.data)
          })
        },
        fail(e) {
          console.log(e.errMsg)
          wx.showToast({
            title: '操作失败',
            icon: 'none',
            duration: 2000
          });
        }
      })

      wx.request({
        url: app.globalData.urlHead +'enrolls/2/' + uid,
        method: 'get',
        header: {
          'content-type': 'application/x-www-form-urlencoded',
        },
        success(res) {
          // console.log(res.data);
          var enroll = res.data[0];
          that.setData({
            information: {
              uid: "",
            },
            positionList2: that.data.positionList2.concat(res.data)
          })
        },
        fail(e) {
          console.log(e.errMsg)
          wx.showToast({
            title: '操作失败',
            icon: 'none',
            duration: 2000
          });
        }
      })
    

  },



  swichNav1: function(e) {
    // console.log(e);
    var that = this;
    if (this.data.page === e.target.dataset.current+1) {
      return false;
    } else {
      that.setData({
        page: 1,
        ani1:'',
      })
    }
  },

  swichNav2: function(e) {
    // console.log(e);
    var that = this;
    if (this.data.page === e.target.dataset.current+1) {
      return false;
    } else {
      that.setData({
        page: 2,
        ani2: '',
      })
    }

    var that = this;
    var uid = wx.getStorageSync('basicUser').uid

  },
  /**
   * 查看职位详情
   */
  viewPositionDetail: (e) => {
    console.log(e)
    app.navTo('positionDetail', { positionId: e.currentTarget.dataset.pid })
  },
})
const app = getApp()
var startX, endX;
var moveFlag = true; // 判断执行滑动事件

Page({
  data: {
    page: 1,
    ani1: '',
    ani2: '',
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
          positionList1: [{
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
          positionList1: [{
            name: "甘肃行知成教育科技有限公司",
            job: "志愿者",
            place: "甘肃省内、省外",
              status: "已投递"
            },
            {
              name: "xxxx营地",
              job: "营地指导员",
              place: "南山科技园讯美广场1号楼6楼6105",
              status: "已面试"
            },
            {
              name: "xxxxx营地",
              job: "营地指导员",
              place: "南山科技园讯美广场1号楼6楼6105",
              status: "面试通过"
            },
            {
              name: "xxxxxx营地",
              job: "营地指导员",
              place: "南山科技园讯美广场1号楼6楼6105",
              status: "已投递"
            }
          ],
          positionList2: [{
            name: "xx营地",
            job: "营地指导员",
            place: "南山科技园讯美广场1号楼6楼6105",
            status: "不合适"
          },
          {
            name: "xxxx营地",
            job: "营地指导员",
            place: "南山科技园讯美广场1号楼6楼6105",
            status: "已查看"
          },
          {
            name: "xxxxx营地",
            job: "营地指导员",
            place: "南山科技园讯美广场1号楼6楼6105",
            status: "面试通过"
          },
          {
            name: "xxxxxx营地",
            job: "营地指导员",
            place: "南山科技园讯美广场1号楼6楼6105",
            status: "待面试"
          }
          ]
        })
      }
    })
  },



  swichNav1: function(e) {
    console.log(e);
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
    console.log(e);
    var that = this;
    if (this.data.page === e.target.dataset.current+1) {
      return false;
    } else {
      that.setData({
        page: 2,
        ani2: '',
      })
    }

  },

})
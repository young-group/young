// pages/positionDetail/positionDetail.js
var http = require('../../utils/http')
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
   position:{},
   haveCollect:false,
   haveEnroll:false
  },

  /**
   * 查看公司详细招聘信息
   */
  viewCompanyDetail: (e) => {
     
    app.navTo('companyDetail', { cid: e.currentTarget.dataset.pid})
  },
  haveCollect (e)  {
    var that =this
    var pid = e.currentTarget.dataset.pid
    var uid = wx.getStorageSync('basicUser').uid;
    // console.log("pid--"+pid+"----uid"+uid)
    if(this.data.haveCollect==true){
      wx.request({
        url: app.globalData.urlHead +'collections/'+uid+'/'+pid,
        method:'delete',
        header: {
          'content-type': 'application/json' // 默认值
        },
        success(res) {
          if (res.data == "success") {
            that.setData({
              haveCollect: false
            }),
            wx.showToast({
              title: '取消收藏成功',
              icon:'none',
              duration:1000
            })

          }
        },
        fail(e) {
          console.log(e.errMsg)
        }
      })
    }else{
      wx.request({
        url: app.globalData.urlHead +'collections/'+uid+'/'+pid,
        method:'post',
        header: {
          'content-type': 'application/json' // 默认值
        },
        success(res) {
          if (res.data == "success") {
            that.setData({
              haveCollect: true
            }),
              wx.showToast({
                title: '收藏成功',
                icon: 'none',
                duration: 1000
              })

          }
        },
        fail(e) {
          console.log(e.errMsg)
        }
      })
    }
  },
  haveEnroll(e) {
    var that = this
    var pid = e.currentTarget.dataset.pid
    var uid = wx.getStorageSync('basicUser').uid;
    console.log("pid--" + pid + "----uid" + uid)
    if(this.data.haveEnroll==true){
       wx.showToast({
         title: '已经报名,请前去个人中心查看状态',
         icon:'none',
         duration:2000
       })
       return 
    }else{
      wx.request({
        url: app.globalData.urlHead +'enrolls/willingToEnroll/'+pid+'/'+uid,
        method:'post',
        header: {
          'content-type': 'application/json' // 默认值
        },
        success(res) {
          if (res.data == "success") {
            that.setData({
              haveEnroll: true
            }),
              wx.showToast({
                title: '报名成功',
                icon: 'none',
                duration: 1000
              })

          }
        },
        fail(e) {
          console.log(e.errMsg)
        }
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  //获取传递过来的参数pid 代表营地公司的编号
  onLoad: function (options) {
   
    this.loadData(options.positionId)
    this.loadCollect(options.positionId)
    this.loadEnroll(options.positionId)
  },
  //判断当前用户有没有收藏过这条职位
  loadCollect:function(pid){ 
    console.log(" -------------loadCollect:function(pid)"+pid)
    var uid = wx.getStorageSync('basicUser').uid;
    var that = this;
    wx.request({
      url: app.globalData.urlHead +'collections/'+uid+'/'+pid,
      method:'get',
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success(res) {
        if(res.data==true){
          console.log(" loadCollect:function(pid)")
          that.setData({
            haveCollect: true
          })
        }
      },
      fail(e) {
        console.log(e.errMsg)
      }
    })
  },
  //判断有没有已经报名了
  loadEnroll: function (pid) {
    var uid = wx.getStorageSync('basicUser').uid;
    var that = this;
    wx.request({
      url: app.globalData.urlHead +'enrolls//isEnroll/'+pid+'/'+uid,
     method:'get',
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success(res) {
        if(res.data==true){
         that.setData({
          haveEnroll:true
         })
        }
      },
      fail(e) {
        console.log(e.errMsg)
      }
    })
  },


  /**
   * 加载这家营地发布的需求数据
   */
  loadData: function (pid1) {
    var that = this;
    wx.request({
      url: app.globalData.urlHead +'position/getPosition/'+pid1,
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        that.setData({
           position:res.data
        })
      },
      fail(e) {
        console.log(e.errMsg)
      }
    })
  }
})

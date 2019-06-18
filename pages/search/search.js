//index.js
//获取应用实例
var http = require('../../utils/http.js')
const app = getApp()

Page({
  data: {
    pageNo: 1,
    showBtn: false, // 默认不显示加载更多按钮
    isLoading: false, // 请求状态
    positionList: [],
    city:'',
    imgUrls: [
      '../../static/images/10.jpg',
      '../../static/images/11.jpg',
      '../../static/images/12.jpg',
      '../../static/images/13.jpg',
    ],
    indicatorDots: true,
    autoplay: true,
    interval: 3000,
    duration: 500,
    searchInput:""
  },
  //下拉触发事件
  // onPullDownRefresh: function () {
  //   this.loadData(1)
  // },
  //上拉拉到底触发的事件
  onReachBottom: function () {
    wx.showToast({
      title: '无更多数据',
      icon: 'none',
      duration: 2000

    })
  },

  // //事件处理函数
  // gotoCustomInfo: function () {
  //   this.loadData(this.data.pageNo + 1)
  // },

  searchInput:function (e) {
    this.setData({
      searchInput: e.detail.value
    })
  },
  trim:function(str){ //删除左右两端的空格
    return str.replace(/(^\s*)|(\s*$)/g, "");
  },
  searchAction: function (e) {
    console.log("-------" + this.data.searchInput)
    var data = this.trim(this.data.searchInput)
    if (data == ""||data==null){
      wx.showToast({
        title: '请输入查找的条件',
        icon: 'none',
        duration: 2000
      })
      return
    }
    this.loadSearcheData(this.data.searchInput)
  },
  /**
   * 查看职位详情
   */
  viewPositionDetail: (e) => {
    app.navTo('positionDetail', { positionId:    e.currentTarget.dataset.pid })
  },
  
  selectCity: (e) => {
      wx.navigateTo({
        url: '../city/city?cityType=begin',
      })
     app.navTo('city', { positionId: e.currentTarget.dataset.pid })
  },
  /**
   * 通用请求数据函数
   *
   * @param {Number} pageNo 自定义的页码请求
   */
  loadSearcheData: function (e) {
    wx.showLoading({
      title: '加载中',
    })
    var that = this;
    wx.request({
      url: app.globalData.urlHead +'es/getPosition/' + e, 
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        console.log(res.data)
        if (res.data == null || res.data == "") {
          wx.showToast({
            title: '未搜索到数据',
            icon: 'none',
            duration: 2000
          })
          return
        }
        that.setData({
          positionList: res.data
          
        }),
          console.log(that.data.positionList)
          
          wx.hideLoading();
      },
      fail(err) {
        console.log("--------"+err)
        wx.showToast({
          title: '操作失败',
          icon: 'none',
          duration: 2000
        })
      }
    })
  },

  onShow: function () {
    this.setData({
      city: app.globalData.city
    })
    this.loadData(this.data.pageNo)
  },

  loadData: function (e) {
    wx.showLoading({
      title: '加载中',
    })
    var that = this;
    wx.request({
      url: app.globalData.urlHead + 'position/getPosition/search', // 仅为示例，并非真实的接口地址

      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        console.log(res)
        if (res.data == null || res.data == "") {
          wx.hideLoading();
          wx.showToast({
            title: '无更多数据',
            icon: 'none',
            duration: 2000

          })

          return
        }
        that.setData({
          positionList: res.data,

          pageNo: e

        }),
          wx.hideLoading();
      },
      fail(err) {
        wx.showToast({
          title: '操作失败',
          icon: 'none',
          duration: 2000
        })
      }
    })
  }
})

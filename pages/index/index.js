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
  },
  //下拉触发事件
  onPullDownRefresh: function () {
    this.loadData(this.data.pageNo )
  },
  //上拉拉到底触发的事件
  onReachBottom: function () {
    if(this.data.pageNo-1==0){
         return
    }
    this.loadData(this.data.pageNo-1)
  },

  //事件处理函数
  gotoCustomInfo: function () {
   this.loadData(this.data.pageNo+1)
  },

  /**
   * 查看职位详情
   */
  viewPositionDetail: (e) => {
    app.navTo('positionDetail', {positionId: e.currentTarget.dataset.pid})
  },
  /**
   * 通用请求数据函数
   *
   * @param {Number} pageNo 自定义的页码请求
   */
  loadData: function (e) {
    var that = this;
    wx.request({
      url: 'http://localhost:8080/position/getPositionOfPage/'+e, // 仅为示例，并非真实的接口地址
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        that.setData({
          positionList: [{
            companyLogo:"sss",
            companyName: "行知成教育科技有限公司",
            workAddress: "甘肃省内、省外",
            salary: "80-100",
            beginTime: 2019
          }],
          pageNo:e
          
        })
      },
      fail(err) {
        wx.showToast({
          title: '操作失败',
          icon: 'none',
          duration: 2000
        }),    
        that.setData({
          positionList: [{
            companyLogo: "sss",
            companyName: "行知成教育科技有限公司",
            workAddress: "甘肃省内、省外",
            salary: "80-100",
            beginTime: 2019
          }
          ]
      })
      }
    })
  },
  onShow: function () {
    this.loadData(this.data.pageNo)
  }
})

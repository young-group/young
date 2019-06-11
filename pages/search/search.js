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
      '../../static/images/1.jpg',
      '../../static/images/2.jpg',
      '../../static/images/3.jpg',
      '../../static/images/3.jpg'
    ],
    indicatorDots: true,
    autoplay: true,
    interval: 3000,
    duration: 500,

  },

  //事件处理函数
  gotoCustomInfo: function() {
    app.navTo('customInfo')
  },

  /**
   * 查看职位详情
   */
  viewPositionDetail: (e) => {
    app.navTo('positionDetail', {
      positionId: e.currentTarget.dataset.pid
    })
  },

  /**
   * 加载更多
   *
   */
  loadMore() {
    this.loadData(this.data.pageNo + 1)
  },
  /**
   * 通用请求数据函数
   *
   * @param {Number} pageNo 自定义的页码请求
   */
  loadData: function(e) {
    var that = this;
    wx.request({
      url: 'http://localhost:8080/test', // 仅为示例，并非真实的接口地址
      data: {
        pageNo: e
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        console.log(res.data);
        that.setData({
          positionList: [{
              companyFullName: "营地导师",
              city: "甘肃省内、省外",
              salary: "80-100/日",
              createTime: 2019
            },
            {
              companyFullName: "黑龙江科技大学",
              city: "哈尔滨",
              salary: 15,
              createTime: 2018
            }
          ]
        })


      },
      fail(e) {
        console.log(e.errMsg)
        that.setData({
          positionList: [{
            companyFullName: "营地导师",
            city: "甘肃省内、省外",
            salary: "80-100/日",
            createTime: 2019,
            companyLogo: "../../static/images/5.jpg"
          },
          {
            companyFullName: "营地导师",
            city: "哈尔滨",
            salary: "150/日",
            createTime: 2019,
            companyLogo: "../../static/images/6.jpg"
          },
          {
            companyFullName: "营地导师",
            city: "沈阳",
            salary: "100/日",
            createTime: 2019,
            companyLogo: "../../static/images/4.jpg"
            }, {
              companyFullName: "营地导师",
              city: "甘肃省内、省外",
              salary: "80-100/日",
              createTime: 2019,
              companyLogo: "../../static/images/5.jpg"
            },
            {
              companyFullName: "营地导师",
              city: "哈尔滨",
              salary: "150/日",
              createTime: 2019,
              companyLogo: "../../static/images/6.jpg"
            },
            {
              companyFullName: "营地导师",
              city: "沈阳",
              salary: "100/日",
              createTime: 2019,
              companyLogo: "../../static/images/4.jpg"
            }, {
              companyFullName: "营地导师",
              city: "甘肃省内、省外",
              salary: "80-100/日",
              createTime: 2019,
              companyLogo: "../../static/images/5.jpg"
            },
            {
              companyFullName: "营地导师",
              city: "哈尔滨",
              salary: "150/日",
              createTime: 2019,
              companyLogo: "../../static/images/6.jpg"
            },
            {
              companyFullName: "营地导师",
              city: "沈阳",
              salary: "100/日",
              createTime: 2019,
              companyLogo: "../../static/images/4.jpg"
            }, {
              companyFullName: "营地导师",
              city: "甘肃省内、省外",
              salary: "80-100/日",
              createTime: 2019,
              companyLogo: "../../static/images/5.jpg"
            },
            {
              companyFullName: "营地导师",
              city: "哈尔滨",
              salary: "150/日",
              createTime: 2019,
              companyLogo: "../../static/images/6.jpg"
            },
            {
              companyFullName: "营地导师",
              city: "沈阳",
              salary: "100/日",
              createTime: 2019,
              companyLogo: "../../static/images/4.jpg"
            }, {
              companyFullName: "营地导师",
              city: "甘肃省内、省外",
              salary: "80-100/日",
              createTime: 2019,
              companyLogo: "../../static/images/5.jpg"
            },
            {
              companyFullName: "营地导师",
              city: "哈尔滨",
              salary: "150/日",
              createTime: 2019,
              companyLogo: "../../static/images/6.jpg"
            },
            {
              companyFullName: "营地导师",
              city: "沈阳",
              salary: "100/日",
              createTime: 2019,
              companyLogo: "../../static/images/4.jpg"
            }, {
              companyFullName: "营地导师",
              city: "甘肃省内、省外",
              salary: "80-100/日",
              createTime: 2019,
              companyLogo: "../../static/images/5.jpg"
            },
            {
              companyFullName: "营地导师",
              city: "哈尔滨",
              salary: "150/日",
              createTime: 2019,
              companyLogo: "../../static/images/6.jpg"
            },
            {
              companyFullName: "营地导师",
              city: "沈阳",
              salary: "100/日",
              createTime: 2019,
              companyLogo: "../../static/images/4.jpg"
            }, {
              companyFullName: "营地导师",
              city: "甘肃省内、省外",
              salary: "80-100/日",
              createTime: 2019,
              companyLogo: "../../static/images/5.jpg"
            },
            {
              companyFullName: "营地导师",
              city: "哈尔滨",
              salary: "150/日",
              createTime: 2019,
              companyLogo: "../../static/images/6.jpg"
            },
            {
              companyFullName: "营地导师",
              city: "沈阳",
              salary: "100/日",
              createTime: 2019,
              companyLogo: "../../static/images/4.jpg"
            }]
        })
      }
    })
  },
  onLoad: function() {
    this.loadData()
  }
})
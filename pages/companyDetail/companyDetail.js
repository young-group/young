// pages/positionDetail/positionDetail.js
var http = require('../../utils/http')
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    positionName: '', // 职位名称
    haveCollect: '', // 是否已收藏
    salary: '', // 薪水
    positionAddress: '', // 地址
    jobNature: '', // 职位类型
    workYear: '', // 工作年龄
    education: '', // 文化要求
    advantage: '', // 职位诱惑
    companyLogo: '', // 公司logo
    companyShortName: '', // 公司名称
    positionDesc: '', // 职位描述
    page: ' ', // 评价相关信息
  },

  /**
   * 查看公司详细招聘信息
   */
  viewCompanyDetail: (e) => {
    console.log(e.currentTarget.dataset.pid);
    app.navTo('companyDetail', {
      pid: e.currentTarget.dataset.pid
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  //获取传递过来的参数pid 代表营地公司的编号
  onLoad: function(options) {
    console.log("sssssssss");
    console.log(options.positionId);
    this.loadData(options.positionId)
  },
  /**
   * 加载这家营地发布的需求数据
   */
  loadData: function(pid1) {
    console.log(pid1)
    var that = this;
    wx.request({
      url: 'http://localhost:8080/test', // 仅为示例，并非真实的接口地址
      data: {
        pid: pid1
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        console.log(res.data);
        that.setData({
          positionName: '夏令营', // 职位名称
          haveCollect: true, // 是否已收藏
          salary: '80-100/日', // 薪水
          positionAddress: '哈尔滨', // 地址
          jobNature: '营地', // 职位类型
          workYear: '2019.3.8-4.9', // 工作年龄
          education: '无限制', // 文化要求
          advantage: '爱来不来', // 职位诱惑
          companyLogo: '../static/images/company_logo.png', // 公司logo
          companyShortName: '水水', // 公司名称
          positionDesc: '想来加来呀 我们很nice的', // 职位描述
          page: 'sscavenge ', // 评价相关信息
        })
      },
      fail(e) {
        console.log(e.errMsg)
        that.setData({
          positionName: '夏令营', // 职位名称
          haveCollect: true, // 是否已收藏
          salary: '80-100/日', // 薪水
          positionAddress: '哈尔滨', // 地址
          jobNature: '营地', // 职位类型
          workYear: '2019.3.8-4.9', // 工作年龄
          education: '无限制', // 文化要求
          advantage: '爱来不来', // 职位诱惑
          companyLogo: '../../static/images/6.jpg', // 公司logo
          companyShortName: '水水', // 公司名称
          positionDesc: '想来加来呀 我们很nice的', // 职位描述
          page: 'sscavenge ', // 评价相关信息

        })

      }
    })
  }
})
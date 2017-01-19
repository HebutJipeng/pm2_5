//引入百度地图API
var bmap = require('../../libs/bmap-wx.js');

//获取应用实例
var app = getApp()
Page({
    data: {
        pagedata: {},
        loading: false
    },
    //事件处理函数
    bindViewTap: function() {
        wx.navigateTo({
            url: '../logs/logs'
        })
    },
    bindShareTap: function() {
        // wx.showToast({
        //   title: '分享成功',
        //   icon: 'success',
        //   duration: 10000
        // })
        // setTimeout(function() {
        //   wx.hideToast();
        // }, 2000)
        // wx.getLocation({
        //     type: 'wgs84',
        //     success: function(res) {
        //         var latitude = res.latitude
        //         var longitude = res.longitude
        //         var speed = res.speed
        //         var accuracy = res.accuracy
        //         console.log("------", res)
        //     }
        // })
        
    },
    refresh: function() {
        console.log("1111111111")
        var that = this 
        that.setData({
            loading: false
        })
        var callInfos = function(data) {
            console.log("-----> call API");
            // wx.request({
            //     url: 'http://www.pm25.in/api/querys/pm2_5.json',
            //     data: {
            //         city: "北京",
            //         token: "5j1znBVAsnSf5xQyNQyq"
            //     },
            //     header: {
            //         'content-type': 'application/json'
            //     },
            //     success: function(res) {
            //         console.log("========> callInfos", res)

            //     },
            //     fail: function(res) {

            //     }
            // })
            wx.request({
                url: 'http://localhost:8888/',
                data: {
                    city: "石家庄",
                    token: "5j1znBVAsnSf5xQyNQyq"
                },
                header: {
                    'content-type': 'application/json'
                },
                success: function(res) {
                    console.log("ssss========> callInfos", res)
                    that.setData({
                        pagedata: res.data,
                        loading: true
                    })

                },
                fail: function(res) {

                }
            })
        }
        callInfos();
    },
    onLoad: function() {
        console.log('onLoad')
        var that = this
            //调用应用实例的方法获取全局数据
        app.getUserInfo(function(userInfo) {
            //更新数据
            that.setData({
                userInfo: userInfo
            })
        })

        var callInfos = function(data) {
            console.log("-----> call API");
            // wx.request({
            //     url: 'http://www.pm25.in/api/querys/pm2_5.json',
            //     data: {
            //         city: "北京",
            //         token: "5j1znBVAsnSf5xQyNQyq"
            //     },
            //     header: {
            //         'content-type': 'application/json'
            //     },
            //     success: function(res) {
            //         console.log("========> callInfos", res)

            //     },
            //     fail: function(res) {

            //     }
            // })
            wx.request({
                url: 'http://localhost:8888/',
                data: {
                    city: "北京",
                    token: "5j1znBVAsnSf5xQyNQyq"
                },
                header: {
                    'content-type': 'application/json'
                },
                success: function(res) {
                    console.log("========> callInfos", res)
                    that.setData({
                        pagedata: res.data,
                        loading: true
                    })

                },
                fail: function(res) {

                }
            })
        }
        var BMap = new bmap.BMapWX({
            ak: 'tNh60bOhZqFsWmoS3YKbh2Nk8e075uIZ'
        });
        var fail = function(data) {
            console.log(data)
        };
        var success = function(data) {
                console.log("----->", data);
                callInfos();
            }
            // 发起regeocoding检索请求 
        BMap.regeocoding({
            fail: fail,
            success: success,
            iconPath: '../../img/marker_red.png',
            iconTapPath: '../../img/marker_red.png'
        });
    },
    onShareAppMessage: function () {
        return {
          title: 'pm2.5',
          desc: '自定义分享描述',
          path: '/page/weather'
        }
        }
})

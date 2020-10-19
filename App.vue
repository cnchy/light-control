<script>
var plugins = require('@/common/plugins.js');
import{ getColorTemperature , getLightDegree} from '@/common/tempreture.js'	
import Vue from 'vue'
	export default {
		data(){
			return{
				plugins:plugins
			}
		},
		onLaunch: function() {
			uni.getSystemInfo({
				success: function(e) {
					// #ifndef MP
					Vue.prototype.StatusBar = e.statusBarHeight;
					if (e.platform == 'android') {
						Vue.prototype.CustomBar = e.statusBarHeight + 50;
					} else {
						Vue.prototype.CustomBar = e.statusBarHeight + 45;
					};
					// #endif

					// #ifdef MP-WEIXIN
					Vue.prototype.StatusBar = e.statusBarHeight;
					let custom = wx.getMenuButtonBoundingClientRect();
					Vue.prototype.Custom = custom;
					Vue.prototype.CustomBar = custom.bottom + custom.top - e.statusBarHeight;
					// #endif		

					// #ifdef MP-ALIPAY
					Vue.prototype.StatusBar = e.statusBarHeight;
					Vue.prototype.CustomBar = e.statusBarHeight + e.titleBarHeight;
					// #endif
				}
			})
			uni.getStorage({
			    key: 'internetInfo',
				fail:function (res) {
					//如果没找到初始化
					uni.setStorage({
					    key: 'internetInfo',
					    data: "192.168.4.1:8080",
					    success: function () {
					    }
					});
			    }
			});
			this.connect(),
			uni.getStorage({
			    key: 'degreeMap',
			    success: function (res) {
			    },
				fail() {
					uni.setStorage({
					    key: 'degreeMap',
					    data: {
							 "01": [277,529],
							 "02": [188,468],
							 "03": [171,436],
							 "04": [164,434],
							 "05": [146,433],
							 "06": [205,486],
							 "07": [183,474],
							 "08": [145,445],
							 "09": [120,412],
							 "10": [163,490],
							 "11": [188,470],
							 "12": [207,480],
							 "13": [132,443],
							 "14": [150,500],
							 "15": [162,445],
							 "16": [160,472]
						 },
					    success: function () {
					    }
					});
				}
			})
			uni.getStorage({
			    key: 'tempretureMap',
			    success: function (res) {
			    },
				fail() {
					uni.setStorage({
					    key: 'tempretureMap',
					    data:{
							"2000k": [620,300,60,620,60 ], 
							"3000k": [540,300,120,540,120 ], 
							"4000k": [460,300,180,460,180 ], 
							"5000k": [380,300,240,380,240 ], 
							"6000k": [300,300,300,300,300 ], 
							"7000k": [240,300,380,240,380 ], 
							"8000k": [180,300,460,180,460 ], 
							"9000k": [120,300,540,120,540 ], 
							"10000k": [60,300,620,60,620 ],
						},
					    success: function () {
					    }
					});
				}
			})
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			
		},
		methods:{
			connect(){
				let that = this 
				try {
				   let ipArr  = uni.getStorageSync('internetInfo').split(":");
				   console.log("系统第一次进来开始tcp连接")
				   this.plugins.openTcp(
				       ipArr[0],
				       ipArr[1],
				       function(result) {
						//	uni.showToast({title:result,icon:'none'});
				       },
				       function(result) {
						//	uni.showToast({title:result,icon:'none'});
				       }
				   );				  
				} catch (e) {
				    uni.showToast({title:"网络连接失败！请检查wifi连接 以及 IP端口配置！",icon:'none'});
				}
				
			}
		}

	}
</script>

<style>
	@import "colorui/main.css";
	@import "colorui/icon.css";
	@import "icon/iconfont.css";
	.uni-slider-wrapper .uni-slider-value{
		color: white !important;
		font-size: 30upx;
		
	}
	uni-slider {
		margin: 0px 0px;
	
	}
	.uni-input-input{
		text-align: right;
	}
	.uni-slider .uni-slider-handle-wrapper{
		height: 6px;
	}
	.nav-list {
		display: flex;
		flex-wrap: wrap;
		padding: 0px 40upx 0px;
		justify-content: space-around;
	}
	
	.nav-li {
		padding: 30upx;
		background-size: cover;
		background-position: center;
		position: relative;
		z-index: 1;
	}
	
	.nav-li::after {
	/* 	content: "";
		position: absolute;
		z-index: -1;
		background-color: inherit;
		width: 100%;
		height: 100%;
		left: 0;
		bottom: -10%;
		border-radius: 10upx;
		opacity: 0.2;
		transform: scale(0.9, 0.9); */
	}
	
	.nav-li.cur {
		color: #fff;
		background: rgb(94, 185, 94);
		box-shadow: 4upx 4upx 6upx rgba(94, 185, 94, 0.4);
	}
	
	.nav-title {
		font-size: 32upx;
		font-weight: 300;
	}
	
	.nav-title::first-letter {
		font-size: 40upx;
		margin-right: 4upx;
	}
	
	.nav-name {
		font-size: 28upx;
		text-transform: Capitalize;
		margin-top: 20upx;
		position: relative;
	}
	
	.nav-name::before {
		content: "";
		position: absolute;
		display: block;
		width: 40upx;
		height: 6upx;
		background: #fff;
		bottom: 0;
		right: 0;
		opacity: 0.5;
	}
	
	.nav-name::after {
		content: "";
		position: absolute;
		display: block;
		width: 100upx;
		height: 1px;
		background: #fff;
		bottom: 0;
		right: 40upx;
		opacity: 0.3;
	}
	
	.nav-name::first-letter {
		font-weight: bold;
		font-size: 36upx;
		margin-right: 1px;
	}
	
	.nav-li text {
		position: absolute;
		right: 30upx;
		top: 30upx;
		font-size: 52upx;
		width: 60upx;
		height: 60upx;
		text-align: center;
		line-height: 60upx;
	}
	
	.text-light {
		font-weight: 300;
	}
	
	@keyframes show {
		0% {
			transform: translateY(-50px);
		}
	
		60% {
			transform: translateY(40upx);
		}
	
		100% {
			transform: translateY(0px);
		}
	}
	
	@-webkit-keyframes show {
		0% {
			transform: translateY(-50px);
		}
	
		60% {
			transform: translateY(40upx);
		}
	
		100% {
			transform: translateY(0px);
		}
	}
</style>

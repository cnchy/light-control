<template>
	<view  class="page" style="height: 100vh;">
		<cu-custom :bgImage="bg_titlebar">
			<block slot="content">
				系统设置
			</block>
		</cu-custom>
		<view class="room">
			<view class="title"> IP</view>
			<view>
				 <input class="uni-input"  placeholder="请输入IP" v-model="ip"/>
			</view>
		</view>
		<view class="room">
			<view class="title">端口</view>
			<view>
				 <input class="uni-input"  placeholder="请输入端口" v-model="port"/>
			</view>
		</view>
		<view class="room" style="text-align: center;">
			<button class="cu-btn round" @click="saveInternet()">保存</button>
		</view>
	</view>
</template>

<script>
	var plugins = require('@/common/plugins.js');
	
	import bg_titlebar from '@/static/bg_titlebar.png';
	export default {
		data() {
			return {
				plugins:plugins,
				bg_titlebar:bg_titlebar,
				ip:'',
				port:''
			}
		},
		mounted() {
			let that =this
			uni.getStorage({
			    key: 'internetInfo',
			    success: function (res) {
				   let arr = res.data.split(":") 
			       that.ip = arr[0]
				   that.port = arr[1]
			    }
			});
		},
		methods: {
			saveInternet(){
				let that =this
				let internetInfo = this.ip +":"+ this.port
				uni.setStorage({
				    key: 'internetInfo',
				    data: internetInfo,
				    success: function () {
				        uni.showToast({
				        	title: '保存成功！',
				        	duration: 2000
				        })
						that.connect()
				    }
				});
			},
			connect(){
				try {
					let that =this
					uni.getStorage({
				       key: 'internetInfo',
				       success: function (res) {
							let ipArr = res.data.split(":") 
							that.ip = ipArr[0]
							that.port = ipArr[1]
							that.plugins.openTcp(
							    ipArr[0],
							    ipArr[1],
							    function(result) {
									uni.showToast({title:result,icon:'none'});
							    },
							    function(result) {
									uni.showToast({title:result,icon:'none'});
							    }
							);
				       },
					   fail:function(){
						   //uni.showToast({title:"网络连接成功！",icon:'none'}); 
					   }
				   });
				} catch (e) {
				    uni.showToast({title:"网络连接失败！请检查wifi连接 以及 IP端口配置！",icon:'none'});
				}
			}
		}
	}
</script>

<style>
	page {

	}
	.page{
		background-image: url('~@/static/bg_app.png');
	}
	.room{
		width: 98%;
		margin: 20upx auto;
		padding: 10upx;
		position: relative;
		border-radius: 2px;
		box-shadow: 0 2px 10px rgba(0,0,0,.12), 0 2px 5px rgba(0,0,0,.16);
		background-image: linear-gradient(to top right, #6F737C, #34363A);
		color: white;
	}
	
</style>

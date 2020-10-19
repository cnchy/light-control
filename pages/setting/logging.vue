<template>
	<view  class="page" style="height: 100vh;">
		<cu-custom :bgImage="bg_titlebar">
			<block slot="content">
				日志
			</block>
		</cu-custom>
		<view class="room">
			<div v-for="(item,index) in logData" :key="index">
				{{ item }}
			</div>
		</view>
		<view class="room" style="text-align: center;display: flex;justify-content: space-around;">
			<button class="cu-btn round" @click="clear()">清空日志</button>
			<navigator class="cu-btn round"  url="/pages/index/index" style="color: #000000;">返回</navigator>
		</view>
	</view>
</template>

<script>
	import bg_titlebar from '@/static/bg_titlebar.png';
	
	export default {
		data() {
			return {
				bg_titlebar:bg_titlebar,
				logData:[]
			}
		},
		onShow() {
			let that =this 
			uni.getStorage({
			    key: 'logging',
			    success: function (res) {
			       that.logData = res.data
			    }
			});
		},
		methods: {
			clear(){
				this.logData=[]
				uni.setStorage({
				    key: 'logging',
				    data:[],
				    success: function () {
				    }
				});
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

<template>
	<view  class="page" style="height: 100vh;">
		<cu-custom :bgImage="bg_titlebar">
			<block slot="content">
				预设模式列表
			</block>
		</cu-custom>
		<scroll-view scroll-y>
			<view class="room" v-for="(item,index) in presetData" :key="index"  style="text-align: center;display: flex;justify-content: space-between;">
				<view style="font-size: 40upx;">
					{{item.name}}
				</view>
				<view class="">
					<button class="cu-btn round" @click="applyPreset(item)">应用</button>
				</view>
			</view>
			<view class="room" style="text-align: center;display: flex;justify-content: space-around;">
				<button class="cu-btn round" @click="clearPreset()">清空预设</button>
			</view>
			<view style="height: 80upx;">
				
			</view>
		</scroll-view>
	</view>
</template>

<script>

import bg_titlebar from '@/static/bg_titlebar.png';
export default {
	data() {
		return {
			bg_titlebar:bg_titlebar,
			presetData:[]
		}
	},
	mounted() {	
		let that =this
		uni.getStorage({
		    key: 'preset',
		    success: function (res) {
		       that.presetData = res.data
		    },
			fail: function (res) {
		       that.presetData = res.data
		    },
		});
	},
	methods: {
		applyPreset(item){
			this.$emit("applyPreset",item)
		},
		clearPreset(){
			this.presetData=[]
			uni.setStorage({
			    key: 'preset',
			    data:[],
				success() {
					uni.showToast({
						title:"删除成功"
					})
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
		margin: 10upx auto;
		padding: 10upx;
		position: relative;
		border-radius: 2px;
		box-shadow: 0 2px 10px rgba(0,0,0,.12), 0 2px 5px rgba(0,0,0,.16);
		background-image: linear-gradient(to top right, #6F737C, #34363A);
		color: white;
	}
	

	
</style>

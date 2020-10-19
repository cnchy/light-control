<template>
	<view  class="page" style="height: 100vh;">
		
		<cu-custom :bgImage="bg_titlebar">
			<block slot="content">
				吊灯角度设置
			</block>
		</cu-custom>
		<view class="room">
			<view class="title"> 
			<view class="light-no">
				灯号
			</view>
			<view class="light-degree">
				下限
			</view>
			<view class="light-degree">
				上限
			</view>
			</view>
		</view>
		<view class="room" v-for="(value, key) in degreeMap" :key="key">
			<view class="title"> 
			<view class="light-no">
				#{{key}}
			</view>
			<view class="light-degree">
				<yp-number-box  min=0 max=999  @change="changeArgsMin($event,key)" :value="value[0]" ></yp-number-box>
			</view>
			
			<view class="light-degree">
				<yp-number-box  min=0 max=999  @change="changeArgsMax($event,key)" :value="value[1]" ></yp-number-box>
			</view>
			</view>
			
		</view>
		
		<view class="room" style="text-align: center;display: flex;justify-content: space-around;">
			<button class="cu-btn round" @click="saveDegree()">保存</button>
			<!-- <button class="cu-btn round" @click="restoreDegree()">还原初始</button> -->
			<navigator class="cu-btn round"  url="/pages/index/index" style="color: #000000;">返回</navigator>
		</view>
	</view>
</template>

<script>
	import ypNumberBox from "@/components/yp-number-box/yp-number-box.vue";
	import bg_titlebar from '@/static/bg_titlebar.png';
	export default {
		components: {ypNumberBox},
		data() {
			let tempMap = uni.getStorageSync('degreeMap');
			return {
				bg_titlebar,
				degreeMap: tempMap			
			}
		},
		mounted() {
			
		},
		methods: {
			changeArgsMin(e,key){
				 this.degreeMap[key][0]=e.detail.value
			},
			changeArgsMax(e,key){
				 this.degreeMap[key][1]=e.detail.value
			},
			restoreDegree(){
				this.degreeMap = {
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
					}
				uni.setStorage({
				    key: 'degreeMap',
				    data:this.degreeMap,
				    success: function () {
						uni.showToast({ title: '还原成功！'});
				    },
					fail() {
						uni.showToast({ title: '还原失败！'});
					}
				});
				this.reload();
			},
			saveDegree(){
				uni.setStorage({
				    key: 'degreeMap',
				    data:  this.degreeMap,
				    success: function () {
				    	uni.showToast({ title: '保存成功！'});
				    },
				    fail() {
				    	uni.showToast({ title: '保存失败！'});
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
	    display: flex;
		justify-content: flex-end;
	}

	.light-no{
		position: absolute;
		height:20upx;
		width: 160upx;
		left: 10upx;
	}
	.light-degree{
		display: inline-block;
		height:20upx;
		width: 160upx;
		margin-left: 20upx;
		text-align: center;
	}
</style>

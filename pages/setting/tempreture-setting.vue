<template>
	<view  class="page" style="height: 100vh;">
		<cu-custom :bgImage="bg_titlebar">
			<block slot="content">
				色温参数设置
			</block>
		</cu-custom>
		<view class="room" v-for="(value, key) in tempretureMap" :key="key">
			<view class="title"> 
			<view class="light-no">
				{{key}}
			</view>
			<view class="light-degree">
				<yp-number-box  min=0 max=999  @change="changeArgs($event,key,0)" :value="value[0]" ></yp-number-box>
			</view>
			
			<view class="light-degree">
				<yp-number-box  min=0 max=999  @change="changeArgs($event,key,1)" :value="value[1]" ></yp-number-box>
			</view>
			<view class="light-degree">
				<yp-number-box  min=0 max=999  @change="changeArgs($event,key,2)" :value="value[2]" ></yp-number-box>
			</view>
			<view class="light-degree">
				<yp-number-box  min=0 max=999  @change="changeArgs($event,key,3)" :value="value[3]" ></yp-number-box>
			</view>
			<view class="light-degree">
				<yp-number-box  min=0 max=999  @change="changeArgs($event,key,4)" :value="value[4]" ></yp-number-box>
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
			let tempretureMap = uni.getStorageSync('tempretureMap');
			return {
				bg_titlebar,
				tempretureMap: tempretureMap
			}
		},
		mounted() {
			
		},
		methods: {
			changeArgs(e,key,index){
				 this.tempretureMap[key][index]=e.detail.value
			},
			
			restoreDegree(){
				this.tempretureMap = {
						 "2000k": [620,300,60,620,60 ],
						 "3000k": [540,300,120,540,120 ], 
						 "4000k": [460,300,180,460,180 ], 
						 "5000k": [380,300,240,380,240 ], 
						 "6000k": [300,300,300,300,300 ], 
						 "7000k": [240,300,380,240,380 ], 
						 "8000k": [180,300,460,180,460 ], 
						 "9000k": [120,300,540,120,540 ], 
						 "10000k": [60,300,620,60,620 ]
					}
				uni.setStorage({
				    key: 'tempretureMap',
				    data:this.tempretureMap,
				    success: function () {
						uni.showToast({ title: '还原成功！'});
				    },
					fail() {
						uni.showToast({ title: '还原失败！'});
					}
				});
				this.$router.go(0);
			},
			saveDegree(){
				uni.setStorage({
				    key: 'tempretureMap',
				    data:  this.tempretureMap,
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
		height:40upx;
		width: 160upx;
		left: 10upx;
	}
	.light-degree{
		display: inline-block;
		height:20upx;
		width: 120upx;
		margin-left: 20upx;
	}
</style>

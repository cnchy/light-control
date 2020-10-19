<template>
	<view class="page" style="height: 100vh;">
		<view class="connectClass">
			<span v-if="connectStatus" class="iconfont  icon-zaixian" style="color:lightblue ;"></span>
			<span v-if="!connectStatus" class="iconfont  icon-lixian" style="color:red;"></span>
		</view>
		<lightList ref="lightList" v-if="PageCur=='basics'"></lightList>
		<preset   v-if="PageCur=='component'" @applyPreset="preset"></preset>
		<setting   v-if="PageCur=='setting'"></setting>
		<view class="cu-bar tabbar shadow foot" >
			<view class="action tab" @click="NavChange" data-cur="basics" :class="PageCur=='basics'?'choice':''">
				<view class='cuIcon-cu-image'>
					<image src="/static/ic_list1.png"></image>
				</view>
				<view :class="PageCur=='basics'?'text-lightblue':'text-gray'">灯控列表</view>
			</view>
			<view class="action tab" @click="NavChange" data-cur="component" :class="PageCur=='component'?'choice':''">
				<view class='cuIcon-cu-image'>
					<image src="/static/ic_scenes1.png"></image>
				</view>
				<view :class="PageCur=='component'?'text-lightblue':'text-gray'">预设模式</view>
			</view>
			<view class="action tab" @click="NavChange" data-cur="setting" :class="PageCur=='setting'?'choice':''">
				<view class='cuIcon-cu-image'>
					<image src="/static/ic_info1.png"></image>
				</view>
				<view :class="PageCur=='setting'?'text-lightblue':'text-gray'">系统设置</view>
			</view>
		</view>
	</view>
	
</template>

<script>
	var plugins = require('../../common/plugins.js');
	import{  getLightDegree} from '@/common/tempreture.js'
	
	export default {
		data() {
		return {
				PageCur: 'basics',
				plugins:plugins,
				presetName:'方案',
				connectStatus: false,
				room1:{
					onOff:true,
					lights:[
						{
							id:'01',
							no:'15',
							onOff:true,
							colortempreture:5000,
							info:{
								R:222,
								G:333,
								B:444,
								H:555,
								L:666,
								A:50,
								D:40
							}
						},
						{
							id:'02',
							no:'01',
							onOff:true,
							colortempreture:5000,
							info:{
								R:222,
								G:333,
								B:444,
								H:555,
								L:666,
								A:50,
								D:40
							}
						},
						{
							id:'03',
							no:'04',
							onOff:true,
							colortempreture:5000,
							info:{
								R:222,
								G:333,
								B:444,
								H:555,
								L:666,
								A:50,
								D:40
							}
						},
						{
							id:'04',
							no:'09',
							onOff:true,
							colortempreture:5000,
							info:{
								R:222,
								G:333,
								B:444,
								H:555,
								L:666,
								A:50,
								D:40
							}
						},
						{
							id:'05',
							no:'06',
							onOff:true,
							colortempreture:5000,
							info:{
								R:222,
								G:333,
								B:444,
								H:555,
								L:666,
								A:50,
								D:40
							}
						},
						{
							id:'06',
							no:'02',
							onOff:true,
							colortempreture:5000,
							info:{
								R:222,
								G:333,
								B:444,
								H:555,
								L:666,
								A:50,
								D:40
							}
						},
						{
							id:'07',
							no:'11',
							onOff:true,
							colortempreture:5000,
							info:{
								R:222,
								G:333,
								B:444,
								H:555,
								L:666,
								A:50,
								D:40
							}
						},
						{
							id:'08',
							no:'03',
							onOff:true,
							colortempreture:5000,
							info:{
								R:222,
								G:333,
								B:444,
								H:555,
								L:666,
								A:50,
								D:40
							}
						}
						
					],
					
				},
				desklamps:{
					onOff:true,
					lights:[
							{
								id:'01',
								no:'21',
								onOff:true,
								colortempreture:5000,
								info:{
									R:222,
									G:333,
									B:444,
									H:555,
									L:666,
									A:50
								}
							},
							{
								id:'02',
								no:'22',
								onOff:true,
								colortempreture:5000,
								info:{
									R:222,
									G:333,
									B:444,
									H:555,
									L:666,
									A:50
								}
							},
							{
								id:'03',
								no:'23',
								onOff:true,
								colortempreture:5000,
								info:{
									R:222,
									G:333,
									B:444,
									H:555,
									L:666,
									A:50
								}
							},
							{
								id:'04',
								no:'24',
								onOff:true,
								colortempreture:5000,
								info:{
									R:222,
									G:333,
									B:444,
									H:555,
									L:666,
									A:50
								}
							},
							{
								id:'05',
								no:'25',
								onOff:true,
								colortempreture:5000,
								info:{
									R:222,
									G:333,
									B:444,
									H:555,
									L:666,
									A:50
								}
							},
							{
								id:'06',
								no:'26',
								onOff:true,
								colortempreture:5000,
								info:{
									R:222,
									G:333,
									B:444,
									H:555,
									L:666,	
									A:50
								}
							},
							{
								id:'07',
								no:'27',
								onOff:true,
								colortempreture:5000,
								info:{
									R:222,
									G:333,
									B:444,
									H:555,
									L:666,
									A:50
								}
							},
							{
								id:'08',
								no:'28',
								onOff:true,
								colortempreture:5000,
								info:{
									R:222,
									G:333,
									B:444,
									H:555,
									L:666,
									A:50
								}
							},
							{
								id:'09',
								no:'29',
								onOff:true,
								colortempreture:5000,
								info:{
									R:222,
									G:333,
									B:444,
									H:555,
									L:666,
									A:50
								}
							},
							{
								id:'10',
								no:'30',
								onOff:true,
								colortempreture:5000,
								info:{
									R:222,
									G:333,
									B:444,
									H:555,
									L:666,
									A:50
								}
							}
					]
				},
				room2:{
					onOff:true,
					lights:[
						{
							id:'09',
							no:'16',
							onOff:true,
							colortempreture:5000,
							info:{
								R:222,
								G:333,
								B:444,
								H:555,
								L:666,
								A:50,
								D:40
							}
						},
						{
							id:'10',
							no:'13',
							onOff:true,
							colortempreture:5000,
							info:{
								R:222,
								G:333,
								B:444,
								H:555,
								L:666,
								A:50,
								D:40
							}
						},
						{
							id:'11',
							no:'14',
							onOff:true,
							colortempreture:5000,
							info:{
								R:222,
								G:333,
								B:444,
								H:555,
								L:666,
								A:50,
								D:40
							}
						},
						{
							id:'12',
							no:'05',
							onOff:true,
							colortempreture:5000,
							info:{
								R:222,
								G:333,
								B:444,
								H:555,
								L:666,
								A:50,
								D:40
							}
						},
						{
							id:'13',
							no:'10',
							onOff:true,
							colortempreture:5000,
							info:{
								R:222,
								G:333,
								B:444,
								H:555,
								L:666,
								A:50,
								D:40
							}
						},
						{
							id:'14',
							no:'12',
							onOff:true,
							colortempreture:5000,
							info:{
								R:222,
								G:333,
								B:444,
								H:555,
								L:666,
								A:50,
								D:40
							}
						},
						{
							id:'15',
							no:'08',
							onOff:true,
							colortempreture:5000,
							info:{
								R:222,
								G:333,
								B:444,
								H:555,
								L:666,
								A:50,
								D:40
							}
						},
						{
							id:'16',
							no:'07',
							onOff:true,
							colortempreture:5000,
							info:{
								R:222,
								G:333,
								B:444,
								H:555,
								L:666,
								A:50,
								D:40
							}
						},
					],
					
				}
			}
		},
		onReady() {
			let that = this
			console.log("进来初始化灯")
			setInterval(function(){
				that.checkConnectStatus()
			}, 3000);
			this.setLastSetting()
		},
		methods: {
			setLastSetting(){
				console.log("开始发送上次数据")
				let that = this 
				uni.getStorage({
				    key: 'lastSetting',
				    success: function (res) {
						if(res.data.room1 && res.data.room2 && res.data.desklamps){
							that.$refs.lightList.onOff = res.data.onOff
							that.$refs.lightList.room1 = res.data.room1
							that.$refs.lightList.room2 = res.data.room2
							that.$refs.lightList.desklamps = res.data.desklamps
						}
				    }
				})
			},
			checkConnectStatus(){
				let that =this
				this.plugins.checkConnectStatus(function(result) {
					if(result=="true"){
						that.connectStatus =true
					}else{
						that.connectStatus =false
					}
				},
				function(result) {
					uni.showToast({title:result});
				})
			},
			NavChange: function(e) {
				let that = this
				this.PageCur = e.currentTarget.dataset.cur
				if( e.currentTarget.dataset.cur == "basics" ){
					this.$nextTick(()=>{
						if(that.$refs.lightList.onOff){
							
						}	
						uni.getStorage({
							key: 'lastSetting',
							success: function (res) {
								if(res.data.room1 && res.data.room2 && res.data.desklamps){
									that.room1 = res.data.room1
									that.room2 = res.data.room2
									that.desklamps = res.data.desklamps
									that.$refs.lightList.onOff = res.data.onOff
									that.$refs.lightList.room1 = that.room1
									that.$refs.lightList.room2 = that.room2
									that.$refs.lightList.desklamps = that.desklamps
									that.$refs.lightList.$forceUpdate()
								}
							}
						})
					})
				}
			},
			preset(item){
				this.presetName = item.name
				this.room1 = item.data.room1
				this.room2 = item.data.room2
				this.desklamps = item.data.desklamps
				this.userPresert()
			},
			userPresert(){
				uni.showLoading({
				    title:"请稍等..."
				});
				this.room1.lights.forEach(light =>{
					// let msg = "!K"+light.no+"_"+(light.onOff?'ON':'OF')+"_pp#"
					// this.send(msg)
					if(light.onOff){
						let msg = "!S"+light.no
									+"_R"+this.getLengthStr(light.info.R)
									+"_G"+this.getLengthStr(light.info.G)
									+"_B"+this.getLengthStr(light.info.B)
									+"_H"+this.getLengthStr(light.info.H)
									+"_L"+this.getLengthStr(light.info.L)+"_pp#"
						this.send(msg)
						msg = "!S"+light.no+"_A"+this.getLengthStr(Math.round(light.info.A*9.99))+"_pp#"
						this.send(msg)
						let degree = getLightDegree(light.no, light.info.D)
						msg = "!S"+light.no+"_D"+this.getLengthStr(degree)+"_pp#"
						this.send(msg)
					}
				})
				
				this.room2.lights.forEach(light =>{
					// let msg = "!K"+light.no+"_"+(light.onOff?'ON':'OF')+"_pp#"
					// this.send(msg)
					if(light.onOff){
						let msg = "!S"+light.no
									+"_R"+this.getLengthStr(light.info.R)
									+"_G"+this.getLengthStr(light.info.G)
									+"_B"+this.getLengthStr(light.info.B)
									+"_H"+this.getLengthStr(light.info.H)
									+"_L"+this.getLengthStr(light.info.L)+"_pp#"
						this.send(msg)
						msg = "!S"+light.no+"_A"+this.getLengthStr(Math.round(light.info.A*9.99))+"_pp#"
						this.send(msg)
						let degree = getLightDegree(light.no, light.info.D)
						msg = "!S"+light.no+"_D"+this.getLengthStr(degree)+"_pp#"
						this.send(msg)
					}
				})
				
				this.desklamps.lights.forEach(light =>{
					// let msg = "!K"+light.no+"_"+(light.onOff?'ON':'OF')+"_pp#"
					// this.send(msg)
					if(light.onOff){
						let msg = "!S"+light.no
									+"_R"+this.getLengthStr(light.info.R)
									+"_G"+this.getLengthStr(light.info.G)
									+"_B"+this.getLengthStr(light.info.B)
									+"_H"+this.getLengthStr(light.info.H)
									+"_L"+this.getLengthStr(light.info.L)+"_pp#"
						this.send(msg)
						msg = "!S"+light.no+"_A"+this.getLengthStr(Math.round(light.info.A*9.99))+"_pp#"
						this.send(msg)
					}
				})
				setTimeout(function () {
				    uni.hideLoading();
				}, 100);
			},
			getLengthStr(val){
				let str = val;
				if(val== 0){
					str="000"
				}else if(val<10){
					str="00"+val
				}else if(val<100){
					str="0"+val
				}
				return str
			},
			send(msg){
				console.log(msg)
				uni.getStorage({
				    key: 'logging',
				    success: function (res) {
				       let arr = res.data
					   let key = new Date().getTime()
					   let val = msg
					   arr=[...[key+"--->"+msg],...arr]
					   if(arr.length >20){
						  arr= arr.splice(arr.length-20, arr.length-1) 
					   }
					   uni.setStorage({
					       key: 'logging',
					       data:arr,
					       success: function () {
					       }
					   });
				    },
					fail:function (res) {
						let key = new Date().getTime()
						let val = msg
						let arr= [key+"--->"+msg]
						//如果没找到初始化
						uni.setStorage({
						    key: 'logging',
						    data:arr,
						    success: function () {
						    }
						});
					}
				});
				this.plugins.sendTcp(
				   msg,
					function(result) {
						//uni.showToast({title:JSON.stringify(result),icon:'none'});
					},
					function(result) {
						//uni.showToast({title:result});
					}
				);
			}
		}
	}
</script>

<style scoped>
page{
	background: black;
	border-radius: 10upx;
	padding-bottom:  70upx;
}
.page{
	background-image: url('~@/static/bg_app.png');
}
.connectClass{
	position: absolute;
	right:60upx;
	top: 40upx;
	z-index: 10000;
}
.tab{
	height: 100% !important;
	background-image: url('~@/static/tab_color.png');
	background-repeat: no-repeat;/*还有repeat-x,y等*/
	background-size:100%;
}
.choice{
	background-image: url('~@/static/tab_color_pre.png');
	background-repeat: no-repeat;/*还有repeat-x,y等*/
	background-size:100%;
}
.text-lightblue{
	color: #00f3ff;
}
</style>

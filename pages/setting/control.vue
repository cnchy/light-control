<template>
	<view  class="page" style="height: 100vh;">
		<cu-custom :bgImage="bg_titlebar">
			<block slot="content">
				通用开关
			</block>
		</cu-custom>
		<view class="room">
			
			<view >灯号</view>
			<view>
				 <input class="uni-input"  placeholder="请输入灯号" v-model="currentLight.no"/>
			</view>
<!-- 			<view>开关</view>
			<view class="adjust">
				<view class="roomSwitch" style="float: right;" @click="onOffLight(currentLight)" :class="currentLight.onOff?'':'roomSwitchoff'"></view>
			</view> -->
			<!-- <view class="">色温(K)</view>
			<view class="adjust">
				<slider class="adjustSlider" @change="changeColorTemp($event,currentLight)" min="2000" max="10000" step="10" :value="currentLight.colortempreture"/>
				<yp-number-box class="adjustNumber" min=2000 max=10000 step=10 @change="changeColorTemp($event,currentLight)" :value="currentLight.colortempreture" ></yp-number-box>
			</view> -->
			<view class="">红色 </view>
			<view class="adjust">
				<slider class="adjustSlider" @change="changeR($event,currentLight)" min="0" max="999" :value="currentLight.info.R"/>
				<yp-number-box class="adjustNumber" style="width: 20%;float: left;" min=0 max=999  @change="changeR($event,currentLight)" :value="currentLight.info.R" ></yp-number-box>
			</view>
			<view class="">绿色 </view> 
			<view class="adjust">
				<slider class="adjustSlider" @change="changeG($event,currentLight)" min="0" max="999" :value="currentLight.info.G"/>
				<yp-number-box class="adjustNumber" min=0 max=999  @change="changeG($event,currentLight)" :value="currentLight.info.G" ></yp-number-box>
			</view>
			<view class="">蓝色 </view> 
			<view class="adjust">
				<slider class="adjustSlider" @change="changeB($event,currentLight)" min="0" max="999" :value="currentLight.info.B"/>
				<yp-number-box class="adjustNumber" min=0 max=999  @change="changeB($event,currentLight)" :value="currentLight.info.B" ></yp-number-box>
			</view>
			
			<view class="">暖度 </view> 
			<view class="adjust">
				<slider class="adjustSlider" @change="changeH($event,currentLight)" min="0" max="999" :value="currentLight.info.H"/>
				<yp-number-box class="adjustNumber" min=0 max=999  @change="changeH($event,currentLight)" :value="currentLight.info.H" ></yp-number-box>
			</view>
			<view class="">冷度 </view> 
			<view class="adjust">
				<slider class="adjustSlider" @change="changeL($event,currentLight)" min="0" max="999" :value="currentLight.info.L"/>
				<yp-number-box class="adjustNumber" min=0 max=999  @change="changeL($event,currentLight)" :value="currentLight.info.L" ></yp-number-box>
			</view>
			<view class="">亮度 </view> 
			<view class="adjust">
				<slider class="adjustSlider" @change="changeA($event,currentLight)" min="0" max="100" :value="currentLight.info.A"/>
				<yp-number-box class="adjustNumber" min=0 max=100  @change="changeA($event,currentLight)" :value="currentLight.info.A" ></yp-number-box>
			</view>
			<view v-if="currentLight.info.D != undefined" >
				<view class="">光束角(°) </view> 
				<view class="adjust">
					<slider class="adjustSlider" @change="changeD($event,currentLight)" min="15" max="60" :value="currentLight.info.D"/>
					<yp-number-box class="adjustNumber" min=15 max=60  @change="changeD($event,currentLight)" :value="currentLight.info.D" ></yp-number-box>
				</view>
			</view>
		</view>
		<!-- <view class="roomhead">
			<view>灯控</view>
			<view class="roomSwitch" @click="onOffLight()" :class="currentLight.onOff?'':'roomSwitchoff'"></view>
		</view>
		<view class="room">
			<view class="title">灯号</view>
			<view>
				 <input class="uni-input"  placeholder="请输入灯号" v-model="currentLight.id"/>
			</view>
		</view>
		<view class="room">
			<view class="title">红色</view>
			<view>
				 <slider  @change="changeR($event,currentLight)" min="0" max="999" :value="currentLight.info.R" show-value="true"/>
			</view>
		</view>
		<view class="room">
			<view class="title">绿色</view>
			<view>
				 <slider  min="0" max="999" :value="currentLight.info.G" show-value="true"/>
			</view>
		</view>
		<view class="room">
			<view class="title">蓝色</view>
			<view>
				<slider min="0" max="999" :value="currentLight.info.B" show-value="true"/>
			</view>
		</view>
		<view class="room">
			<view class="title">暖度</view>
			<view>
				<slider  min="0" max="999" :value="currentLight.info.H" show-value="true"/>
			</view>
		</view>
		<view class="room">
			<view class="title">冷度</view>
			<view>
				<slider  min="0" max="999" :value="currentLight.info.L" show-value="true"/>
			</view>
		</view>
		<view class="room">
			<view class="title">亮度</view>
			<view>
				 <slider   min="0" max="100" :value="currentLight.info.A" show-value="true"/>
			</view>
		</view>
		<view class="room">
			<view class="title">光束角(°)</view>
			<view>
				<slider   min="15" max="60" step="1" :value="currentLight.info.D" show-value="true"/>
			</view>
		</view> -->
		<view class="room" style="text-align: center;">
			<button class="cu-btn round" @click="test">发送</button>
			<navigator class="cu-btn round"  url="/pages/index/index" style="color: #000000;">返回</navigator>
		</view>
	</view>
</template>

<script>
	var plugins = require('@/common/plugins.js');
	import ypNumberBox from "@/components/yp-number-box/yp-number-box.vue";
	import bg_titlebar from '@/static/bg_titlebar.png';
	import{ getColorTemperature , getLightDegree} from '@/common/tempreture.js'
	export default {
		components: {ypNumberBox},
		data() {
			return {
				plugins:plugins,
				bg_titlebar:bg_titlebar, 
				currentLight:{
					onOff:true,
					ip:'192.169.1.1',
					port:'8080',
					no:'01',
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
			}
		},
		mounted() { 
		},
		methods: {
			test(){
				this.sendCommand();
			},
			sendCommand(){
				let light =this.currentLight
				
				let msg = "!S"+light.no
							+"_R"+this.getLengthStr(Math.round(light.info.A*light.info.R/100))
							+"_G"+this.getLengthStr(Math.round(light.info.A*light.info.G/100))
							+"_B"+this.getLengthStr(Math.round(light.info.A*light.info.B/100))
							+"_H"+this.getLengthStr(Math.round(light.info.A*light.info.H/100))
							+"_L"+this.getLengthStr(Math.round(light.info.A*light.info.L/100))+"_pp#"
				this.send(msg)
				let degree = getLightDegree(light.no, light.info.D)
				msg = "!S"+light.no+"_D"+this.getLengthStr(degree)+"_pp#"
				this.send(msg)
			},
			changeR(e,light){
				light.info.R= e.detail.value
			},
			changeG(e,light){
				light.info.G= e.detail.value
			},
			changeB(e,light){
				light.info.B= e.detail.value
			},
			changeH(e,light){
				light.info.H= e.detail.value
			},
			changeL(e,light){
				light.info.L= e.detail.value
			},
			changeA(e,light){
				light.info.A= e.detail.value

			},
			changeD(e,light){
				light.info.D= e.detail.value

			},
			onOffLight(light){
				light.onOff = !light.onOff

			},
			changeColorTemp(e,light){
				light.colortempreture =e.detail.value
				let temp = getColorTemperature(e.detail.value)
				light.info.R = temp[0]
				light.info.G = temp[1]
				light.info.B = temp[2]
				light.info.H = temp[3]
				light.info.L = temp[4]
				let msg = "!S"+light.no
							+"_R"+this.getLengthStr(light.info.R)
							+"_G"+this.getLengthStr(light.info.G)
							+"_B"+this.getLengthStr(light.info.B)
							+"_H"+this.getLengthStr(light.info.H)
							+"_L"+this.getLengthStr(light.info.L)+"_pp#"
				this.send(msg)
			},	
			send(msg){
				if(this.currentLight !=null){
					uni.getStorage({
					    key: 'logging',
					    success: function (res) {
					       let arr = res.data
						   let key = new Date().getTime()
						   let val = msg
						   arr.push(key+"--->"+msg)
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
					console.log(msg)
					this.plugins.sendTcp(
					   msg,
						function(result) {
							//uni.showToast({title:JSON.stringify(result),icon:'none'});
						},
						function(result) {
							//uni.showToast({title:result});
						}
					);
					//第二遍
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
	.roomSwitch {
	  margin:10upx;
	  position:relative;
	  width:120upx;
	  height:40upx;
	  -webkit-appearance: none;
	  outline: none;
	  border-radius: 20upx;
	  background: linear-gradient(0deg, #e67e22, #f39c12);
	  box-shadow: 0 0 0 4px #353535, 0 0 0 5px #3e3e3e, inset 0 0 10px rgba(0,0,0,1);
	  
	}
	
	.roomSwitchoff {
		background: linear-gradient(0deg, #333, #000);
		box-shadow: 0 0 0 4px #353535, 0 0 0 5px #3e3e3e, inset 0 0 10px rgba(0,0,0,1);
	  
	}
	
	
	.roomSwitch:before {
	  content:'';
	  position:absolute;
	  top:0;
	  left:40upx;
	  width:80upx;
	  height:40upx;
	  background: linear-gradient(0deg, #000, #6b6b6b);
	  border-radius: 20px;
	  box-shadow: 0 0 0 1px #232323;
	  transform: scale(.98,.96);
	  transition:.5s;
	}
	
	.roomSwitchoff:before {
	 left:0;
	}
	
	.roomSwitch:after{
	  content:'';
	  position:absolute;
	  top:calc(50% - 2px);
	  left:110upx;
	  width:4upx;
	  height:4upx;
	  background: linear-gradient(0deg, #6b6b6b, #000);
	  border-radius: 50%;
	  transition:.5s;
	}
	
	.roomSwitchoff:after {
	  left:70upx;
	}
	.adjust{
		width: 100%;
		height: 60upx;
		display: flex;
		justify-content: space-around;
	}
	.adjustSlider{
		width: 70%;
	}
	.adjustNumber{
		width: 20%;
	}
</style>

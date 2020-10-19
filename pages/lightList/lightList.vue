<template>
	<view  class="page" >
		<music ref="music"></music>
		<cu-custom :bgImage="bg_titlebar">
			<block slot="content">
				灯控列表
			</block>
		</cu-custom>
		<view class="allOnOff" :style="[{'background-image':getOnOffImg()}]" style="display: flex;justify-content: space-between;">
			<text class="lightbtn" @tap="isDropLight = !isDropLight" > {{isDropLight?'台灯控制':'吊灯控制'}} </text>
			<text @tap="turnAllOnOff()">{{onOff?"关闭所有":"打开所有"}}</text>
			<text  class="lightbtn" @tap="presetShow = true"> 保存预设 </text>
		</view>
		<scroll-view scroll-y>
			<view class="room" v-if="isDropLight">
				<view class="roomhead">
					<view>区域一</view>
					<view class="roomSwitch" @tap="turnOnOffRoom(room1)" :class="room1.onOff?'':'roomSwitchoff'"></view>
				</view>
				<view class="lightcontainer">
					<view class="light"  v-for="(item,indexs) in room1.lights" :key="indexs" >
						<view class="light-img" :style="[{color:getRgbColor(item)}]" @tap="turnOnOff(item)">
							<span class="iconfont  icon-diaodeng"></span>
						</view>
						<view v-if="item.onOff" class="light-spec" :style="[{ background: 'radial-gradient('+getRgbColor(item) +'25% ,transparent 80%)' }]">
							
						</view>
						<view class="light-img-setting" @tap="setLight(item)" >
							<span class="iconfont  icon-shezhi"></span>
						</view>
						<view class="light-index">
							{{item.no+"#"}}
						</view>		
					</view>
				</view>
			</view> 
			
			<view class="room"  v-if="isDropLight">
				<view class="roomhead">
					<view>区域二</view>
					<view class="roomSwitch" @tap="turnOnOffRoom(room2)" :class="room2.onOff?'':'roomSwitchoff'"></view>
				</view>
				<view class="lightcontainer">
					<view class="light"  v-for="(item,indexs) in room2.lights" :key="indexs" >
						<view class="light-img" :style="[{color:getRgbColor(item)}]" @tap="turnOnOff(item)">
							<span class="iconfont  icon-diaodeng"></span>
						</view>
						<view v-if="item.onOff" class="light-spec" :style="[{ background: 'radial-gradient('+getRgbColor(item) +'25% ,transparent 80%)' }]">
							
						</view>
						<view class="light-img-setting" >
							<span class="iconfont  icon-shezhi"  @tap="setLight(item)" ></span>
						</view>
						<view class="light-index">
							{{item.no+"#"}}
						</view>
					
					</view>
				</view>
				
			</view> 
			<view class="room" v-if="!isDropLight">
				<view class="roomhead">
					<view>台灯</view>
					<view class="roomSwitch" @tap="turnOnOffRoom(desklamps)" :class="desklamps.onOff?'':'roomSwitchoff'"></view>
				</view>
				<view class="lightcontainer">
					<view class="light"  v-for="(item,indexs) in desklamps.lights" :key="indexs" >
						
						<view class="light-img" :style="[{color:getRgbColor(item)}]" @tap="turnOnOff(item)">
							<span class="iconfont  icon-taideng"></span>
						</view>
						<view v-if="item.onOff" class="light-spec" :style="[{ background: 'radial-gradient('+getRgbColor(item) +'25% ,transparent 80%)' }]">
							
						</view>
						<view class="light-img-setting" >
							<span class="iconfont  icon-shezhi" @tap="setLight(item)"></span>
						</view>
						<view class="light-index">
							{{item.no+"#"}}
						</view>
						
					</view>
				</view>
			</view>
			<uni-popup ref="popup" type="bottom" style="z-index: 1030;margin-bottom: 60upx;">
				<view class="room" v-if="currentLight != null">
					<view style="">
						<text style="color: white;" @tap="advence=!advence">{{currentLight.no}}号灯 </text>
						<text class="lightbtn" style="color: #00F3FF;right: 0px;position: absolute;" @tap="advence=!advence">高级设置 
							<span v-if="advence" class="iconfont  icon-shouqi"></span>
							<span v-if="!advence" class="iconfont  icon-zhankai"></span>
						</text>
					</view>
					<view class="setpanel" v-if=" !advence">
						<view>色温(K) </view>
						<view class="adjust">
							<slider class="adjustSlider" @change="changeColorTemp($event,currentLight)" min="2000" max="10000" step="10" :value="currentLight.colortempreture"/>
							<yp-number-box class="adjustNumber" min=2000 max=10000 step=10 @change="changeColorTemp($event,currentLight)" :value="currentLight.colortempreture" ></yp-number-box>
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
					
					<view class="setpanel" v-if="advence">
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
							<view  class="adjustNumber">
								<yp-number-box min=0 max=999  @change="changeB($event,currentLight)" :value="currentLight.info.B" ></yp-number-box>
							</view>
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
					<view style="height: 80upx;">
						
					</view>
				</view>
			</uni-popup>
			
		</scroll-view>
		<view class="modelBox" v-if="presetShow">
			<view class="shade" @tap="presetShow = false"></view>
			<view class="model">
				<view class="modelTitle">请输入预设方案名称</view>
				<view class="modelInput">
					<input  placeholder-class="inputStyle" v-model="presetName"   focus=""/>
				</view>
				<view class="modeBtnBox">
					<view class="" @tap="presetShow = false">取消</view>
					<view class="" @tap="savePreset()">确定</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	var plugins = require('../../common/plugins.js');
	import ypNumberBox from "@/components/yp-number-box/yp-number-box.vue";
	import bg_titlebar from '@/static/bg_titlebar.png';
	import uniPopup from "@/components/uni-popup/uni-popup.vue"
	import{ getColorTemperature , getLightDegree} from '@/common/tempreture.js'
	export default {
		components: {uniPopup,ypNumberBox},
		data() {
			
			return {
				isDropLight:true,
				plugins:plugins,
				bg_titlebar,
				advence:false,
				onOff:false,
				presetShow:false,
				presetName:"方案",
				currentLight:{
							id:'01',
							no:'15',
							onOff:false,
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
				room1:{
					onOff:false,
					lights:[
						{
							id:'01',
							no:'15',
							onOff:false,
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
							onOff:false,
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
							onOff:false,
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
							onOff:false,
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
							onOff:false,
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
							onOff:false,
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
							onOff:false,
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
							onOff:false,
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
					onOff:false,
					lights:[
							{
								id:'01',
								no:'21',
								onOff:false,
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
								onOff:false,
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
								onOff:false,
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
								onOff:false,
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
								onOff:false,
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
								onOff:false,
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
								onOff:false,
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
								onOff:false,
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
								onOff:false,
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
								onOff:false,
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
					onOff:false,
					lights:[
						{
							id:'09',
							no:'16',
							onOff:false,
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
							onOff:false,
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
							onOff:false,
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
							onOff:false,
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
							onOff:false,
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
							onOff:false,
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
							onOff:false,
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
							onOff:false,
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
				
			};
		},
		onHide() {
			console.log("页面关闭")
		},
		methods: {
			//开启所有、关闭所有
			turnAllOnOff(){	
				let that = this
				this.onOff=!this.onOff
				uni.showLoading({
				    title: this.onOff?"开启中...":"关闭中..."
				});
				
				setTimeout(function () {
				    uni.hideLoading();
				}, 1000);
				if(this.onOff){
					//开
		
					uni.getStorage({
					    key: 'lastSetting',
					    success: function (res) {
							if(res.data.room1 && res.data.room2 && res.data.desklamps){
								that.room1 = res.data.room1
								that.room2 = res.data.room2
								that.desklamps = res.data.desklamps
							}
							that.room1.onOff= that.onOff
							that.room2.onOff= that.onOff
							that.desklamps.onOff= that.onOff
							
							that.room1.lights.forEach(item =>{
								item.onOff = that.onOff
							})
							that.room2.lights.forEach(item =>{
								item.onOff = that.onOff
							})
							that.desklamps.lights.forEach(item =>{
								item.onOff = that.onOff
							})
							that.userPresert()
					    }
					})
				}else{
					this.saveLastSetting()
					this.send("!S00_R000_G000_B000_H000_L000_pp#")
					this.room1.onOff= this.onOff
					this.room2.onOff= this.onOff
					this.desklamps.onOff= this.onOff
					this.room1.lights.forEach(item =>{
						item.onOff = this.onOff
					})
					this.room2.lights.forEach(item =>{
						item.onOff = this.onOff
					})
					this.desklamps.lights.forEach(item =>{
						item.onOff = this.onOff
					})
				}
				
			},
			turnOnOffRoom(room){
				room.onOff =! room.onOff
				room.lights.forEach(item =>{
					item.onOff = room.onOff
					if(item.onOff){
						this.sigleLightSetting(item)
					}else{
						let msg = "!S"+item.no+"_R000_G000_B000_H000_L000_pp#"
						this.send(msg)
					}
				})
			},
			turnOnOff(light){
				light.onOff =! light.onOff
				this.currentLight =light
				this.$forceUpdate()
				if(light.onOff){
					this.sigleLightSetting(light)
				}else{
					let msg = "!S"+light.no+"_R000_G000_B000_H000_L000_pp#"
					this.send(msg)
				}
			},
			getOnOffImg(){
				return  this.onOff?"url('/static/btn_turnonall.png')":"url('/static/btn_turnoffall.png')"
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
			getColorTemp(e,light){
				
			},
			getRgbColor(lightObj){
				let colorObj = lightObj.info;
				let tempRgb = ""
				if(lightObj.onOff){
					tempRgb = "rgb("+colorObj.R+","+colorObj.G+","+colorObj.B+")";
				}else{
					tempRgb = "rgb(123,123,123)";
				}
				return tempRgb;
			},
			changeR(e,light){
				light.info.R= e.detail.value
				let msg = "!S"+light.no+"_R"+this.getLengthStr(light.info.R)+"_pp#"	
				this.send(msg)
			},
			changeG(e,light){
				light.info.G= e.detail.value
				let msg = "!S"+light.no+"_G"+this.getLengthStr(light.info.G)+"_pp#"
				this.send(msg)
			},
			changeB(e,light){
				light.info.B= e.detail.value
				let msg = "!S"+light.no+"_B"+this.getLengthStr(light.info.B)+"_pp#"
				this.send(msg)
			},
			changeH(e,light){
				light.info.H= e.detail.value
				let msg = "!S"+light.no+"_H"+this.getLengthStr(light.info.H)+"_pp#"
				this.send(msg)
			},
			changeL(e,light){
				light.info.L= e.detail.value
				let msg = "!S"+light.no+"_L"+this.getLengthStr(light.info.L)+"_pp#"
				this.send(msg)
			},
			changeA(e,light){
				light.info.A= e.detail.value
				let msg = "!S"+light.no
							+"_R"+this.getLengthStr(Math.round(light.info.A *light.info.R/100 ))
							+"_G"+this.getLengthStr(Math.round(light.info.A *light.info.G/100 ))
							+"_B"+this.getLengthStr(Math.round(light.info.A *light.info.B/100 ))
							+"_H"+this.getLengthStr(Math.round(light.info.A *light.info.H/100 ))
							+"_L"+this.getLengthStr(Math.round(light.info.A *light.info.L/100 ))+"_pp#"
				
				this.send(msg)
			},
			changeD(e,light){
				light.info.D= e.detail.value
				let degree = getLightDegree(light.no, e.detail.value)
				let msg = "!S"+light.no+"_D"+this.getLengthStr(degree)+"_pp#"
				this.send(msg)
			},
			sigleLightSetting(light){
				let msg = "!S"+light.no
							+"_R"+this.getLengthStr(light.info.R)
							+"_G"+this.getLengthStr(light.info.G)
							+"_B"+this.getLengthStr(light.info.B)
							+"_H"+this.getLengthStr(light.info.H)
							+"_L"+this.getLengthStr(light.info.L)+"_pp#"
				this.send(msg)
				// msg = "!S"+light.no+"_A"+this.getLengthStr(Math.round(light.info.A*9.99))+"_pp#"
				// this.send(msg)
				if(light.info.D){
					let degree = getLightDegree(light.no, light.info.D)
					msg = "!S"+light.no+"_D"+this.getLengthStr(degree)+"_pp#"
					this.send(msg)
				}
			},
			send(msg){
				this.saveLastSetting()
				//如果当前灯未选择
				if(this.currentLight !=null){
					this.$refs.music.play()
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
				
			},
			saveLastSetting(){
				
				let settingObj={
					onOff:this.onOff,
					room1:this.room1,
					room2:this.room2,
					desklamps:this.desklamps
				}
				//如果没找到初始化
				uni.setStorage({
				    key: 'lastSetting',
				    data: settingObj,
				    success: function () {
						console.log("保存之前设置的值")
				    }
				});
			},
			setLight(light){
				if(light.onOff){
					this.currentLight =light
					this.$forceUpdate()
					this.$refs.popup.open()
				}else{
					uni.showToast({ title: '灯未开！'})
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
			},
			//保存预设
			savePreset(){
				let that =this
				let presetObj={
					name:this.presetName,
					data:{
						room1:this.room1,
						room2:this.room2,
						desklamps:this.desklamps
					}
				}
				
				uni.getStorage({
				    key: 'preset',
				    success: function (res) {
				       let arr = res.data
					  arr =[...[presetObj],...arr]
					   uni.setStorage({
					       key: 'preset',
					       data:arr,
					       success: function () {
							   uni.showToast({ title: '保存成功！'});
					       }
					   });
					   that.presetShow =false
				    },
					fail:function (res) {
						that.presetShow =false
						//如果没找到初始化
						uni.setStorage({
						    key: 'preset',
						    data:[presetObj],
						    success: function () {
						    }
						});
					}
				});
				this.$forceUpdate()
			},
			//用户预设
			userPresert(){
				uni.showLoading({
				    title:"请稍等..."
				});
				this.room1.lights.forEach(light =>{
					if(light.onOff){
						let  msg = "!S"+light.no
									+"_R"+this.getLengthStr(light.info.R)
									+"_G"+this.getLengthStr(light.info.G)
									+"_B"+this.getLengthStr(light.info.B)
									+"_H"+this.getLengthStr(light.info.H)
									+"_L"+this.getLengthStr(light.info.L)+"_pp#"
						this.send(msg)
						let degree = getLightDegree(light.no, light.info.D)
						msg = "!S"+light.no+"_D"+this.getLengthStr(degree)+"_pp#"
						this.send(msg)
					}else{
						
					}
				})
				
				this.room2.lights.forEach(light =>{
					if(light.onOff){
						let msg = "!S"+light.no
									+"_R"+this.getLengthStr(light.info.R)
									+"_G"+this.getLengthStr(light.info.G)
									+"_B"+this.getLengthStr(light.info.B)
									+"_H"+this.getLengthStr(light.info.H)
									+"_L"+this.getLengthStr(light.info.L)+"_pp#"
						this.send(msg)
						let degree = getLightDegree(light.no, light.info.D)
						msg = "!S"+light.no+"_D"+this.getLengthStr(degree)+"_pp#"
						this.send(msg)
					}
				})
				
				this.desklamps.lights.forEach(light =>{
				
					if(light.onOff){
						let msg = "!S"+light.no
									+"_R"+this.getLengthStr(light.info.R)
									+"_G"+this.getLengthStr(light.info.G)
									+"_B"+this.getLengthStr(light.info.B)
									+"_H"+this.getLengthStr(light.info.H)
									+"_L"+this.getLengthStr(light.info.L)+"_pp#"
						this.send(msg)
					}
				})
				setTimeout(function () {
				    uni.hideLoading();
				}, 100);
			}
		}
	}
</script>

<style scoped>
	page {

	}
	.page{
		background-image: url('~@/static/bg_app.png');
	}
	.titlebar{
		width: 100%;
		background-image: url('~@/static/bg_titlebar.png');
		/*background-size: 100px 100px;!*这个是按数值缩放*!*/
		background-repeat: no-repeat;/*还有repeat-x,y等*/
		color: white;
		line-height: 110upx;
		font-size:40upx;
		text-align: center;
		background-size: 105%;
	}
	.allOnOff{
		width: 100%;
		height: 100upx;
		padding: 10upx;
		background-position-x: center;
		background-image: url('~@/static/btn_turnonall.png');
		/*background-size: 100px 100px;!*这个是按数值缩放*!*/
		background-size: 60% 120%;
		background-repeat: no-repeat;/*还有repeat-x,y等*/
		color: white;
		line-height: 80upx;
		font-size:35upx;
		text-align: center;
	}
	.allOnOff:hover{
	
	}
	.lightbtn{
		padding: 5upx;
		border-radius: 2px;
		box-shadow: 0 2px 10px rgba(0,0,0,.12), 0 2px 5px rgba(0,0,0,.16);
		background-image: linear-gradient(to top right, #6F737C, #34363A)
	}
	.lightbtn:active{
		transform: scale(1.25, 1.25);
	}
	.room{
		width: 98%;
		margin: 20upx auto;
		padding: 10upx;
		position: relative;
		border-radius: 2px;
		box-shadow: 0 2px 10px rgba(0,0,0,.12), 0 2px 5px rgba(0,0,0,.16);
		background-image: linear-gradient(to top right, #6F737C, #34363A)
	}
	.setpanel{
		width: 98%;
		color: white;
		margin: 20upx auto;
		padding: 10upx;
		padding-top: 40upx;
		position: relative;
		border-radius: 2px;
		box-shadow: 0 2px 10px rgba(0,0,0,.12), 0 2px 5px rgba(0,0,0,.16);
		background-image: linear-gradient(to top right, #6F737C, #34363A)
	}
	

	.roomhead{
		color:white;
		display: flex;
		justify-content: space-between;
	}
	.lightcontainer{
		display: flex;
		flex-flow: wrap;
		justify-content: flex-start;
	}
	.light{
		width: 23%;
		margin:2% 1%;
		height: 120upx;
		border-radius: 10upx;
		border: 1upx solid #4d4d4d;
		background: transparent;
		position: relative;
		background-image: -moz-linear-gradient(#656565, #242424);
		background-image: -webkit-gradient(linear, 0% 0%, 0% 100%, from(#242424), to(#656565));
		background-image: -webkit-linear-gradient(#656565, #242424);
		background-image: -o-linear-gradient(#656565, #242424);
		box-shadow: 0 2px 10px rgba(0,0,0,1), 0 2px 5px rgba(0,0,0,.16);
		transition: all .3s;
	   -webkit-transition: all .3s; /* Safari */
	}
	/* .light:active{
		box-shadow: 0 0px 0px rgba(0,0,0,1), 0 0px 0px rgba(0,0,0,.16);
		transform: translateY(4px);
	} */
	.light-img{
		position: absolute;
	 	left: 20%;
		top: 10%; 
		z-index: 1;
		color: #0081FF;
	}
	.light-spec{
		position: absolute;
		left: 20%;
		top: 15%; 
		transform: scale(1.2);
		filter: blur(20upx);
		width: 80upx;
		height: 80upx;
		border-radius: 50%;
		/* background: radial-gradient(#FEFFBE 25%, transparent 80%); */
		/* animation: glow 5s ease infinite; */
	}
	@keyframes glow {
	  0% {
	    transform:  scale(0.5);
	  }
	  50% {
	    transform: scale(1.15);
	  }
	  100% {
	    transform: scale(0.5);
	  }
	}
	.light-index{
		position: absolute;
	 	top: 5%;
		right: 5%; 
		color: #CCCCCC;
		font-size:1upx;
		cursor: pointer;
		pointer-events: none;
		font-size: 20upx;
		font-weight: 900;
	}
	.light-img-onOff{
		position: absolute;
	 	bottom: 5%;
		right: 5%; 
		color: #CCCCCC;
		font-size:1upx;
		cursor: pointer;
		pointer-events: none;
	}
	.light-img-setting{
		position: absolute;
	 	bottom: 5%;
		right: 5%; 
		color: #CCCCCC;
		font-size:1upx;
		cursor: pointer;
		pointer-events: none;
	}
	.light-img-setting:active,.light-img-onOff:active{
		color: #00F3FF;
		transform: scale(1.1);
		-ms-transform:scale(1.1);     /* IE 9 */
		-moz-transform:scale(1.1);     /* Firefox */
		-webkit-transform:scale(1.1); /* Safari 和 Chrome */
		-o-transform:scale(1.1);
	}
	.icon-deng,.icon-diaodeng,.icon-taideng{
		font-size:80upx;
	}
	.icon-power-01,.icon-shezhi{
		font-size:40upx;
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
	/**/
	.modelBox{
	}
	.shade{
		width: 100%;
		height: 100%;
		position: fixed;
		top: 0;
		left: 0;
		z-index: 9999;
		background-color: rgba(0,0,0,.6);
	}
	.model{
		width: 80%;
		background-color: #fff;
		padding: 30upx;
		box-sizing: border-box;
		position: fixed;
		top: 40%;
		left: 50%;
		transform: translate(-50%,-50%);	
		border-radius: 2px;
		box-shadow: 0 2px 10px rgba(0,0,0,.12), 0 2px 5px rgba(0,0,0,.16);
		background-image: linear-gradient(to top right, #6F737C, #34363A);
		z-index: 10000;
	}
	.modelTitle{
		font-size: 34upx;
		color: #FFFFFF;
		margin-bottom: 20upx;
	}
	.modelInput{
		width: 100%;
		height: 40upx;
		font-size: 30upx;
		color: #FFFFFF;
		margin-bottom: 40upx;
	}
	.modelInput input{
		width: 100%;
		height: 100%;
		border: none;
		border-bottom:2upx solid #FFFFFF ;
	}
	.modeBtnBox{
		width: 100%;
		height: 40upx;
		display: flex;
		align-items: center;
		justify-content: flex-end;
		color: #FFFFFF;
		font-size: 30upx;
	}
	.modeBtnBox view{
		width: 25%;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
	}
</style>

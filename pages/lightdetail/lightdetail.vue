<template>
	<view>
		<view class="panel" v-for="(light,index) in lights" :key="light.id">
			<!-- 红色<slider  @change="changeR($event,light)" min="0" max="999" :value="light.info.R" show-value="true"/>
			绿色<slider @change="changeG(light)" min="0" max="999" :value="light.info.G" show-value="true"/>
			蓝色<slider @change="changeB(light)" min="0" max="999" :value="light.info.B" show-value="true"/>
			暖度<slider @change="changeH(light)" min="0" max="999" :value="light.info.H" show-value="true"/>
			冷度<slider @change="changeL(light)" min="0" max="999" :value="light.info.L" show-value="true"/>
			整体亮度<slider @change="changeA(light)" min="0" max="999" :value="light.info.A" show-value="true"/>
			角度<slider @change="changeD(light)" min="0" max="999" :value="light.info.D" show-value="true"/> -->
			<button type="primary" @click="select(light)">选中{{light.id}}号灯</button>
		</view>
		<view v-if="currentLight != null">
			红色<slider  @change="changeR($event,currentLight)" min="0" max="999" :value="currentLight.info.R" show-value="true"/>
			绿色<slider @change="changeG($event,currentLight)" min="0" max="999" :value="currentLight.info.G" show-value="true"/>
			蓝色<slider @change="changeB($event,currentLight)" min="0" max="999" :value="currentLight.info.B" show-value="true"/>
			暖度<slider @change="changeH($event,currentLight)" min="0" max="999" :value="currentLight.info.H" show-value="true"/>
			冷度<slider @change="changeL($event,currentLight)" min="0" max="999" :value="currentLight.info.L" show-value="true"/>
			整体亮度<slider @change="changeA($event,currentLight)" min="0" max="999" :value="currentLight.info.A" show-value="true"/>
			角度<slider @change="changeD($event,currentLight)" min="0" max="999" :value="currentLight.info.D" show-value="true"/>
			开关<switch :checked="currentLight.onOff" @change="onOffLight($event,currentLight)" />
		</view>
		<button type="primary" @click="connect()">连接</button>
		<button type="primary" @click="send()">确定修改</button>
	</view>
</template>

<script>
var plugins = require('../../common/plugins.js');
	export default {
		data() {
			return {
				plugins: plugins,
				currentLight:null,
				lights:[{
					id:'01',
					onOff:true,
					colortempreture:5000,
					info:{
						R:222,
						G:333,
						B:444,
						H:555,
						L:666,
						A:222,
						D:111
					}
				},
				{
					id:'02',
					colortempreture:5000,
					onOff:true,
					info:{
						R:666,
						G:666,
						B:666,
						H:666,
						L:666,
						A:666,
						D:666
					}	
				},{
					id:'03',
					colortempreture:5000,
					onOff:true,
					info:{
						R:666,
						G:666,
						B:666,
						H:666,
						L:666,
						A:666,
						D:666
					}	
				},
				{
					id:'04',
					onOff:true,
					colortempreture:5000,
					info:{
						R:666,
						G:666,
						B:666,
						H:666,
						L:666,
						A:666,
						D:666
					}	
				},
				{
					id:'05',
					colortempreture:5000,
					onOff:true,
					info:{
						R:666,
						G:666,
						B:666,
						H:666,
						L:666,
						A:666,
						D:666
					}	
				}]

			}
		},
		methods: {
			select(light){
				this.currentLight = light
			},
			changeR(e,light){
				light.info.R= e.detail.value
				let msg = "!S"+light.id+"_R"+light.info.R+"_pp#"	
				this.send(msg)
			},
			changeG(e,light){
				light.info.G= e.detail.value
				let msg = "!S"+light.id+"_G"+light.info.G+"_pp#"
				this.send(msg)
			},
			changeB(e,light){
				light.info.B= e.detail.value
				let msg = "!S"+light.id+"_B"+light.info.B+"_pp#"
				this.send(msg)
			},
			changeH(e,light){
				light.info.H= e.detail.value
				let msg = "!S"+light.id+"_H"+light.info.H+"_pp#"
				this.send(msg)
			},
			changeL(e,light){
				light.info.L= e.detail.value
				let msg = "!S"+light.id+"_L"+light.info.L+"_pp#"
				this.send(msg)
			},
			changeA(e,light){
				light.info.A= e.detail.value
				let msg = "!S"+light.id+"_A"+light.info.A+"_pp#"
				this.send(msg)
			},
			changeD(e,light){
				light.info.D= e.detail.value
				let msg = "!S"+light.id+"_D"+light.info.D+"_pp#"
				this.send(msg)
			},
			onOffLight(e,light){
				light.onOff = e.detail.value
				let msg = "!K"+light.id+"_"+(e.detail.value?"ON":"OF")+"_pp#"
				this.send(msg)
			},
			connect(){
				this.plugins.openTcp(
				    '192.168.4.1',
				    '8080',
				    function(result) {
						uni.showToast({title:JSON.stringify(result),icon:'none'});
				    },
				    function(result) {
						uni.showToast({title:result});
				    }
				);
			},
			send(msg){
				if(this.currentLight !=null){
					console.log(msg)
					this.plugins.sendTcp(
					   msg,
						function(result) {
							uni.showToast({title:JSON.stringify(result),icon:'none'});
						},
						function(result) {
							uni.showToast({title:result});
						}
					);
				}
			}
		}
	}
</script>

<style>
.panel{
	width: 95%;
	margin: 20upx auto;
	padding: 16px;
	position: relative;
	border-radius: 2px;
	box-shadow: 0 2px 10px rgba(0,0,0,.12), 0 2px 5px rgba(0,0,0,.16);
	background-color: #fff;
}


</style>

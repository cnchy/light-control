<template>
	<view class="page" style="height: 100vh;"> 
		<cu-custom :bgImage="bg_titlebar">
			<block slot="content">
				系统设置
			</block>
		</cu-custom>
		<view class="content">	
			<view class="list">
				<navigator class="row" url="/pages/setting/ipsetting">
					<view class="title">IP设置</view>
					<view class="right"><view class="tis"></view><view class="icon xiangyou"></view></view>
				</navigator>
				<navigator class="row" url="/pages/setting/degree-setting">
					<view class="title">吊灯角度设置</view>
					<view class="right"><view class="tis"></view><view class="icon xiangyou"></view></view>
				</navigator>
				<navigator class="row" url="/pages/setting/tempreture-setting">
					<view class="title">色温参数设置</view>
					<view class="right"><view class="tis"></view><view class="icon xiangyou"></view></view>
				</navigator>
				<navigator class="row" url="/pages/setting/control">
					<view class="title">通用开关</view>
					<view class="right"><view class="tis"></view><view class="icon xiangyou"></view></view>
				</navigator>
				<view class="row">
					<view class="title">版本</view>
					<view class="right"><view class="tis">v1.7.0</view><view class="icon xiangyou"></view></view>
				</view>
				<view class="row">
					<view class="title">清除缓存</view>
					<view class="right"><view class="tis"></view><view class="icon xiangyou"></view></view>
				</view>
				<navigator class="row" url="/pages/setting/logging">
					<view class="title">操作日志</view>
					<view class="right"><view class="tis"></view><view class="icon xiangyou"></view></view>
				</navigator>
				<view class="row">
					<view class="title">关于灯控系统</view>
					<view class="right"><view class="tis"></view><view class="icon xiangyou"></view></view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import bg_titlebar from '@/static/bg_titlebar.png';
	export default {
		data() {
			return {
				bg_titlebar:bg_titlebar
			};
		},
		methods: {
			showType(tbIndex){
				this.tabbarIndex = tbIndex;
				this.list = this.orderList[tbIndex];
			},
			
		}
	}
</script>

<style lang="scss">
page {

	}
.page{
	background-image: url('~@/static/bg_app.png');
}
.icon {
	font-size: 30upx;

}

.content{
	padding-bottom: 20upx;
	.list{
		width: 98%;
		margin: 20upx auto;
		padding: 10upx;
		position: relative;
		border-radius: 2px;
		box-shadow: 0 2px 10px rgba(0,0,0,.12), 0 2px 5px rgba(0,0,0,.16);
		background-image: linear-gradient(to top right, #6F737C, #34363A);
		.row{
			widows: 100%;
			min-height: 90upx;
			display: flex;
			align-items: center;
			justify-content: space-between;
			border-bottom: solid 1upx #eee;
			&:last-child{
				border-bottom: none;
			}
			.title{
				font-size: 32upx;
				color: #FFFDEF;
			}
			
			.right{
				display: flex;
				align-items: center;
				color: #999;
				.tis{
					font-size: 26upx;
					margin-right: 5upx;
					max-height: 120upx;
					image{
						width: 100upx;
						height: 100upx;
						border-radius: 100%;
						margin: 10upx 0;
					}
				}
				.icon{
					width: 40upx;
					color: #cecece;
				}
			}
			
		}
		.row:active{
			background-image: linear-gradient(to top right, #CCCCCC, #32323A);
		}
	}
}

</style>


export function getColorTemperature(temperature){
	let colorTemperatureArr = uni.getStorageSync('tempretureMap');
	if(colorTemperatureArr[temperature + "k"] != undefined){
		return  colorTemperatureArr[temperature + "k"]
	}
	let key = parseInt(temperature/1000)*1000;
	let startT = colorTemperatureArr[key + "k"]
	let endT = colorTemperatureArr[(key + 1000) + "k"]
	let r =  getColorTemperaturePara(startT[0],endT[0],temperature,key);
	let b =  getColorTemperaturePara(startT[2],endT[2],temperature,key);
	let w1 =  getColorTemperaturePara(startT[3],endT[3],temperature,key);
	let w2 =  getColorTemperaturePara(startT[4],endT[4],temperature,key);
	return [r,300,b,w1,w2 ];
}
function getColorTemperaturePara(start,end,temperature,key){
	
	let step = (end - start)/1000;
	let dv = (temperature - key)  * step;
	let rtn = start + dv;
	return parseInt(rtn)
	//return   start + temperature * ((end - start)/1000);
}
export function getLightDegree(linghtNo,figure){
 let lightDegreeArr = uni.getStorageSync('degreeMap');
 if(lightDegreeArr[linghtNo] == undefined){
    return null;
  }
  let item = lightDegreeArr[linghtNo];
 return parseInt(item[1] - (((item[1] - item[0])/45 ) * (figure - 15) ) )
}
export default { getColorTemperature,getLightDegree }

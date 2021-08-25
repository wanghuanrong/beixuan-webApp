// 过滤时间
export function dataGL(date) { //author: meizz   
	var Ddate = new Date(date);
	let year = Ddate.getFullYear();
	let mm = (Ddate.getMonth() + 1) < 10 ? '0' + (Ddate.getMonth() + 1) : Ddate.getMonth() + 1;
	let dd = (Ddate.getDate() + 1) < 10 ? '0' + (Ddate.getDate() + 1) : Ddate.getDate() + 1;

	let h = (Ddate.getHours() + 1) < 10 ? '0' + (Ddate.getHours() + 1) : Ddate.getHours() + 1;
	let m = (Ddate.getMinutes() + 1) < 10 ? '0' + (Ddate.getMinutes() + 1) : Ddate.getMinutes() + 1;
	let s = (Ddate.getSeconds() + 1) < 10 ? '0' + (Ddate.getSeconds() + 1) : Ddate.getSeconds() + 1;
	return `${year}-${mm}-${dd} ${h}:${m}:${s}`;
}


var t;
// 招手的时间控制
var t_box;
// logobox的时间控制
var num = 0;
// logobox震动的计数
function keyevent(){ 
if(event.keyCode==13) //回车键为确定
	bottom1.click();
} 
document.onkeydown = keyevent; 

input1.onfocus = function () { //第一个输入框获得焦点
	message.style.width = "0%";
	message.style.border = "none";
	rob.style.marginTop = "-260px";
	left_hand.style.left = "70px";
	left_hand.style.top = "103px";
	left_hand.style.transform = "rotate(90deg)";
	right_hand.style.right = "70px";
	right_hand.style.top = "103px";
	right_hand.style.transform = "rotate(-90deg)";
	clearTimeout(t);
}
input2.onfocus = function () { // 第二个输入框获得焦点
	message.style.width = "0%";
	message.style.border = "none";
	rob.style.marginTop = "-320px";
	left_hand.style.left = "53px";
	left_hand.style.top = "60px";
	left_hand.style.transform = "rotate(45deg)";
	right_hand.style.right = "53px";
	right_hand.style.top = "60px";
	right_hand.style.transform = "rotate(-45deg)";
	clearTimeout(t);
}

function shake () { //弹框后右手招手
	if (right_hand.style.top == "43px") {
		right_hand.style.right = "-9.6px";
		right_hand.style.top = "47px";
		right_hand.style.transform = "rotate(20deg)";
	} else{
		right_hand.style.right = "10.4px";
		right_hand.style.top = "43px";
		right_hand.style.transform = "rotate(0deg)";					
	};
	t = setTimeout("shake()",800);
}
function shake_box () {  //loginbox震动
	num ++;
	if (num == 1) {
		loginbox.style.transform = "rotate(10deg)"
		t_box = setTimeout("shake_box()",100);
	} else if (num == 2) {
		loginbox.style.transform = "rotate(-10deg)"
		t_box = setTimeout("shake_box()",100);
	} else if (num == 3) {
		loginbox.style.transform = "rotate(6deg)"
		t_box = setTimeout("shake_box()",100);
	} else if (num == 4) {
		loginbox.style.transform = "rotate(-6deg)"
		t_box = setTimeout("shake_box()",100);
	} else if (num == 5) {
		loginbox.style.transform = "rotate(3deg)"
		t_box = setTimeout("shake_box()",100);
	} else{
		clearTimeout(t_box);
		loginbox.style.transform = "rotate(0deg)"
		num = 0;
	};
}
function check_out (msg) { //机器人举牌弹出信息
	message.innerText = msg;
	if (rob.style.marginTop == "-320px") { //判断机器人的高度，显示机器人身体红色
		red.style.display = "block";
	} else{
		red.style.display = "none";
	};
	setTimeout(function () {
		message.style.width = "100%";
		message.style.border = "2px solid white";
	},500);
	shake_box();//窗口震动
	clearTimeout(t);//防止重复点击登录后招手错乱
	shake();//招手
	rob.style.marginTop = "-320px";
	left_hand.style.left = "10.4px";
	left_hand.style.top = "43px";
	left_hand.style.transform = "rotate(0deg)";
	right_hand.style.right = "10.4px";
	right_hand.style.top = "43px";
	right_hand.style.transform = "rotate(0deg)";
}
bottom1.onclick = function () {
	if (input1.value == ""||input2.value == "") {
		check_out("账号或密码不能为空");
	};
}

bottom2.onclick = function () {
	check_out("内部系统，暂未提供本功能");
}


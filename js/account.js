window.onload = function(){
	// alert();
	createAccountList(accountData);  //-----调用生成人员列表函数

	function createAccountList (json){  //-----生成人员列表函数
		if(json){
			for(var i = 0 ; i < json.length ; i ++){
				$('.accountListWrap table tbody').append('<tr class="accountListTr"><td>' + (i + 1) + '</td><td>' + json[i].name + '</td><td>' + json[i].sex + '</td><td>' + json[i].tel + '</td></tr>');
			}
		}
	}
	// $('.accountListContentLeft').swipe({  //-----手指滑动时间
	// 	swipe:function(event, direction, distance, duration, fingerCount) {//-----事件，方向，距离（像素为单位），时间，手指数量
	//         console.log(distance);
	//         if(direction == "left"){   //-----左滑
	//             console.log('left');
	//             $(this).css('left' , '-=' + distance + 'px');
	//         }
	//         else if(direction == "right"){   //-----右滑
	//             console.log('right');
	//             $(this).css('left' , '+=' + distance + 'px');
	//         }
 //    	}
	// })
	$(document).delegate('.accountListContentLeft', 'touchstart', function(event) {  //-----手指接触（移动端）
		var event = event || window.event;
		var disX = event.clientX - $(this).offset().left;
		event.stopPropagation ? event.stopPropagation() : event.cancelBubble = true;
		$(document).delegate('.accountListContentLeft', 'touchmove', function(event) {  //-----手指移动（移动端）
			event.stopPropagation ? event.stopPropagation() : event.cancelBubble = true;
			var disXMove = event.clientX - $(this).offset().left;
			var disRes = disXMove - disX;
			accountMouseMove($(this),disX,event);
	    })
	    $(document).on('touchend',function(event){  //------鼠标抬起（PC端）
	    	$(document).undelegate('.accountListContentLeft', 'mousemove');  //------移出拖动事件
	    	mouseUpEvent();  //-----调用鼠标抬起函数
	    })
    })

	$(document).delegate('.accountListContentLeft', 'mousedown', function(event) {  //-----鼠标按下（PC端）
		var event = event || window.event;
		var disX = event.clientX - $(this).offset().left;
		var moveThis = $(this);
		event.stopPropagation ? event.stopPropagation() : event.cancelBubble = true;
		$(document).delegate('.accountListContentLeft', 'mousemove', function(event) {  //-----鼠标移动（PC端）
			event.stopPropagation ? event.stopPropagation() : event.cancelBubble = true;
			var disXMove = event.clientX - moveThis.offset().left;
			var disRes = disXMove - disX;
			accountMouseMove(moveThis,disX,event);
	    })
	    $(document).on('mouseup',function(event){  //------鼠标抬起（PC端）
	    	$(document).undelegate('.accountListContentLeft', 'mousemove');  //------移出拖动事件
	    	mouseUpEvent();  //-----调用鼠标抬起函数
	    })
    })
    function accountMouseMove(obj,disX,event){  //-----用户列表拖动函数
		var disXMove = event.clientX - obj.offset().left;
		var disRes = disXMove - disX;
		var halfWidth = obj.width() / 2;
		var thisWidth = obj.width();
		obj.css('left' , '+=' + (disXMove - disX) + 'px');
    }
    function mouseUpEvent (){	//------鼠标抬起函数
    	for(var i = 0 ; i < $('.accountListContentLeft').length ; i ++){
    		var halfWidth = - $('.accountListContentLeft').eq(0).width() / 4;
    		if(parseInt($('.accountListContentLeft').eq(i).css('left')) >= halfWidth){
    			$('.accountListContentLeft').eq(i).stop().animate({'left' : 0},300);
    		}else{
    			$('.accountListContentLeft').eq(i).stop().animate({'left' : halfWidth + 'px'},300);
    		}
    	}
    }
    $(document).delegate('.innerAccountRightDelete','click',function(event){
		event.stopPropagation ? event.stopPropagation() : event.cancelBubble = true;
		event.preventDefault();
		if(confirm('确定要删除吗？')){
			console.log(1);
		}else{
			console.log(0);
		}
    })
    $(document).delegate('.innerAccountRightChange','click',function(event){
		event.stopPropagation ? event.stopPropagation() : event.cancelBubble = true;
		event.preventDefault();
		console.log('修改');
    })
}

window.onload = function(){
	// createDateBox();
	var time = new Date();
	createDateContent(time);
	resizeDateBox();
	getBtnStatus(); //-----获取按钮状态

	window.onresize = function(){
		resizeDateBox();
	}

	function createDateBox(num){  //----生成日历格子
		for(var i = 0 ; i < num ; i ++){
			$('.signInStatusContent').prepend('<div class="signInStatusContentBox"><div class="signInStatusContentBoxInner"></div></div>');
		}
	}
	function resizeDateBox(){  //-----重置日历格子的宽高及样式
		var boxWidth = $('.signInStatusContentBox').width();
		$('.signInStatusContentBox').height(Math.ceil(boxWidth * 0.618) + 'px');
		$('.signInStatusBottomContentColor').css({'height' : $('.signInStatusContentBox').height() / 2 + 'px' , 'width' : $('.signInStatusContentBox').width() / 2 + 'px'});
		$('.signInStatusBottomTop').height(($('.signInStatusContentBox').height() * 1.5) + 'px');
		$('.signInStatusBottomContentType').css('line-height' , $('.signInStatusBottomContentColor').height() + 'px');
		$('.signInStatusContentBoxInner').css({'line-height' : $('.signInStatusContentBoxInner').height() + 'px'});
		$('.signInStatusBottomContentColor').eq(0).css('background-color' , 'rgb(28,173,228)');
		$('.signInStatusBottomContentColor').eq(1).css('background-color' , 'rgb(123,14,35)');
		$('.signInStatusBottomContentColor').eq(2).css('background-color' , 'rgb(237,105,66)');
		$('.signInStatusBottomContentColor').eq(3).css('background-color' , '#16a085');
		$('.signInStatusBottomContentColor').eq(4).css('background-color' , 'rgb(255,244,92)');
	}
	function createDateContent(date){  //-----生成日历格子内日期
		var firstDayThisMouth = date.getYear() + 1900 + '/' + (date.getMonth() + 1) + '/' + '1';  //-----获取本月的第一天
		var firstDayThisMouthTime = date.getTime(firstDayThisMouth);  //-----获取本月第一天的时间戳
		var firstDayDate = new Date(firstDayThisMouth);
		var firstDaygetDay = firstDayDate.getDay();  //-----获取本月第一天是星期几
		var thisMouthNewDay = new Date((date.getYear() + 1900) , (date.getMonth() + 1) , 0);
		var thisMouthDay = thisMouthNewDay.getDate();

		console.log('本月第一天为 ' + firstDayThisMouth);
		console.log('本月第一天的时间戳为 ' + firstDayThisMouthTime);
		console.log('本月一号是星期 ' + firstDaygetDay);
		console.log('本月共有 ' + thisMouthDay + ' 天');

		if((firstDaygetDay + thisMouthDay) > 35){
			createDateBox(42);
		}else{
			createDateBox(35);
		}
		for (var i = 0 ; i < thisMouthDay ; i ++){
			$('.signInStatusContentBoxInner').eq(firstDaygetDay + i).html(i + 1);
			$('.signInStatusContentBoxInner').eq(firstDaygetDay + i).css('border-color' , 'rgb(200,200,200)');
		}
	}
	function getBtnStatus(){
		$.ajax({
	     	type: 'POST',
	     	// url: initObj.test , 
	     	url: "http://192.168.1.135:8080/home/sign" , 
	    	data: {
	    		u_id : 1,
	    		token : '123123123',
	    		operation : 'late'
	    	} ,
	    	success: function(data){
	    		console.log(data);
	    	}
		});
	}
}
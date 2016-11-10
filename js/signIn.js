window.onload = function(){
	// createDateBox();
	var time = new Date();
	createDateContent(time);
	resizeDateBox();
	getVacationObj();

	 //-----获取按钮状态、当前用户本月信息
	getOwnMonth();

	window.onresize = function(){
		resizeDateBox();
	}

	function createDateBox(num){  //----生成日历格子
		for(var i = 0 ; i < num ; i ++){
			$('.signInStatusContent').prepend('<div class="signInStatusContentBox"><div class="signInStatusContentBoxInner"><div class="signInStatusContentBoxState"></div></div></div>');
		}

	}
	function resizeDateBox(){  //-----重置日历格子的宽高及样式
		var boxWidth = $('.signInStatusContentBox').width();
		$('.signInStatusContentBox').height(boxWidth);
		$('.signInStatusBottomContentColor').css({'height' : $('.signInStatusContentBox').height() / 2 + 'px' , 'width' : $('.signInStatusContentBox').width() / 2 + 'px'});
		$('.signInStatusBottomTop').height(($('.signInStatusContentBox').height() * 1.5) + 'px');
		$('.signInStatusBottomContentType').css('line-height' , $('.signInStatusBottomContentColor').height() + 'px');
		$('.signInStatusContentBoxInner').css({'line-height' : $('.signInStatusContentBoxInner').height() + 'px'});
		$('.signInStatusContentBoxStateInner').css({'line-height' : $('.signInStatusContentBoxState').height() - 3 + 'px'});

		// $('.signInStatusBottomContentColor').eq(0).css('background-color' , 'rgb(28,173,228)');	//	正常签到
		// $('.signInStatusBottomContentColor').eq(1).css('background-color' , 'rgb(123,14,35)');	//	缺勤
		// $('.signInStatusBottomContentColor').eq(2).css('background-color' , 'rgb(237,105,66)');	//	全天假
		// $('.signInStatusBottomContentColor').eq(3).css('background-color' , '#16a085');			//	半天假
		// $('.signInStatusBottomContentColor').eq(4).css('background-color' , 'rgb(255,244,92)');	//	未签到
		// $('.signInStatusBottomContentColor').eq(5).css('background-color' , '#2ecc71');			//	请假未签到
		// $('.signInStatusBottomContentColor').eq(6).css('background-color' , '#34495e');			//	请假迟到
		// $('.signInStatusBottomContentColor').eq(7).css('background-color' , '#9b59b6');			//	迟到
		// $('.signInStatusBottomContentColor').eq(8).css('background-color' , '#95a5a6');			//	迟到未签退
		// $('.signInStatusBottomContentColor').eq(9).css('background-color' , 'pink');			//	签到未签退
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
			$('.signInStatusContentBoxInner').eq(firstDaygetDay + i).append(i + 1);
			$('.signInStatusContentBoxInner').eq(firstDaygetDay + i).css('border-color' , 'rgb(200,200,200)');
			$('.signInStatusContentBoxInner').eq(firstDaygetDay + i).addClass('innerDate');
		}
	}
	function loadingPage(operation,content){
		if(operation == 'appear'){
			if(content){
				$('.loadingMaskBot').html(content);
			}
			$('.loadingMask').css('display' , 'flex');
			$('.loadingMask').animate({'opacity' : 1}, 300);
		}else if(operation == 'disappear'){
			$('.loadingMask').animate({'opacity' : 0}, 300 , function(){
				$('.loadingMask').css('display' , 'none');
			});
		}
	}
	function signInObj(url){
		$.ajax({
	     	type: 'POST',
	     	url: url , 
	     	// url: "http://192.168.1.135:8080/home/sign" , 
	    	data: {
	    		u_id : 1,
	    		token : '123123123'	
	    	} ,
	    	success: function(data){
	    		console.log(data);
	    		loadingPage('disappear');

	    		if(data.code === 202){
	    			alert("重复操作");
	    		}else if(data.code == 201){

	    		}else if(data.code == 200){  //-----请求成功
	    			$('.signInBtn').attr('disabled','disabled').css('opacity','0.5');
	    			alert("操作成功");
	    		}else if(data.code == 203){
	    			alert('非法操作');
	    		}
	    	}
		});
	}
	function getVacationObj(){
		var thisMonth = new Date();
        $.ajax({
        	type : 'POST',
        	url : initObj.getVacation ,
        	data : {
				"u_id": 1 ,
			    "token": "123123123" ,
			    "date": (thisMonth.getYear() + 1900) + '-' + (thisMonth.getMonth() + 1)
        	},
        	success : function(data){
        		console.log(data);

        		loadingPage("disappear");

        		if(data.code == 200){
        			for(var i = 0 ; i < data.contents.date.length ; i ++){
        				$('.innerDate').eq(data.contents.date[i] - 1).children('.signInStatusContentBoxState').append('<div class="signInStatusContentBoxStateInner signInStatusContentBoxStateInnerVacation">假</div>');
        				// $('.innerDate').eq(data.contents.date[i] - 1).css({'background-color' : '#f1c40f'});
        			}
        		}else{

        		}
        	}
        })
	}
	function getOwnMonth(){
		$.ajax({
	     	type: 'POST',
	     	url: initObj.getMonth , 
	     	// url: "http://192.168.1.135:8080/home/sign" , 
	    	data: {
	    		u_id : 1,
	    		token : '123123123'	
	    		// month:"2016-10"
	    	} ,
	    	success: function(data){
	    		console.log(data);

	    		if(data.code == 200){
	    			if(data.contents.operable.length == 0){  //------获取按钮点击状态
	    				$('.signInBtn').attr('disabled','disabled').css('opacity','0.5');
	    			}else if(data.contents.operable.length > 0){
	    				if(data.contents.operable[0] == 'signIn'){
	    					$('.signBtnOff').attr('disabled','disabled').css('opacity','0.5');
	    					$('.signBtnIn').css({'opacity':'1' , 'cursor' : 'pointer'});
	    				}else if(data.contents.operable[0] == 'signOff'){
	    					$('.signBtnIn').attr('disabled','disabled').css('opacity','0.5');
	    					$('.signBtnOff').css({'opacity':'1' , 'cursor' : 'pointer'});
	    				}
	    			}

	    			loadingPage('disappear');  //-----隐藏加载框

	    			for(var i = 0 ; i < data.contents.signRecord.length - 1 ; i ++){
	    				if(data.contents.signRecord[i].state == null){
	    					// $('.innerDate').eq(i).css({'background-color' : 'rgb(123,14,35)'});
	    		// 			$('.innerDate').eq(i).children('.signInStatusContentBoxState').append('<div class="signInStatusContentBoxStateInner signInStatusContentBoxStateInnerEmpty">旷</div>');
							// $('.signInStatusContentBoxStateInner').css({'line-height' : $('.signInStatusContentBoxState').height() - 3 + 'px'});
	    				}else{
	    					var signRecordState = new Object();
	    					for(var n = 0 ; n < data.contents.signRecord[i].state.length ; n ++){
	    						signRecordState[data.contents.signRecord[i].state[n]] = 1;
	    					}
	    					// console.log(signRecordState);
	    					if(signRecordState.absenteeism){
		    					$('.innerDate').eq(i).children('.signInStatusContentBoxState').append('<div class="signInStatusContentBoxStateInner signInStatusContentBoxStateInnerEmpty">旷</div>');
								$('.signInStatusContentBoxStateInner').css({'line-height' : $('.signInStatusContentBoxState').height() - 3 + 'px'});
	    					}
	    					if(signRecordState.leaveFull){			//-----全天假
	    						$('.innerDate').eq(i).children('.signInStatusContentBoxState').append('<div class="signInStatusContentBoxStateInner signInStatusContentBoxStateInnerVocation">全</div>');
	    					}
	    					if(signRecordState.sign){	//-----签到
	    						$('.innerDate').eq(i).children('.signInStatusContentBoxState').append('<div class="signInStatusContentBoxStateInner signInStatusContentBoxStateInnerNormal">到</div>');
	    					}
	    					if(signRecordState.signOut){ //-----签退
	    						$('.innerDate').eq(i).children('.signInStatusContentBoxState').append('<div class="signInStatusContentBoxStateInner signInStatusContentBoxStateInnerNormal">退</div>');
	    					}
	    					if(signRecordState.late){  	//-----迟到
	    						$('.innerDate').eq(i).children('.signInStatusContentBoxState').append('<div class="signInStatusContentBoxStateInner signInStatusContentBoxStateInnerEmpty">迟</div>');
	    					}
	    					if(signRecordState.leaveHalf){  //-----半天假
	    						$('.innerDate').eq(i).children('.signInStatusContentBoxState').append('<div class="signInStatusContentBoxStateInner signInStatusContentBoxStateInnerVocation">半</div>');
	    					}
	    					if(signRecordState.notSignOut){  //-----未签退
	    						$('.innerDate').eq(i).children('.signInStatusContentBoxState').append('<div class="signInStatusContentBoxStateInner signInStatusContentBoxStateInnerEmpty">退</div>');
	    					}
                            // if(signRecordState.vacation){   //-----放假
                            //     $('.innerDate').eq(i).children('.signInStatusContentBoxState').append('<div class="signInStatusContentBoxStateInner signInStatusContentBoxStateInnerVacation">假</div>');
                            // }
	    				}
	    			}

        			resizeDateBox();
					$('.signBtnIn').bind('click',function(){
						// console.log(1);
						loadingPage('appear','操作执行中');
						signInObj(initObj.sign);
					})
					$('.signBtnOff').bind('click',function(){
						// console.log(0);
						loadingPage('appear','操作执行中');
						signInObj(initObj.signOut);
					})
	    		}
	    	}
		});
	}
}
window.onload = function(){

	$.cxCalendar.defaults.startDate = 1980; 
	$.cxCalendar.defaults.language = {
	  monthList: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
	  weekList: ['Sun', 'Mon', 'Tur', 'Wed', 'Thu', 'Fri', 'Sat']
	};

	$('#addEntertime').cxCalendar();

	

	getAllMemberEasyInfo();

	// alert();
	// createAccountList(accountData);  //-----调用生成人员列表函数

	function createAccountList (json){  //-----生成人员列表函数
		if(json){
			for(var i = 0 ; i < json.length ; i ++){
				$('.accountListBody').append('<div class="accountListContent"><div class="accountListContentLeft"><div class="accountLeftInner">' + (i + 1) + '</div><div class="accountLeftInner">' + json[i].name + '</div><div class="accountLeftInner accountLeftInnerSex">' + json[i].sex + '</div><div class="accountLeftInner">' + json[i].tel + '</div><div class="accountLeftInnerUId" style="display: none;">' + json[i].u_id + '</div><div class="clear"></div></div><div class="accountListContentRight"><div class="innerAccountRight innerAccountRightDelete">删除</div><div class="innerAccountRight innerAccountRightChange">修改</div></div></div>');
			}
			$('.accountListBody').append('<div class="clear"></div>');
			for(var n = 0 ; n < $('.accountLeftInnerSex').length ; n ++){
				if($('.accountLeftInnerSex').eq(n).text() == 'male'){
					$('.accountLeftInnerSex').eq(n).text('男');
				}else{
					$('.accountLeftInnerSex').eq(n).text('女');
				}
			}
		}
	}
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

    $('.addNewBtn').on('click',function(){  //-----添加成员按钮被点击
    	$('.addNewWrapAll').show(300).css('display' , 'flex');
    })

    $('.addNewBtnCancel').on('click',function(){  //-----添加成员窗口取消被点击
    	$('.addNewWrapAll').hide(300);
    })

    $('.addNewBtnAdd').on('click',function(){  //----- 添加成员接口
    	var ifEmpty = false;
    	for(var i = 0 ; i < $('.addNewInputWrap').length ; i ++){
    		if($('.addNewInputWrap').eq(i).children('.addNewInput').val() == ""){
    			ifEmpty = true;
    		}
    	}
    	if(ifEmpty == false){
    		loadingPage('appear');
	        $.ajax({
	        	type : 'POST',
	        	url : initObj.addNewMember ,
	        	data : {
				    "u_id" : 1,
				    "token" : "123123123",
				    "userType" : "user",   

				    "enterTime" : $('#addEntertime').val(),
				    "name" : $('#addName').val(),
				    "position" : $('#addPosition').val(),
				    "status" : $('#addStatus').val(),
				    "tel" : $('#addTel').val(),
				    "username" : $('#addUsername').val(),
				    "password" : $('#addPassword').val()
	        	},
	        	success : function(data){
	        		console.log(data);

	        		loadingPage("disappear");

	        		if(data.code == 200){
	        			alert('添加成功');

				    	for(var i = 0 ; i < $('.addNewInputWrap').length ; i ++){
				    		$('.addNewInputWrap').eq(i).children('.addNewInput').val('');
				    	}
	        		}else{
	        			alert(data.message);
	        		}
	        		$('.addNewWrapAll').hide(300);
	        	}
	        })
    	}
    })

    function getAllMemberEasyInfo(){  //-----获取所有员工基本信息
    	loadingPage('appear');
        $.ajax({
        	type : 'POST',
        	url : initObj.getAllMemberEasyInfo ,
        	data : {
			    "u_id" : 1,
			    "token" : "123123123"
        	},
        	success : function(data){
        		console.log(data);


        		if(data.code == 200){
        			loadingPage("disappear");
        			createAccountList(data.contents);
        		}else{
        			// alert(data.message);
        		}
        	}
        })
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
}

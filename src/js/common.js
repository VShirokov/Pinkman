$(function () {
	var name = $('.input-name'),
	   phone = $('.input-phone'),
	   email = $('.input-email'),
 some_inputs = $('.input-name, .input-phone, .input-email'),
	   label = $('.form__label--text'),
	   error = $('.form__label--error'),
	reg_mail = /^[a-z0-9_-]+@[a-z0-9-]+\.[a-z]{1,6}/i;

	var phoneMask = new IMask(
		document.getElementById('phone-mask'), {
		mask: '+{7}(000)000-00-00'
	});

	function  show_label(el, label_text) {
		var attr_val = el.attr('placeholder');
		el.attr('placeholder', '');
		if (label_text == undefined) {
			el.prev('.form__label--text').text(attr_val);
		} else {
			el.prev('.form__label--text').text(label_text);
		}	
	};

	function  hide_label(el) {
		el.attr('placeholder',el.siblings('.form__label--text').text());
		el.removeClass('done_input error_input');
		el.siblings('.form__label--text').text('');
		el.siblings('.form__label--error').text('');	
	};

	function  show_error(el, error_text) {
		el.addClass('error_input').removeClass('default_input done_input').siblings('.form__label--error').text(error_text);			
	};	

	function  hide_error(el) {
		el.siblings('.form__label--error').text('');	
	};	

	function  default_status(el) {
		el.addClass('default_input').removeClass('error_input').siblings('.form__label--error').text('');	
	};	

	function  done_status(el) {
		el.addClass('done_input').removeClass('error_input').siblings('.form__label--error').text('');	
	};

	some_inputs.focus(function() {
		if ($(this).val().length == 0) {
			show_label($(this));
		}
 	});		

	//begin validate name		
	name.focusout(function() {
		if ($(this).val().length == 0) {
			hide_label($(this));
			hide_error($(this));
			$(this).attr('placeholder', 'имя фамилия');
		} else if ($(this).val().length > 0 && $(this).val().length < 3) {
			show_error($(this),'введите корректное имя');
		} else {
			done_status($(this));
			show_label($(this), 'имя фамилия');	
		}
		check_valid();
	});
	//end validate name	

	//begin validate phone
	phone.focusout(function() {
		if ($(this).val().length >= 0 && $(this).val().length < 4) {
			$(this).attr('placeholder', 'телефон');
			default_status($(this));
			$(this).val('');
			$(this).siblings('.form__label--text').text('');
			hide_error();
		} else if ($(this).val().length > 3 && $(this).val().length < 16) {
			$(this).attr('placeholder', $(this).val());
			show_error($(this),'введите корректный номер');		
		} else if ($(this).val().length == 16) {
			done_status($(this));
			show_label($(this), 'телефон');	
		};
		check_valid();
	});
	//end validate phone	

	//begin validate email
	email.focusout(function() {
		if ($(this).val().length == 0) {
			hide_label($(this));
			hide_error($(this));
			$(this).attr('placeholder', 'email');	
		} else if ($(this).val().search(reg_mail) != 0) {
			$(this).attr('placeholder', $(this).val());
			show_error($(this),'введите корректный email');			
		} else {
			done_status($(this));
			show_label($(this), 'email')
		};
		check_valid();
	});
	//end validate email	
	function coldata() {
		var  obj_data = [];
		$('.done_input').each(function(index, element) {
			var label = $(this).prev('.form__label--text').html(),
			data = [label,$(this).val()];
			obj_data.push(data);
		});
		console.log(obj_data)
	};

	function check_valid(){
		if ($('.done_input').length == 3) {
			$('.submit_btn').addClass('btn_done').removeClass('btn_disabled');
			$('.submit_btn').bind('click', function(){
				$('#form').submit(coldata());
			});
		} else {
			$('.submit_btn').addClass('btn_disabled').removeClass('btn_done');
			$('.submit_btn').unbind('click');
		};
	};
});

// anim = document.getElementsById('b1');
// anim.addEventListener('endEvent', function(event) {
// 	p = document.createElement('p');
// 	t = document.createTextNode('It works!');
// 	p.appendChild(t);
// 	document.body.appendChild(p);
// }, false);
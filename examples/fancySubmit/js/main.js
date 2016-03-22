$( document ).ready(function() {
	$("#testForm").validate({
		onSubmit:function(event){
			event.preventDefault();
			var shade = $("<div></div>");
			$("body").append(shade);
			shade.css({
				'position':'fixed',
				'top':'0px',
				'left':'0px',
				'height':'100%',
				'width':'100%',
				'background':'rgba(0,0,0,1)',
				'opacity':0
			})
			shade.animate({
				opacity:0.85
			
			},1500,function(){
				var dialog = $("<div class='dialogBox'><header>Form Submitted<button id='closeBtn'>X</button></header><p>Thank you, we will get back to you soon.</p></div>");
				shade.append(dialog);
				$("#closeBtn").click(function(){
					dialog.remove();
					shade.animate({
						opacity:0
					
					},1500,function(){
						shade.remove();
					});
					
				});
			});
			
		},
	});
});
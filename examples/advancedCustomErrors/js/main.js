$( document ).ready(function() {
	$("#testForm").validate({
		onValidate:function(){
			$(this.element).find(".error").removeClass("error");
			var myErrors = this.getErrors()||[];
			for(var x=0;x<myErrors.length;x++){
				myErrors[x].field.addClass("error");
			}
		},
		onReset:function(){
			var myErrors = this.getErrors()||[];
			for(var x=0;x<myErrors.length;x++){
				myErrors[x].field.removeClass("error");
			}
		}
	});
});

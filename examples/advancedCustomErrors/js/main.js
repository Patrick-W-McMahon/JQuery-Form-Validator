$( document ).ready(function() {
	$("#testForm").validate({
		onValidate:function(){
			$(this.element).find(".error").removeClass("error");
			var myErrors = this.getErrors();
			for(var x=0;x<myErrors.length;x++){
				myErrors[x].field.addClass("error");
			}
		},
		onReset:function(){
			var myErrors = this.getErrors();
			for(var x=0;x<myErrors.length;x++){
				myErrors[x].field.removeClass("error");
			}
		},
		onDisplayErrors:function(){
			var ede = this.options.errorDisplayElm;
			if(typeof(ede)!=undefined){
				var myErrors = this.getErrors();
				ede.empty();
				for(var x=0;x<myErrors.length;x++){
					ede.append($("<div><h2>"+myErrors[x].title+"</h2><p>"+myErrors[x].msg+"</p></div>"));
					ede.show();
				}
			}else{
				console.log("error display element not set");
			}
		},
		onFieldUpdate:function(plg,e){
			if(this.getErrors().length>0){
				this.validate();
			}
		}
	});
});

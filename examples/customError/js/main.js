$( document ).ready(function() {

	$("#testForm").validate({
		onValidate:function(){
			var myErrors = this.getErrors();
			for(var x=0;x<myErrors.length;x++){
				var err = myErrors[x];
				console.log("Error "+x+": Title: "+err.title+", Message: "+err.msg+".");
			}
		}
	});
	
});

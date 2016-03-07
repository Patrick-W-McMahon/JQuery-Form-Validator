$.fn.validate = function(args){
	var self = this;
	args = args || [];
	var errorDisplay=undefined;
	if(isObj(self.attr("errorDiplay"))){
		errorDisplay = $(self.attr("error_diplay"));
	}else if(isObj(args["error_display"])){
		errorDisplay = $(args["error_display"]);
	}
	var errorMessages = [];
	var event;
	self.submit(function(e){
		validate(e);
	});
	
	self.find('input[type=submit]').on('click',function(e){
		validate(e);
	});
	
	self.find('input[type=reset]').on('click',function(e){
		reset(e);
	});
	
	function reset(e){
		event=e;
		errorMessages = [];
		errorDisplay.hide();
	}
	
	this.err = function(title,msg){
		errorMessages.push({
			"title":title,
			"msg":msg
		});
	}
	
	function validate(e){
		event=e;
		errorMessages = [];
		self.find(':invalid').each(function(index, node){
			if($(this).is("input")){
				self.err(getErrTitle($(this)),getErrMessage($(this)));
			}
		});
		
		self.find("[data-validate]").each(function(){
			switch($(this).attr("data-validate").toLowerCase()){
				case "checkboxgroup":
				case "checkbox_group":
				case "checkbox-group":
					var count=0;
					var checkboxes = $(this).find("input[type=checkbox]");
					var passed=false;
					$(this).find("input[type=checkbox]").each(function(){
						if($(this).is(':checked')){
							count++;
						}
					});
					if($(this).attr("data-min-select")){
						if(count<$(this).attr("data-min-select")){
							self.err(getErrTitle($(this)),"min of "+$(this).attr("data-min-select")+" selections must be made");
						}
					}
					if($(this).attr("data-max-select")){
						if(count>$(this).attr("data-max-select")){
							self.err(getErrTitle($(this)),"max of "+$(this).attr("data-max-select")+" selections can be made");
						}
					}
					
				break;
			}
		
		});
		var onVal = self.getArg('onValidate');
		if(onVal){
			onVal(self);
		}
		if(errorMessages.length>0){
			stopSubmit();
		}
	}
	
	function getErrTitle(elm){
		var label = elm.parent().find("label[for="+elm.attr("id")+"]");
		if(isObj(label)&&label.html()!=undefined){
			return label.html();
		}
		var elmAttrErr = elm.attr("data-err-title");
		if(elmAttrErr.length>0){
			return elmAttrErr;
		}
	}
	
	function getErrMessage(elm){
		if(elm.attr("data-err-msg")){
			return elm.attr("data-err-msg");
		}
		return "value required";
	}
	
	this.getErrors = function(){
		return errorMessages;
	}
	
	function displayErrors(){
		if(isObj(errorDisplay)){
			errorDisplay.empty();
			for(var x=0;x<errorMessages.length;x++){
				errorDisplay.append($("<div><span class='title'>"+errorMessages[x].title+"</span>: "+errorMessages[x].msg+"</div>"));
				errorDisplay.show();
			}
		}else{
			console.log("error display element not set");
		}
	}
	
	function stopSubmit(){
		displayErrors();
		if(typeof(event)!=="undefined"){
			event.preventDefault();
		}
	}
	
	this.getArg = function(val){
		if(isObj(args)){
			if(isObj(args[val])&&args[val]){
				return args[val];
			}
		}
		return false;
	}
	
	function isObj(t){
		return typeof(t)!==undefined;
	}
}

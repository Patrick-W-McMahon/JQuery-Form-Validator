;(function ( $, window, document, undefined ){
	var pluginName = "validate";
	var self;
	var defaults={
		error_display_id:"",
		errorDisplayElm:"",
		onValidate:function(){},
		onErrorsFound:function(){},
		onDisplayErrors:function(){
			var ede = this.options.errorDisplayElm;
			if(isObj(ede)){
				var myErrors = this.getErrors()||[];
				ede.empty();
				for(var x=0;x<myErrors.length;x++){
					ede.append($("<div><span class='title'>"+myErrors[x].title+"</span>: "+myErrors[x].msg+"</div>"));
					ede.show();
				}
			}else{
				console.log("error display element not set");
			}
		},
	};
	
	$.fn[pluginName] = function(options){
		return this.each(function(){
			if (!$.data(this, 'plugin_' + pluginName)) {
				$.data(this, 'plugin_' + pluginName, new Plugin( this, options ));
			}
		});
	}
	
	//Plugin constructor
	function Plugin(element,options){
		self = this;
		this.element = element;
		this.options = $.extend({},defaults,options);
		this._defaults = defaults;
        	this._name = pluginName;
		this.errorMessages = [];
		
		this.err = function(title,msg){
			self.errorMessages.push({
				"title":title,
				"msg":msg
			});
		}
		
		this.getErrors = function(){
			return self.errorMessages;
		}
		this.init();
	}
	
	Plugin.prototype.init = function(){
		if(isObj($(this.element).attr("errorDiplay"))){
			this.options.errorDisplayElm = $($(this.element).attr("error_diplay"));
		}else{
			this.options.errorDisplayElm = $(this.options["error_display_id"]);
		}
		$(this.element).submit(function(e){
			validate(e);
		});
		$(this.element).find('input[type=submit]').on('click',function(e){
			validate(e);
		});
		
		$(this.element).find('input[type=reset]').on('click',function(e){
			reset(e);
		});
	}
	
	function stopSubmit(f,event){
		f.options.onDisplayErrors.call(f);
		if(typeof(event)!=="undefined"){
			event.preventDefault();
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
	
	function reset(e){
		event=e;
		self.errorMessages = [];
		self.options.errorDisplayElm.empty();
		self.options.errorDisplayElm.hide();
	}
	
	function validate(e){
		event=e;
		var elm = $(self.element);
		self.errorMessages = [];
		elm.find(':invalid').each(function(index, node){
			if($(this).is("input")){
				self.err(getErrTitle($(this)),getErrMessage($(this)));
			}
		});
		
		elm.find("[data-validate]").each(function(){
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
		self.options.onValidate.call(self);
		if(self.errorMessages.length>0){
			stopSubmit(self,e);
			self.options.onErrorsFound.call(self);
		}
	}
	
	function isObj(t){
		return typeof(t)!==undefined;
	}
	
})( jQuery, window, document );

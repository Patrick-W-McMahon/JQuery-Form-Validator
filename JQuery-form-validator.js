;(function($,window,document,undefined){
	var pluginName="validate";
	var self;
	var defaults={
		error_display_id:"",
		errorDisplayElm:"",
		onValidate:function(){},
		onErrorsFound:function(){},
		onDisplayErrors:function(){
			var ede=this.options.errorDisplayElm;
			if(nUo(ede)){
				var err=this.getErrors();
				ede.empty();
				for(var x=0;x<err.length;x++){
					ede.append($("<div><span class='title'>"+err[x].title+"</span>: "+err[x].msg+"</div>")).show();
				}
			}else{
				console.log("error display element not set");
			}
		},
		onReset:function(){},
		onSubmit:function(){}
	};
	
	$.fn[pluginName]=function(options){
		return this.each(function(){
			if(!$.data(this,'plugin_'+pluginName)){
				$.data(this,'plugin_'+pluginName,new Plugin(this,options));
			}
		});
	}
	
	//Plugin constructor
	function Plugin(element,options){
		self = this;
		this.element = element;
		this.options = $.extend({},defaults,options);
		//this._defaults = defaults;
		this._name = pluginName;
		this.errorMessages=[];
		this.modules=[];
		
		this.addModule=function(f){
			self.modules.push(f);
		}
		
		this.err=function(elm,title,msg){
			self.errorMessages.push({"title":title,"msg":msg,"field":elm});
		}
		
		this.getErrors=function(){
			return self.errorMessages||[];
		}
		this.init();
		return this;
	}
	
	Plugin.prototype.init=function(){
		var tE=$(this.element);
		this.options.errorDisplayElm = peramSet([
			$(tE.attr("error_diplay")),
			$(tE.attr("errorDiplay")),
			$(tE.attr("error-diplay"))
			],$(this.options["error_display_id"]));
		tE.submit(function(e){validate(e);});
		tE.find('input[type=submit]').on('click',function(e){validate(e);});
		tE.find('input[type=reset]').on('click',function(e){reset(e);});		
		
		this.addModule(function(plg,formElm){
			formElm.find("[data-validate]").each(function(){
				var ts = $(this);
				switch(ts.attr("data-validate").toLowerCase()){
					case "checkboxgroup":
					case "checkbox_group":
					case "checkbox-group":
						var count=ts.find("input[type=checkbox]:checked").length;
						var min = ts.attr("data-min-select")||false;
						var max = ts.attr("data-max-select")||false;
						var attrArr=["-select-err","_select_err","SelectErr"];
						if(min&&count<min){
							self.err(ts,getErrTitle(ts),peramSet(aAb(attrArr,"min",ts),"min of "+min+" selections must be made"));
						}
						if(max&&count>max){
							self.err(ts,getErrTitle(ts),peramSet(aAb(attrArr,"max",ts),"max of "+max+" selections can be made"));
						}
					break;
				}
			});
		});
	}
	
	function aAb(arr,sP,elm){//array attr builder
		var r=[];
		for(var x=0;x<arr.length;x++){
			r.push(elm.attr(sP+arr[x]));
		}
		return r;
	}
	
	function peramSet(optArr,defaultval){
		for(var x=0;x<optArr.length;x++){
			if(nUo(optArr[x])){
				return optArr[x];
			}
		}
		return defaultval;
	}
	
	function getErrTitle(elm){
		var label=elm.parent().find("label[for="+elm.attr("id")+"]");
		if(nUo(label)&&nUo(label.html())){
			return label.html();
		}
		var err=elm.attr("data-err-title");
		if(err.length>0){
			return err;
		}
	}
	
	function getErrMessage(elm){
		return elm.attr("data-err-msg")||"value required";
	}
	
	function reset(event){
		self.options.onReset.call(self);
		self.errorMessages=[];
		self.options.errorDisplayElm.empty();
		self.options.errorDisplayElm.hide();
	}
	
	function validate(e){
		var formElm = $(self.element);
		self.errorMessages=[];
		formElm.find('input:invalid').each(function(index, node){
			self.err($(this),getErrTitle($(this)),getErrMessage($(this)));
		});
		for(var m=0;m<self.modules.length;m++){
			self.modules[m](self,formElm);
		}
		self.options.onValidate.call(self);
		if(self.errorMessages.length>0){
			self.options.onDisplayErrors.call(self);
			e.preventDefault();
			self.options.onErrorsFound.call(self);
		}else{
			self.options.onSubmit.call(self,e);
		}
	}
	
	function nUo(t){return typeof(t)!=="undefined";}	
})(jQuery,window,document);

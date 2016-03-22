# JQuery-Form-Validator
A JQuery Form Validation plugin

JQuery Form Validator is a JQuery plugin that makes validating form data simple.

To set a DOM element as the error display element just add the attribute "error_display" to the form element and pass the id of the 
DOM element that will be the container for the error messages. 

To change the error message that is displayed for a field add "data-err-msg" to the input tag and pass it your new error message.

If you're not happy with how the error message output is. Use the onValidate callback to execute a function where you can then call the getErrors() method to get the error message array to fully customize your error display output. The errorArray holds an array of error objects. Each error object is formatted like so {title,msg}

The title of the error can be set with "data-err-title" or setting a label with a 'for' attribute to the input field.

if you have a group of checkbox's and want to set a min and/or max wrap the checkbox's in an element and set the container attribute
'data-validate'= "checkbox_group" this will tell the validator to treat all child checkbox elements as a group that will be validated 
together. you can set 'data-min-select' to the min number of checked boxs excepted. for max limit check add 'data-max-select'.


If the form is invalid the form will not submit and will display the error messages (if an error display element has been assigned).
If you setup a reset button on the form the form validator handles the reset and will clear the form and error messages on reset button.

**Form attributes:**
  * **error_display:** this attribute is added to the form elment and the value should the the id of the element that will be used for the error display. 
 
**Field attributes:**
  * **data-err-msg:** pass the error message string that will be displayed for this field.
  * **data-err-title:** pass the title for the error message for this field. If not passed will look for an adjacent label tag and will use the internal html as the title. The label tag must have a for attribute that is set to the id of the field.
  * 
  
**Validation settings**
  * **data-validate:** sets an element to a validator group.
  
**Checkbox Group**
A checkbox group lets you group checkbox elements into a single group that can have rules set on it. for example setting a minimume and maximume number of checkboxs selected in the group. To use a checkbox group you must set the attribute `data-validate='checkbox_group'` on the element wrapping the checkboxs.
  * **data-min-select:** given a number it will set a minimum number of checkboxs if the number of boxs check is less than min an error message is displayed.
  * **min-select-err:** set the error message that is displayed under min select error condition.
  * **data-max-select:** given a number it will set a maximum number of checkboxs if the number of boxs check is more than max an error message is displayed.
  * **max-select-err:** set the error message that is displayed under max select error condition.
  


**Callback Methods:**
  * **onValidate:** ran every time form is validated.
  * **onErrorsFound:** ran when 1 or more errors have been found.
  * **onDisplayErrors:** overrides the default error display method.
  * **onReset:** ran on form reset.
   
**Internal Methods:**
  * **getErrors():** returns an array of error objects `{title,msg,field}`. accessed as plugin method
  * **addModule(module):** adds new module to the plugin. Modules are executed on validation. accessed as plugin method
  * **getErrTitle(elm):** attempts to get an error title based on the DOM. Not accesed by $(this) and is only used for modules.
  * **peramSet(optionsArray,defaultval):** passing an array of optional attributes it will pick a valid attr to return. Not accesed by $(this) and is only used for modules.
  * **getErrMessage(elm):** attempts to get an error message from the DOM. Not accesed by $(this) and is only used for modules.
  * **nUo(t):** `Not Undefined Object` returns true if t is a valid object or false if undefined. Not accesed by $(this) and is only used for modules.
  * **peramSet(optArr,defaultval):** This function will check each object in the optArr and return the first one that is valid. Fall back to defaultval if all optArr objects are not valid. 
  * **aAb(arr,sP,elm):** `array attribute builder` takes an array `arr` of strings and concatinates starting point `sP` to the front of each string and then calls it as an attribute on the element `elm`. It then returns an array of the values.
  
**Variables**
  * **element:** points to the form element.
  * **options:** all configurable options.
  * **_defaults:** default options. (currently commented out and may be removed in future updates). 
  * **errorMessages:** array of error message objects. Use `this.getErrors()`.
  * **modules:** array of all modules in the plugin.
  * **self:** points to the plugin instance that is currently running. used when not in scope of plugin. internal use only.
 
**Modules**

Modules are passed the `plugin object` and the `form element`. They have access to the plugin variables and internal methods. 
This will give a module all the access it needs to validate the fields and add errors. 


Review the examples to see how easy it is to use this plugin.

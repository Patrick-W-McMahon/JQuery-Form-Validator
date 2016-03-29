# JQuery-Form-Validator
A JQuery Form Validation plugin

JQuery Form Validator is a JQuery plugin that makes validating form data simple.

To set a DOM element as the error display element just add the attribute "error_display" to the form element and pass the id of the 
DOM element that will be the container for the error messages. 

To change the error message that is displayed for a field add "data-err-msg" to the input tag and pass it your new error message.

The title of the error can be set with "data-err-title" or setting a label with a 'for' attribute to the input field.

if you have a group of checkbox's and want to set a min and/or max wrap the checkbox's in an element and set the container attribute
'data-validate'= "checkbox_group" this will tell the validator to treat all child checkbox elements as a group that will be validated 
together. you can set 'data-min-select' to the min number of checked boxs excepted. for max limit check add 'data-max-select'.


If the form is invalid the form will not submit and will display the error messages (if an error display element has been assigned).
If you setup a reset button on the form the form validator handles the reset and will clear the form and error messages on reset button.

all attributes have been set to be used in 3 different formats for example `error_display` can be called in the following ways:
  * `error_display`
  * `error-display`
  * `errorDisplay`

**Form attributes:**
  * **error_display:** this attribute is added to the form elment and the value should be the id of the element that will be used for the error display. 
 
**Field attributes:**
  * **data-err-msg:** pass the error message string that will be displayed for this field.
  * **data-err-title:** pass the title for the error message for this field. If not passed will look for an adjacent label tag and will use the internal html as the title. The label tag must have a for attribute that is set to the id of the field.
  
**Validation settings**
  * **data-validate:** sets an element to a validator group.
  
**Checkbox Group**
A checkbox group lets you group checkbox elements into a single group that can have rules set on it. for example setting a minimume and maximume number of checkboxs selected in the group. To use a checkbox group you must set the attribute `data-validate='checkbox_group'` on the element wrapping the checkboxs.

The following are attrbutes added to the Checkbox Group element:
  * **data-min-select:** given a number it will set a minimum number of checkboxs if the number of boxs check is less than min an error message is displayed.
  * **min-select-err:** set the error message that is displayed under min select error condition.
  * **data-max-select:** given a number it will set a maximum number of checkboxs if the number of boxs check is more than max an error message is displayed.
  * **max-select-err:** set the error message that is displayed under max select error condition.

**Callback Methods:**
  * **onValidate:** ran every time form is validated.
  * **onErrorsFound:** ran when 1 or more errors have been found.
  * **onDisplayErrors:** overrides the default error display method.
  * **onReset:** ran on form reset.
  * **onSubmit:** this is called when the form is valid and is about to submit.
   
**Internal Methods: (for callback methods)**

The following methods can be accessed by $(this) and are avalable to callback methods. 
  * **getErrors():** returns an array of error objects `{title,msg,field}`.
  * **addModule(module):** adds new module to the plugin. Modules are executed on validation. accessed as plugin method
  * **err(elm,title,msg):** adds a new error object to the error array. `elm` is the object reference to the field. `title` is the error message title. `msg` is the error message body.

**Internal Methods: (for modules)**

The following methods are not accesed by $(this) and is only used for modules. Attempting to use these methods in callback methods would return a `method name not found exception`. 
  * **getErrTitle(elm):** attempts to get an error title based on the DOM.
  * **peramSet(optionsArray,defaultval):** passing an array of optional attributes it will pick a valid attr to return.
  * **getErrMessage(elm):** attempts to get an error message from the DOM.
  * **nUo(t):** `Not Undefined Object` returns true if t is a valid object or false if undefined.
  * **peramSet(optArr,defaultval):** This function will check each object in the optArr and return the first one that is valid. Fall back to defaultval if all optArr objects are not valid. 
  * **aAb(arr,sP,elm):** `array attribute builder` takes an array `arr` of strings and concatinates starting point `sP` to the front of each string and then calls it as an attribute on the element `elm`. It then returns an array of the values.

**Variables**

All of the following variables are accessable by $(this) and can be used in callback methods and modules.
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

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

**Callback Methods:**
  * **onValidate:** ran every time form is validated.
  * **onErrorsFound:** ran when 1 or more errors have been found.
  * **onDisplayErrors:** overrides the default error display method.
  * **onReset:** ran on form reset.


Review the examples to see how easy it is to use.

Name: Sean Ghazazani

Repo name: Typescript/AngularJS

Purpose: Anything related to TypeScript or AngularJS. As a current full time coop student with really strong PHP, MySQL, Abyss stack knowledge I want to diversify my understanding of web technologies by mastering AngularJS, and TypeSript in preparation for my coming term as a coop student at Kinaxis in fall 2015.

Find more about me here:

http://shaheensweb.me

Will add more specifics once I understand what I want this repo to become.            

<!------ ------->

Name: Shaheen Ghazazani
Below are notes from "Shaping Up with AngularJS from Codeschool.com"

AngularJS: A client-side JS framework to add interactivity to HTML.

Directive: A marker on a HTML tag that tells anglar to run or reference some JavaScript code.
-> Directive Defn #2: HTML annotations that trigger Javascript behaviors. 

Modules: How we write peices of our angular applicaiton. Makes our code more maintainable, 
testable, readable, and also where we define the dependencies for the application.
	-> Modules Defn #2: Where our application components live.
	
Expressions: Allow you to insert dynamic values into your HTML.
	-> Expressions Defn #2: How values get displayed within the page.
	
Controllers: Help us get data onto the page. 
	-> Controllers Defn #2: Where we add application behavior.
	
ng-app = How we attach the application module to the page.
ng-controller = How we attach a controller function to the page
ng-hide / ng-show = display or hide a section based on a expression
ng-repeat = our way of iterating over a array etc (think php ArrayName as array, very similar).

Angular filters: the recipe for filters is {{ data | filter: options }} for example, the currency one used for getting localized currency. 

	-> examples of some filters: {{'12312491239213213' | date:'MM/dd/yyyy @ h:mma'}} -> gives us 12/27/2013 @ 12:50am,
	-> {{ 'sean' | uppercase }} gives us 'SEAN'
	-> {{ 'My Description' | limitTo: 8 }} hard caps the length of the output would return "My Descr" 
	-> or in a ng-repeat,  <li ng-repeat="product in store.products | limitTo: 3"> if we only wanted the first 3 products
	-> orderBy, a way similar to limitTo example above to organize a ng-repeat by price.
	
AngularJS is dynamic and stuff, when ng-click changes the value of tab the {{tab}} gets automatically updated. 
Expressions define a 2-way data binding, this means expressions are re-evaluated when a property changes.
Important Note: Never over clutter your HTML with too much logic, try to do it in the app.js in seperate controllers.
Ng-Model: binds the frm element value to the property.

Angular has built in form validation, for common input types. This is viewed in the coding example as we validate
email, urls, and numbers(even specify a min and max).

on your form use : novalidate to stop other validation sources mark fields as required,and print formName.$valid to see if its valid!

 <h3 ng-include="'product-title.html'"></h3>
 An example of ng-include, notice the double quotes!!
 
 Directives: allow you to write HTML that expresses the behavior of your application. 
 Custom Directives are a better method then using ng-include. 
 
 Template-expanding directives(the simplest): define a custom tag or attribute that is expanded
 or replaced, and can include controller logic if needed.

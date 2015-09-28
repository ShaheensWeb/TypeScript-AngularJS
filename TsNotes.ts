/*TypeScript tutorial by Richard Hepburn at AngularJS Toronto Meetup(Oct.2014)
Note: I watched the lecture online at: https://www.youtube.com/watch?v=HBjyZem_SCY (1.75 hrs)

- > Typescript is a version of JavaScript made for large scale JavaScript development.
- > Typescript is a typed superset of JavaScript that compiles to plain JavaScript.
- > TypeScript is open source(github.com / Microsoft / TypeScript) from the creator of J++, C#, etc.Overall a lot of experience in the compiler building world for this project.
- > They are taking pull requests for TypeScript!

    Why does Richard like TS?
	- > Starts with JavaScript.
	- > Adds Classes, Modules, Interfaces, Generics, Lambdas, option Static Typing.
	- > Works with all existing JavaScript frameworks(client & server)
	- > Compiles to idiomatic JavaScript(meaning, it compiles to a version of JS we could not write by hand unless we wanted to waste our lives)
	- > Recommended Books: JavaScript the good parts, JavaScript the patterns.

TypeScript adds:
	- > Types, Modules(internal and external, ex: node.js & require.js), Classes & Inheritance, Generics, Interfaces, Interface Extensions, Optional Properties, Static and Instance types,
Private / Public modifies, Enums, Accessors, Ambient Declarations, Rest params, and Overloads.
	- > Will be doing examples of these in the future.

Case Study (TypeScript at Cetaris): 
	- > Huge reduction in defects. 
	- > The TS compiler acts as your first set of unit tests.
	- > Faster on - boarding for new developers.
	- > 2x or more productivity improvement.
	- > Intellisense!!Less time spent in on - line help systems learning API's. 
	- > Superhelpful to onboard C# developers.
	- > There is some one - time intergration friction. 
	- > Code is cleaner, easier to understand, easier to maintain.

Tools & Support:
	IDE's & Editors:
		- > Visual Studio 2012 +
		- > Jet Brains PHPStorm 6, WebStorm 6, and ReSharper 8.1
		- > Sublime, Emacs, Vim
		- > Eclipse, Cloud9, WebMatrix
	Build Tools:
		- > tsc.exe(command line)
		- > grunt - TS / gulp - TS
		- > Apache Maven
		- > Gradle

Visual Studio Online - ALM(similar to cloud9 web IDE).A recommended tool by Richard Hepburn.
*/


//TS Demo
// <!----------- LESSON 1 ----------> 
function sortIt(arr) {
    var result = arr.slice(0);
    result.sort(function (x, y) {
        return x.name.localCompare(y.name);
    });
    return result;
}

var sortedResult = sortIt("hello");

document.body.innerText = JSON.stringify(sortedResult, null, 4);

/*Above is a regular JS function using sort it. It seems to be like were passing an Array sortIt(arr) but
we cant really be sure. Intellisense is no aid to us because we are unsure of the return types given from
these dynamic objects (result, and arr).

This is a well known issue! Using closure @param {Array} arr an Array of entities (example of closure) is one
method of solving this problem and the comment system is not the best place to start describing the code your writing for the
IDE.. so we need another solution. This solution is TypeScript.*/


// <!----------- LESSON 2 ----------> 

function sortIt2(arr: any[]) {
    var result = arr.slice(0);
    result.sort(function (x, y) {
        return x.name.localCompare(y.name);
    });
    return result;
}

var sortedResult3 = sortIt2("hello"); // See how it now has a red squigly? Continue reading now...
var sortedResult2 = sortIt2(["hello", "goodbye"]); //supplied parameter does not match because now we know sortIt2 takes an ARRAY, not a string.. (see how useful this is)

document.body.innerText = JSON.stringify(sortedResult, null, 4);

/*Above is an example of static type declarations. Now sortIt2 knows the input is an Array.
Above sortIt2 now gives us intellisense, a very useful programming tool (Think back to PHPstorm 6 days at your previous internship and how useful this->__ was).
We now know the return type of the function due to the intellisense, and we know now sortIt2 takes an array of input and takes out an array of input AKA why sortedResult2 has a underlying issue.*/

//This means we can find these bugs within development and not at runtime (worst case).

// <!----------- LESSON 3 ----------> 

interface IEntity { //instead of saying we want an Array of anything, we can say we expect an array of IEntity (strings) in a Array
    name: string; 
}

function sortIt3(arr: IEntity[]) { //now we are taking an array of IEntity aka an array of strings with the name value to access set str (ex, x.name or y.name)
    var result = arr.slice(0);
    result.sort(function (x, y) {
        return x.name.localCompare(y.name); //see now the intellisense goes "HEY U", this localCompare your trying to do on a String is actually wrong... did you mean localeCompare?

        return x.name.localeCompare(y.name); //the solution, once again found not at runtime but at compile time. Super important. 
    });
    return result;
}

var sortedResult3 = sortIt3(["hello", "goodbye"]); //its now saying woah, you said name was gonna be a type param but its just strings... not IEntitys. 
//the solution is...

var sortedResult4 = sortIt([ //now we have the corret version giving it the name params.
    { name: "name1" }, { name: "name2" }
]); 


document.body.innerText = JSON.stringify(sortedResult, null, 4);

// <!----------- LESSON 4 ----------> 


interface IEntity2 { //instead of saying we want an Array of anything, we can say we expect an array of IEntity (strings) in a Array
    name: string;
    price: number;
    inStock: boolean;
}

function sortIt5(arr: IEntity2[]) { 
    var result = arr.slice(0);
    result.sort(function (x, y) {
        var name = 1234;  //running a Find + replace here on "name" would cause a big issue here. It would replace everywhere including this var.
        //Option #2: right click a var hit "refactor" pick a new name, and hit enter. This will replace IEntity2 name and x.name but not var name = 1234... this is safe refactoring in large code bases.
        return x.name.localeCompare(y.name); 
    });
    return result;
}

var e: IEntity = {

}; // cannot declare an empty var
//The solution is...

var e2: IEntity2 = { //contextual typing, its flowing the type into the object literal to let us know we need a name entity 
    name: "Shaheen G", 
    price: 10,
};  
//Now its saying hey you!  Where is my inStock value? What if we wanted to not pass inStock every time and wanted to make it an optional value

interface IEntity3 { //instead of saying we want an Array of anything, we can say we expect an array of IEntity (strings) in a Array
    name: string;
    price: number;
    inStock?: boolean; //the ? = optional Value
}

var e3: IEntity3 = { //Its now perfectly happy since inStock is optional, but we may still add it if required.
    name: "Shaheen G",
    price: 10,
};  

// <!----------- LESSON 5 ----------> 


interface IEntity4 { //instead of saying we want an Array of anything, we can say we expect an array of IEntity (strings) in a Array
    name: string;
    price: number;
    inStock?: boolean; //the ? = optional Value
    //now some functions
    getName(): string;
    setName(value: string): void;
}

//Note: Interfaces are DESIGN TIME ONLY, meaning they wont appear in the compiled version of JS that will appear after saving your TS file.

var e4: IEntity4 = {
    name: "Shaiwan",
    price: 9001,
    inStock: false,
    //defn of those functions below
    getName: function () { return name },
    setName: function (value) { name = value }
}
//This can be used to model complex data Structures, and coupled with the intellisense it can be very powerful.
//Dont have VS2013 or another IDE? go to typescriptlang.org/Playground and play with the examples. Useful tool and good place to start.
//TypeScript literally runs everywhere (your phone, the web, etc).

// <!----------- LESSON 6 ----------> 

interface IEntity6 {
    name: string;
    price: number;
    inStock?: boolean;
}

function sortIt6(arr: IEntity6[]) {
    var result = arr.slice(0);
    result.sort(function (x, y) {
        return x.name.localeCompare(y.name);
    });
    return result;
}

var products = [
    { name: "shaheenName1", price: 1595.00, id: 1 },
    { name: "shaheenName2", price: 1399.00, id: 2 },
    { name: "shaheenName3", price: 1225.00, id: 3 },
    { name: "shaheenName4", price: 1192.00, id: 4 }
];

var sortedProduct = sortIt6(products);
var id = sortedProduct[0].id; // it does not know what id is! How do we get at the id variables though... this is generics.

/* Now how do we get this id.... time to learn Generics */
function sortIt7<T extends IEntity6>(arr: T[]) { //Takes in type T, an array of it, and returns an array of it. This type T extends IEntity giving us access to interface declared vars
    var result = arr.slice(0);
    result.sort(function (x, y) {
        return x.name.localeCompare(y.name);
    });
    return result;
}

var sortedProduct2 = sortIt7(products);
var id2 = sortedProduct2[0].id; // got it now, but really we should just add it to the interface!

// <!----------- LESSON 7 ---------->

//we want to sort the array but specify the field that is used in the sort comparison.. so lets modify the sortIt function 
function sortIt8<T extends IEntity6>(arr: T[], getValueOfKey: (item: T) => any) { //Takes in type T, an array of it, and returns an array of it. This type T extends IEntity giving us access to interface declared vars
    var result = arr.slice(0);
    result.sort(function (x, y) {
        var valueX = getValueOfKey(x); //get value of x we want to sort on, x is an item that extends IEntity, seen by scrolling over with intellisense
        var valueY = getValueOfKey(y); 
        return valueX > valueY ? 1 : valueX < valueY ? -1 : 0;
    });
    return result;
}

var products = [
    { name: "D shaheenName1", price: 1595.00, id: 1 },
    { name: "C shaheenName2", price: 1399.00, id: 2 },
    { name: "B shaheenName3", price: 1225.00, id: 3 },
    { name: "A shaheenName4", price: 1192.00, id: 4 }
];

var sortedProduct8 = sortIt8(products, x => x.name); //lambda Syntax again 
document.body.innerText = JSON.stringify(sortedProduct8, null, 4); //this gives back a sorted a, b, c, d of products above.

//TS ships with a declaration file. All the functions here actually contain no code just a bunch of predeclarations to allow us to use the intellisense to its full strength.
/* DefinetlyTyped is a website definetlytyped.org with a link to a github repo with over 580 different declaration files. Covers about 90% of the JS libraries are available here  
something.d.ts is a declaration file for TypeScript, hence the (d.ts)
By including the declaration files we pretty much dont have to go to any documentation on the web because the Intellisense populates with the 
declaration files and eveyrthing we need is right at out fringerprints. */

// <!----------- LESSON 8 ---------->
//classes can help with avoiding global var polution, and can help in understanding coming from an Object Oriented Background.

class Point {
    x: number;
    y: number;

    private color: string = "red"; //Outside of the class

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }
    dist() { return this.x * this.x + this.y * this.y } 

    static origin = new Point(0, 0);

}

var p = new Point(10, 20);

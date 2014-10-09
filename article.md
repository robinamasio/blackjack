Basic Closures in Javascript
========

Javascript is a great language.  It is not a toy.  Despite some common misperceptions, it's incredibly powerful, and great at delivering rich interactivity in your web browser.  

But a lot of front-end web developers lack even a basic understanding of the real workings of Javascript; there are plenty of developers out there churning out reams of functions without even scratching the surface of what Javascript can really do for them.  If you're one of them, beware; Javascript gives you a lot of rope to hang yourself with, and it's very easy to make a big mess.  Luckily for you, I'm here to arm you with knowledge about one of Javascript's most powerful features: **closures**. Closures are a super-powerful feature that truly unlock the power of Javascript; understanding closures is the key to understanding what Javascript can truly do.

A closure, in simple terms, is a *retained scope*.  In Javascript, an object can store not only a reference to a function or group of functions, but an entire environment in which those functions will run.  If that doesn't make sense, don't worry.  We'll get you there.  But we need to start with the basics, and that means functions.

Functions
--------

Functions are the heart and soul of Javascript.  In fact, functions are **first-class objects** in Javascript, which means that:

- functions can be stored in variables
- functions can be passed as parameters to other functions
- functions can be returned as the result of other functions
- functions have an intrinsic identity that is independent of any name you might give them

In other words, anything you can do with any other object in Javascript can be done with a function!

Prototypal Inheritance 
--------

It's also important to note that Javascript uses **prototypal inheritance**, in which objects actually inherit directly from other objects.  This means that there are no classes or access modifiers in Javascript.  There's no 'public' or 'private' keyword to let you protect the data in an object from the outside world.  (Actually, those keywords DO exist in Javascript, but they don't do anything.  They're simply reserved words for future versions of the language.  Don't try to use them!)

Scope
--------

To further complicate matters, blocks of code in Javascript don't have scope the way they do in other languages.  Consider the following block of code:

`
if (true) {
   var x = 10;
}
alert(x);	// works just fine!
`

The "if" block will always execute, because the expression `(true)` will always evaluate to true.  In that block, the variable `x` is declared.  And in any other language, as soon as that block closes, the variable `x` becomes inaccessible.  You can't use it anymore.  But not in Javascript.  Blocks of code don't have scope in Javascript.  **The only things that have scope in Javascript are functions**, and that's why functions are the heart of Javascript.

A Simple Closure
--------

Now that we've been through all that, we can consider a simple Javascript closure.  Here it is:

`
function outerFunction() {
	var message = 'hello';

	function innerFunction() {
		console.log(message);
	}

	return innerFunction;
}

var f = outerFunction();
f();
`

What's going on here?  We have a function called `outerFunction` which contains two things:

- a variable called 'message'
- another function, called innerFunction()

Note that because functions have scope in Javascript, `innerFunction` can only be accessed through the scope of `outerFunction`.  If I tried to directly invoke `innerFunction` outside of `outerFunction`, I'd get a console error.  You can't access something outside of the scope in which it exists.  That's the whole point of scope!

However, there's a way around that.  Notice that `outerFunction` returns a reference to `innerFunction`.  Notice also that `innerFunction` isn't actually being executed at the end of `outerFunction`; we're simply returning a reference to the function itself.  Outside of `outerFunction`, this reference to `innerFunction` is stored in a variable called `f`.  Once we've stored the reference, we can execute the function by invoking `f` as if it were any other function.

What's going to happen?  We know that `innerFunction()` references the variable message, which is declared in `outerFunction` and exists in `outerFunction`'s scope.  Since we're executing `innerFunction` directly, without first executing `outerFunction` immediately beforehand to create the message variable, it seems like we should get an error.  

However, we don't.  This code works like a charm.  The output is:

`
hello
`

Where's the kaboom?  Why did that work?  Remember that functions have scope in Javascript.  So since `innerFunction` is declared inside the scope of `outerFunction`, it makes sense that `innerFunction` has access to `outerFunction`'s scope.  

But here's the thing about Javascript: **an inner function has access to the scope of the outer function in which it is defined, even after the outer function has returned**.  So when we execute `outerFunction` and store its result in the variable `f`, we're creating a closure: a retained scope which can contain not only a function definition but also the environment in which that function will run.

Notice what this means: we've achieved data hiding in Javascript, *without the use of access modifiers*!  There's no way to access or change the message variable because it only exists inside the scope of `outerFunction`.  And there's no way to access it except by calling `innerFunction`.  That variable is safe and sound.  This means that anything you can do with the 'private' keyword in other languages can be done with closures in Javascript.  Who needs classical inheritance?

Pure Functions
--------

Something else that's really important to note about closures is that Javascript functions can very easily not be **pure**.  A "pure" function always evaluates to the same result value, given the same argument value(s).  But consider the following example:

`
function makeMultiplier(x) {

	function multiplier(y) {
		return x * y;
	}

	return multiplier;
}

var multiplyFunction;

multiplyFunction = makeMultiplier(5);
console.log(multiplyFunction(10));

multiplyFunction = makeMultiplier(10);
console.log(multiplyFunction(10));
`

Here we're constructing two different closures, one after the other, and storing each in turn in the variable `multiplyFunction`.  Then we call `multiplyFunction` with a parameter of 10, once for each closure.  What will the output be?

To spare you the anticipation, here it is:

`
50
100
`

Notice that we're calling `multiplyFunction` twice, and sending the same parameter both times: 10.  So we should get the same result both times, right?

Wrong.  We're not dealing only with functions, here: we're dealing with closures, and each closure has its own scope which affects the outcome of the internal `adder` function referenced by our `multiplyFunction` variable.  So when we create our first closure sending in a parameter of 5, we create a scope which contains that value.  Then, when we call the closure function through our `multiplyFunction` variable, sending in a parameter of 10, the multiplier gives us back 50.  Then we go through the whole thing again with an initial parameter of 10 - which, when multiplied by 10, gives us 100.

Be Careful!
--------

As you may have guessed, closures can get out of control very quickly.  You can nest closures as many levels deep as you want, eventually making it next to impossible to keep track of all the different scopes your program may be creating.  So when you use closures, be sure to use them with an eye for good software design.  Keep it simple.  That will maximize your benefit and minimize your headaches.

Congratulations!  You've taken your first step into a larger world.  Dive deep, and start using the true power of Javascript!



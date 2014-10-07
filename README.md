blackjack
=========

Launch Academy Coding Challenge - Blackjack

This is a modularized Backbone application which addresses the requirements of Launch Academy's "Blackjack" challenge, assigned to me on October 3, 2014.

I was given a choice of Ruby or Javascript in which to do this challenge; I chose Javascript because I wanted to be able to demonstrate production-quality code, and talk about my development decisions in depth during the interview process.  I'm not at the point of being able to do that with Ruby yet!

Anyway, this application makes use of the following two major Javascript libraries:

RequireJS
/js/lib/require.js
RequireJS is a tool which facilitates the breakup of nasty, messy Javascript code into asynchronously loaded modules, which give you a very neat way of not only reusing your code but managing requirements as well.  With RequireJS only one "script" tag is needed in the main HTML document; in each of my modules, I'll specify which dependencies need to be loaded before the module can execute, and RequireJS will take care of the rest.

Backbone
/js/lib/backbone-min.js
Backbone is one of several MVC frameworks for Javascript (or, more accurately, MV - since there are no real "controllers" to speak of in Backbone.)  Backbone helps to architect my code in a robust way by adhering to the model-view-controller design pattern while allowing me the freedom to implement new patterns as well.  Backbone in turn depends on Underscore and jQuery.

Underscore
/js/lib/underscore-min.js
Underscore is a utility library for Javascript that adds several useful helper functions such as ._each() and ._bind(), and also includes a simple templating engine (but we won't use that in this application; I prefer to use Handlebars or engines like it, in order to keep as much logic as possible out of the templates.  Interface should be kept separate from implementation whenever possible!)

jQuery
/js/lib/jquery-1.10.2.min.js
jQuery is the ubiquitous DOM manipulation engine for Javascript.  Every Backbone view corresponds to a single DOM element - this.$el - which is its container.  Inside the view's render() function, we'll use the Text library to load a template, Handlebars to turn the template into a function, and the resulting function to populate this.$el with the desired HTML.

Handlebars
/js/lib/handlebars.js
Handlebars is a templating engine for Javascript that lets you dynamically populate HTML with your data.  It has a strict "no logic" policy; if you need any functions or logic to populate a Handlebars template, it needs to go into a helper function - never in the template itself!  For this reason it's a great learning tool; the pieces are kept as small as possible.  This inherent separation is a core principle of good software design, and Handlebars is a great way to demonstrate it.

Text
/js/lib/text.js
Text allows us to load our HTML templates asynchronously from files instead of having to store them in "script" tags.

Blackjack needs to run inside a web server.  If you're using a Mac, I recommend Node or MAMP.  If you're using a PC, I recommend XAMPP or WAMP.  To run Blackjack, load a simple web server (doesn't matter which) and:

- copy the contents of the "blackjack" repository to your server's root folder, OR
- point your server's root folder to your local copy of the repository.

Then fire up your browser, point it to "localhost" (including any needed port numbers), and you're off!

For example, the default port for a MAMP server is 8888.  So I point my browser to http://localhost:8888, and off I go!

To inspect the code, start with /js/main.js - that's the one that RequireJS loads directly from index.html.  It all starts from there.

Enjoy, 

-r
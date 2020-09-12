# InfernoAR Widget Temaplate
Sample widget development environment that leverages 
- TypeScript - type safe coding
- SaSS Loader - allows you to write CSS in SCSS
- Babel - transpiles TypeScript to JavaScript targeting browsers: "> 0.25% marketshare and that are not dead"
- Webpack - packages all JS, SCSS/CSS files into a single bundle
- axios - provides great handling of http request to grab data from external APIs or files

why axios instead of fetch? [read good comparison here](https://www.pluralsight.com/guides/axios-vs-fetch)

This setup will build a single JS file that contains all 3rd party scripts, styles 
and your code allowing you to easily embed this into other websites

this example shows how to embed the code into an already defined ShadowRoot element.

When embedding in the Virtual Event Platform Inferno AR, your code wil lbe generated inside
an existing Shadow Dom.

## installation

Clone this repo

````
run npm install 
````

to start a local web server that will hot reload when file changes are made
````
run npm run start
````

to build the bundle and sample web page that demonstrates the widget being embedded in 
a page similar to what Inferno AR produces
````
run npm start build
````

to pass data from the host page to your widget simply add

data-* attributes to you <novo-widget> element

example to turn on console logging 
````
<novo-widget data-debug="true"></novo-widget>
````

if you need to pass in an object

````
<novo-widget data-myConfig='{setting1: "value 1", setting2: "value 2"}'></novo-widget>
````
then in the JS just modify the code to perform a JSON.parse(myConfig) to get the value 
back as true JSON Object




# Myo-Nodebot
Nodebot, controlled with a Myo armband using the Myo JavaScript bindings in NodeJS.

### Ronan Connolly
#### G00274374

## Introduction
This project was created as part of my Level 8 Honours degree in Software development in GMIT, Gesture Based UI module during my fourth/final year.

The project brief states that I must incorporate the use of a device that is controlled via gestures.  
During class we focused on the use of Cortana, Myo armband and the Kinect using C#, but we were free to use other devices and/or languages.

I chose to use the JavaScript [Myo bindings](https://github.com/thalmiclabs/myo.js) to talk to an Arduino robot via the [Johnny-Five](https://github.com/rwaldron/johnny-five) JavaScript framework.

[Official Project Brief](project-brief.md).

### What is a Nodebot?
Any piece of electronics controlled via JavaScript.  
Be it an Arduino, Intel Edison, BeagleBone or Raspberry Pi.

### Why JavaScript?
Well since the introduction of [Johnny-Five](http://johnny-five.io/) by Rick Waldron at [NodeConf](https://www.youtube.com/watch?v=jf-cEB3U2UQ) in 2012, it has enabled all those JavaScript developers to utilize their skills and program electronics.   

Johnny-Five was only possible due to the creation of the [node-serialport](https://github.com/voodootikigod/node-serialport) which provides a simple interface to the low level serial port code necessary to program various chipsets, wireless communications, and many standards.

Various C++ addons can be used with NodeJS through the use of [node-pre-gyp](https://github.com/mapbox/node-pre-gyp) which is a "Node.js tool for easy binary deployment of C++ addons".

JavaScript has taken the world be storm and seeped into most areas of computing, and it's only getting stronger with the release of the new language specification, [ECMAscript 2015](http://www.ecma-international.org/ecma-262/6.0/) which brings in many ideas taken from programming languages.

Here is an excerpt from the official "ECMAScript® 2015 Language Specification" document:  
"ECMAScript usage has moved beyond simple scripting and it is now used for the full spectrum of programming tasks in many different environments and scales. As the usage of ECMAScript has expanded, so has the features and facilities it provides. ECMAScript is now a fully featured general propose programming language.""

Some may argue that JavaScript is not the most efficient language for programming robotics, or games, or mobile apps, but the advantage is the fact that you CAN program all these different things in JavaScript which allows you to cover a wide breadth of tasks and have a global knowledge of various disciplines.

Sure you may not have a deep level of memory management, current conversion in electronics, or the deep level of mathematics of shaders in WebGL, or access to all the mobile capabilities in Ionic; but for many cases you don't need to know these things.  
If you spend long enough in these various disciplines then you can go deeper, but surface level knowledge is all you need in many of these JavaScript frameworks to get started.

For more information about my views on the advantages of JavaScript check out my literature review [here](http://www.ronanconnolly.ie/js-advantages-in-fullstack-dev)
.

### My Research
Before I started this project I wanted to get an understanding of the Myo armband, the Arduino platform, programming electronics in C and the Johnny-Five framework.

I played with the Myo armband [JavaScript bindings](https://github.com/thalmiclabs/myo.js) and got all the gestures working in a NodeJS environment.

Next I bought the [Arduino Starter kit](https://www.arduino.cc/en/Main/ArduinoStarterKit) and finished all the projects therein. 

I then read through the [Make: JavaScript Robotics](http://www.amazon.com/Make-JavaScript-Robotics-Raspberry-BeagleBone/dp/1457186950) book and focused on the first project.

Next I read briefly through the [Learning JavaScript Robotics](https://www.packtpub.com/hardware-and-creative/learning-javascript-robotics) book which gave me a deep understanding of the Johnny-Five JavaScript framework.

Now that the research was done I had a good grasp on elecronic circuits, robotics, C programming vs the JavaScript abstraction, Myo armband api and the general know how of bringing it all together.

## Background
The actual source code is quite small so have a look through it.  
It is very straightforward due in part to the abstractions given through Johnny-Five.  

## References
Check the source code of this README.md file, all references are linked to the anchored words.

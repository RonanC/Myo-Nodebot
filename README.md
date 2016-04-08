# Myo-Nodebot
Nodebot, controlled with a Myo armband using the Myo JavaScript bindings in NodeJS.

```
  _   _           _        ____        _   
 | \ | |         | |      |  _ \      | |  
 |  \| | ___   __| | ___  | |_) | ___ | |_ 
 | . ` |/ _ \ / _` |/ _ \ |  _ < / _ \| __|
 | |\  | (_) | (_| |  __/ | |_) | (_) | |_ 
 |_| \_|\___/ \__,_|\___| |____/ \___/ \__|                
```

### Ronan Connolly
#### G00274374

```
The branch of technology that deals with the design, construction, operation, and application of robots.
```

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

Sure you may not have memory management in electronics, or a deep level of mathematics of shaders in WebGL, or access to all the mobile capabilities in Ionic; but for many cases you don't need to know these things.  
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

## Architecture
**use of cloud services, interaction with other hardware, real-world solution**
### Cloud Services
I used Azure to host a web service that allowed cortana to control a registered robot.

### Hardware Interactions
I used the Myo Armband to send commands to my main program.

I used the Cortana to send commands to a cortana app that talks to the web service (which in turn talks to the main program, which in turn talks to the robot).

I used the keyboard on my computer to directly talk to the robot (via the main program running on the host computer).

As you can see the main program (`nodebot.js`) is what interacts with the web service, the myo, the keyboard and the robot.

### Real World Solution
This shows off the use of controlling a robot via gestures, voice and/or keyboard. It also shows that controlling electronics/robots via a web service works well.

#### House Monitoring
As a real world solution this would be a great product for house monitoring. 
A camera could easily be attached.
Since we are using Wifi we could connect to the robot remotely and move it around the house to make sure everything is okay.
We could easily add sonic sensors to the device in order to detect movement in the room, this could alert you via a web service of an intruder and you could then move the robot around the house. The alert could be sent via text using twilio.

We could hook cortana up to this web service which would allow the user to simply ask any of it's devices what the conditions of it's house are currently.

#### Robot Racing
We could limit the robot to only the myo armband.
If we created a few of these then we could have an obstacle course where the players must navigate around and reach the finish line in order to win.

For the robot racing we could also use a gamepad (much like our keyboard).

## Gesture consideration and use
The technologies originally in consideration were the Myo, Kinect and Cortana.  
I felt like the Kinect (V1) had a poor community and tutorials, it didn't look to pleasant to ease into learning it and really getting a handle on it.
I crossed this off the list pretty quickly.

Cortana is so new and there is a lot of hype so the community is buzzing with videos, tutorials and support, this looks like an area that will continue to grow. The applications we created in class we easy and straight forward.
I was sure I would include this in my project some how.

The Myo is really interesting, I had never heard about it before this module, but the community and product seems very stable. Though the documentation and tutorials are quite poor. The software is natively available in C, but they provide C++ bindings. Third parties have provided Java, C# and JS bindings (these are endorsed by Thalmic Labs (the creators)).

I needed to bring together Myo and Cortana. I always from a young age played with electrics. I always took my toys apart and seen if I could merge them into a new toy. Usually I was left with scrap pieces, but these could be utilized later. 

I finally had an excuse to make a robot, I have had my eye on Arduino for quite some time and I decided to get the starter kit and finish the 14 project (in Arduino C). I learned about electonic theory and the various hardware components.

### The Process
The process included:
- Creating a circuit
- Getting the robot to do something
- Try to implement keyboard controls

I cycled through this loop many times, knowing that once satisfied I could swap the keyboard for the Myo or Cortana.

Next I went through every Myo JS binding and learned what it did, I know the JS bindings inside out.
I created a basic app for the Myo that could be linked into the robot.

#### Cortana
Next I created a Three JS Node projects in Visual Studio. 
The first one is a web service that waits for a program(robot) to register with it, once registered this service can interact with the robot.

The second program is the robot program, this just registers with the web service (I used Azure).

The third program is a JS cortana app, this registers commands with the computer and sends data to the web service when command are entered.

Once I completed this it was ready to be linked in with the robot.

## Basic solution implemented and working (the code part)
This piece of Johnny-Five code listens for different keypress events:
```js
    process.stdin.on("keypress", function(ch, key) {
        if (!key) {
            return;
        }
        process.stdout.write(": ");

        if (key.name == "q") {
            console.log("Quitting");
            process.exit();
        } else if (key.name == "up") {
            console.log("Forward");
            forward();
        } else if (key.name == "down") {
            console.log("Backward");
            backward();
        } else if (key.name == "left") {
            console.log("Left");
            left();
        } else if (key.name == "right") {
            console.log("Right");
            right();
        } else if (key.name == "space") {
            console.log("Stopping");
            stop();
        } else if (key.name == "b") {
            console.log("Boogie");
            boogie();
        } else if (key.name == "v") {
            console.log("Voice");
            buzz();
        } else if (key.name == "m"){
          console.log("Myo tools:");
          myoTools.helloWorld();
        }

    });
```

Here is some of the Myo Code:
```js
Myo.on('fist', function () {
    console.log('Event: fist');
    this.vibrate();
    
    // hello world
    // Myo.myos[0].helloWorld();
    
});
```

## Documentation
### Scripts
#### go-port.sh
#### go-robot.sh

### Tests
#### servo-test.js

### JS Files
#### nodebot.js
#### myoTools.js

### Cortana
#### cortanaApp
#### cortanaWebService

## Class presentation
**video**

## Usage Instructions (OSX only)
- Open the Myo Connect App
- Run the go-port.sh bash script
- Run the go-robot.sh bash script

#### Keyboard Controls:
Key | Command
 --- | --- 
Arrow keys | Movement
Space bar | Stop
B | Boogie
V | Voice
Q | Quit

#### Myo Controls:
Gesture | Command
 --- | --- 
Fist | Stop
Spread | Forward
Left | Turn Left
Right | Turn Right
Double Tap | Beep Boop

#### Cortana Controls:
Voice | Command
 --- | --- 
Prefix | Robot Go: 
Forward | Forward
Left | Turn Left
Right | Turn Right
Talk | Beep Boop

## Progress
I spent a lot of time researching what language/framework to use for this project. Coming from a software background I applied the usual idea of finding the best framework. I looked into Java, C# and JavaScript frameworks. I code at these layers of abstractions quite a lot so I felt it would be interesting to try to not use C or C++.

I found a very interesting JavaScript framework called *Johnny-Five*. This framework treats each hardware component as an API. If it is a non-generic hardware component you pass the model number in as an argument. Sometimes you need to check the Johnny-Five API list in the documentation to be sure that it's supported.

This makes it really each to quickly get a project up to speed. The same code works with various components and boards with minimal code change.

With Johnny-Five the only thing running on the Arduino is the firmware. We use the *Standard-Firmata*, which works with the *Node-SerialPort*. The Node-SerialPort allows a Node.js program to speak via serial communication to any device. Johnny-Five uses this to speak to MicroProcessers.  

Node.js is very efficient, it uses the Google V8 engine to compile JavaScript down to native machine code. This is unlike other JS engines which interpret the code. The V8 engine has so many optimizations that it can give near native performance. Techniques such as JIT compilation are used to have commonly used code sections left in binary format, ready to execute.

Our Johnny-Five program is ran in the Node.js environment on our computer, each action that is executed by the robot is actually compiled and run on the host computer; a low level serial command is sent to the robots standard firmata via serial communication.

You can do serial communication via USB cable or a Wifi module.  
I Added a wifi module so that I could untether my robot and give him some freedom. Now that he is unshackled he is free to roam the world just like the real Johnny-Five robot.

## Issues
I found that you rely very much so on the Johnny-Five documentation and their support. If they do not support a hardware component then you either don't use it, or you code the `C` abstraction yourself.

The community is smaller, the C/C++ hardware community is HUGE, the Johnny-Five community can never compare. Due to this their is a lot less examples, Q&A, support and advice online.

One of the first things people say about using JS is *"You have no control of memory management!"*; this is not an issue as you run the program on a host computer and send the data serially, but this leads to a bigger issue.

The device is tethered via a cable (or via a wifi connection). There is actually no code on the device so you're not actually programming electronics in a sense. You are using abstractions of hardware components that let you treat everything as an API, then Johnny-Five tells the robot what to do.

I feel that if you want to program electronics then it's best to use the correct tool for the job, the one with the biggest community (help/support/apis) and that helps you understand what is really going on under the hood.

Even using C# or Java is too much of an abstraction, you can never actually run them on the device which defeats the purpose of robotics/electronics in any real serious scenario.

## Conclusion
Johnny-Five is great if you only know JavaScript, are scared of electronics or you just hate C and want to get into robotics/electronics.

I think even with the above intentions once you learn Johnny-Five you will quickly move onto C/C++. This is not a bad thing, Johnny-Five is a great stepping stone into the more serious stuff. Kind of like MineCraft for Java programming. I think maybe for kids who know JS it would be really great.

Altough I do find the Arduino starter-kit a pretty good C stepping stone!

I found that it was really quick and easy to setup Johnny-Five projects. If you want to quickly actualize your vision then it's great, but it leaves you with a feeling of "What is actually happening here?".

## References
Check the source code of this README.md file, all references are linked to the anchored words.

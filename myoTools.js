var Myo = require('myo');

// // public functions
// module.exports = {
//     methods: Myo.methods
// };
// global: Myo
// specific: myo

// // VARIABLE definitions
// Myo.methods.initMyo = initMyo;
// Myo.methods.helloWorld = helloWorld;
// Myo.methods.testEvents = testEvents;
// Myo.methods.testData = testData;
// Myo.methods.addEvents = addEvents;

// // FUNCTION expressions
Myo.onError = function () {
    console.log("Woah, couldn't connect to Myo Connect");
};

// // EXECUTABLE CODE
// start talks to myo connect
Myo.connect('ie.gmit.myoBasics');
var myMyo;
// Myo.myos[0].helloWorld();

// // FUNCTION declarations
// function helloWorld() {
//     console.log('Hello ' + this.name);
//     console.log();
// }

// function testEvents() {    
//     // show battery level
//     myMyo.requestBatteryLevel();
    
//     // stream emg
//     myMyo.streamEMG(true);
    
//     // trigger
//     myMyo.trigger('foobar', 'ah yis!');
    
//     // bluetooth
//     myMyo.requestBluetoothStrength();
// }

// function testData() {
//     // // GENERAL MYO
//     console.log('Myo.myos: ', Myo.myos);
//     console.log('this: ',this);
//     console.log(Myo);
    
//     // // THIS MYO
//     console.log('Myo.myos[0]: ', Myo.myos[0]);
        
//     // // METHODS
//     console.log('Myo.methods:', Myo.methods);
//     console.log(Myo.methods.helloWorld);
//     Myo.methods.helloWorld();
// }

// function initMyo() {
//     myMyo = Myo.myos[0];
// }

// ONLY THIS REGISTERED ARMBAND
function addEvents(myo) {
    // arm_synced
    myo.on('arm_synced', function () {
        console.log('Event: arm_synced');
        console.log('myo.arm:', myo.arm);
        console.log('myo.direction:', myo.direction);
        console.log();
    });

    // arm_unsynced
    myo.on('arm_unsynced', function () {
        console.log('Event: arm_unsynced');
        console.log('myo.arm:', myo.arm);
        console.log('myo.direction:', myo.direction);
        console.log();
    });

    // GESTURES
    // pose
    myo.on('pose', function (pose_name) {
        // console.log('Event: pose');
        console.log('pose_name:', pose_name);
        // console.log();
    });

    // // pose_off
    // myo.on('pose_off', function (pose_name) {
    //     console.log('Event: pose_off');
    //     // console.log('pose_name:', pose_name);
    //     console.log();
    // });

    // rest
    myo.on('rest', function () {
        console.log('resting');
        console.log();
    });

    // // lock
    // myo.on('lock', function () {
    //     console.log('Event: lock');
    //     console.log();
    // });

    // // unlock
    // myo.on('unlock', function () {
    //     console.log('Event: unlock');
    //     console.log();
    // });
    
    // // GESTURES
    // double tap
    // myo.on('double_tap', function () {
    //     console.log('Event: double_tap');
    //     if(myo.lock()){
    //         myo.unlock();
    //     }else{
    //         myo.lock();
    //     }
    //     this.vibrate();
    // });
    
    // // ADMIN
    var policyType = 'none'; // standard
    Myo.setLockingPolicy(policyType);
    
    // // CUSTOM STUFF
    var punchTime = 0;
    myo.on('imu', function (data) {
        var time = (new Date()).getTime();
        if (punchTime < time - 1000 && data.accelerometer.x < -1.0) {
            console.log("PUNCH!");
            punchTime = time;
        }
    });
}

// // Init Events
// once app is connected to myo connect app
Myo.on('connected', function (data, timestamp) {
    // console.log('\nConnected:', Myo.myos[0]);
    console.log('Event: connected:', this.name);

    // Myo.methods.initMyo();
    myMyo = this;
    addEvents(myMyo);
    
    // console.log('\ndata: ' + JSON.stringify(data));
    // console.log('\ntimestamp: ' + JSON.stringify(timestamp));
    
    console.log();
});

Myo.on('disconnected', function () {
    console.log('Event: disconnected:', this.name);
    console.log();
});

// // GLOBAL (ALL) MAYO ARMBANDS
// // arm_synced
// Myo.on('arm_synced', function () {
//     console.log('Event: arm_synced');
//     console.log('myMyo.arm:', myMyo.arm);
//     console.log('myMyo.direction:', myMyo.direction);
//     console.log();
// });

// // arm_unsynced
// Myo.on('arm_unsynced', function () {
//     console.log('Event: arm_unsynced');
//     console.log('myMyo.arm:', myMyo.arm);
//     console.log('myMyo.direction:', myMyo.direction);
//     console.log();
// });

// // GESTURES
// // fist
// Myo.on('fist', function () {
//     console.log('Event: fist');
//     this.vibrate();
    
//     // hello world
//     // Myo.myos[0].helloWorld();
    
// });

// Myo.on('fist_off', function () {
//     console.log('Event: fist_off');
//     // console.log();
//     // stop emg stream
//     // myMyo.streamEMG(false);
// });

// // fingers spread
// Myo.on('fingers_spread', function () {
//     console.log('Event: fingers_spread');
//     this.vibrate();
// });

// Myo.on('fingers_spread_off', function () {
//     console.log('Event: fingers_spread_off');
//     // console.log();
// });

// // wave in
// Myo.on('wave_in', function () {
//     Menu.left();
//     console.log('Event: wave_in');
//     this.vibrate();
// });

// Myo.on('wave_in_off', function () {
//     console.log('Event: wave_in_off');
//     // console.log();
// });

// // wave out
// Myo.on('wave_out', function () {
//     console.log('Event: wave_out');
//     this.vibrate();
// });

// Myo.on('wave_out_off', function () {
//     console.log('Event: wave_out_off');
//     // console.log();
// });

// // double tap
// Myo.on('double_tap', function () {
//     console.log('Event: double_tap');
//     this.vibrate();
// });

// Myo.on('double_tap_off', function () {
//     console.log('Event: double_tap_off');
//     // console.log();
// });

// // // regular events
// // pose
// Myo.on('pose', function (pose_name) {
//     console.log('Event: pose');
//     console.log('pose_name:', pose_name);
//     // console.log();
// });

// // pose_off
// Myo.on('pose_off', function (pose_name) {
//     console.log('Event: pose_off');
//     console.log('pose_name:', pose_name);
//     console.log();
// });

// // rest
// Myo.on('rest', function () {
//     console.log('Event: rest');
//     console.log();
// });

// // lock
// Myo.on('lock', function () {
//     console.log('Event: lock');
//     console.log();
// });

// // unlock
// Myo.on('unlock', function () {
//     console.log('Event: unlock');
//     console.log();
// });

// // warmup_completed
// Myo.on('warmup_completed', function () {
//     console.log('Event: warmup_completed');
//     console.log();
// });

// // EMG
// Myo.on('emg', function (data) {
//     console.log('Event: Stream emg:', data);
//     console.log();
// });

// // BATTERY
// Myo.on('battery_level', function (val) {
//     console.log('Event: battery_level');
//     console.log('val:', val);
//     console.log();
// });


// // intermediary update feed
// rssi
// Myo.on('rssi', function (data) {
//     console.log('Event: rssi');
//     console.log('data:', data);
//     console.log();
// });

// status
// Myo.on('status', function () {
//     console.log('Event: status');
//     console.log();
// });

// BLUETOOTH
// Myo.on('bluetooth_strength', function (val) {
//     console.log('Event: bluetooth_strength');
//     console.log('val:', val);
//     console.log();
// });


// // constant feed of data
// gyro
// Myo.on('gyroscope', function (data) {
//     console.log('Event: gyroscope');
//     console.log('data:', data);
//     console.log();
// });

// imu
// Myo.on('imu', function (data) {
//     console.log('Event: imu');
//     console.log('data:', data);
//     console.log();
// });

// orientation
// Myo.on('orientation', function (data) {
//     console.log('Event: orientation');
//     console.log('data:', data);
//     console.log();
// });

// // custom event triggers
// TRIGGER
Myo.on('foobar', function (msg) {
    console.log('Event: foobar');
    console.log('Woooo', msg);
    console.log();
});


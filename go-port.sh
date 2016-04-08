#! /usr/bin/env sh

# direct AP connection
# socat -d pty,nonblock,link=/Users/Ronan/development/misc/ttyV0 tcp:10.10.100.254:8899

# hotspot connection
socat -d pty,nonblock,link=/Users/Ronan/development/misc/ttyV0 tcp:172.20.10.2:8899


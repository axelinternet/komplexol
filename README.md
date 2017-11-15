
# KomplexÖl

KomplexÖl is a silly party game to be enjoyed on a projector. It features a horse racing game where the participants are in teams with each horse. It also features a RFID-based highscore.

## Komplex viewer

To set up put video files in videos/

## read_serial

Read serial data and send to firebase

### Installation

Terminal setup using virtualenv:
```
$ cd read_serial
$ mkdir env
$ virtualenv env/ --python="/usr/bin/python3"
$ source env/bin/activate
$ pip install -r requirements

$ touch database_info.py && echo "DATABASE_URL = '[FIREBASE DATABASE URL]'" > database_info.py
```

Then copy the firebase admin sdk secrets file to ```secrets.json``` and run:
``` 
    $ python read_serial.py
```



# KomplexÖl

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


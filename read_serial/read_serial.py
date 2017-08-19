import serial
import time
import json
import firebase_admin
from database_info import DATABASE_URL
from firebase_admin import db
from firebase_admin import credentials

cred = credentials.Certificate("secrets.json")
options = {"databaseURL": DATABASE_URL}
default_app = firebase_admin.initialize_app(cred, options)
ref = db.reference("path")

timeout = {}

def detect_serial_input(): 
    with serial.Serial('/dev/ttyACM0', 9600) as ser:
        timeout = []
        while True:
            s = ser.readline() #TODO: Refactor so not to use readline()
            if (s.decode()[0:6] != "Card U"): 
                s = ser.readline()
            else: 
                uid = s.decode()[10:21]
                send_to_firebase()

def send_to_firebase(uid):
    if uid not in timeout or timeout[uid] - time.time() > 10.0: 
        timeout[uid] = time.time()
        # SEND TO WEB HERE
        print("Sending to firebase")
        ref.push({
            "uid": uid,
            "time": time.time()
            })
    else:
        print("Timeout for ", uid)

if __name__ == "__main__":
    #detect_serial_input()
    send_to_firebase("FF AA BB CC")   
    send_to_firebase("FF AA BB CC")   
    send_to_firebase("AA BA BB CC")   
    print(timeout)
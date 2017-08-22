import time
import json
import firebase_admin
from database_info import DATABASE_URL
from firebase_admin import db
from firebase_admin import credentials
import random


cred = credentials.Certificate("secrets.json")
options = {"databaseURL": DATABASE_URL}
default_app = firebase_admin.initialize_app(cred, options)
ref = db.reference("path")

timeout = {}

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

def create_fake_uid():
    uid_string = ""
    for i in range(2):
        two_digit = random.choice('0123456789ABCDEF') + random.choice('0123456789ABCDEF')
        uid_string += two_digit + ' '
    uid_string += two_digit + ' ' + random.choice('0123456789ABCDEF') + random.choice('0123456789ABCDEF')
    return uid_string

if __name__ == "__main__":
    #Populate party array
    party_people = []
    for i in range(50):
        party_people.append(create_fake_uid())
    print("Fake party people: ", party_people)

    while True:
        time.sleep(random.randint(1,5))
        drinker = random.choice(party_people)
        print("Sending a drink for", drinker)
        send_to_firebase(drinker)   
    print(timeout)
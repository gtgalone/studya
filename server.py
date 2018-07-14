from flask import Flask
from pymongo import MongoClient
import os

app = Flask(__name__)
app.config['ENV'] = 'develpoment'
app.config['DEBUG'] = 'on'

connection = MongoClient(os.environ['MONGO_DB_URI'])
db = connection['test']

users = db.users.find()

@app.route('/')
def hello_world():
  return users[0]['name']

if __name__ == '__main__':
  app.run()
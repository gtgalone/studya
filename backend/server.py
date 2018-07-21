from flask import Flask
from pymongo import MongoClient
import os
import json

app = Flask(__name__)
app.config['ENV'] = 'develpoment'
app.config['DEBUG'] = 'on'

# MongoDB Connection
connection = MongoClient(os.environ['MONGO_DB_URI'])
db = connection['test']

# Router
@app.route('/api/users')
def read_users():
  # 빈 배열 생성
  tmp = []

  # 데이터베이스에서 유저 컬렉션에 모든 리스트를 가지고와서 users에 넣음
  users = db.users.find()

  # tmp 배열에 이름만 넣어서 배열로 넣음 // 형태 -> ['jiwon', 'jehun', 'youngchul']
  for user in users:
    tmp.append({
      'name': user['name'],
      'age': user['age']
    })

  response = app.response_class(
      response=json.dumps(tmp),
      status=200,
      mimetype='application/json'
  )
  return response
  # 상위 배열을 공백으로 구분해서 합친 문자열 리턴 // 형태 -> jiwon jehun youngchul

# /create/이름/나이 주소로 접속하면 주소로 입력한 이름과 나이로 데이터베이스 유저 컬렉션에 아이템 추가
@app.route('/create/<name>/<age>')
def create_user(name, age):
  db.users.insert({
    'name': name,
    'age': age
  })
  return 'created!'

# Execute
if __name__ == '__main__':
  app.run()

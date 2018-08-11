import os
from pymongo import MongoClient

# 데이터베이스 접속 (데이터베이스명)
def database_connection(database):
  # MongoDB Connection
  connection = MongoClient(os.environ['MONGO_DB_URI'])

  # Select Document
  return connection[database]

# 컬렉션 지우고 새로 생성 (컬렉션명)
def drop_and_create_collection(collection):
  db = database_connection('test')

  db[collection].drop()
  db.create_collection(collection)

# 배열을 컬렉션에 넣기 (컬렉션명, 넣을 배열)
def insert_array_to_database(collection, contents):
  db = database_connection('test')

  drop_and_create_collection(collection)
  # Insert Contents
  db[collection].insert_many(contents)

# 컬렉션에 모든아이템 가져오기 (컬렉션명)
def find_all_from_collection(collection):
  db = database_connection('test')

  tmp = []
  for item in db[collection].find():
    tmp.append(item)

  return tmp

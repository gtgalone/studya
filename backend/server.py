from flask import Flask
from pymongo import MongoClient
import os
import json
from bson import json_util

from shared.helper.database_helper import find_all_from_collection

app = Flask(__name__)
app.config['ENV'] = 'develpoment'
app.config['DEBUG'] = 'on'

# Router
@app.route('/api/studies')
def get_studies():
  tmp = find_all_from_collection('studies')

  response = app.response_class(
      response=json.dumps(tmp, ensure_ascii=False, default=json_util.default),
      status=200,
      mimetype='application/json'
  )

  return response

# Execute
if __name__ == '__main__':
  app.run()

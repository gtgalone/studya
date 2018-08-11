import requests
from bs4 import BeautifulSoup

from shared.helper.database_helper import find_all_from_collection

def soup(url):
  res = requests.get(url)
  return BeautifulSoup(res.content, 'html.parser')

# 사이트에서 컨텐츠 가져올 리스트 아이디 목록 만들어 리턴
def get_lists():
  tmp = []
  for i in range(1):
    table = soup('http://www.hackers.co.kr/?c=s_toge/toge_community/study_group&p=%s' % str(i + 1)).find_all('table', { 'summary': '스터디모집 게시판 게시물리스트 입니다.' })
    tr = table[0].find_all('tr')
    for row in tr:
      if (row.find().text.strip() == '' or row.find().text.strip() == '번호'):
        continue
      tmp.append(row.find_all('td', { 'class': 'sbj' })[0].find('a')['href'].split('=')[-1])
  return tmp

# 사이트에서 컨텐츠 가져와서 배열에 담아서 리턴
def get_contents():
  lists = get_lists()
  tmp = []
  for no in lists:
    title = soup('http://www.hackers.co.kr/?c=s_toge/toge_community/study_group&uid=%s' % no).find('div', { 'class': 'subject' }).find('div').find('h1').text
    writer = soup('http://www.hackers.co.kr/?c=s_toge/toge_community/study_group&uid=%s' % no).find('div', { 'class': 'info' }).find('div', { 'class': 'xleft' }).find('span').text
    date = soup('http://www.hackers.co.kr/?c=s_toge/toge_community/study_group&uid=%s' % no).find('div', { 'class': 'info' }).find('div', { 'class': 'xright' }).find('ul').find('li').text
    content = soup('http://www.hackers.co.kr/?c=s_toge/toge_community/study_group&uid=%s' % no).find('div', { 'id': 'vContent' })
    content.find('div').decompose()

    tmp.append({
      'no': no,
      'title': title,
      'writer': writer,
      'date': date,
      'content': str(content)
    })
  return tmp

def main():
  print(find_all_from_collection('studies'))
  # contents = get_contents()
  # insert_array_to_database('studies', contents)

# Execute
if __name__ == '__main__':
  main()

import requests
from bs4 import BeautifulSoup
from datetime import datetime, date
import json

whitespace_chars = '\n '

headers = {'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/50.0.2661.102 Safari/537.36'}
url = "https://www.metacritic.com/browse/games/score/metascore/all/all/filtered"


result = requests.get(url, headers=headers)
soup = BeautifulSoup(result.content, 'html.parser')
num_pages = int(soup.find('li', class_="page last_page").find('a', class_='page_num').text)


data = []
for page_num in range(num_pages):
    page_url = url + "?page=" + str(page_num)
    result = requests.get(url, headers=headers)
    soup = BeautifulSoup(result.content, 'html.parser')

    # Get game items
    first_game = soup.find_all(class_="product game_product first_product")
    games = soup.find_all(class_="product game_product")
    last_game = soup.find_all(class_="product game_product last_product")
    games.append(first_game[0])
    games.append(last_game[0])

    # Scrape data
    for game in games:
        ### TITLE ###
        title = game.find('div', class_="basic_stat product_title").text.strip(whitespace_chars)
        title = title[:title.find('\n')]

        ### METASCORE ###
        meta_score_str = game.find('div', class_="basic_stat product_score brief_metascore").text.strip(whitespace_chars)
        meta_score = int(meta_score_str)
        
        ### USER SCORE ###
        user_string = 'User:'
        user_score = game.find('li', class_="stat product_avguserscore").text
        user_score = user_score[user_score.find(user_string)+len(user_string):].strip(whitespace_chars)
        if user_score == 'tbd':
            user_score = 0
        user_score = int(float(user_score)*10)

        ### RELEASE DATE ###
        release_date_string = 'Release Date:'
        release_date_string_format = '%b %d, %Y'
        release_date_str = game.find('li', class_="stat release_date full_release_date").text
        release_date_str = release_date_str[release_date_str.find(release_date_string)+len(release_date_string):].strip(whitespace_chars)
        release_date = datetime.strptime(release_date_str, release_date_string_format)

        data.append({'title': title,'meta_score': meta_score,'user_score': user_score,'release_date': release_date})

def json_serial(obj):
    """JSON serializer for objects not serializable by default json code"""
    if isinstance(obj, (datetime, date)):
        return obj.isoformat()
    raise TypeError ("Type %s not serializable" % type(obj))

with open('metacritic.json', 'w') as f:
    json.dump(data, f, default=json_serial)




import requests
from bs4 import BeautifulSoup
from datetime import datetime, date
import json
import threading
import logging

from load_one_page_results import load_pc_results

LOGGING_FORMAT = "%(asctime)-15s %(name)-8s - %(levelname)s: %(message)s"
log_fname = "logs/log_" + str(datetime.now().date()) + ".log"
logging.basicConfig(filename=log_fname, filemode='w',
                    format=LOGGING_FORMAT, level=logging.INFO)

whitespace_chars = '\n '

headers = {
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/50.0.2661.102 Safari/537.36'}
url = "https://www.metacritic.com/browse/games/score/metascore/all/pc/filtered"


result = requests.get(url, headers=headers)
soup = BeautifulSoup(result.content, 'html.parser')
num_pages = int(soup.find('li', class_="page last_page").find(
    'a', class_='page_num').text)


for page_num in range(num_pages):
    logging.info("{}/{}".format(page_num+1, num_pages+1))
    page_url = url + "?page=" + str(page_num)

    file_name = "data\\pc_{}.json".format(page_num)

    #load_results(page_url, file_name)
    threading.Thread(target=load_pc_results, args=(
        page_url, file_name)).start()

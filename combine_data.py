import glob
import json

pc_files = glob.glob("./data/pc*.json")
data = []
for file in pc_files:
    with open(file, 'r') as f:
        data = data + json.load(f)

with open('metacritic_pc.json', 'w') as f:
    json.dump(data, f)

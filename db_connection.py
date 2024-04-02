import pymongo

url = 'mongodb://mongo:xtVlmLIIEkrKcpfaRvwoianEmrMZWswI@monorail.proxy.rlwy.net:23036'
client = pymongo.MongoClient(url)
db = client["railway"]
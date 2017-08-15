import pymongo
import athleticScraper
from pymongo import MongoClient

client = MongoClient('mongodb://test:test@ds139438.mlab.com:39438/socksdb')
db = client.socksdb
skyline = db.skyline

#inserting all skyline runners
team_name = athleticScraper.getTeamName(499)
for aid in athleticScraper.getAidsFromTeam(499):
	name = athleticScraper.getName(aid)
	print team_name + ": " + name 
	skyline.insert_one(
		{"aid": aid, 
		 "sid": 499, 
		 "name": name, 
		 "schoolname": team_name,
		 "5ktimes": athleticScraper.get5kTimes(aid)
		 })
import requests
import re
from bs4 import BeautifulSoup
from datetime import datetime


def getTeamName(team_id):
	url = "https://www.athletic.net/CrossCountry/TeamRecords.aspx?SchoolID=" + str(team_id) + "&Records=1000000"
	r = requests.get(url)
	soup = BeautifulSoup(r.content, 'html.parser')
	return soup.find("title").text.split(" ")[0].strip()

# gathers the athlete ids for a given team
# athletes that have run a 5k, to test 499 is skyline's team id
# TODO: add females?
def getAidsFromTeam(team_id):
	# the div underwhich all the ind. 5k times are listed under
	male5kID = "M_5000"
	# female5kID = "F_5000"

	url = "https://www.athletic.net/CrossCountry/TeamRecords.aspx?SchoolID=" + str(team_id) + "&Records=1000000"
	r = requests.get(url)
	soup = BeautifulSoup(r.content, 'html.parser')

	male5k = soup.find(id=male5kID).find_all('tr')

	aids = list()
	for male in male5k:
		href = male.find('a')['href']
		# Example of an href = Athlete.aspx?AID=88448#tT1
		# we just want the AID, which is between = and #
		aid = find_between(href, "=", "#")
		aids.append(aid)

	return aids

def getName(aid):
	url = "https://www.athletic.net/CrossCountry/Athlete.aspx?AID=" + str(aid) + "#/L0"
	r = requests.get(url)
	soup = BeautifulSoup(r.content, 'html.parser')
	return soup.find('h2').text.split("Cross Country")[0].strip()

# Returns a list of seasons
# Season is composed of grade, year, list of races
# Race obj = name of race, date of race, race time
def get5kTimes(aid):
	url = "https://www.athletic.net/CrossCountry/Athlete.aspx?AID=" + str(aid) + "#/L0"
	r = requests.get(url)
	soup = BeautifulSoup(r.content, 'html.parser')
	seasons = soup.find_all("div", {"class": "season"})

	seasonList = []

	for season in seasons:
		seasonId = season['id']
		year = find_between(seasonId, "S-", "_")
		# the grade is going to before 'th' unless they ran in 3rd grade...
		pattern = re.compile(r"(\d+)th")
		season_info = season.find('h5').text
		grade = ""
		try:
			grade = pattern.search(season_info).groups()[0]
		except:
			print "Grade not found for " + aid + "..."

		# finding the 5k races for that season, todo get all times?
		try:
			header5k = season.find(string=re.compile("^5,000"))
			races5k = header5k.find_next("table").find_all('tr')
		except:
			races5k = []
			print "Didn't run a 5k this season: " + year

		season_obj = {}
		season_obj['grade'] = grade
		season_obj['year'] = year
		season_obj['races'] = []

		for race in races5k:
			time = race.find(href=re.compile("^/result/"))
			race_date = time.find_next('td')
			name = race_date.find_next('td').text
			date_obj = datetime.strptime(race_date.text + " " + year, '%b %d %Y')
			race_obj = {}
			race_obj['name'] = name
			# ignore PR's and SR's for now
			race_obj['time'] = time.text.split(' ')[0]
			race_obj['date'] = date_obj.strftime("%Y-%m-%d") 
			season_obj['races'].append(race_obj)
		seasonList.append(season_obj)
	return seasonList

# find and return the substring in s which is between the substrings of first and last
def find_between(s, first, last):
    try:
        start = s.index( first ) + len( first )
        end = s.index( last, start )
        return s[start:end]
    except ValueError:
        return ""

# my times! 
# print get5kTimes(3652670)

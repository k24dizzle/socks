import requests
import re
from bs4 import BeautifulSoup

# gathers the athlete ids for a given team
# athletes that have run a 5k
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

# 499 is skyline's team id
# getAidsFromTeam(499)


# TODO finish up this method, stopping because im tired
def get5kTimes(aid):
	url = "https://www.athletic.net/CrossCountry/Athlete.aspx?AID=" + str(aid) + "#/L0"
	r = requests.get(url)
	soup = BeautifulSoup(r.content, 'html.parser')
	seasons = soup.find_all("div", {"class": "season"})

	for season in seasons:
		seasonId = season['id']
		year = find_between(seasonId, "S-", "_")
		# finding the 5k races for that season
		header5k = season.find(string=re.compile("^5,000"))
		races5k = header5k.find_next("table").find_all('tr')

		times = list()
		for race in races5k:
			print race.find(href=re.compile("^/result/")).text


def find_between(s, first, last):
    try:
        start = s.index( first ) + len( first )
        end = s.index( last, start )
        return s[start:end]
    except ValueError:
        return ""

get5kTimes(88448)

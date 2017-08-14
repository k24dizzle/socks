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
		aid = href[(href.index('=') + 1):href.index('#')]
		aids.append(aid)

	return aids

# 499 is skyline's team id
# getAidsFromTeam(499)
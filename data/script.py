import athleticScraper
import sys
import json

aid = sys.argv[1]
print athleticScraper.getName(aid);
print athleticScraper.get5kTimes(aid);
print athleticScraper.getSchoolName(aid);
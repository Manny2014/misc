import json
from six.moves import urllib

result = urllib.request.urlopen("https://api.whatdoestrumpthink.com/api/v1/quotes/random")
message = json.loads(result.read())['message']
print(message)

import http.client

conn = http.client.HTTPSConnection("17c9qg85-5555.brs.devtunnels.ms")
payload = ''
headers = {}
conn.request("GET", "/api", payload, headers)
res = conn.getresponse()
data = res.read()
print(data.decode("utf-8"))



openssl genrsa -des3 -out ./CA/localhost.key 2048
openssl req -new -x509 -nodes -days 365000 -key ./CA/localhost.key -out ./CA/localhost.crt
# create certificate request
openssl req -newkey rsa:2048 -nodes -days 365000 -keyout locahost.key -out localhost.csr
# create Signed Certificate
openssl x509 -req -days 365000 -set_serial 39883928392 -in localhost.csr -extfile domain.ext -out localhost.crt -CA ./CA/localhost.crt -CAkey ./CA/localhost.key
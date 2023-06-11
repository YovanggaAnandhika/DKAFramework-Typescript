


##### CA CERTIFICATE
openssl genrsa -des3 -out ./CA/localhost.key 2048
# Create Certificate
openssl req -x509 -new -nodes -key ./CA/localhost.key -sha256 -days 36500 -out ./CA/localhost.crt
# create certificate request
openssl x509 -noout -modulus -in ./CA/localhost.crt | openssl md5
openssl rsa -noout -modulus -in ./CA/localhost.key | openssl md5


#### CLIENT CERTIFICATE
# Create Certificate Private Key
openssl genrsa -out ./Server/localhost.key 2048
## Create Certificate Request
openssl req -new -key ./Server/localhost.key -out ./Server/localhost.csr
# Signed Certificate
openssl x509 -req -in ./Server/localhost.csr -CA ./CA/localhost.crt -CAkey ./CA/localhost.key -CAcreateserial -extfile domain.txt -out ./Server/localhost.crt -days 3650 -sha256
# Signed Certificate to CA
openssl x509 -noout -modulus -in ./Server/localhost.crt | openssl md5
openssl rsa -noout -modulus -in ./Server/localhost.key | openssl md5

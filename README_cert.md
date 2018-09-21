# Certificates

e.g. http://intown.biz/2016/11/22/node-client-auth/

## CA key
```
openssl req -new -x509 -days 365 -keyout ca-key.pem -out ca-crt.pem
```    

## Server cert
```
#generating private key for server
openssl genrsa -out server-key.pem 4096
 
#generate a signing request
openssl req -new -sha256 -key server-key.pem -out server-csr.pem
 
#perform the signing
openssl x509 -req -days 365 -in server-csr.pem -CA ca-crt.pem -CAkey ca-key.pem -CAcreateserial -out server-crt.pem
```

## Client cert
This certificate needs to be installed on client side. A trust to the CA certificate needs also to be established.

```
#generating private key for client
openssl genrsa -out client-key.pem 4096
 
#generate a signing request
openssl req -new -sha256 -key client-key.pem -out client-csr.pem
 
#perform the signing
openssl x509 -req -days 365 -in client-csr.pem -CA ca-crt.pem -CAkey ca-key.pem -CAcreateserial -out client-crt.pem
```

Convert to pfx

```
openssl pkcs12 -inkey client-key.pem -in client-crt.pem -export -out client-crt.pfx
```

self sign generate  certificate  commands using openssl

```shall
# just run your nginx dir
openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout nginx-selfsigned.key -out  nginx-selfsigned.crt
```
FROM nginx:stable-alpine

RUN apk add openssl

# SSL sertificate
COPY ./certs /etc/certs

WORKDIR /etc/certs

RUN chmod +x ./generate_ca.sh
RUN sh ./generate_ca.sh

RUN chmod +x ./generate_certs.sh
RUN sh ./generate_certs.sh

CMD ["nginx", "-g", "daemon off;"]

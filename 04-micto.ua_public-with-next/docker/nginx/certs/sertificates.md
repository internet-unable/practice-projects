# Configuring local certificates

## Copy certificate from docker container

Run next command from root project directory 

```shell
docker cp micto_nginx:/etc/certs/RootCA.crt ./docker/nginx/certs/RootCA.crt
```

## Add RootCA.crt as trusted in browser/system
It depends on your host system, so you need to find right way in the Web. 

You can use the following commands, but there is no guarantee that they will work on your version of the operating system.

###Mac OS X
To add, use the command:
```shell
sudo security add-trusted-cert -d -r trustRoot -k /Library/Keychains/System.keychain ./docker/nginx/certs/RootCA.crt
```

To remove, use the command:
```shell
sudo security delete-certificate -c "<name of existing certificate>"
```

Or use system Keychain utility to add RootCA.crt as trusted.

### Windows
To add, use the command:
```shell
certutil -addstore -f "ROOT" RootCA.crt
```

To remove, use the command:
```shell
certutil -delstore "ROOT" serial-number-hex
```

### Linux (Ubuntu, Debian)
To add:
Copy your CA to dir `/usr/local/share/ca-certificates/`
Use command: 
```shell
sudo cp ~/certs/RootCA.crt /usr/local/share/ca-certificates/RootCA.crt
```

Update the CA store: 
```shell
sudo update-ca-certificates
```

To remove:
Remove your CA.
Update the CA store: 
```shell
sudo update-ca-certificates --fresh
```

Note: Restart Kerio Connect to reload the certificates in the 32-bit versions or Debian 7.

### Linux (CentOs 6)
To add:

Install the ca-certificates package: 
```shell
yum install ca-certificates
```
Enable the dynamic CA configuration feature: 
```shell
update-ca-trust force-enable
```
Add it as a new file to `/etc/pki/ca-trust/source/anchors/`: 
```shell
cp foo.crt /etc/pki/ca-trust/source/anchors/
```
Use command: 
```shell
update-ca-trust extract
```
Note: Restart Kerio Connect to reload the certificates in the 32-bit version.

### Linux (CentOs 5)
To add, use the command:

Append your trusted certificate to file `/etc/pki/tls/certs/ca-bundle.crt`
```shell
cat ~/certs/RootCA.crt >>/etc/pki/tls/certs/ca-bundle.crt
```
Note: Restart Kerio Connect to reload the certificates in the 32-bit version.

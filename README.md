# **Deployer UI**

## **Prerequisites**

* NodeJs 10+
* Yarn 1.16+
* [AVN](https://www.npmjs.com/package/avn)
* [Angular CLI](https://github.com/angular/angular-cli)
* [rd-api](https://github.com/dorefactor/rd-api)

## **Steps**

* Create a loopback network alias

  * OSX

    ```sh
    ifconfig lo0 alias 192.168.99.1
    ```

  * Linux

    ```sh
    echo `auto lo lo:10

    iface lo inet loopback
    iface lo:10 inet static
        address 192.168.99.1
        netmask 255.255.255.0
        network 192.168.99.1` >> /etc/network/interfaces
    ```

* Map in `/etc/hosts`

```file
192.168.99.1    rd-ui
```

### **Without Docker***

* Run server

```sh
ng serve --host 0.0.0.0 --public-host rd-ui.local
```

### **With Docker**

#### **Build**

* In the root directory execute

```sh
docker build -t rd-ui --build-arg ENV=(dev|prod) --build-arg RD_API=${RD_API} -f docker/Dockerfile .
```

**Note.**

* [Optional] Set `ENV` argument. By default `ENV` is set with `prod`. Possibles values are: `prod` and `dev`.
* [Optional] Set `RD_API` argument. By default `RD_API` is set with `http://rd-api.local:5000`.

#### **Run**

* After build the image, execute

```sh
docker run --rm --name rd-ui -p 0.0.0.0:4200:8000 rd-ui
```

### **Testing**

* Go to [http://rd-ui:4200](http://rd-ui:4200)

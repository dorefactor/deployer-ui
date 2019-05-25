# **Deployer UI**

## **Prerequisites**

* NodeJs 10+
* Yarn 1.16+
* [AVN](https://www.npmjs.com/package/avn)
* [Angular CLI](https://github.com/angular/angular-cli)
* [RegularApi](https://github.com/dorefactor/RegularApi)

## **Steps**

* Run server

```sh
ng serve
```

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
192.168.99.1    deployer-ui
```

* Go to UI at [http://deployer-ui.local:4200](http://deployer-ui.local:4200)

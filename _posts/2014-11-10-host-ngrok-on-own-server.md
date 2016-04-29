---
layout: post
title: Host ngrok on own server
keywords: ["ngrok"]
description: "Guide for run ngrok on one's own server"
categories: ["Tech"]
tags: ["Linux"]
---

[ngrok](https://github.com/inconshreveable/ngrok/)通过在公网上的服务器和本地运行的服务之间建立一个安全的通道，方便开发调试远程接口。

其网络架构图如下：
> ![Alt text](https://raw.githubusercontent.com/followyourheart/followyourheart.github.io/master/images/2014-11-10-host-ngrok-on-own-server-1.png)

下面介绍在CentOS 6.5上搭建ngrok服务的过程

一、域名配置

1. 在购买的域名服务管理页面配置如下图：

![Alt text](https://raw.githubusercontent.com/followyourheart/followyourheart.github.io/master/images/2014-11-10-host-ngrok-on-own-server-2.png)

2. 在VPS（具有公网IP的服务器）上绑定域名和IP

以下配置发生在这台VPS上。

二、安装ngrok

1 golang环境

以源码方式安装最新版[golang](https://github.com/golang/go/releases/).如go-go1.4.2.tar.gz

{% highlight bash %}
$sudo tar go-go1.4.2.tar.gz -C /opt/
$sudo ln -s /opt/go-go1.4.2 /opt/go
$cd go/src/
$sudo sh +x ./all.bash

$sudo vi /etc/profile/
export GOROOT=/opt/go/
export GOPATH=/opt/go/
export PATH=$PATH:$GOROOT/bin

$source /etc/profile/
{% endhighlight %}

2 升级git(>1.7.9.5)

yum安装新版git

{% highlight bash %}
$sudo yum install PackageKit-yum
$sudo yum remove perl-Compress-Raw-Zlib tcp_wrappers-libs-*.i686
$sudo rpm -i http://pkgs.repoforge.org/rpmforge-release/rpmforge-release-0.5.3-1.el6.rf.x86_64.rpm
$sudo yum ­­--enablerepo=rpmforge­-extras update
$sudo yum ­­--enablerepo=rpmforge­-extras install git
{% endhighlight %}

或以源码方式安装最新版[git](https://github.com/git/git/releases).如git-2.4.6.tar.gz

{% highlight bash %}
$sudo yum groupinstall "Development Tools"
$sudo yum install gettext-devel openssl-devel perl-CPAN perl-devel zlib-devel
$tar -xzvf git-2.4.6.tar.gz
$cd git-2.4.6
$make configure
$./configure --prefix=/usr/local
$sudo make install

$sudo vi /etc/ld.so.config
/usr/local/lib

$sudo /sbin/ldconfig

{% endhighlight %}

3 配置ngrok

{% highlight bash %}
$sudo vi /etc/profile
export GIT_SSL_NO_VERIFY=1
source /etc/profile
{% endhighlight %}

不添加变量的话使用https链接会报如下错误

{% highlight bash %}
fatal: unable to access 'https://github.com/??.git/': Peer certificate cannot be authenticated with known CA certificates
{% endhighlight %}
从github上获取最新的源码

{% highlight bash %}
$git clone https://github.com/inconshreveable/ngrok.git
{% endhighlight %}

生成自签名证书

{% highlight bash %}
$cd ngrok
$export NGROK_DOMAIN="host name"
$openssl genrsa -out rootCA.key 2048
$openssl req ­-x509 -­new -­nodes -­key rootCA.key -­subj "/CN=${NGROK_DOMAIN}" -days 5000 ­-out rootCA.pem
$openssl genrsa -out device.key 2048
$openssl req -new -key device.key -subj "/CN=$NGROK_DOMAIN" -out device.csr
$openssl x509 -req -in device.csr -CA rootCA.pem -CAkey rootCA.key -CAcreateserial -out device.crt -days 5000
{% endhighlight %}

执行完，将生成以下6个新文件
{% highlight bash %}
device.crt
device.csr
device.key
rootCA.key
rootCA.pem
rootCA.srl
{% endhighlight %}

ngrok在编译生成服务端和客户端时会将assets目录(资源文件)打包到可执行文件(ngrokd,ngrok)里，而assets/client/tls, assets/server/tls分别存放着ngrok,ngrokd的默认证书文件，我们需将我们生成的(见上文)替换默认的：

{% highlight bash %}
$cp rootCA.pem assets/client/tls/ngrokroot.crt
$cp device.crt assets/server/tls/snakeoil.crt
$cp device.key assets/server/tls/snakeoil.key
{% endhighlight %}

编译生成ngrokd, ngrok

{% highlight bash %}
$vi src/ngrok/log/logger.go
log "code.google.com/p/log4go"-->log "github.com/followyourheart/log4go"

linux-64bit 服务器端
$GOOS=linux GOARCH=amd64
$make release-server

linux-64bit 客户端
$GOOS=linux GOARCH=amd64
$make release-client

windows客户端
$GOOS=windows GOARCH=amd64
$make release-client

注:
GOOS & GOARCH refers to name of the target operating system and architecture respectively。
{% endhighlight %}

4. 启动

服务端

{% highlight bash %}
$bin/ngrokd -domain="${NGROK_DOMAIN}" -httpAddr=":8000"
{% endhighlight %}

![Alt text](https://raw.githubusercontent.com/followyourheart/followyourheart.github.io/master/images/2014-11-10-host-ngrok-on-own-server-3.png)

注：防火墙需允许4443端口，8000端口
{% highlight bash %}
(ubuntu)$sudo iptables -A INPUT -p tcp --dport 8000 -j ACCEPT
(ubuntu)$sudo iptables -A INPUT -p tcp --dport 4443 -j ACCEPT

(redhat)$sudo vi /etc/sysconfig/iptables
-I INPUT -p tcp --dport 8080 -j ACCEPT
-I INPUT -p tcp --dport 4443 -j ACCEPT

(redhat)$sudo service iptables restart
{% endhighlight %}

客户端
{% highlight yaml %}
$vi ngrok.yml
server_addr: "$NGROK_DOMAINN:4443"
trust_host_root_certs: false
tunnels:
  tunnel_name1:
    subdomain: "subdomain1"
    proto:
      http: 8080

  tunnel_name2:
    subdomain: "subdomain2"
    proto:
      http: 9090
  tunnel_ssh:
    proto:
      tcp: 22

$./ngrok -config=ngrok.yml start tunnel_name1 tunnel_name2 tunnel_ssh

or

$./ngrok -config=ngrok.yml -log=stdout start tunnel_name1 tunnel_name2 tunnel_ssh >log &
{% endhighlight %}

![Alt text](https://raw.githubusercontent.com/followyourheart/followyourheart.github.io/master/images/2014-11-10-host-ngrok-on-own-server-4.png)

{% highlight bash %}
ssh username@$NGROK_DOMAINN -p $PROT  # see the ngrok started connections tcp://NGROK_DOMAINN:PORT -> 127.0.0.1:22
{% endhighlight %}

---
坑: 在ubuntu上编译后，centos的客户端无法连接的
{% highlight bash %}
Failed to read message: remote error: bad certificate
{% endhighlight %}

最好是在运行客户端的机器上同时编译release-server release-client

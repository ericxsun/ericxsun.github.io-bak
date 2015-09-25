---
layout: post
title: 如何将符合XML规范的字符串(String)转换为XML文档
description: "关于HIT的LTP平台中字符串转XML及中文乱码问题"
categories: ["tech", "nlp"]
tags: ["LTP", "NLP"]
---

今天在用哈工大的LTP平台的Web Service版时，在将String转xml的时候，老是出现错误:

Exception in thread "main" org.jdom.input.JDOMParseException: Error on line 5: The value of attribute "cont" associated with an element type "null" must not contain the '<' character.

一直没找到原因，后来发现把getBytes的参数encoding设置了，一下问题就搞定了。

以下内容为如何将符合XML规范的String转成XML文档：

{% highlight java %}
public static void main(String[] args) throws JDOMException, IOException{
        SAXBuilder xml = new SAXBuilder();
        String str =
        "<?xml version=\"1.0\" encoding=\"gbk\" ?>" +
        "<xml4nlp>\n"+
            "<note sent=\"y\" word=\"y\" pos=\"y\" ne=\"y\" parser=\"y\" wsd=\"y\" srl=\"y\" />" +
            "<doc>\n" +
                "<para id=\"0\">\n" +
                    "<sent id=\"0\" cont=\"我是中国人\">\n"+
                        "<word id=\"0\" cont=\"我\" wsd=\"Aa02\" wsdexp=\"我_我们\" pos=\"r\" ne=\"O\" parent=\"1\" relate=\"SBV\" />\n"+
                        "<word id=\"1\" cont=\"是\" wsd=\"Ja01\" wsdexp=\"是_当做_比作\" pos=\"v\" ne=\"O\" parent=\"-1\" relate=\"HED\">\n"+
                            "<arg id=\"0\" type=\"A0\" beg=\"0\" end=\"0\" />\n"+
                            "<arg id=\"1\" type=\"A1\" beg=\"3\" end=\"3\" />\n"+
                        "</word>\n"+
                        "<word id=\"2\" cont=\"中国\" wsd=\"Di02\" wsdexp=\"国家_行政区划\" pos=\"ns\" ne=\"S-Ns\" parent=\"3\" relate=\"ATT\" />\n"+
                        "<word id=\"3\" cont=\"人\" wsd=\"Aa01\" wsdexp=\"人_人民_众人\" pos=\"n\" ne=\"O\" parent=\"1\" relate=\"VOB\" />\n"+
                    "</sent>\n"+
                "</para>\n"+
            "</doc>\n"+
        "</xml4nlp>";

        Document doc = new Document();
        doc = xml.build(new ByteArrayInputStream(str.getBytes("gbk")));
        XMLOutputter outputter = new XMLOutputter(getFormat("UTF-8"));
        outputter.output(doc, System.out);
        outputter.output(doc, new FileOutputStream(new File("ltp.xml")));
}
{% endhighlight %}

记录错误，以备。

--------Update May 13 2012--------

可将
{% highlight java %}
doc = xml.build(new ByteArrayInputStream(str.getBytes("gbk")));
{% endhighlight %}
改为：
{% highlight java %}
doc = xml.build(new StringReader(str))
{% endhighlight %}

----
备注

将一个输入流（InputStream，如HttpResponse.getEntity().getContent()）（此输入流的字符完整表达了一个xml文件），转换成一个字符串（避免了中文乱码的问题）：
{% highlight java %}
InputStream in = ....(eg: HttpResonpse.getEntity().getContent())
String result = "";
BufferedReader br = new BufferedReader(new InputStreamReader(in, charset/*字符编码*/)
String line = "";
while((line = br.readLine()) != null)
    result += line;
{% endhighlight %}

而 以下述方法可能会出现中文乱码问题：
{% highlight java %}
InputStream in = ...
String result = "";
int size = 0;
byte[] tmpb = new byte[2048];
while((size = in.read(tmpb)) != -1)
    result += new String(tmpb, 0, size, charset/*字符编码*/);
{% endhighlight %}
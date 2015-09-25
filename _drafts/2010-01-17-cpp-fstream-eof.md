---
layout: post
title: C++ fstream EOF
keywords: ["fstream EOF"]
description: "C++ fstream EOF问题笔记"
categories: ["tech"]
tags: ["C++", "fstream", "EOF"]
---

I met the problem again this afternoon. How can we judge the end of the file in dealing with 'file stream' in C++?

In the reference of 'fstream', we know there is a public member function defined as below:

{% highlight cpp %}
bool eof() const;
{% endhighlight %}

can be used to ensure that the file stream reached the end of the file. But if we just code like this:

assume: test.txt

{% highlight cpp %}
t1
t2
t3
{% endhighlight %}

code:
{% highlight cpp %}
#include <iostream>
#include <fstream>
#include <string>
using namespace std;
int main(){
    ifstream inf("test.txt");
    string sline;
    while(!inf.eof()){
        getline(inf, sline);
        cout<<sline<<endl;
    }
    return 0;
}
{% endhighlight %}

result:
{% highlight cpp %}
t1
t2
t3
(space)
{% endhighlight %}

there will be four lines.

So, there is something wrong. Look back to the definition of the function 'eof', we will find that eof flag will be set only when the End Of File is reached in the sequence associated with the stream. That means, first to judge the end of the stream, and then set the flag(eof return true). So we can change the code mentioned before into:

{% highlight cpp %}
#include <iostream>
#include <fstream>
#include <string>
using namespace std;
int main(){
    ifstream inf("test.txt");
    string sline;
    while(inf >> sline){
        getline(inf, sline);
        cout<<sline<<endl;
    }
    return 0;
}
{% endhighlight %}

Then we can get the result that we expect.

-------Update-------

test file
{% highlight cpp %}
#123
# 123
123
{% endhighlight %}

read file word-by-word
{% highlight cpp %}
#include <iostream>
#include <string>
#include <fstream>
using namespace std;
int main(){
    ifstream ifs(fs, ios::in);
    string line;
    while(ifs >> line)
        cout<<line<<endl;

    return 0;
}
{% endhighlight %}
result
{% highlight cpp %}
#123
#
123
123
{% endhighlight %}

read file line-by-line
{% highlight cpp %}
#include <iostream>
#include <string>
#include <fstream>
using namespace std;
int main(){
    ifstream ifs(fs, ios::in);
    string line;
    while(getline(ifs, line))
        cout<<line<<endl;

    return 0;
}
{% endhighlight %}

Or
{% highlight cpp %}
#include <iostream>
#include <string>
#include <fstream>
using namespace std;
int main(){
    ifstream ifs(fs, ios::in);
    string line;
    streampos sp = ifs.tellg();

    while(ifs >> line){
        ifs.seekg(sp);
        getline(ifs, line);
        cout<<line<<endl;

        sp = ifs.tellg();
    }

    return 0;
}
{% endhighlight %}

result
{% highlight cpp %}
#123
# 123
123
{% endhighlight %}
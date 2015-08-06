## TODO
- redo the gif with current
- spell checking
- add a conclusion

# 4dstudio-localserver
#### Or How to edit augmented reality scripts with your favorite native editor

We recently released [4dstudio](http://daqri.com/daqri-4d-studio/)
  a tool to author augmented reality content.
  You design your 4d experience within your browser and 
  , once it is ready, you publish it. 
  It becomes immediatly playable on smart helmet or your phone/tablet.
One important part of those experiences is based on the user interacting 
  with what she/he is seeing in augmented reality.
Those interactions may be freely designed thru 4dstudio thanks to 
    *scripting*.
    
Today we release [4dstudio-localserver](https://github.com/DAQRI/4dstudio-localserver) as opensource, 
a feature for power users to use their favorite native editors to edit augmented reality scripts.

In 4dstudio, users can write scripts which will run whenever 
and wherever 4d content is played.
  It allows the users to make their 4d contents
  more interactive, more dynamic. It provides a lot of 
  flexibilty and creative freedom when you create 4d experience.
Scripting is definitly a excelent feature.

### No one-size-fit-all Solution
Definitly good feature... but this imply that the user will need to write scripts within
4dstudio itself and 4dstudio is a web app. 
At first sight, it seems simple but this requirement is surprisingly harder than it seems.

First to write a good editor within a browser isn't a simple task by itself,
even if many tried. (TODO add links on codemirror, and other).
Second it is well known that many people who write code are quite passionated
about the text editor they use. 
The war between emacs and vi users is notorious among coders.
There is even a term coined for that ["Editor War"](https://en.wikipedia.org/wiki/Editor_war). 
(TODO there is legitimate reason too, like the user is experienced using a given editor and using another one will cause a reduction of productivity)

So it is not a one-fit-all solution. We will never be able to make one editor which first everybody.
So in short, we have a hard problem without a clear answer...

### How 4dstudio Does It ?
So we decided that we should provide a mixed solutions to our user.
First 
To edit script within 4dstudio, we looked around and choosed to use [codemirror](https://codemirror.net/).
Several projects , e.g. [three.js editor](http://threejs.org/editor/), [shader toy](https://www.shadertoy.com/) and many others.
are using it successfully. So it seems like a good choise in our case.

Now we covered the online edition of script. 
We also wanted to provide a solution for the power users, for the people passionated about their editor. 
We will allow them to edit 4dstudio script directly in the editor they like.

So we created [4dstudio-localserver](https://github.com/DAQRI/4dstudio-localserver).
It will allow you to edit your 4d scripts directly in a native editor.
Thus the users will use the editor they know, the one they are the most confortable with, the one they are the most efficient with.

### What is 4dstudio-localserver ?
It is a software you install on your computer.
Note that to install 4dstudio-localserver 
is entirely optional, if you dont want to install it, it is fine. You can edit your script online and fully enjoy all features of 4dstudio.
It is aimed at power users who which to go the extra mile to use 
their favorite text editor. 
You can see it in action below

![nativeeditor](https://cloud.githubusercontent.com/assets/252962/8828043/f8dbd26e-3087-11e5-8b97-8f31a63495eb.gif)


### How to install it ?

It is written in node.js. So you first install it with npm as usual

```
$ npm install -g 4dstudio-localserver
```

And then launch it via 

```
$ 4dstudio-localserver
```

After that, you should be able to launch your native editor from within 4dstudio and enjoy it while writing augmented reality scripts!

### How is it implemented
Now let's talk about the implementation details. 
Technically 4dstudio-localserver is a web server written in node.js.
So this is an unusual situation, where you need to run a server on your local computer even when you are running a webapp. But this trick allows use 
to launch a native editor from the webapp.


### Open sourced
We decided to opensource [4dstudio-localserver]() to give back to the community. You may reuse it in your own webapp.
It has lot of side benefits, it makes it easier to install, people outside can improve it and contribute back.

Additionally we need to handle the unusual aspect situation: we are asking power users of a webapp to install a software on their local computer. 
There is a legitimate security concern for our users and we are taking it very seriously. 
So we wanted to be as transparent as possible. The code is available, so everybody which is interested can look and check what we are doing.

### Workflow
4dstudio-localserver provides an REST API using [express](http://expressjs.com/).
We wrote it with flexibility in mind, you can even reuse it on your own project.
Checkout  [examples/](https://github.com/DAQRI/4dstudio-localserver/blob/master/public/test-client.html)
for details. 
[4dstudio](http://daqri.com/daqri-4d-studio/) uses this API to talk to the server. 
Here are the steps followed when 4dstudio is using native editor in 4dstudio-localserver

1. User click on 'native editor' button above the js editor in 4dstudio
2. 4dstudio webpage get the content of the codemirror content via javascript
3. 4dstudio contacts the local server with this content from codemirror, and a fake basename. 
   - This basename will be used to create a temporary file, which will be passed to the editor itself.
   - Thus the user get a expected name (e.g. script.js)
   - Based on the file extensions, the editor will provide contextual help, code colorisation, autocompletion etc...
4. When the text is saved, the local server get the content of the provided files, and reply that to 4dstudio
5. On reception of the new content, 4dstudio update the proper codemirror instance with the new content

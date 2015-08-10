## TODO
- DONE redo the gif with current UI and in a industrial context (for the model and the script)
- DONE spell checking
- DONE fix links and TODO
- DONE add a conclusion
- DONE is it ok to officially got mit license ? YES

# 4dstudio-localserver
#### Or How To Edit Augmented Reality Scripts With Your Favorite Native Editor

We recently released [4dstudio](http://daqri.com/daqri-4d-studio/)
  a tool to develop augmented reality content.
  You design your 4d experience within your browser and, once it is ready, you publish it. 
  It becomes immediately playable on Smart Helmet or on your phone/tablet.
One important part of these experiences is based on the user interacting 
  with what she/he is seeing in augmented reality.
Those interactions may be freely designed through 4dstudio thanks to 
    *scripting*.
    
Today we released [4dstudio-localserver](https://github.com/DAQRI/4dstudio-localserver) as open source, 
a feature for power users to use their favorite native editors to edit augmented reality scripts.

In 4dstudio, users can write scripts which will run whenever 
and wherever 4d content is played.
  It allows the users to make their 4d contents
  more interactive, more dynamic. It provides a lot of 
  flexibility and creative freedom when you develop 4d experiences.
Scripting is definitely an excellent feature.

### No one-size-fit-all Solution
Definitely good feature... but this implies that the user will need to write scripts within
4dstudio itself and 4dstudio is a web app. 
At first sight, it seems simple but this requirement is surprisingly harder than it seems.

First, to write a good editor within a browser isn't a simple task by itself,
even if [many tried](https://en.wikipedia.org/wiki/Comparison_of_JavaScript-based_source_code_editors).
Second, people are more efficient when using the text editor
they know, so using your native editor will likely increase your productivity.
Third, it is well known that many people who write code are quite passionate
about the text editor they use. 
The war between emacs and vi users is notorious among coders.
There is even a term coined for that:["Editor War"](https://en.wikipedia.org/wiki/Editor_war).
 

So it is not a one-fit-all solution. We will never be able to make one editor which fits everybody's needs.
So in short, we have a hard problem without a clear answer...

### How 4dstudio Does It ?
So we decided that we should provide a mixed solution to our users.
First, 
to edit script within 4dstudio, we looked around and chose to use [codemirror](https://codemirror.net/).
Several projects , e.g. [three.js editor](http://threejs.org/editor/), [shader toy](https://www.shadertoy.com/) and many others are using it successfully. So it seems like a good choice in our case.

Now we covered the online edition of script. 
We also wanted to provide a solution for the power users, for the people passionate about their editor. 
We will enable them to edit 4dstudio script directly in the editor they like.

So we created [4dstudio-localserver](https://github.com/DAQRI/4dstudio-localserver).
It will allow you to edit your 4d scripts directly in a native editor.
Thus the users will use the editor they know, the one they are the most comfortable with, the one they are the most efficient with.

### What Is 4dstudio-Localserver ?
It is a software you install on your computer.
Note that installing  4dstudio-localserver 
is entirely optional, if you don't want to install it, it's fine. You can edit your script online and fully enjoy all features of 4dstudio.
It is mostly aimed at power users who go the extra mile to use 
their favorite text editor. 
You can see it in action below

![nativeeditor2](https://cloud.githubusercontent.com/assets/252962/9174704/780123d2-3f79-11e5-8958-4ae67dfbe211.gif)


### How To Install It ?

It is written in node.js. So you first install it with npm as usual

```
$ npm install -g 4dstudio-localserver
```

And then launch it via 

```
$ 4dstudio-localserver
```

After that, you should be able to launch your native editor from within 4dstudio and enjoy it while writing augmented reality scripts!

### How Is It Implemented ?
Now let's talk about the implementation details. 
Technically 4dstudio-localserver is a web server written in node.js.
So this is an unusual situation, where you need to run a server on your local computer even when you are running a webapp. But this trick allows us 
to launch a native editor from the webapp.


### Open sourced
We decided to open source [4dstudio-localserver](https://github.com/DAQRI/4dstudio-localserver) to give back to the community. 
It is published on github.
You may reuse it in your own webapp.
It has a lot of side benefits that makes it easier to install, people outside can improve it and contribute back.

Additionally, we need to handle the unusual situation: we are asking power users of a webapp to install a software on their local computer. 
There is a legitimate security concern for our users and we are taking it very seriously. 
So we wanted to be as transparent as possible. The code is available, so everybody who is interested can look and check what we are doing.

### Workflow
4dstudio-localserver provides a REST API using [express](http://expressjs.com/).
We wrote it with flexibility in mind, you can even reuse it on your own project.
Checkout  [examples/](https://github.com/DAQRI/4dstudio-localserver/blob/master/public/test-client.html)
for details. 
[4dstudio](http://daqri.com/daqri-4d-studio/) uses this API to talk to the server. 
Here are the steps followed when 4dstudio is using native editor in 4dstudio-localserver

1. User clicks on 'native editor' button above the js editor in 4dstudio
2. 4dstudio webpage gets the content of the codemirror content via javascript
3. 4dstudio contacts the local server with this content from codemirror, and a fake basename. 
   - This basename will be used to create a temporary file, which will be passed to the editor itself.
   - Thus the user gets an expected name (e.g. script.js)
   - Based on the file extensions, the editor will provide contextual help, code colorization, autocompletion etc...
4. When the text is saved, the local server gets the content of the provided files, and replies that to 4dstudio.
5. On reception of the new content, 4dstudio updates the proper codemirror instance with the new content.

### Conclusion
To edit script within [4dstudio](http://daqri.com/daqri-4d-studio/) , you may edit them using our online editor or you can use [4dstudio-localserver](https://github.com/DAQRI/4dstudio-localserver) to edit your script with your favorite editor.
It is entirely up to you.

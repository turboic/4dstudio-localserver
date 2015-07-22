# 4dstudio-localserver

This implement the local server for 4dstudio by daqri.
It provide additional features to 4dstudio such as 
native editor.

Native editor allow you to edit scripts with a native 
editor (e.g. sublime text). 
It is likely more confortable than editing within the browser.

It is to be run on the user computer.
Please note that it is optional, you dont need this to use 4d Studio.

here is a 
[gif](https://s3.amazonaws.com/uploads.hipchat.com/60976%2F2110747%2FtVpc0yuURy26zLE%2Fnativeeditor.gif)
of the feature in actions.

## Getting Started

To start the server on your computer

```
npm start
```

## How to install from npm

It is published on npm as usual.

```
npm install 4dstudio-localserver
```

---


## How to install from git

You simply clone the repository 

```
git clone https://github.com/DAQRI/4dstudio-localserver.git
```

## Internal Workflow
Here are the step followed when 4dstudio is using native editor in 4dstudio-localserver

1. User click on 'native editor' button above the js editor in 4dstudio
2. 4dstudio webpage get the content of the codemirror content via javascript
3. 4dstudio contacts the local server with this content from codemirror, and a fake basename. 
   - This basename will be used to create a temporary file, which will be passed to the editor itself.
   - Thus the user get a expected name (e.g. script.js)
   - Based on the file extensions, the editor will provide contextual help, code colorisation, autocompletion etc...
4. When the text is saved, the local server get the content of the provided files, and reply that to 4dstudio
5. On reception of the new content, 4dstudio update the proper codemirror instance with the new content

## Implementation Details
- the server will bind the port 5000 on 127.0.0.1
- it is implemented as a [express server](http://expressjs.com/) in [node.js](https://nodejs.org)

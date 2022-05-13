# ToyBlock
Webpage explaining the concept of blockchain in a pedagogic way.

This project is made in the context of the *INFOB318 Projet individuel* class at *Unamur*.

Project manager: [Jérôme Fink](https://github.com/Jefidev)

# Deployed version of the page

You can check a deployed version of the webpage [here](https://ushien.github.io/ToyBlock/).

# How to test the code

First please make sure your device meets all the requirements needed for the lauching of the app.

ToyBlock is running on top of **React** so make sure you have node.js installed on your device.
Please follow this link if you need to install it: https://nodejs.org/en/

Then you may need to install scripts and configurations used by Create React App with the following command:
```sh
npm install react-scripts --save
```

After that, go to ``code/toyblock/`` and then type
```sh
npm start
```

That will launch the app on ``localhost:3000``

To apply any modification, just save the file and reload the page in your browser.

# How to deploy the page

Multiple methods can be used depending on the type of server and website you want to add ToyBlock to. Please refer to the [official Create React App documentation](https://create-react-app.dev/docs/deployment) for any specific case.

# Main tools

The React structure of the project is based on the one provided by [Create React App](https://github.com/facebook/create-react-app).
The frontend of the project is made with the help of [React-Bootstrap](https://github.com/react-bootstrap/react-bootstrap)
The documentation of the code is handled by [JSDoc](https://jsdoc.app/)

# Project structure

The main part of the project is found in **App.js**

The text of the website is found in **Blocs.js**

The interactive machines React components are found in **Components.js**

The javascript classes with which the machines interact are implemented in **Classes.js**

The necessary visuals of the website are found in ./visuals

# Code documentation

To access the JSDoc official documentation of the project, open the [doc/JSDoc/index.html](https://github.com/Ushien/ToyBlock/blob/main/doc/JSDoc/index.html) file.


For any further question, please check the programmer's guide in the doc directory.
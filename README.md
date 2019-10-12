![](https://raw.githubusercontent.com/CenWIDev/cwitc-website/master/src/images/cwitc_logo.png)

<h2>Central Wisconsin IT Conference<a href='https://app.netlify.com/sites/cwitc/deploys'><img align='right' src='https://api.netlify.com/api/v1/badges/afc0ff50-3f62-4b40-b2dc-cc487f904e8f/deploy-status' /></a></h2>

A work in progress site built using Gatsbyjs and hosted with Netlify.

If you're looking to contribute, get in contact with Josh Evenson ([@joshin_my_tots](https://twitter.com/joshin_my_tots) on Twitter)


## 🚀 Quick start

1.  **Install the Gatsby CLI.**

    The Gatsby CLI helps you create new sites using Gatsby starters (like this one!)

    ```sh
    # install the Gatsby CLI globally
    npm install -g gatsby-cli
    ```

1. **Install dependencies.**

    ```sh
    npm i
    ```

1. **Set Contentful API keys.**

    Rename **`empty.env`** to **`.env`** and set your Contentful API variables.
    This file is purposely in `.gitignore`. Contact Josh Evenson for access to Contentful API keys.

1. **Add empty.env to git exclude**

    Edit the `.git/info/exclude` file in the working directory, and add a new line with the text `empty.env`
    Run the following git command:
    ```sh
    git update-index --assume-unchanged empty.env
    ```

1.  **Start developing.**

    Navigate into your new site’s directory and start it up.

    ```sh
    npm develop
    ```

1.  **Open the source code and start editing!**

    Your site is now running at `http://localhost:8000`!

    *Note: You'll also see a second link: `http://localhost:8000___graphql`. This is a tool you can use to experiment with querying your data. Learn more about using this tool in the [Gatsby tutorial](https://next.gatsbyjs.org/tutorial/part-five/#introducing-graphiql).*

    Open the the `cwitc-website` directory in your code editor of choice and edit `src/pages/index.js`. Save your changes and the browser will update in real time!

## 🧐 What's inside?

A quick look at the top-level files and directories you'll see in a Gatsby project.

    .
    ├── node_modules
    ├── src
    ├── .gitignore
    ├── .nvmrc
    ├── .prettierrc
    ├── empty.env
    ├── gatsby-browser.js
    ├── gatsby-config.js
    ├── gatsby-node.js
    ├── gatsby-ssr.js
    ├── LICENSE
    ├── package-lock.json
    ├── package.json
    ├── README.md
    ├── tsconfig.json
    ├── tslint.json
    └── yarn.lock

  1.  **`/node_modules`**: The directory where all of the modules of code that your project depends on (npm packages) are automatically installed.

  1.  **`/src`**: This directory will contain all of the code related to what you will see on the front-end of your site (what you see in the browser), like your site header, or a page template. “Src” is a convention for “source code”.

  1.  **`.gitignore`**: This file tells git which files it should not track / not maintain a version history for.

  1. **`.nvmrc`**: NVM configuration so packages works as they should

  1.  **`.prettierrc`**: This is a configuration file for a tool called [Prettier](https://prettier.io/), which is a tool to help keep the formatting of your code consistent.

  1. **`empty.env`**: Rename to **`.env`** and set your Contentful API key

  1.  **`gatsby-browser.tsx`**: This file is where Gatsby expects to find any usage of the [Gatsby browser APIs](https://next.gatsbyjs.org/docs/browser-apis/) (if any). These allow customization/extension of default Gatsby settings affecting the browser.

  1.  **`gatsby-config.js`**: This is the main configuration file for a Gatsby site. This is where you can specify information about your site (metadata) like the site title and description, which Gatsby plugins you’d like to include, etc. (Check out the [config docs](https://next.gatsbyjs.org/docs/gatsby-config/) for more detail).

  1.  **`gatsby-node.js`**: This file is where Gatsby expects to find any usage of the [Gatsby node APIs](https://next.gatsbyjs.org/docs/node-apis/) (if any). These allow customization/extension of default Gatsby settings affecting pieces of the site build process.

  1.  **`LICENSE`**: Gatsby is licensed under the MIT license.

  1.  **`package-lock.json`** (See `package.json` below, first). This is an automatically generated file based on the exact versions of your npm dependencies that were installed for your project. (You won’t change this file directly).

  1.  **`package.json`**: A manifest file for Node.js projects, which includes things like metadata (the project’s name, author, etc). This manifest is how npm knows which packages to install for your project.

  1.  **`README.md`**: A text file containing useful reference information about your project.

  1.  **`tsconfig.json`**: Config file for TypeScript

  1.  **`tslint.json`**: TS Lint configuration file


## 🎓 Learning Gatsby

Looking for more guidance? Full documentation for Gatsby lives [on the website](https://next.gatsbyjs.org/). Here are some places to start:

-   **For most developers, we recommend starting with our [in-depth tutorial for creating a site with Gatsby](https://next.gatsbyjs.org/tutorial/).** It starts with zero assumptions about your level of ability and walks through every step of the process.

-   **To dive straight into code samples head [to our documentation](https://next.gatsbyjs.org/docs/).** In particular, check out the “Guides”, API reference, and “Advanced Tutorials” sections in the sidebar.


nothing
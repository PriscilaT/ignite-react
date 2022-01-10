# React - Ignite Dezembro 2021

#### Ferramentas

Precisa de:
 * Vscode
 * Node
 * Yarn ou Npm

#### Estrutura do projeto

 * Criar uma pasta para o projeto
 * Inicializar o repositório de qualquer projeto seja JAVASCRIPT (node.js ou react.js, etc), 
 todos precisam do package.json

 ```cmd
    yarn init -y
 ```
ou com npm

 ```cmd
    npm init -y
 ```
 * Adicionar a biblioteca REACT

 ```cmd
    yarn add react
 ```

  * Adicionar a biblioteca REACT-DOM (forma de trabalha com react na web, árvore de elementos)

 ```cmd
    yarn add react-dom
 ```

 * Criar pasta src, onde fica todo o código criado, principalmente o js e dentro dela um arquivo chamado index.jsx

 * Criar pasta public, onde fica todos os arquivos publicos, assets, index, qualquer que precise ser acessado do meio externo.
 e dentro dela um arquivo chamado index.html

 * Instalar o Babel

 ```cmd
   yarn add @babel/core @babel/cli @babel/preset-env -D

 ```
 * Criar um arquivo chamado babel.config.js
```js
   module.exports = {
      presets: [
         '@babel/preset-env',
         ['@babel/preset-react', {
               runtime: 'automatic'}
         ]
      ]
   }
```

Para entender o html dentro de index.js
 ```cmd
   yarn add @babel/preset-react -D
 ```
Converter de uma maneira que alguns navegadores entendam

 ```cmd
   yarn babel src/index.jsx --out-file dist/bundle.js
 ```

Configurar o webpack, ele trata e converte arquivos de outros tipo para um que o browser entende

 ```cmd
   yarn add webpack webpack-cli -D
 ```

 * Na raiz do projeto cria um arquivo chamado webpack.config.js
 ```js
   const path = require('path')

   module.exports = {
      mode: 'development',
      entry: path.resolve(_dirname, 'src', 'index.jsx'),
      output:{
         path: path.resolve(_dirname, 'dist'),
         filename: 'bundle.js'
      },
      resolve: {
         extensions: ['.js', '.jsx'],
      },
      module: {
         rules: [
               {
                  test: /\.jsx$/,
                  exclude: /node_modules/,
                  use: 'babel-loader'
               }
         ]
      }
   };
```

Integração entre babel e webpack

```cmd
yarn add babel-loader -D
```

* Criar dentro de src um arquivo App.jsx

```js
export function App() {
   return <h1>Hello!!!</h1>
}
```

* Importar dentro de index o arquivo app para que ele funcione

```js
import { App } from './App'
```

* Executa o webpack com o comando

```cmd
yarn webpack
```
 ##### Estrutura do React

 É uma biblioteca que cria toda a interface da aplicação atraves do javascript
  * Toda a estrutura  construida dentro da div root em index.html dentro do body e importa o buble.js

  ```js
  <body>
    <div id="root"></div>
    <script src="dist/bundle.js"></script>
   </body>

  ```

  * Dentro do index.jsx

  ```js
   import { render } from 'react-dom';
   import { App } from './App'

   render(<App />, document.getElementById('root'))
  ```
  * No terminal, roda 
   ```cmd
   yarn webpack
  ```

  ##### Servindo html estático

  * Para não precisar do bundle, tira isso do index.html
  ```js
   <script src="../dist/bundle.js"></script>
  ```
  e instala essa dependencia webpack como dependencia de desenvolvedor

  ```cmd
   yarn add html-webpack-plugin -D
  ```
 e importa no webpack.config.js
 ```js
   const HtmlWebpackPlugin = require('html-webpack-plugin')

   plugins: [
      new HtmlWebpackPlugin({
         template: path.resolve(__dirname, 'public'. 'index.html')
      })
   ]
  ```

  ##### Webpack Dev Server

 * Para não precisar ficar rodando yarn webpack toda vez que fizer uma alteração, instala:

 ```cmd
   yarn add webpack-dev-server -D
  ```

  e no webpack.config.js
 ```js
   devServer: {
      contentBase: path.resolve(__dirname, 'public')
   },
 ```

 depois disso, só precisa rodar 
 ```cmd
   yarn webpack serve
 ```

 * Nessa parte deu um erro, resolvi trocando: contentBase
 ```js
   devServer: {
      contentBase: path.resolve(__dirname, 'public')
   },
 ```
 por : static
 ```js
   devServer: {
      static: path.resolve(__dirname, 'public')
   },
 ```

 ##### Utilizando Source Maps

 * Serve para vizualizar o código original, mesmo quando todo o código que estamos usando está no dist
 Útil para quando tiver programando e der um erro e você quiser inspecionar a página (debugar)

Colocando em webpack.config.js embaixo do mode:
 ```js
   devtool: 'eval-source-map',
 ```

 ##### Ambiente dev e produção

 * Definir variáveis de ambiente para agir diferente, dependendo se estou em ambiente de deesenvolvimento ou produção. Em webpack.config.js
 ```js
   const isDevelopment = process.env.NODE_ENV !== 'production';

   module.exports = {
      mode: isDevelopment ? 'development' : 'production',
      devtool: isDevelopment ? 'eval-source-map' : 'source-map',
 ```

 Criar a variável de ambiente NODE_ENV. No linux e no mac, isso funciona, no Win é diferente.

 ```cmd
   NODE_ENV=production yarn webpack
 ```

 Para executar isso independente do sistema operacional:

 No package.json define um script,

  ```js
   "scripts":{
    "dev": "webpack serve",
    "build": "cross-env NODE_ENV=production webpack"
  },
 ```

 e instala no terminal essa dependência.

 ```cmd
   yarn add cross-env -D
 ```

 Então agora, se eu quiser executar o projeto para ambiente de desenvolvimento eu coloco no terminal:

  ```cmd
   yarn dev
 ```

 e para ambiente de produção:

 ```cmd
   yarn build
 ```

##### Importando o CSS e Utilizando o SASS
(vantagem do sass, encadeamento)

 * Importa no terminal:

 ```cmd
   yarn add style-loader css-loader -D
   yarn add sass-loader -D
   yarn add node-sass -D
 ```

 * Cria uma pasta chamada style dentro do src, e dentro dessa pasta cria um arquivo global.scss, por exemplo.
 Para importar no App.jxs:

 ```js
 import './style/global.scss';
 ```

 Para que o react entendo css (que não pe js), precisa criar uma nova regra no webpack.config.js 

  ```js
   {
      test: /\.scss$/,
      exclude: /node_modules/,
      use: ['style-loader', 'css-loader', 'sass-loader'],
   }
 ```
 
 



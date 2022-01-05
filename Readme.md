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
        '@babel/preset-react'
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

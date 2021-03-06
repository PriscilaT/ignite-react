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
 
 ## Conceitos importantes de React.js

 ##### Componentes
 São como as tags em HTML. Uma forma de organizar separando em pedaços, os componentes, para formar algo maior.
 É uma função, que devolve um html. O padrão é: um compponente por arquivo e começar com letra maiuscula.

 Quando tem algo repetindo, faz sentido criar um componente para encapsular aquilo.

 Dentro de src cria uma pasta chamada components, e dentro de components cria RepositoryList
 A estrutura de um componente é pareceida com o seguinte:

 ```js
   export function RepositoryList() {
      return(
         <section className="repository-list">
               <h1>Lista de repositórios</h1>

         </section>
      )
   }
 ```
 Importa no App.jsx
 ```js
   import { RepositoryList } from './components/RepositoryList';
   import './style/global.scss';

   export function App() {
      return <RepositoryList />
   }
```

##### Propriedades
Faz parte do código se comportar de maneira diferente.
Fazendo um nome componente chamado RepositoryItem e importando ele no RepositoryList podemos ter um exemplo.

Com isso, o repositório pai (RepositoryList) pode enviar informações para o repositório filho (RepositoryItem)

```js
   import { RepositoryItem } from "./RepositoryItem";

   <RepositoryItem repository="unform2"/>
   <RepositoryItem />
   <RepositoryItem />

```

Para acessar essa informação no RepositoryItem, basta receber na função o argumento "props", onde fica tudo que aquele componente recebe, mas para acessar uma propriedade especifica coloca {props.repository}

```js
   export function RepositoryItem(props) {
    return (
      <li>
         <strong>{props.repository}</strong>
         <p>Forms in React</p>

         <a href="">
               Acessar repositório
         </a>
      </li>
   )
}

```
###### Anotações
 * Para colocar variáveis dentro do html usa {}
 * Renderizar é o ato de um componente ser exibido em tela

##### Estado do componente

Cria um arquivo chamado Counter.jsx

Rederiza no App.jsx, com fragment, pois quando tem dois componentes juntos, eles precisam estar entre uma div ou fragment

```js
<>
   <RepositoryList />
   <Counter />
</>
```
Para começar essa ideia de estado com um botão de incrementar, cria uma função no Counter.jsx


``` js
export function Counter() {
    let counter = 0;

    function increment() {
        counter += 1;
    }
    return (
        <div>
            <h2>{counter}</h2>
            <button type="button" onClick={increment}>
                Increment
            </button>
        </div>
    );
}
```

Mas isso ainda não funciona porque o react por padrão não fica monitorando se as variáveis são alteradas.
O react monitora apenas a "variável estado" e quando essa muda, ele rederiza todas de novo.

Conhecido como "hook" ou "gancho" 
```js
   import { useState } from "react";

   export function Counter() {
      const [counter, setCounter] = useState(0);

      function increment() {
         setCounter (counter + 1);
      }
      return (
         <div>
               <button type="button" onClick={increment}>
                  <h2>{counter}</h2>
               </button>
         </div>
      );
   }
```

##### Imutabilidade do react

Um conceito que existe no estado do componente.
Prevê que uma variável não vai ter seu valor alterado ou receber um novo valor

```js
 
   setCounter (counter + 1);
      
```

Por isso usamos o setCounter, para criar um novo com o valor anterior e o novo valor.

##### Fast Refresh do react

Caso eu mude o nome do botão a quantidade de clicks volta para 0, caso eu não queria isso posso usar o fast refresh webpack, ou seja, serve para manter o estado do componente

Instala no terminal

```js
   yarn add -D @pmmmwh/react-refresh-webpack-plugin react-refresh
```

E no webpack.config.js importa 

```
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin')

devServer: {
   static: path.resolve(__dirname, 'public'),
   hot: true,
},

plugins: [
   isDevelopment && new ReactRefreshWebpackPlugin,
   new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'public', 'index.html')
   })
].filter(Boolean),
module: {
   rules: [
      {
            test: /\.jsx$/,
            exclude: /node_modules/,
            use: {
               loader: 'babel-loader',
               options: {
                  plugins: [
                        isDevelopment && require.resolve('react-refresh/babel')
                  ].filter(Boolean)
               }
            },
      },
      {
            test: /\.scss$/,
            exclude: /node_modules/,
            use: ['style-loader', 'css-loader', 'sass-loader'],
      },
   ],
}

```
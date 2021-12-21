
# DBInclui 💭

## Descrição do Projeto

Web app que dissemina a cultura de inclusão dentro da DBServer, com foco na cultura surda. O web app é destinado para todas as pessoas que desejam aprender LIBRAS e enteder um pouco mais sobre inclusão de PCD`s na sociedade. O web app aproveita o guia de acessibilidade e a apostila de Libras como fonte de informação de inclusão, assim como utiliza a API Libras para as funcionalidades específicas.

## Mapa de Tecnologias 🖱️

Utilizaremos Node.js com Typescript para o backend da aplicação.

|        Nome       	|                  Documentação                  	|                  Links dos pacotes               |
|:-----------------:	|:----------------------------------------------:	|:-----------------------------------------------:	|
| Node.js           	| https://nodejs.org/dist/latest-v16.x/docs/api/ 	| https://nodejs.org/en/download/                 	|
| Typescript        	| https://www.typescriptlang.org/docs/           	| https://www.npmjs.com/package/typescript        	|
| Mongoose          	| https://mongoosejs.com/docs/                   	| https://www.npmjs.com/package/mongoose          	|
| Axios             	| https://axios-http.com/docs/intro              	| https://www.npmjs.com/package/axios             	|
| Express           	| http://expressjs.com/en/4x/api.html            	| https://www.npmjs.com/package/express           	|
| Express Validator 	| https://express-validator.github.io/docs/      	| https://www.npmjs.com/package/express-validator 	|
| JWT               	| https://jwt.io/introduction                    	| https://www.npmjs.com/package/jsonwebtoken      	|

## Executando o Projeto 💻

### Instalando os módulos

```
$ npm install
```

### Iniciando o Backend com Nodemon

```
$ npm run dev
```

## Fluxo de versionamento 👨‍💻

### Clone o repositório

```
$ git clone https://github.com/dbinclui-org/dbinclui-backend.git
```

### Iniciar o uso do Git Flow no projeto
```
$ git flow init
```

### Certifique-se de que a branch para "production releases" é a main
```
Which branch should be used for bringing forth production releases?
   - main
Branch name for production releases: [main] 
```

### Certifique-se de que a branch para "next release" é a develop
```
Branch name for "next release" development: [develop] 
```

### Aperte "ENTER" em cada input para usar as nomenclaturas padrões das features
```
How to name your supporting branch prefixes?
Feature branches? [feature/] 
Release branches? [release/] 
Hotfix branches? [hotfix/] 
Support branches? [support/] 
Version tag prefix? []
```

### Crie a branch baseada no número do seu card no Trello
```
$ git flow feature start DBI-61 <-- número do card do Trello
```

### Adicione e faça o commit das mudanças da branch
```
$ git add -A
$ git commit -m "Update README"
```

### Publique as modificações realizadas
```
$ git push --set-upstream origin feature/DBI-61
```

### Para realizar o *pull request* é necessário mudar o base repository para o repositório que possui o "dbinclui-org"
<img src="https://i.imgur.com/2D3kkjl.png"/>

### Confirme se a *develop* está marcada na *base* e se a sua *feature* está no *compare*, após isso já é possível clicar no botão para criar o *pull request*
<img src="https://i.imgur.com/kRLdwkc.png"/>

### Mude o título do *pull request* para o nome da feature + o título do card do Trello, como mostrado abaixo, após isso já é possível clicar no botão para criar o *pull request*
<img src="https://i.imgur.com/AZywbED.png"/>

### Após as mudanças serem aprovadas por duas pessoas e serem passadas no teste, será possível realizar o *merge request*
<img src="https://i.imgur.com/V76w9Bh.png"/>


<!-- ## Commit Semântico ⚡

Pequenas alterações que não são novas funcionalidades.

```

chore: add Oyster build script

```

Semelhante a uma wiki; documentações etc.

```

docs: explain hat wobble

```

Criação de Nova funcionalidade.

```

feat: add beta sequence

```

Correção de bugs.

```

fix: remove error message

```

Refatoração de um código.

```

refactor: share logic 4d3d3d3

```

Alteração em estilos, formatação de código etc.

```

style: convert tabs to spaces

```

Criação de testes da sua aplicação.

```

test: ensure that increment

```

Para saber mais sobre os commits semânticos, [acesse este artigo](https://blog.geekhunter.com.br/o-que-e-commit-e-como-usar-commits-semanticos/). -->

# Sobre o projeto

Projeto Front end em React para controle de frota de veículos de transportadora.

## Regras de Negócio

- O mapa deve apresentar todos os veículos rastreáveis simultaneamente e ser atualizado a cada 2 minutos automaticamente.
- A lista deve carregar 20 veículos e ter um carrossel infinito que carrega mais veículos sempre que scrollamos até o final da lista.
- Ao clicar em um veículo da tela, apresentar os detalhes do veículo.
- Entre os detalhes do veículo existe um link que abre o Google Maps nas coordenadas do veículo.
- Filtros de busca e detalhes apresentam dados da frota.

# Frameworks e Bibliotecas utilizadas neste projeto:
- React
- Vite
- TypeScript
- React Router DOM
- Zod
- Tailwind
- Shadcn/ui
- Axios
- React Query
- Biome
- React Helmet
- Vitest
- Testing Library
- Jest-Dom
- Happy Dom
- MSW
- Playwright

## Instalação

### Para executar o projeto, siga as etapas abaixo:

#### Clone o repositório:

```
git clone git@github.com:jeanmbiz/control361.git
```

#### Acesse o diretório do projeto:

#### Crie e configure o arquivo .env.local e env.test com base no env.*.example:

#### Instale as dependências:

```
npm install
```

#### Rode o projeto:

```
npm run dev
```

#### Acesse a aplicação:

```
http://localhost:5173/
```

## Executar Testes

### Testes Unitários:
#### Executar Testes:

```
npm run test
```

### Testes e2e:
#### Rodar ambiente de testes e2e:

```
npm run dev:test
```
#### Executar testes e2e:

```
npx playwright test
```

## Layout Web
![SITE](/src/assets/dashboard.png) 

## Testes Unitários 
![SITE](/src/assets/unit-tests.png)

## Testes e2e
![SITE](/src/assets/e2e-tests.png)

## Mock de API com MSW

Este projeto utiliza o [MSW (Mock Service Worker)](https://mswjs.io/) para simular as respostas da API em **todos os ambientes**: desenvolvimento, teste e produção pois a API com os dados não está mais disponibilizada.

- As rotas `/recruitment/vehicles/list-with-paginate` são interceptadas e respondidas com dados mockados.
- Os mocks estão localizados em `src/api/mocks/`.
- A configuração do MSW é inicializada automaticamente em `src/main.tsx` e está sempre ativa.

**Como funciona:**

Ao rodar o projeto em qualquer ambiente, o MSW intercepta as requisições HTTP feitas pelo front-end para os endpoints da API e retorna dados simulados, permitindo que o sistema funcione normalmente mesmo sem um backend real.

### Link Vercel: [control361-vcwl.vercel.app/](https://control361-vcwl.vercel.app/)

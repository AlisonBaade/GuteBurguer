# 🍔 Gute Burguer — Cardápio Digital & Sistema de Gestão

Projeto full stack de cardápio digital desenvolvido com **Django + Django REST Framework** no backend e **React + TypeScript** no frontend.

A aplicação oferece um cardápio responsivo, gerenciamento de pratos e categorias pelo Django Admin, integração com WhatsApp para pedidos e um dashboard de estatísticas de acesso.

## 🌐 Demonstração online

A versão em produção pode ser acessada em:

**https://gute-burguer.alibsys.cloud**

> O ambiente público deste repositório foi preparado para demonstração e execução local. Configurações, credenciais e infraestrutura do ambiente de produção não fazem parte deste repositório.

## ✨ Funcionalidades

- Cardápio digital responsivo
- Categorias e produtos carregados via API REST
- Destaques e promoções
- Integração com WhatsApp para montagem e envio de pedidos
- Painel administrativo com Django Admin
- Cadastro e gerenciamento de pratos e categorias
- Upload de imagens dos produtos
- Dashboard de estatísticas de acesso
- Persistência com PostgreSQL
- Ambiente local totalmente conteinerizado com Docker

## 🛠 Tecnologias

### Backend

- Python 3.12
- Django
- Django REST Framework
- PostgreSQL
- django-cors-headers
- Pillow

### Frontend

- React 18
- TypeScript
- Vite
- Material UI
- Axios

### Desenvolvimento e qualidade

- Docker
- Docker Compose
- GitHub Actions
- Testes automatizados no backend
- ESLint no frontend
- Dependabot para atualização de dependências
- Scanner de segredos no CI

## 🚀 Executando localmente

### Pré-requisitos

Tenha instalados:

- Docker
- Docker Compose
- Git

### 1. Clone o repositório

```bash
git clone https://github.com/AlisonBaade/GuteBurguer.git
cd GuteBurguer
```

### 2. Configure as variáveis locais

O projeto possui valores seguros de desenvolvimento no `docker-compose.yml`.

Se quiser personalizar as configurações:

```bash
cp .env.example .env
```

O arquivo `.env` não deve ser versionado. O número de WhatsApp configurado por padrão é apenas demonstrativo; para testar o redirecionamento com um número real, altere `VITE_WHATSAPP_NUMBER` e `VITE_WHATSAPP_DISPLAY` somente no seu `.env` local.

### 3. Suba a aplicação

```bash
docker compose up --build
```

Na primeira execução, o Docker irá baixar as imagens necessárias, instalar as dependências e executar as migrations do Django.

### 4. Acesse os serviços

| Serviço | URL |
| --- | --- |
| Frontend | http://localhost:5173 |
| API Django | http://localhost:8000 |
| Django Admin | http://localhost:8000/gute-admin/ |
| pgAdmin | http://localhost:8080 |

Credenciais locais padrão do pgAdmin:

```text
E-mail: admin@gute.com
Senha: admin
```

Essas credenciais existem exclusivamente para facilitar o ambiente local.

### 5. Crie um usuário administrador

Com os containers em execução:

```bash
docker compose exec backend python manage.py createsuperuser
```

Depois acesse:

```text
http://localhost:8000/gute-admin/
```

### 6. Cadastre os dados do cardápio

O banco PostgreSQL local começa vazio. Pelo Django Admin, cadastre primeiro as **categorias** e depois os **pratos**, incluindo preços, descrição, imagem e, se desejar, promoção/preço promocional.

Assim que os registros forem salvos, eles passam a ser disponibilizados pela API e aparecem automaticamente no frontend.

## 🧪 Testes e validações

### Backend

```bash
docker compose exec backend python manage.py test
```

### Frontend

```bash
cd frontend
npm install
npm run lint
npm run build
```

O repositório também possui uma pipeline de CI no GitHub Actions para executar verificações automaticamente.

## 📁 Estrutura do projeto

```text
GuteBurguer/
├── backend/
│   ├── gute/            # Configurações do Django
│   ├── pratos/          # Domínio do cardápio e API
│   └── estatisticas/    # Métricas e estatísticas de acesso
├── frontend/            # React + TypeScript + Vite
├── .github/workflows/   # Pipeline de CI
├── docker-compose.yml   # Ambiente de desenvolvimento local
└── .env.example         # Exemplo de variáveis locais
```

## 🔐 Sobre o ambiente de produção

A aplicação possui uma versão real publicada, mas este repositório não contém detalhes operacionais do servidor.

Foram mantidos fora da versão pública, entre outros:

- credenciais e secrets;
- arquivos `.env` reais;
- IPs e identificadores do servidor;
- scripts de deploy;
- configuração de proxy reverso e TLS;
- configuração SSH e Fail2ban;
- rotinas e caminhos de backup;
- demais configurações específicas da infraestrutura de produção.

Essa separação permite demonstrar o código e a arquitetura da aplicação sem expor informações sensíveis do ambiente real.

## 🎯 Objetivo do repositório

Este projeto é disponibilizado como parte do meu portfólio de desenvolvimento, demonstrando experiência prática com:

- desenvolvimento de APIs REST;
- Django e Django REST Framework;
- React e TypeScript;
- PostgreSQL;
- Docker e Docker Compose;
- integração entre frontend e backend;
- testes e automação de qualidade;
- boas práticas de configuração e segurança.

## 📄 Licença

Projeto disponibilizado para fins de demonstração e portfólio. Consulte o autor antes de reutilizá-lo comercialmente.

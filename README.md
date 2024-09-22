# Passo a passo

## Instalações e configurações locais:

### Como instalar o node.js no ubuntu:

- node: https://www.digitalocean.com/community/tutorials/how-to-install-node-js-on-ubuntu-20-04-pt

### Docker e docker compose instalado no ubuntu:

- docker: https://www.digitalocean.com/community/tutorials/how-to-install-and-use-docker-on-ubuntu-20-04
- docker compose: https://www.digitalocean.com/community/tutorials/how-to-install-and-use-docker-compose-on-ubuntu-20-04-pt

### instalando projeto

```
docker compose up (usar em outro terminal ou usar flag -d)
npm install
npx prisma generate (banco ligado)
npx prisma migrate dev (deve rodar sempre que alterar o schema.prisma e com banco ligado)
```

## Rodar localmente:

    ```
    docker compose up
    npm run dev
    ```

## Comandos extras

    Rodar containers em segundo plano:
        ```
        docker compose up -d (-d para rodar em segundo plano)
        ```

    Parar todos os containers:
        ```
        docker stop $(docker ps -aq)
        ```

    Resetar os bancos e containers (caso bug):
        ```
        docker stop $(docker ps -aq) &&
        docker rm $(docker ps -aq) &&
        docker-compose down -v &&
        docker volume prune -f &&
        docker-compose up --build
        ```

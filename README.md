# Wordpress Playground - DOCKER

## Abrindo o projeto pela primeira vez em ambiente local

### 1. Clone o repositório com recurse-submodules
```shell
git clone project_git_url --recurse-submodules
```

### 2. Descompacte o dump do banco que veio zipado para caber no git
```shell
gunzip mysql/docker-entrypoint-initdb.d/createdb.sql.gz
```

### 3. Construa/Ligue o ambiente do docker compose estando na raiz do repositório
```shell
docker compose up
```

### 4. Faça checkout em alguma branch na pasta do tema wp-content/themes/theme-name
```shell
git checkout dev
```

Pronto!

Neste momento já deve ser possível acessar o site em http://localhost

## Trabalhando no projeto

Talvez você precise trabalhar com dump do banco de dados para exportar/importar.
Ambos comandos trabalham com o dump em: mysql/docker-entrypoint-initdb.d/createdb.sql.

Exportar:
```shell
docker compose exec mysql sh -c 'mysqldump -psecret default > /docker-entrypoint-initdb.d/createdb.sql'
```

Importar:
```shell
docker compose exec mysql sh -c 'mysql -psecret default < /docker-entrypoint-initdb.d/createdb.sql'
```

### Importante

Arquivos na pasta wp-content deverão ser commitados sim, pois a idéia é facilitar a vida do próximo desenvolvedor ou de
você mesmo no futuro quando pegar este projeto e ele ter o mínimo de assets e plugins para poder trabalhar.

Também devemos commitar o banco na pasta mysql/docker-entrypoint-initdb.d/createdb.sql, ou seja, rodando um comando de
exportação sempre que houver alteração e salvando no git enquanto este dump é menor do que 50MB.
Quando ele atinge este tamanho, devemos removê-lo do git e trabalhar com links externos aqui no README.
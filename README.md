# test4plumsail

## How to run in docker
1. Read `scripts/variables.sh`
    1. Set `yandexDiskOauthToken` var to the value from `https://yandex.ru/dev/disk/rest/` to allow image uploading. If you won't set it - the app will work anyway, but without images.
1. Run the following
    ```bash
    cd scripts
    ./build.sh
    ./run.sh          # be won't start, that's fine
    ./connect_db.sh
    $ create database plumsail ; exit ;      # in db container 
    ./stop_all.sh
    ./run.sh
    ./deploy_db.sh
    ```
1. Open `http://localhost:80`

## How to run without docker
1. Run db container using `scripts/run.sh`
1. Run be using `dotnet 3.x`
1. Run fe using `yarn start`

## Points of interest
It works, but I'm not sure is it the same that was required. I asked a question, but received no comments about the task. So I made it to work just somehow.

- *API must be universal and should not depend on certain field* - controversial
- *Modifications to the original form should not affect API* - `create` entity should be updated
- *Forms must be searchable* - not all properties. That's dapper issue, and I don't wont to fix it: it doesn't make any sense to me in this task
- *src/be/services* - do nothing, but that's because the app is simple
- *src/fe* - typescript and functional components doesn't make me happy. Css variables doesn't work with material ui, and I hate it

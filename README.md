# Simple Producer-Consumer

A simple producer-consumer test app as a PoC to do the following communication:
- host -> host
- docker -> host
- host -> docker
- docker -> docker

## Prerequisite
- [Docker](https://www.docker.com/)
- [Node 16.15.1 LTS](https://nodejs.org/en/)

## F5 experience
1. Install dependencies

    `npm i`


2. Build the docker image

    `npm run build`

3. Run the project:
    - Testing host -> host:
        ```sh
        npm start:watch
        ```

    - Testing docker -> host:
        ```sh
        npm start:producer:watch
        docker-compose up consumer
        ```

    - Testing host -> docker:
        ```sh
        npm start:consumer:watch
        docker-compose up producer
        ```

    - Testing docker -> docker:
        ```sh
        docker-compose up
        ```

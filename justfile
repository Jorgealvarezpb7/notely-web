dkc:
    docker pull ghcr.io/leoborai/dkc:latest
    docker run -it --rm \
        -v $(pwd):/app \
        -w /app \
        ghcr.io/leoborai/dkc:latest

dev:
    bun run dev

build:
    bun run build

preview:
    bun run preview

format:
    bun run format

lint:
    bun run lint

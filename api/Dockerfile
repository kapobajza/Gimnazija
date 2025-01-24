FROM golang:1.23-alpine AS base

WORKDIR /app

COPY . .

FROM base AS local
RUN go install github.com/air-verse/air@latest
CMD ["air", "-c", ".air.toml"]

FROM base AS debug
RUN go install github.com/go-delve/delve/cmd/dlv@latest
RUN go build -gcflags "all=-N -l" -o main .
CMD ["dlv", "--listen=:40000", "--headless=true", "--log=true", "--accept-multiclient", "--api-version=2", "exec", "/app/main"]

FROM base AS prod
RUN go build -o main main.go
CMD ["./main"]
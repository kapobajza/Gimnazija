FROM node:20.10.0 AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"

WORKDIR /app

RUN corepack enable

COPY package.json .
COPY pnpm-lock.yaml .
COPY pnpm-workspace.yaml .
COPY dashboard/package.json ./dashboard/package.json

RUN --mount=type=cache,id=pnpm-store,target=${PNPM_HOME}/store pnpm install --frozen-lockfile --filter=!web

COPY . .

FROM local AS dev-local
CMD ["pnpm", "run", "dashboard:dev"]

FROM local AS prod-local
RUN pnpm --filter dashboard run build
CMD ["pnpm", "run", "dashboard:start"]

FROM base AS production
RUN pnpm --filter dashboard run build
COPY ./dashboard/entrypoint.sh /usr/local/bin/entrypoint.sh
RUN chmod +x /usr/local/bin/entrypoint.sh
ENTRYPOINT ["/usr/local/bin/entrypoint.sh"]
CMD ["pnpm", "run", "dashboard:start"]
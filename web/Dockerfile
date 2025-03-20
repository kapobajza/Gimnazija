FROM node:20.10.0 AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"

WORKDIR /app

RUN corepack enable

COPY package.json .
COPY pnpm-lock.yaml .
COPY pnpm-workspace.yaml .
COPY web/package.json ./web/package.json

RUN --mount=type=cache,id=pnpm-store,target=${PNPM_HOME}/store pnpm install --frozen-lockfile --filter=!dashboard

COPY . .

FROM base AS local
# COPY ./web/scripts/update_local_hosts.sh /usr/local/bin/update_local_hosts.sh
# RUN chmod +x /usr/local/bin/update_local_hosts.sh

# # Set the entrypoint to run the script
# ENTRYPOINT ["/usr/local/bin/update_local_hosts.sh"]

FROM local AS dev-local
CMD ["pnpm", "--filter", "web",  "run", "dev"]

FROM local AS prod-local
RUN pnpm --filter web run build
CMD ["pnpm", "--filter", "web", "run", "start"]

FROM base AS production
RUN pnpm --filter web run build
CMD ["pnpm", "--filter", "web",  "run", "start"]
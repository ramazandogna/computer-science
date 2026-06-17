# =============================================================================
# MULTI-STAGE DOCKERFILE
# -----------------------------------------------------------------------------
# WHY multi-stage: the final image should contain ONLY what's needed to RUN the
# app — no dev tooling, no build caches, no source you don't ship. A smaller
# image = faster pulls, less attack surface, lower cost. Each `FROM` starts a
# new stage; we copy just the artifacts we want into the final, slim stage.
# =============================================================================

# ---- Stage 1: dependencies --------------------------------------------------
# Install production deps in an isolated stage so this layer is CACHED and only
# rebuilt when package files change — not on every source edit. This is the
# single biggest Docker build-speed win and a common interview question.
FROM node:20-alpine AS deps
WORKDIR /app
# Copy ONLY the manifest first (not the whole project). Docker caches layers by
# their inputs; if package*.json is unchanged, the expensive npm ci is skipped.
COPY package.json package-lock.json* ./
# `npm ci` = clean, reproducible install from the lockfile (fails if out of sync).
# `--omit=dev` skips devDependencies — they don't belong in a runtime image.
RUN npm ci --omit=dev

# ---- Stage 2: runtime -------------------------------------------------------
FROM node:20-alpine AS runtime
# Tells libraries (and our config) we're in prod, enabling optimizations.
ENV NODE_ENV=production
WORKDIR /app

# SECURITY: don't run as root. The official node image ships a non-root `node`
# user; switching to it limits the blast radius if the app is compromised.
COPY --from=deps /app/node_modules ./node_modules
COPY package.json ./
COPY src ./src
USER node

EXPOSE 3000

# A container-level healthcheck so the orchestrator knows when the app is ready
# vs just "process started". Hits our /health endpoint.
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD node -e "fetch('http://localhost:3000/health').then(r=>process.exit(r.ok?0:1)).catch(()=>process.exit(1))"

# Start via the cluster primary so the container uses all allocated CPUs.
# (In k8s with 1 CPU/container you might instead run `node src/server.js` and
# scale with replicas — see the README's trade-off note.)
CMD ["node", "src/cluster.js"]

import type { Request } from "express";
import { createProxyMiddleware } from "http-proxy-middleware";

import { MONOLITH_URL, MOVIES_MIGRATION_PERCENT, GRADUAL_MIGRATION, MOVIES_SERVICE_URL } from "../config";
import { useMicroService } from '../services/migration-router'

export const monolithProxy = createProxyMiddleware<Request>({
  router: () => MONOLITH_URL,
  changeOrigin: true,
  pathRewrite: (_path, request) => request.originalUrl,
});

export const moviesProxy = createProxyMiddleware<Request>({
  router: () => useMicroService(GRADUAL_MIGRATION, MOVIES_MIGRATION_PERCENT) ? MOVIES_SERVICE_URL : MONOLITH_URL,
  changeOrigin: true,
  pathRewrite: (_path, request) => request.originalUrl,
})
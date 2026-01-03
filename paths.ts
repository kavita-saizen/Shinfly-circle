export const APP_ID = process.env.NEXT_PUBLIC_SHINFLY_APP_ID || "shinfly-review-circle";

export function basePath(appId = APP_ID) {
  return `artifacts/${appId}/public/data`;
}

export function colPath(name: "profiles" | "articles" | "feedback" | "reviewSummaries", appId = APP_ID) {
  return `${basePath(appId)}/${name}`;
}

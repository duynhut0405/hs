export default function getLastSlashProduct(ctx) {
  let parts = ctx.split("/");
  return parts[parts.length - 1];
}

export default function IsMobile(ctx) {
  const UA = ctx.req.headers["user-agent"];
  // return Boolean(UA.match(/Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i));
  return Boolean(UA.match(/Android|BlackBerry|iPhone|iPod|Opera Mini|IEMobile|WPDesktop/i));
}

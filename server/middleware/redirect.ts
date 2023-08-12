export default defineEventHandler(async (event) => {
  if (event.path.startsWith('/api')) {
    return
  }

  const slug = event.path.slice(1).split('?')[0]

  if (!validateSlug(slug)) {
    return
  }

  const linkData = await getLinkEntity(slug)

  if (!linkData) {
    await sendRedirect(event, `/?slug=${slug}`, 302)
    return
  }

  // if (linkData.link.includes('twitter')) {
  //   return `<!DOCTYPE html><html><head><meta http-equiv="refresh" content="0; url=${linkData.link.replace(/"/g, "%22")}"></head></html>`;
  // }

  // await sendRedirect(event, linkData.link, 302)
  return `<!DOCTYPE html><html><head><meta http-equiv="refresh" content="0; url=${linkData.link.replace(/"/g, "%22")}"></head></html>`;
})

export default defineEventHandler(async (event) => {
  const storage = useLinksStorage()
  const keys = await storage.getKeys()
  const reqUrl = getRequestURL(event)
  const links = await Promise.all(keys.map(async (key) => {
    const linkItem = await getLinkEntity(key)
    const shortLink = new URL('/' + key, reqUrl).toString()
    return { 
       createdAt: new Date(linkItem!.createdAt),  
       slug: linkItem!.slug,
       link: linkItem?.link,
       shortLink
    }
  }))
  return links.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
})

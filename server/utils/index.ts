// -- Contants --

export const SLUG_RE = /^[a-z0-9]{2,32}$/

export const BAD_HOSTNAMES = new Set(['localhost', 'ridam.to', '127.0.0.1', '192.168.1.1', '10.0.0.1'])

// -- Data --

export interface LinkEntity {
  createdAt: Date
  slug: string
  link: string
}

// -- Storage --

export function useLinksStorage () {
  return useStorage<LinkEntity>('data:links')
}

export async function hasLinkEntity(slug: string) {
  return await useLinksStorage().getItem(slug)
}

export async function getLinkEntity(slug: string) {
  return await useLinksStorage().getItem(slug)
}

export async function createLinkEntity(entity: LinkEntity) {
  await useLinksStorage().setItem(entity.slug, entity)
  return entity
}

// -- Validate --

export function validateSlug(slug?: string) {
  return slug && SLUG_RE.test(slug)
}

export function validateURL(input?: string) {
  try {
     const url = new URL(input || '')
     if (!url.hostname || BAD_HOSTNAMES.has(url.hostname)) {
      return false
     }
     return true
  } catch {
    return false
  }
}

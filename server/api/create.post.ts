export default defineEventHandler(async (event) => {
  const { slug, link } = (await readBody(event) || {}) as { slug?: string, link?: string }

  if (!validateSlug(slug)) {
    throw createError({
      statusCode: 400,
      message: 'Invalid slug',
    })
  }

  if (!validateURL(link)) {
    throw createError({
      statusCode: 400,
      message: 'Invalid link',
    })
  }

  if (await hasLinkEntity(slug!)) {
    throw createError({
      statusCode: 400,
      message: 'Slug already exists',
    })
  }

  await createLinkEntity({
    createdAt: new Date(),
    slug: slug!.toLowerCase(),
    link: link!,
  })

  return {
    shortLink: new URL('/' + slug!, getRequestURL(event)).toString(),
  }
})


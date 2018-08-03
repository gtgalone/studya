import Router from 'next/router'

export const handleRouter = (
  href: string, as: string, e: any = null, prefetch: boolean = false
) => {
  if (e) e.preventDefault()
  return prefetch ? Router.prefetch(href).then(() => Router.push(href, as)) : Router.push(href, as)
}

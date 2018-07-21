import React from 'react'
import Link from 'next/link'

export default () => (
  <ul>
    <li><Link href='/b' as='/a'><a>a</a></Link></li>
    <li><Link href='/a' as='/b'><a>b</a></Link></li>
    <li>
      <Link
        href={{pathname: '/users', query: { id: '2' }}}
        as='/users/2'
      >
        <a>user #2</a>
      </Link>
    </li>
  </ul>
)

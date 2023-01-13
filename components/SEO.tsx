import Head from 'next/head'

interface Props {
  title: string
  description: string
  keyword: string[]
}

function SEO({title, description, keyword}: Props) {
  return (
    <Head>
      <meta name='description' content={description} />
      <meta name='keyword' content={keyword.join()} />
      <title>{title}</title>
    </Head>
  )
}

export default SEO
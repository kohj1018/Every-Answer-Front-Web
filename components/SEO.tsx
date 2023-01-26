import Head from 'next/head'

interface Props {
  title: string
  description?: string
  keyword?: string[]
}

function SEO({title, description = '대학생 전공 질문 플랫폼 에브리엔서입니다.', keyword = ['대학생', '전공', '질문', '답변', 'Q&A', '공부', '에브리', '플랫폼']}: Props) {
  return (
    <Head>
      <meta name='description' content={description} />
      <meta name='keyword' content={keyword.join()} />
      <title>{title}</title>
    </Head>
  )
}

export default SEO
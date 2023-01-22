import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="ko">
      <Head>
        <link
          rel="stylesheet"
          as="style"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.6/dist/web/static/pretendard.css"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto:wght@500&display=swap"
          rel="stylesheet"
        />
        <meta charSet="UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta property='og:title' content='에브리엔서' />
        <meta property='og:description' content='대학생 전공 질문답변 플랫폼 에브리엔서에서 전공 시험 준비하기' />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}

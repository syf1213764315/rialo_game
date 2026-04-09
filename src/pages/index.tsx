import Head from 'next/head'
import Home from './home'
export default function Index(props: {
  isMute: boolean,
  setIsMute: Function
}) {
  return (
    <>
      <Head>
        <title>RIALO</title>
        <meta name="description" content="RIALO| Best Crypto PvP Gambling Website" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Home isMute={props.isMute} setIsMute={props.setIsMute} />
    </>
  )
}

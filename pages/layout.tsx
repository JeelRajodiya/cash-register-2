import Head from 'next/head'
import { FC,ReactNode } from 'react'
interface child{
    children: ReactNode
}

export default function Layout({children}:child){
    return (
        <>
        <Head>
            <title>My App</title>
            <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        </Head>
        <main>
            
            {children}
        </main>
        </>
    )
}
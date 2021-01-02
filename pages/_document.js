import Document, {Html, Head, Main, NextScript} from 'next/document'

class MyDocument extends Document {
    static async getInitialProps(ctx) {
        const initialProps = await Document.getInitialProps(ctx)
        return {...initialProps}
    }

    render() {
        return (
            <Html>
                <Head>
                    {/*FontAwesome*/}
                    <script src="https://kit.fontawesome.com/aeb9fcb31a.js" crossOrigin="anonymous"/>

                    {/*Inter web font*/}
                    <link rel="stylesheet" href="https://rsms.me/inter/inter.css"/>
                </Head>
                <body>
                <Main/>
                <NextScript/>
                </body>
            </Html>
        )
    }
}

export default MyDocument
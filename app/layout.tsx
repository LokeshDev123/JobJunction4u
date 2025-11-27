import Script from 'next/script';
import './globals.css';


export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en">

      <title>Welcome To JobJunction4u</title>
      <body>
        <main>
     
          {children}
             <Script src={`https://www.google.com/recaptcha/api.js?render=${process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}`}></Script>
             <Script src="https://checkout.razorpay.com/v1/checkout.js"></Script>
             <Script disable-devtool-auto src='https://cdn.jsdelivr.net/npm/disable-devtool/disable-devtool.min.js'></Script>

        </main>
      </body>
    </html>
  );
}
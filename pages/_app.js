import Layout from '../components/Layout/Layout';
import '../styles/globals.scss';
import NextNProgress from 'nextjs-progressbar';

function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <NextNProgress color='white' options={{ easing: 'ease', speed: 500 }} />
      <Component {...pageProps} />;
    </Layout>
  );
}

export default MyApp;

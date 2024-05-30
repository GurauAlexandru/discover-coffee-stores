import Link from 'next/link';
import { useRouter } from 'next/router';

import coffeeStoresData from '../../data/coffee-stores.json';
import Head from 'next/head';

export function getStaticProps(staticProps) {
  const params = staticProps.params;

  return {
    props: {
      coffeStore: coffeeStoresData.find(
        (coffeStore) => coffeStore.id.toString() === params.id
      ),
    },
  };
}

export function getStaticPaths() {
  const paths = coffeeStoresData.map((coffeeStore) => ({
    params: { id: coffeeStore.id.toString() },
  }));

  return {
    paths,
    fallback: true,
  };
}

const CoffeeStore = (props) => {
  const router = useRouter();

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  const { address, name, neighbourhood } = props.coffeStore;

  return (
    <div>
      <Head>
        <title>{name}</title>
      </Head>
      <Link href='/'> go home</Link>
      <p>{address}</p>
      <p>{name}</p>
      <p>{neighbourhood}</p>
    </div>
  );
};

export default CoffeeStore;

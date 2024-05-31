import Link from 'next/link';
import { useRouter } from 'next/router';

import coffeeStoresData from '../../data/coffee-stores.json';
import Head from 'next/head';
import styles from '../../styles/coffee-store.module.css';
import Image from 'next/image';

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

  const { address, name, neighbourhood, imgUrl } = props.coffeStore;

  return (
    <div className={styles.layout}>
      <Head>
        <title>{name}</title>
      </Head>
      <div className={styles.container}>
        <div className={styles.col1}>
          <div className={styles.backToHomeLink}>
            <Link href='/'> go home</Link>
          </div>
          <div className={styles.nameWrapper}>
            <h1 className={styles.name}>{name}</h1>
          </div>
          <Image
            src={imgUrl}
            alt={name}
            width={600}
            height={360}
            className={styles.storeImg}
          />
        </div>
        <div className={styles.col2}>
          <p>{address}</p>
          <p>{neighbourhood}</p>
        </div>
      </div>
    </div>
  );
};

export default CoffeeStore;

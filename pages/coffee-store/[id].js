import Link from 'next/link';
import { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import cls from 'classnames';
import { isEmpty } from '../../utils/index.js';

import { fetchCoffeeStores } from '../../lib/coffee-stores';
import Head from 'next/head';
import styles from '../../styles/coffee-store.module.css';
import Image from 'next/image';
import { StoreContext } from '../../store/store-context.js';

export async function getStaticProps(staticProps) {
  const coffeeStores = await fetchCoffeeStores();

  const params = staticProps.params;
  const coffeeStoreFromContext = coffeeStores.find(
    (coffeStore) => coffeStore.id.toString() === params.id
  );
  return {
    props: {
      coffeeStore: coffeeStoreFromContext || {},
    },
  };
}

export async function getStaticPaths() {
  const coffeeStores = await fetchCoffeeStores();
  const paths = coffeeStores.map((coffeeStore) => ({
    params: { id: coffeeStore.id.toString() },
  }));

  return {
    paths,
    fallback: true,
  };
}

const CoffeeStore = (initialProps) => {
  const router = useRouter();

  const id = router.query.id;

  const [coffeeStore, setCoffeeStore] = useState(initialProps.coffeeStore);

  const {
    state: { coffeeStores },
  } = useContext(StoreContext);

  const handleCreateCoffeeStore = async (coffeeStore) => {
    try {
      const { id, name, voting, address, region, imgUrl } = coffeeStore;

      const response = await fetch('/api/createCoffeeStore', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id,
          name,
          voting: voting || 0,
          address: address || '',
          region: region || '',
          imgUrl,
        }),
      });

      const dbCoffeeStore = await response.json();

      console.log('dbCoffeeStore', { dbCoffeeStore });
    } catch (error) {
      console.error(`Error creating a coffee store: ${error}`);
    }
  };

  useEffect(() => {
    if (isEmpty(initialProps.coffeeStore)) {
      if (coffeeStores.length > 0) {
        const coffeeStoreFromContext = coffeeStores.find((coffeeStore) => {
          return coffeeStore.id.toString() === id; //dynamic id
        });
        if (coffeeStoreFromContext) {
          setCoffeeStore(coffeeStoreFromContext);
          handleCreateCoffeeStore(coffeeStoreFromContext);
        }
      }
    } else {
      //SSG
      setCoffeeStore(initialProps.coffeeStore);
      handleCreateCoffeeStore(initialProps.coffeeStore);
    }
  }, [id, initialProps.coffeeStore, initialProps, coffeeStores]);

  const { name, address, region, imgUrl } = coffeeStore;

  const handleUpVoteButton = () => {};

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.layout}>
      <Head>
        <title>{name}</title>
      </Head>
      <div className={styles.container}>
        <div className={styles.col1}>
          <div className={styles.backToHomeLink}>
            <Link href='/'>← go home</Link>
          </div>
          <div className={styles.nameWrapper}>
            <h1 className={styles.name}>{name}</h1>
          </div>
          <Image
            src={
              imgUrl ||
              'https://images.unsplash.com/photo-1504753793650-d4a2b783c15e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80'
            }
            alt={name || 'Coffee store'}
            width={600}
            height={360}
            className={styles.storeImg}
          />
        </div>
        <div className={cls('glass', styles.col2)}>
          {address && (
            <div className={styles.iconWrapper}>
              <Image
                src='/static/icons/places.svg'
                alt='icon'
                width='24'
                height='24'
              />
              <p className={styles.text}>{address}</p>
            </div>
          )}
          {region && (
            <div className={styles.iconWrapper}>
              <Image
                src='/static/icons/nearMe.svg'
                alt='icon'
                width='24'
                height='24'
              />
              <p className={styles.text}>{region}</p>
            </div>
          )}
          <div className={styles.iconWrapper}>
            <Image
              src='/static/icons/star.svg'
              alt='icon'
              width='24'
              height='24'
            />
            <p className={styles.text}>1</p>
          </div>

          <button className={styles.upvoteButton} onClick={handleUpVoteButton}>
            Upvote!
          </button>
        </div>
      </div>
    </div>
  );
};

export default CoffeeStore;

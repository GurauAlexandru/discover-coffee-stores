import Link from 'next/link';
import { useRouter } from 'next/router';
import cls from 'classnames';

import { fetchCoffeeStores } from '../../lib/coffee-stores';
import Head from 'next/head';
import styles from '../../styles/coffee-store.module.css';
import Image from 'next/image';

export async function getStaticProps(staticProps) {
  const coffeeStores = await fetchCoffeeStores();

  const params = staticProps.params;

  return {
    props: {
      coffeeStore: coffeeStores.find(
        (coffeStore) => coffeStore.id.toString() === params.id
      ),
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

const CoffeeStore = (props) => {
  const router = useRouter();

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  const { address, region, name, imgUrl } = props.coffeeStore;

  const functionUpvoteButton = () => console.log('Upvoted!');

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
            alt={name}
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

          <button
            className={styles.upvoteButton}
            onClick={functionUpvoteButton}>
            Upvote!
          </button>
        </div>
      </div>
    </div>
  );
};

export default CoffeeStore;

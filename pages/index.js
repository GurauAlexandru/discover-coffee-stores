import Head from 'next/head';
import styles from '../styles/Home.module.css';
import Banner from '../components/banner';
import Image from 'next/image';
import Card from '../components/card';
import CoffeeStores from '../data/coffee-stores.json';

export default function Home() {
  const handleOnBannerBtnClick = () => {
    console.log('Banner button clicked!');
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Coffee Connoisseur</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main className={styles.main}>
        <Banner
          buttonText='View stores nearby'
          handleOnClick={handleOnBannerBtnClick}
        />
        <div className={styles.heroImage}>
          <Image
            src='/static/hero-image.png'
            alt='hero image'
            width={700}
            height={400}
            priority
          />
          <div className={styles.cardLayout}>
            {CoffeeStores.map((coffeeStore) => (
              <Card
                key={coffeeStore.id}
                className={styles.card}
                name={coffeeStore.name}
                imgUrl={coffeeStore.imgUrl}
                href={`/coffee-store/${coffeeStore.id}`}
                alt={coffeeStore.name}
              />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

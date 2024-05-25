import Link from 'next/link';
import { useRouter } from 'next/router';

import coffeeStoresData from '../../data/coffee-stores.json';

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
  // const paths = coffeeStoresData.map((coffeeStore) => ({
  //   params: { id: coffeeStore.id.toString() },
  // }));

  return {
    paths: [
      { params: { id: '0' } },
      { params: { id: '1' } },
      { params: { id: '300' } },
    ],
    fallback: false,
  };
}

const CoffeeStore = (props) => {
  const router = useRouter();

  return (
    <div>
      Coffee Store Page {router.query.id} <Link href='/'> Go back</Link>
      <Link href='/coffee-store/dynamic'>Go to dynamic</Link>
      <br />
      <Link href='/'> go home</Link>
      <p>{props.coffeStore.address}</p>
      <p>{props.coffeStore.name}</p>
    </div>
  );
};

export default CoffeeStore;

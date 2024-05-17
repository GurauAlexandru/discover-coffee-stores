import Link from 'next/link';
import { useRouter } from 'next/router';

const CoffeeStore = () => {
  const router = useRouter();

  return (
    <div>
      Coffee Store Page {router.query.id} <Link href='/'> Go back</Link>
      <Link href='/coffee-store/dynamic'>Go to dynamic</Link>
      <br />
      <Link href='/'> go home</Link>
    </div>
  );
};

export default CoffeeStore;

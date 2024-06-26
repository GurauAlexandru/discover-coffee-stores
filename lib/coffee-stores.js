import { createApi } from 'unsplash-js';

const unsplash = createApi({
  accessKey: process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY,
});

const getUrlForCoffeeStores = (latLong, query, limit) =>
  `https://api.foursquare.com/v3/places/search?query=${query}&ll=${latLong}&limit=${limit}`;

const getListOfCoffeeStorePhotos = async () => {
  const photos = await unsplash.search.getPhotos({
    query: 'coffee shop',
    perPage: 30,
    page: 1,
  });

  const unsplashResults = photos.response.results;

  return unsplashResults.map((result) => result.urls['small']);
};

export const fetchCoffeeStores = async (
  latLong = '52.22028244195584%2C6.891680714853414',
  limit = 6
) => {
  const photos = await getListOfCoffeeStorePhotos();

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: process.env.NEXT_PUBLIC_FOURSQUARE_API_KEY,
    },
  };

  const response = await fetch(
    getUrlForCoffeeStores(latLong, 'coffee stores', limit),
    options
  );
  const data = await response.json();

  return data.results.map((result, idx) => {
    return {
      id: result.fsq_id,
      address: result.location.address,
      region: result.location.region,
      name: result.name,
      imgUrl: photos.length > 0 ? photos[idx] : null,
    };
  });

  // .catch((err) => console.error(err));
};

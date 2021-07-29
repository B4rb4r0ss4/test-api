import axios from 'axios';

const getCollections = async () => {
  try {
    const data = await axios.get(`/collections/${localStorage.apiKey}`);
    return data.data;
  } catch (e) {
    console.log(e);
    return [];
  }
};

export { getCollections };

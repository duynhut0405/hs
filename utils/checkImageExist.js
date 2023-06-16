import api from '../services/api'

const pushToS3 = async (src) => {
  try {
    const result = await api.post('/service/s3/push', {
      "expectedLink": src
    })
    return '/images/hoasen-product.jpg'
  } catch (error) {
    console.log(error)
  }

}
async function checkImageExist(e) {
  let data = e.target.src;
  e.target.src = '/images/hoasen-product.jpg';
  e.target.onerror = null;
}

export default checkImageExist


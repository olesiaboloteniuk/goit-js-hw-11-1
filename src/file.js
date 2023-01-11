import axios from "axios";
export async function searchingImg(inputValue, firstPage,limit) {
	let encoded = encodeURIComponent(inputValue);
	try {
		const respons = await axios.get(`https://pixabay.com/api/?key=32613226-5025aa437370c97b31d288587&q=${encoded}&image_type=photo&page=${firstPage}&per_page=${limit}`)
	  return respons.data;
	} catch (error) {
		console.log(error);
	}
}
import { useState } from 'react'
import { message} from 'antd';
import axios from 'axios';

const useFetchData = (keyword) => {
    const [data, setData] = useState({})

    async function handleSearch() {
        if (keyword.trim() === '') {
            message.warning('Please enter some keyword to search.');
            return false;
        }

        const infor = await axios.get(`https://api.github.com/users/${keyword}`)
        setData(infor.data) 
        // localStorage.setItem('users', JSON.stringify(infor.data));
    }

    // console.log(data);
  return [handleSearch, data]
}

export default useFetchData
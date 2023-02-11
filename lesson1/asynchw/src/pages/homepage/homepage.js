import React, { useState } from 'react'
import { Input, Avatar} from 'antd';
import useFetchData from './useFetchData';


const Homepage = () => {
    const [keyword, setKeyword] = useState('')
    const [handleSearch, user] = useFetchData(keyword)
    

    const handleInputChange = (e) => {
        setKeyword(e.target.value)
    }

    console.log(user);
  return (

    <div className="container mx-auto pt-8 w-100 h-100 flex flex-col items-center">
        <div className="px-4 py-8 shadow-lg rounded flex items-center bg-white" 
            style={{ width: 600}}
         >
            <Input.Search 
                placeholder="Search by username" 
                value={keyword}
                style={{'width': '300px', 'marginTop': '10%'}}
                onChange={handleInputChange}
                onSearch={handleSearch}
                enterButton />
        </div>

        <div className="mt-4 px-4 py-8 shadow-lg rounded overflow-y-auto scroll bg-white"
                style={{ width: 600, height: 'calc(100vh - 170px)' }}
            > 
            <ul>
                <li>Name: {user.name}</li>
                <li>Avatar: <Avatar src={user.avatar_url} size={48} /></li>
                <li>Email: {user.email}</li>
                <li>Company: {user.company}</li>
                <li>Followers: {user.followers}</li>
            </ul>
            </div>
        
    </div>
  )
}

export default Homepage
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import axios from 'axios'

const Member = () => {
    
    const [member,setMember] = useState()

    const [result, setResult] = useState('')
    
    useEffect(() => {
        axios.get(`http://localhost:5000/member`)
        .then((res) => {
            const member = res.data
            setMember(member)
        },[])
        .catch(err =>{
            console.log(err);
        })
    })
    console.log(member);

    const deleteAll = () => {
        const result = 'Empty List'
        setResult(result)
    }

  return (
    <SMember>
        <h2>Members</h2>
        {
            result === ''?
            <div className='memberList'>
            {
                member === undefined ?<div>Empty List</div> : member.map((item,index) => {
                        return(
                            <div className='member' key={index}>
                            <img src={item.avt} alt='' style={{'width':'120px', 'height': '120px', 'borderRadius': '50%'}}/>
                            <h4>{item.name}</h4>
                            <p>{item.age}</p>
                            <p>{item.year}</p>
                            <p>{item.address}</p>
                        </div>
                        )
                    })
                }
            </div>

            : <div>{result}</div>
        }
        
        <button 
            onClick={deleteAll}
        >Delete all</button>
    </SMember>
  )
}

export default Member


const SMember = styled.div`

    h2{
        position: absolute;
        top: 2%;
        left: 45%;
    }
    .memberList{
        display: flex;
        gap: 3rem;
        width: 100%;
        .member{
        background-color: #404040;
        padding: 30px;
        border: 1px solid #404040;
        box-shadow: rgba(0, 0, 0, 0.17) 0px -23px 25px 0px inset, rgba(0, 0, 0, 0.15) 0px -36px 30px 0px inset, rgba(0, 0, 0, 0.1) 0px -79px 40px 0px inset, rgba(0, 0, 0, 0.06) 0px 2px 1px, rgba(0, 0, 0, 0.09) 0px 4px 2px, rgba(0, 0, 0, 0.09) 0px 8px 4px, rgba(0, 0, 0, 0.09) 0px 16px 8px, rgba(0, 0, 0, 0.09) 0px 32px 16px;;
        border-radius: 30px;
        display: flex;
        flex-direction: column;
        align-items: center;
        
        h4{
            font-size: 22px;

        }
        p{
            font-size: 20px;
            margin-top: -10%;
        }
    }
    }
    
    button{
        position: absolute;
        top: 85%;
        left: 46%;
        padding: 20px 30px;
        font-size: 20px;
        border-radius: 20px;
        background-color: #FF0000;
        color: white;
        border: 0;
        box-shadow: rgba(0, 0, 0, 0.17) 0px -23px 25px 0px inset, rgba(0, 0, 0, 0.15) 0px -36px 30px 0px inset, rgba(0, 0, 0, 0.1) 0px -79px 40px 0px inset, rgba(0, 0, 0, 0.06) 0px 2px 1px, rgba(0, 0, 0, 0.09) 0px 4px 2px, rgba(0, 0, 0, 0.09) 0px 8px 4px, rgba(0, 0, 0, 0.09) 0px 16px 8px, rgba(0, 0, 0, 0.09) 0px 32px 16px;;
    }
    button:hover{
        transform: scale(1.1);
        transition: 0;
    }
    
`;
import React,{useState,useEffect} from 'react'
import axiosInstance from '../axios'

function WorkerProf() {
    const[workers,setWorker]  = useState([])
    const[free,setFree] = useState([]) 
    useEffect(()=>{
       const data = async()=>await axiosInstance.get(`api/getprojworkers/${localStorage.getItem('wid')}`)
       .then(res=>{
           console.log(res.data)
           setWorker(res.data.workers)
           setFree(res.data.free)
       }) 
       .catch(e=>console.log(e))
       data()
    },[])

    function addtolist(id){
        const add = async()=>await axiosInstance.post('api/assignworker',{
            data:{
                cid:localStorage.getItem("wid"),
                wid:id
            }
        })
        .then(res=>{
            window.location.reload()
        })
        .catch(e=>console.log(e))
        add()
    }
    function delworker(id){
        const del = async()=>await axiosInstance.delete(`api/assignworker/${id}`)
        .then(res=>{
            window.location.reload()
        })
        .catch(e=>console.log(e))
        del()
    }

  return (
    <div>
    </div>
  )
}

export default WorkerProf
// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import { Button } from '../component/ui/Button'
import { Card, type CardProps } from '../component/ui/Card'
import { PlusIcon } from '../icons/PlusIcon'
import { ShareIcon } from '../icons/ShareIcon'
import { CreateContentModal } from '../component/ui/CreateContentModal'
import { useState } from 'react'
import { Sidebar } from '../component/ui/Sidebar'
import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { GetContent } from '../api/user.api'



interface ContentItem {
  _id: string;
  title: string;
  description?: string;
  image?: string;
  link: string;
  type: string;
  tags: string;
  userId: {
    _id: string;
    name: string;
  };
  __v: number;
}
interface ApiResponse {
  content: ContentItem[];
}

export function Dashboard() {
  // const [count, setCount] = useState(0)
    const [modelOpen , setModalOpen] = useState(false);
    const token = localStorage.getItem('token');

    const {data } = useQuery<ApiResponse>({
      queryKey:["content"],
      queryFn: async()=> await GetContent(token as string),
      placeholderData:keepPreviousData,
      staleTime:10000,
      enabled:!!token 
    })
    
  return (
      <div>

        <Sidebar/>
        <div className='p-4 ml-72 min-h-screen bg-gray-100 border-gray-300 border-2 '>
          <CreateContentModal onclose={()=>setModalOpen(false)} open={modelOpen}/>          

          <div className='flex justify-between items-center mx-10'>
          <div className='text-2xl font-bold font-roboto'>All Notes</div>
          <div className="flex justify-end gap-4">

            <Button startIcon={<ShareIcon size="md"/>} size="sm" variant="primary" text="Share Brain"/>
            <Button  startIcon={<PlusIcon size="lg"/>} onClick={()=>{setModalOpen(true)}} size="md" variant="secondary" text="Add Content"/>
          </div>
          </div>
          {/* <Button  size="lg" variant="secondary" text="Add Content"/> */}
          <div className='grid grid-cols-3 gap-1.5 mt-7'>

            {data?.content?.map((item:ContentItem)=>{
              const {_id, type , link, title,description,image}:CardProps = item;
              
              return (
                <Card 
                  _id={_id}
                  type={type} 
                  link={link} 
                  title={title} 
                  description={description}
                  image={image}
                />
              );  
            })}
            {/* <Card type="twitter" link="https://x.com/kirat_tw/status/1929805164963061811" title="GAME Over"/>
            <Card type="youtube" link="https://www.youtube.com/watch?v=aamk2isgLRk&t=28370s" title="GAME Start"/>
            <Card type="youtube" link="https://www.youtube.com/watch?v=aamk2isgLRk&t=28370s" title="GAME Start"/>
            <Card type="youtube" link="https://www.youtube.com/watch?v=aamk2isgLRk&t=28370s" title="GAME Start"/>
            <Card type="youtube" link="https://www.youtube.com/watch?v=aamk2isgLRk&t=28370s" title="GAME Start"/>
            <Card type="youtube" link="https://www.youtube.com/watch?v=aamk2isgLRk&t=28370s" title="GAME Start"/> */}
          </div>
        </div>
      </div>
  )
}

export default Dashboard

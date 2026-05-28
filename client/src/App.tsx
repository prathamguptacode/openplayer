import './App.css'
import SidebarDemo from './components/sidebar-demo'
import { MyPlayer } from "./components/Player";
import SubsButton from "./components/shadcn-space/button/button-01"
import Cards from './Cards/Cards';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import styles from './Cards/cards.module.css'

type serverData = {
  videos: { title: string, view: string, duration: string, id: string }[]
}

function App() {

  const [current, setCurrent] = useState({
    id: 'netflix',
    title: 'So can you explain me the architecture of NETFLIX hahahaha? (AI Bullshit people throwing slop at you and you know it its wrong) REACTION VIDEO'
  });
  const { data, isLoading } = useQuery({
    queryKey: ['data', 'video'],
    queryFn: () => axios.get<serverData>('http://localhost:3001/list')
  })

  if (isLoading) {
    return (<div>
      <SidebarDemo>
        <div className="flex h-full w-full flex-1 flex-col gap-2 rounded-tl-2xl border border-neutral-200 bg-white p-2 md:p-10 dark:border-neutral-700 dark:bg-neutral-900">
          <div className="flex gap-2">
            {[...new Array(4)].map((i, idx) => (
              <div
                key={"first-array-demo-1" + idx + i}
                className="h-20 w-full animate-pulse rounded-lg bg-gray-100 dark:bg-neutral-800"
              ></div>
            ))}
          </div>
          <div className="flex flex-1 gap-2">
            {[...new Array(2)].map((i, idx) => (
              <div
                key={"second-array-demo-1" + idx+i}
                className="h-full w-full animate-pulse rounded-lg bg-gray-100 dark:bg-neutral-800"
              ></div>
            ))}
          </div>
        </div>
      </SidebarDemo>
    </div>)
  }


  return (

    <div className='overflow-auto'>
      <SidebarDemo><div className="flex h-full overflow-auto w-full flex-1 flex-col gap-2 rounded-tl-2xl border border-neutral-200 bg-white p-2 md:p-6 dark:border-neutral-700 dark:bg-neutral-900 ">
        <div className='flex justify-between gap-8 '>
          <div className="flex-4">
            <div>
              <MyPlayer src={`http://localhost:3001/video/${current.id}`} />
            </div>
            <div className="py-5 flex flex-col gap-4">
              <div className="font-medium text-xl">
                {
                  current.title
                }
              </div>
              <div className="flex justify-between">
                <div className="flex gap-1">
                  <div className="flex gap-2 items-center">
                    <div>
                      <img src="./netflix.webp" width="50px" alt="channel image" className="rounded-full object-cover h-12.5" />
                    </div>
                    <div >
                      <div className="font-medium text-lg">
                        Code with Pratham
                      </div>
                      <div className="text-sm">
                        51.23M subscribers
                      </div>
                    </div>

                  </div>
                </div>
                <div className="px-2">
                  <SubsButton />
                </div>
              </div>
              <div className='p-3 px-4 bg-gray-300 rounded-2xl'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nisi molestiae rerum delectus atque quasi. Velit architecto expedita a alias, commodi id ducimus dignissimos ab vitae maiores modi odio, ad quasi repellendus beatae nesciunt consectetur, doloribus provident iusto earum illo quod amet similique non. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Unde enim in explicabo aspernatur, porro cumque ad maiores officiis quisquam amet animi sequi blanditiis eius accusamus! Ratione neque fugiat totam labore!lorem
              </div>
            </div>
          </div>
          <div className='hidden flex-0.5 max-w-[360px] lg:block'>
            <div className={styles.cards}>
              {
                data?.data.videos.map(e => {
                  return <Cards id={e.id} title={e.title} duration={e.duration} views={e.view} key={e.id} setCurrent={setCurrent} />
                })
              }
            </div>
          </div>
        </div>
      </div></SidebarDemo>
    </div>
  )
}

export default App

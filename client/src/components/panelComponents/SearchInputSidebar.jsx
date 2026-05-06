import React from 'react'
import { HiOutlineSearch } from 'react-icons/hi'
import { useAppContext } from '../../context/AppContext'

const SearchInputSidebar = () => {
    const { searchValue, setSearchValue } = useAppContext();
  return (
    <>
    <aside className="sm:fixed left-0 lg:left-70 top-15 flex flex-col sm:w-60 lg:w-70 h-fit sm:h-[calc(100vh-3.75rem)] sm:border-r border-neutral-500 bg-neutral-900 p-5">
          <div className="flex items-center h-10 w-fit rounded-lg border border-neutral-500 bg-neutral-700 overflow-hidden">
            <input
              type="text"
              placeholder="Buscar producto"
              value={searchValue}
              onChange={(e)=>setSearchValue(e.target.value)}
              className="text-base sm:text-sm lg:text-base flex h-full w-full px-4 text-neutral-100 outline-none placeholder:text-neutral-400"
            />
            <button className="flex bg-neutral-800 h-full w-15 items-center justify-center cursor-pointer">
              <HiOutlineSearch className="size-5 flex-shrink-0 text-neutral-300 " />
            </button>
          </div>
        </aside>
    </>
  )
}

export default SearchInputSidebar
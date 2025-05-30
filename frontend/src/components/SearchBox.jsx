import { useSearchParams } from "react-router-dom"
import { CiSearch } from "react-icons/ci"
import LogoutButton from "./Logout"

export default function SearchBar({ searchTerm, setSearchTerm }) {
    const [ setSearchParams] = useSearchParams()

    const handleSearchChange = (e) => {
        const value = e.target.value
        setSearchTerm(value)
        setSearchParams({ search: value })

    }

    return (
        <div className="relative">
            <div className="absolute  top-1 right-11/12">
                <LogoutButton />

            </div>
            <div className="absolute right-5 top-4 text-gray-500">
                <CiSearch size={20} />
            </div>
            <input
                type="text"
                value={searchTerm}
                onChange={handleSearchChange}
                placeholder="جستجوی کالا"
                className="w-full border border-gray-200 outline-gray-300 rounded-xl py-4 pr-12"
            />
        </div> 
    )
}

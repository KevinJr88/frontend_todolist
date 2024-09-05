
export const SearchComponent = ({ search, onDissmiss }) => {

    const handleSearch = (event) => {
        onDissmiss(event.target.value);
    }

    return (
        <>
            <div className="relative mt-7 w-[70%]">
                <input
                    type="text"
                    className="w-full px-3 p-2 pr-10 border-[2px] border-[#7c3aed] rounded-md"
                    placeholder="Search task..."
                    onChange={handleSearch}
                    value={search}
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                    </svg>
                </div>
            </div>
        </>
    );


}
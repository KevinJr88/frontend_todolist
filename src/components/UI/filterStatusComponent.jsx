
export const FilterStatusComponent = ({filtered, onDissmiss }) => {
    const filter = ["All", "Completed", "Uncompleted"];

    const handleFilterChange = (event) => {
        onDissmiss(event.target.value);
    };

    return (
        <>
            <select
                id="year"
                name="year"
                className="px-4 w-[24%] h-[45px] font-semibold text-white bg-[#7c3aed] mt-7 py-2 border rounded-md"
                onChange={handleFilterChange}
                value={filtered}
            >
                {filter.map((filters) => (
                    <option key={filters} className="bg-white text-black font-semibold" value={filters}>{filters}</option>
                ))}
            </select>
        </>
    );


}
export const allRooms = async (searchTerm) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/rooms?search=${searchTerm}`);
    const rooms = await res.json();
    return rooms;
}

export const featuredRooms = async () =>{
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/featured`);
    const rooms = await res.json();
    return rooms;
}

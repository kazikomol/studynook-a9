export const allRooms = async () =>{
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/rooms`);
    const rooms = await res.json();
    return rooms;
}

export const featuredRooms = async () =>{
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/featured`);
    const rooms = await res.json();
    return rooms;
}

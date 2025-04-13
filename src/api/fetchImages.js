export const fetchImages = async ({ queryKey }) => {
    const [, count] = queryKey;
    const page = Math.floor(Math.random() * 10) + 1;
    const res = await fetch(`https://picsum.photos/v2/list?page=${page}&limit=${count}`);
    return await res.json();
};
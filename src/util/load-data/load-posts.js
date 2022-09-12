export const loadPosts = async () =>{
    const responsePosts = fetch('https://jsonplaceholder.typicode.com/posts');
    const photoResponse = fetch('https://jsonplaceholder.typicode.com/photos');
    const [posts, photos] = await Promise.all([responsePosts, photoResponse]);
    const postsJson = await posts.json();
    const photosJson = await photos.json();
    const photosAndPosts = postsJson.map((post, index) => {
      return {...post, cover: photosJson[index].url}
    });
    return photosAndPosts;
}


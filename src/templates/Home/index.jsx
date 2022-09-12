
import './styles.css';


import { loadPosts } from '../../util/load-data/load-posts';
import { Post } from '../../components/Post';
import { BtnLoad } from '../../components/Button';
import { TextInput } from '../../components/TextInput';
import { useState } from 'react';
import { useEffect } from 'react';
import { useCallback } from 'react';

export const Home = () =>{

  const [post, setPost] = useState([]);
  const [allPosts, setAllPosts] = useState([]);
  const [page, setPage] = useState(0);
  const [postPerPage] = useState(10);
  const [searchValue, setSearchValue] = useState('');

  const noMorePosts = page + postPerPage >= allPosts.length;

  const filteredPosts = searchValue ?
      allPosts.filter(p => {
        return p.title.toLowerCase().includes(searchValue.toLowerCase());
      })  
      : post;

  const loadMorePosts = () => {
    
    const nextPage = page + postPerPage;
    const nextPosts = allPosts.slice(nextPage, nextPage + postPerPage);
    post.push(...nextPosts);
    setPost(post);
    setPage(nextPage);
  }
    
  const handleLoadPost = useCallback(async (page, postPerPage) =>{
    
    const photosAndPosts = await loadPosts();
    setPost(photosAndPosts.slice(page,postPerPage));
    setAllPosts(photosAndPosts);
  }, []);

  useEffect(() => {
    handleLoadPost(0, postPerPage);
  }, [handleLoadPost, postPerPage]);
    
  const handleChange = (e) =>{
    const { value } = e.target;
    setSearchValue(value);
  }


  return (
    <section className='container'>
      <div className="search-container">
        {searchValue && (

          <h1>Search value : {searchValue}</h1>
          
        )}
        <TextInput handleChange={handleChange}/>
      </div>
      
      {filteredPosts.length === 0 && (
        <h1>Não existem posts</h1>
        )}
      <Post data={filteredPosts}/>
      <div className="btn-container">
        {!searchValue && (
          <BtnLoad
          clique={loadMorePosts}
          text='Load Posts'
          disabled={noMorePosts}
          />
        )}
        
      </div>
      
    </section>
  );
}
//export default Home;

// class Home extends Component{

//     state = {
//       post: [],
//       allPosts: [],
//       page: 0,
//       postPerPage: 10,
//       searchValue: ''
//     };

//   componentDidMount(){
//     this.loadPost();
//   }
 
//   loadMorePosts = () => {
//     const {
//       page,
//       postPerPage,
//       post,
//       allPosts
//     } = this.state;

//     const nextPage = page + postPerPage;
//     const nextPosts = allPosts.slice(nextPage, nextPage + postPerPage);
//     post.push(...nextPosts);
//     this.setState({ post, page: nextPage });
//   }

//   loadPost = async () =>{
//     const { page, postPerPage } = this.state;
//     const photosAndPosts = await loadPosts();
//     this.setState({post: photosAndPosts.slice(page,postPerPage), allPosts: photosAndPosts});
//   }

//   handleChange = (e) =>{
//     const { value } = e.target;
//     this.setState({ searchValue: value });
//   }

//   render(){
//     const { post, page, postPerPage, allPosts, searchValue } = this.state;
//     const noMorePosts = page + postPerPage >= allPosts.length;

//     const filteredPosts = searchValue ?
//     allPosts.filter(p => {
//       return p.title.toLowerCase().includes(searchValue.toLowerCase());
//     })  
//     : post;

//     return (
//       <section className='container'>
//        <div className="search-container">
//           {searchValue && (

//             <h1>Search value : {searchValue}</h1>
            
//           )}
//           <TextInput handleChange={this.handleChange}/>
//        </div>
        
//         {filteredPosts.length === 0 && (
//           <h1>Não existem posts</h1>
//          )}
//         <Post data={filteredPosts}/>
//         <div className="btn-container">
//           {!searchValue && (
//             <BtnLoad
//             clique={this.loadMorePosts}
//             text='Load Posts'
//             disabled={noMorePosts}
//             />
//           )}
          
//         </div>
        
//       </section>
//     );
//   }
// }

// export default Home;


import './styles.css';
import { Component } from 'react';

import { loadPosts } from '../../util/load-data/load-posts';
import { Post } from '../../components/Post';
import { BtnLoad } from '../../components/Button';
import { TextInput } from '../../components/TextInput';

class Home extends Component{

    state = {
      post: [],
      allPosts: [],
      page: 0,
      postPerPage: 2,
      searchValue: ''
    };

  componentDidMount(){
    this.loadPost();
  }
 
  loadMorePosts = () => {
    const {
      page,
      postPerPage,
      post,
      allPosts
    } = this.state;

    const nextPage = page + postPerPage;
    const nextPosts = allPosts.slice(nextPage, nextPage + postPerPage);
    post.push(...nextPosts);
    this.setState({ post, page: nextPage });
  }

  loadPost = async () =>{
    const { page, postPerPage } = this.state;
    const photosAndPosts = await loadPosts();
    this.setState({post: photosAndPosts.slice(page,postPerPage), allPosts: photosAndPosts});
  }

  handleChange = (e) =>{
    const { value } = e.target;
    this.setState({ searchValue: value });
  }

  render(){
    const { post, page, postPerPage, allPosts, searchValue } = this.state;
    const noMorePosts = page + postPerPage >= allPosts.length;

    const filteredPosts = searchValue ?
    allPosts.filter(p => {
      return p.title.toLowerCase().includes(searchValue.toLowerCase());
    })  
    : post;

    return (
      <section className='container'>
       <div className="search-container">
          {searchValue && (

            <h1>Search value : {searchValue}</h1>
            
          )}
          <TextInput handleChange={this.handleChange}/>
       </div>
        
        {filteredPosts.length === 0 && (
          <h1>Não existem posts</h1>
         )}
        <Post data={filteredPosts}/>
        <div className="btn-container">
          {!searchValue && (
            <BtnLoad
            clique={this.loadMorePosts}
            text='Load Posts'
            disabled={noMorePosts}
            />
          )}
          
        </div>
        
      </section>
    );
  }
}

export default Home;

import {PostCard} from '../PostCard';
import './styles.css';
export const Post = (props) =>(
  <div className="posts">
        {props.data.map(post =>(
          <PostCard 
            data={post}
            key={post.id}
          />
        ))}
      </div>
);
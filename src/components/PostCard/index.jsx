import './styles.css';


export const PostCard = ({data}) => (
    <div className='post'>
        <img alt='putz' src={data.cover}/>
        <div  className='post-content'>
            <h1>{data.title} {data.id}</h1>
            <p>{data.body}</p>
        </div>
    </div>
);

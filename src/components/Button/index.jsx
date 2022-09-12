import './styles.css';

export const BtnLoad = (props) =>(
    <button
        disabled={props.disabled}
        className='btn'
        onClick={props.clique}>{props.text}
    </button>
);


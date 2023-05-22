const Btn = ({ btn,type , text ,handleClick }) => (
    <button className={`btn btn-${type} text-${text}`} onClick={handleClick}>
        {btn}
    </button>
);

export default Btn;

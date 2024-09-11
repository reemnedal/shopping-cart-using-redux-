
import { useSelector, useDispatch } from 'react-redux';

function Test() {


    const count = useSelector((state) => state.counter.value);
    const dispatch = useDispatch();
  
    return (<>
    
    <h1>{count}</h1>
    
    </>  );
}

export default Test;
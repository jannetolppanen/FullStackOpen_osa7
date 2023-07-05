import { useSelector, useDispatch } from 'react-redux'
import { increment as incrementLeft, decrement as decrementLeft } from '../reducers/LeftCounterSlice'
import { increment as incrementRight, decrement as decrementRight } from '../reducers/RightCounterSlice'



const Reduxtest = () => {
  const style = {
    border: '1px solid black',
    backgroundColor: 'lightgreen',
    padding: '10px',
    borderRadius: "5px",
    display: "inline-block",
    textAlign: "center",
    fontFamily: "Courier New, monospace"
  }

  const leftCounter = useSelector((state) => state.leftCounter.value)
  const rightCounter = useSelector((state) => state.rightCounter.value)
  const dispatch = useDispatch()



  return (
    <>
      <div style={style}>
        {leftCounter}
        <br />
        <button onClick={() =>dispatch(incrementLeft())}>+</button>
        <button onClick={() =>dispatch(decrementLeft())}>-</button>
      </div>
      <div style={style}>
        {rightCounter}
        <br />
        <button onClick={() =>dispatch(incrementRight())}>+</button>
        <button onClick={() =>dispatch(decrementRight())}>-</button>
      </div>
    </>
  )
}

export default Reduxtest

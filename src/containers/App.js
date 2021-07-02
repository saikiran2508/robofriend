import React,{ useState,useEffect } from 'react';
import Cardlist from '../components/cardlist';
import Searchbox from '../components/searchbox';
import Scroll from '../components/scroll'
import 'tachyons';
import './App.css'
import ErrorBoundry from '../components/ErrorBoundry';

function App() {
    
    const [robots , setRobots] = useState([])
    const [searchfield, setSearchfield] = useState('')
    const [count,setCount] = useState(0)

    useEffect(()=>{
        fetch('https://jsonplaceholder.typicode.com/users')
        .then(responce=>responce.json())
        .then(users=>{setRobots(users)});
        console.log(count)
    },[count])

    const onserachchange = (event) => {
        setSearchfield(event.target.value)
    }
    
    const filteredrobots = robots.filter(robot=>{
        return robot.name.toLowerCase().includes(searchfield.toLowerCase());
    })

    if(!robots.length){
        return <h1 className='f2 tc'>LOADING</h1>;
    }
    else{
        return(
            <div className = 'tc'>
                <h1 className='f1'>RoboFriend</h1>
                <button onClick={()=>setCount(count+1)}>Click Me</button>
                <Searchbox searchchange={onserachchange}/>
                <Scroll>
                    <ErrorBoundry>
                        <Cardlist robots={filteredrobots}/>
                    </ErrorBoundry>
                </Scroll>
            </div>
        );
    } 
}
export default App;
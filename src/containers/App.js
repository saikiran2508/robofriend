import React from 'react';
import Cardlist from '../components/cardlist';
import Searchbox from '../components/searchbox';
import Scroll from '../components/scroll'
import 'tachyons';
import './App.css'

class App extends React.Component{
    constructor(){
        super();
        this.state ={
            robots:[],
            searchfield:''
        }
    }

    componentDidMount(){
        fetch('https://jsonplaceholder.typicode.com/users')
        .then(responce=>responce.json())
        .then(users=>{this.setState({robots:users})});
    }

    onserachchange = (event) => {
        this.setState({searchfield:event.target.value})
    }
    
    render() {
        const {robots,searchfield} = this.state;
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
                    <Searchbox searchchange={this.onserachchange}/>
                    <Scroll>
                        <Cardlist robots={filteredrobots}/>
                    </Scroll>
                </div>
            );
        }
    }   
}
export default App;
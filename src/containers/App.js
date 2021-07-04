import React from 'react';
import { connect } from 'react-redux';
import Cardlist from '../components/cardlist';
import Searchbox from '../components/searchbox';
import Scroll from '../components/scroll'
import 'tachyons';
import './App.css'
import { requestRobots, setSearchField } from '../actions.js';

const mapStateToProps = state =>{
    return {
        searchField:state.searchRobots.searchField,
        robots:state.requestRobots.robots,
        isPending:state.requestRobots.isPending,
        error:state.requestRobots.error
    }
}

const mapDispatchToProps = (dispatch) =>{
    return{
         onSearchChange:(event)=>dispatch(setSearchField(event.target.value)),
         onRequestRobots:()=>requestRobots(dispatch)
    }  
}

class App extends React.Component{

    componentDidMount(){
        this.props.onRequestRobots();
    }
    
    render() {
        const { searchField,onSearchChange,robots,isPending } = this.props;
        const filteredrobots = robots.filter(robot=>{
            return robot.name.toLowerCase().includes(searchField.toLowerCase());
        })
        if(isPending){
            return <h1 className='f2 tc'>LOADING</h1>;
        }
        else{
            return(
                <div className = 'tc'>
                    <h1 className='f1'>RoboFriend</h1>
                    <Searchbox searchchange={onSearchChange}/>
                    <Scroll>
                        <Cardlist robots={filteredrobots}/>
                    </Scroll>
                </div>
            );
        }
    }   
}
export default connect(mapStateToProps,mapDispatchToProps)(App);
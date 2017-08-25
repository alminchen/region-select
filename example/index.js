import 'antd/dist/antd.css';
import RegionSelect from '@bizfe/region-select';
import ReactDom from 'react-dom';

class App extends React.Component {
	constructor(props) {
        super(props);
        this.state = {
            checkedCities: ['1201']
        };
    }
	handleChange = (value) => {
		this.setState({
			checkedCities: value
		});
	};
	render() {
		const {checkedCities} = this.state;
		return (
			<div>
				<RegionSelect value={checkedCities} onChange={this.handleChange}/>
				<label style={{color:"#f79992",fontWeight:"bold"}}>checkedCities:  </label>{checkedCities.join()}
			</div>
		);
	}
}

ReactDom.render(
	<App/>,
    document.getElementById('app')
);

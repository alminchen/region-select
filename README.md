# region-select
基于ant-design的区域选择组件
## Demo

[https://zhaiyb.github.io/region-select/](https://zhaiyb.github.io/region-select/)

```
import 'antd/dist/antd.css';
import RegionSelect from './commonpents/region-select';
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
				<label style={{color:"red"}}>checkedCities:  </label>{checkedCities.join()}
			</div>
		);
	}
}

ReactDom.render(
	<App/>,
    document.getElementById('app')
);

```

## Features
1. 提供onChange方法，参数为已选择的城市code组成的数组
2. 可接受dataSource（所有区域数据）和value（初始选中城市）两个props
3. 可用于Form表单包含使用，详见
[Ant-design自定义表单控件](https://ant.design/components/form-cn/#components-form-demo-customized-form-controls)
4. 依赖lodash

## Datasource
参考如下格式
```javascript
const regionDict = {
    "label": "所有地区",
    "value": "0",
    "regions": [{
        "label": "华北地区",
        "value": "1",
        "provinces": [{
            "label": "北京",
            "value": "100",
            "cities": []
        }, {
            "label": "天津",
            "value": "300",
            "cities": []
        }, {
            "label": "河北",
            "value": "1200",
            "cities": [{
                "label": "石家庄市",
                "value": "1201"
            }, {
                "label": "唐山市",
                "value": "1202"
            }, {
                "label": "秦皇岛市",
                "value": "1203"
            }, {
                "label": "邯郸市",
                "value": "1204"
            }]
        }]
    }]
};
```

## Value
1. 组件props和onChange中的value均为选中城市的code所构成的数组
2. 选中“所有区域”时，value为[0]
3. 初始value中值为int或者string要与datasource保持一致

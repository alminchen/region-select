import {Popover, Checkbox} from 'antd';
import defaultDataSource from './regionDict';
class RegionSelect extends React.Component {
    constructor(props) {
        super(props);
        const {dataSource, value} = props;
        this.formatDataSource(dataSource || defaultDataSource);
        this.state = {
            checkedCities: value || this.dataSource.allCities  //至少选择一个区域，默认全选
        };
    }

    componentWillMount() {
        if (this.state.checkedCities[0] === '0') {
            this.setState({
                checkedCities: this.dataSource.allCities
            });
        }
    }

    componentWillReceiveProps(nextProps) {
        const {value} =  nextProps;
        if (value) {
            this.setState({
                checkedCities: value[0] === '0' ? this.dataSource.allCities : value
            });
        }
    }

    triggerChange = (checkedCities) => {
        const onChange = this.props.onChange;
        if (onChange) { //所有区域值为['0']
            onChange(checkedCities.length === this.dataSource.allCities.length?['0']:checkedCities);
        }
    };

    //格式化原始数据
    formatDataSource = (dataSource)=> {
        dataSource.allCities = [];
        dataSource.regions.forEach((region)=> {
            region.cityValueList = [];
            region.provinces.forEach((province)=> {
                province.cityValueList = [];
                if (province.cities.length) {
                    province.cities.forEach((city)=> {
                        region.cityValueList.push(city.value);
                        province.cityValueList.push(city.value);
                        dataSource.allCities.push(city.value);
                    });
                } else {    //直辖市
                    region.cityValueList.push(province.value);
                    province.cityValueList.push(province.value);
                    dataSource.allCities.push(province.value);
                }
            });
        });
        this.dataSource = dataSource;
    };

    //生成市区选择块
    getPopoverContent = (cities) => {
        return (<div style={{maxWidth:'370px'}}>
            {cities.map((city)=> {
                return (
                    <Checkbox key={city.value}
                              cities={[city.value]}
                              checked={this.state.checkedCities.indexOf(city.value)>-1}
                              onChange={this.changeCheckbox}
                    >
                        {city.label}
                    </Checkbox>
                );
            })}
        </div>);
    };

    changeCheckbox = (e) => {
        const {checked, cities} = e.target;
        const {checkedCities} = this.state;
        let newCheckedCities = [];
        if (checked) {
            newCheckedCities = _.union(checkedCities, cities);
        } else {
            newCheckedCities = _.xor(checkedCities, cities);
        }
        this.setState({
            checkedCities: newCheckedCities
        });
        this.triggerChange(newCheckedCities);
    };

    render() {
        const {checkedCities} = this.state;
        const dataSource = this.dataSource;
        const intersectionOfAllLength = _.intersection(checkedCities, dataSource.allCities).length;
        const allCityValueListLength = dataSource.allCities.length;
        const allIndeterminate = !!intersectionOfAllLength && intersectionOfAllLength < allCityValueListLength;
        const allChecked = intersectionOfAllLength === allCityValueListLength;
        return (
            <div>
                <Checkbox cities={dataSource.allCities}
                          onChange={this.changeCheckbox}
                          indeterminate={allIndeterminate}
                          checked={allChecked}>
                    {dataSource.label}
                </Checkbox>
                <div style={{padding:'5px 10px'}}>
                    {
                        dataSource.regions.map((region)=> {
                                const {label, cityValueList} = region;
                                const intersectionOfRegionLength = _.intersection(checkedCities, cityValueList).length;
                                const cityValueListLength = cityValueList.length;
                                const regionIndeterminate = !!intersectionOfRegionLength && intersectionOfRegionLength < cityValueListLength;
                                const regionChecked = intersectionOfRegionLength === cityValueListLength;
                                return (<div key={`${label}-region`} style={{display:"flex"}}>
                                    <Checkbox cities={cityValueList}
                                              onChange={this.changeCheckbox}
                                              indeterminate={regionIndeterminate}
                                              checked={regionChecked}>
                                        {label}:
                                    </Checkbox>
                                    <div style={{flex:1}}>
                                        {
                                            region.provinces.map((province) => {
                                                const {value, label, cities, cityValueList} = province;
                                                const intersectionOfProvinceLength = _.intersection(checkedCities, cityValueList).length;
                                                const cityValueListLength = cityValueList.length;
                                                const provinceIndeterminate = !!intersectionOfProvinceLength && intersectionOfProvinceLength < cityValueListLength;
                                                const provinceChecked = intersectionOfProvinceLength === cityValueListLength;

                                                if (cities.length) {
                                                    return (
                                                        <Popover key={value}
                                                                 content={this.getPopoverContent(cities)}
                                                                 trigger="hover"
                                                                 placement="bottomLeft"
                                                        >
                                                            <Checkbox cities={cityValueList}
                                                                      checked={provinceChecked}
                                                                      onChange={this.changeCheckbox}
                                                                      indeterminate={provinceIndeterminate}
                                                                      style={{marginBottom:"10px"}}>
                                                                {label}
                                                                ({intersectionOfProvinceLength}/{cityValueListLength})
                                                            </Checkbox>
                                                        </Popover>
                                                    );
                                                }
                                                else {
                                                    return (
                                                        <Checkbox key={value}
                                                                  cities={cityValueList}
                                                                  checked={provinceChecked}
                                                                  onChange={this.changeCheckbox}
                                                                  indeterminate={provinceIndeterminate}
                                                                  style={{marginBottom:"10px"}}>
                                                            {label}
                                                        </Checkbox>
                                                    );
                                                }
                                            })
                                        }
                                    </div>
                                </div>);
                            }
                        )
                    }
                </div>
            </div>);
    }
}
export default RegionSelect;

'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _antd = require('antd');

var _regionDict = require('./regionDict');

var _regionDict2 = _interopRequireDefault(_regionDict);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var RegionSelect = function (_React$Component) {
    _inherits(RegionSelect, _React$Component);

    function RegionSelect(props) {
        _classCallCheck(this, RegionSelect);

        var _this = _possibleConstructorReturn(this, (RegionSelect.__proto__ || Object.getPrototypeOf(RegionSelect)).call(this, props));

        _initialiseProps.call(_this);

        var dataSource = props.dataSource,
            value = props.value;

        _this.formatDataSource(dataSource || _regionDict2.default);
        _this.state = {
            checkedCities: value || _this.dataSource.allCities //至少选择一个区域，默认全选
        };
        return _this;
    }

    _createClass(RegionSelect, [{
        key: 'componentWillMount',
        value: function componentWillMount() {
            if (this.state.checkedCities[0] === '0') {
                this.setState({
                    checkedCities: this.dataSource.allCities
                });
            }
        }
    }, {
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            var value = nextProps.value;

            if (value) {
                this.setState({
                    checkedCities: value[0] === '0' ? this.dataSource.allCities : value
                });
            }
        }

        //格式化原始数据


        //生成市区选择块

    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            var checkedCities = this.state.checkedCities;

            var dataSource = this.dataSource;
            var intersectionOfAllLength = _.intersection(checkedCities, dataSource.allCities).length;
            var allCityValueListLength = dataSource.allCities.length;
            var allIndeterminate = !!intersectionOfAllLength && intersectionOfAllLength < allCityValueListLength;
            var allChecked = intersectionOfAllLength === allCityValueListLength;
            return React.createElement(
                'div',
                null,
                React.createElement(
                    _antd.Checkbox,
                    { cities: dataSource.allCities,
                        onChange: this.changeCheckbox,
                        indeterminate: allIndeterminate,
                        checked: allChecked },
                    dataSource.label
                ),
                React.createElement(
                    'div',
                    { style: { padding: '5px 10px' } },
                    dataSource.regions.map(function (region) {
                        var label = region.label,
                            cityValueList = region.cityValueList;

                        var intersectionOfRegionLength = _.intersection(checkedCities, cityValueList).length;
                        var cityValueListLength = cityValueList.length;
                        var regionIndeterminate = !!intersectionOfRegionLength && intersectionOfRegionLength < cityValueListLength;
                        var regionChecked = intersectionOfRegionLength === cityValueListLength;
                        return React.createElement(
                            'div',
                            { key: label + '-region', style: { display: "flex" } },
                            React.createElement(
                                _antd.Checkbox,
                                { cities: cityValueList,
                                    onChange: _this2.changeCheckbox,
                                    indeterminate: regionIndeterminate,
                                    checked: regionChecked },
                                label,
                                ':'
                            ),
                            React.createElement(
                                'div',
                                { style: { flex: 1 } },
                                region.provinces.map(function (province) {
                                    var value = province.value,
                                        label = province.label,
                                        cities = province.cities,
                                        cityValueList = province.cityValueList;

                                    var intersectionOfProvinceLength = _.intersection(checkedCities, cityValueList).length;
                                    var cityValueListLength = cityValueList.length;
                                    var provinceIndeterminate = !!intersectionOfProvinceLength && intersectionOfProvinceLength < cityValueListLength;
                                    var provinceChecked = intersectionOfProvinceLength === cityValueListLength;

                                    if (cities.length) {
                                        return React.createElement(
                                            _antd.Popover,
                                            { key: value,
                                                content: _this2.getPopoverContent(cities),
                                                trigger: 'hover',
                                                placement: 'bottomLeft'
                                            },
                                            React.createElement(
                                                _antd.Checkbox,
                                                { cities: cityValueList,
                                                    checked: provinceChecked,
                                                    onChange: _this2.changeCheckbox,
                                                    indeterminate: provinceIndeterminate,
                                                    style: { marginBottom: "10px" } },
                                                label,
                                                '(',
                                                intersectionOfProvinceLength,
                                                '/',
                                                cityValueListLength,
                                                ')'
                                            )
                                        );
                                    } else {
                                        return React.createElement(
                                            _antd.Checkbox,
                                            { key: value,
                                                cities: cityValueList,
                                                checked: provinceChecked,
                                                onChange: _this2.changeCheckbox,
                                                indeterminate: provinceIndeterminate,
                                                style: { marginBottom: "10px" } },
                                            label
                                        );
                                    }
                                })
                            )
                        );
                    })
                )
            );
        }
    }]);

    return RegionSelect;
}(React.Component);

var _initialiseProps = function _initialiseProps() {
    var _this3 = this;

    this.triggerChange = function (checkedCities) {
        var onChange = _this3.props.onChange;
        if (onChange) {
            //所有区域值为['0']
            onChange(checkedCities.length === _this3.dataSource.allCities.length ? ['0'] : checkedCities);
        }
    };

    this.formatDataSource = function (dataSource) {
        dataSource.allCities = [];
        dataSource.regions.forEach(function (region) {
            region.cityValueList = [];
            region.provinces.forEach(function (province) {
                province.cityValueList = [];
                if (province.cities.length) {
                    province.cities.forEach(function (city) {
                        region.cityValueList.push(city.value);
                        province.cityValueList.push(city.value);
                        dataSource.allCities.push(city.value);
                    });
                } else {
                    //直辖市
                    region.cityValueList.push(province.value);
                    province.cityValueList.push(province.value);
                    dataSource.allCities.push(province.value);
                }
            });
        });
        _this3.dataSource = dataSource;
    };

    this.getPopoverContent = function (cities) {
        return React.createElement(
            'div',
            { style: { maxWidth: '370px' } },
            cities.map(function (city) {
                return React.createElement(
                    _antd.Checkbox,
                    { key: city.value,
                        cities: [city.value],
                        checked: _this3.state.checkedCities.indexOf(city.value) > -1,
                        onChange: _this3.changeCheckbox
                    },
                    city.label
                );
            })
        );
    };

    this.changeCheckbox = function (e) {
        var _e$target = e.target,
            checked = _e$target.checked,
            cities = _e$target.cities;
        var checkedCities = _this3.state.checkedCities;

        var newCheckedCities = [];
        if (checked) {
            newCheckedCities = _.union(checkedCities, cities);
        } else {
            newCheckedCities = _.xor(checkedCities, cities);
        }
        _this3.setState({
            checkedCities: newCheckedCities
        });
        _this3.triggerChange(newCheckedCities);
    };
};

exports.default = RegionSelect;
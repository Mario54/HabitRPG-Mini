var TaskView = require("./Tabs");
var React = require("react");

var Tab = React.createClass({
    render: function() {
        var className = (this.props.active) ? "active" : "",
            tab = this.props.tab;

        return (
            <li role="presentation" className={className} onClick={this.props.switchTab}>
                    <a href="#">{tab.title}</a>
            </li>
        );
    }
});

var TabGroup = React.createClass({
    render: function() {
        var tabs = this.props.tabs.map( (tab, i) => {
            return <Tab key={i} active={this.props.current === i} tab={tab} switchTab={this.props.switchTab(i)} />;
        });

        return (
            <ul id="myTab" className="nav nav-tabs" role="tablist">
                {tabs}
            </ul>
        );
    }
});

var TabView = React.createClass({
    render: function() {
        var currentTab = this.props.currentTab;

        var taskType = this.props.tabs[currentTab].type;
        var TabViewElement = <TaskView {...this.props} taskType={taskType} />;

        return (<div>
            <TabGroup tabs={this.props.tabs} current={currentTab} switchTab={this.switchTab} />

            <div id="tabView">
                {TabViewElement}
            </div>
        </div>);
    },

    switchTab: function (index) {
        return () => this.props.switchTab(index);
    }
});

export default TabView;

function ComponentListFactory({React}) {
    var ComponentList = React.createClass({
        render() {
            var components = "";

            if (this.props.components) {
                components = this.props.components.map(function (Component, i) {
                    return <li className="list-group-item" key={i}>{Component}</li>;
                });
            }

            return (
                <ul className="list-group">
                    {components}
                </ul>
            );
        }
    });

    return ComponentList;
}

export default ComponentListFactory;

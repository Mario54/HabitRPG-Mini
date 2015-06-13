
function HabitControlsFactory( { React }) {
    return React.createClass({
        render() {
            var plusButton =
                <li>
                    <button className="plusButton habitButton" onClick={this.props.upButtonClicked} type="button">+</button>
                </li>;

            var minusButton =
                <li>
                    <button className="minusButton habitButton" onClick={this.props.downButtonClicked} type="button">-</button>
                </li>;

            return (
                <ul className="habit-controls">
                    {this.props.showPlus ? plusButton : ""}
                    {this.props.showMinus ? minusButton : ""}
                </ul>
            );
        }

    });
}

export default HabitControlsFactory;

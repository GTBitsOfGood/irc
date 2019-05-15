import React from "react";
import TextField from "@material-ui/core/Input";

export default class CustomField extends React.Component {

      constructor(props) {
        super(props);

        this.state = {
          value: '',
        };
      }

      handleChange = (event) => {
        this.setState({
          value: event.target.value,
        });
      };

     handleClick = () => {
        this.setState({
          value:'',
        });
      };

      render() {
        return (
            <TextField
              value={this.state.value}
              onChange={this.handleChange}
            />
        );
      }
    }

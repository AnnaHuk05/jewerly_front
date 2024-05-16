import React, { useState } from "react";
import axios from "axios";

class UploadAllButton extends React.Component {
  handlePostData() {
    const url = "http://localhost:5000/post-data";
    const data = {
      name: "John",
      age: 30,
      city: "New York",
    };

    axios
      .post(url, data, { mode: "no-cors" })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error posting data:", error);
      });
  }

  render() {
    return <button onClick={this.handlePostData}>Send Data</button>;
  }
}

export default UploadAllButton;

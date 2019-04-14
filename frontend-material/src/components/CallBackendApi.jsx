import React from 'react';
import withStyles from "@material-ui/core/styles/withStyles";

export async function callBackendAPI(route, type, body) {
  if (type ==='post') {
    const response = await fetch(route, {
      method: type,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    });
    const json = await response.json();
    if (json.errorCode !== 200) {
      return json;
    } else {
      return json.body;
    }
  } else {
    const response = await fetch(route, {
      method: type,
    });
    const json = await response.json();
    if (json.errorCode !== 200) {
      return json;
    } else {
      return json.body;
    }
  }
};

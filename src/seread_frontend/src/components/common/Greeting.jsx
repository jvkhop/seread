import React from 'react';

const styles = {
    textAlign: "center"
}

function changeGreeting() {

    var currentHour = new Date().getHours();
    if (currentHour >= 6 && currentHour <= 12) return <h1 style={styles}>Wish you a great Morning</h1>;
    else if (currentHour <= 18) return <h1 style={styles}>Wish you a great Afternoon</h1>;
    else return <h1 style={styles}>Wish you a great Evening</h1>;
}

export default changeGreeting;
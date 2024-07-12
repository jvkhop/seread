import React from 'react';

const styles = {
    textAlign: "center",
    margin: "10px auto",
    maxWidth: "610px",
    boxShadow: "0 0 0 3px #3465a4, 0.5em 0.5em 3px 0 rgba(0, 0, 0, .5)",
}

function changeGreeting() {

    var currentHour = new Date().getHours();
    if (currentHour >= 6 && currentHour <= 12) return <h1 className="window blue" style={styles}>Wish you a great Morning</h1>;
    else if (currentHour <= 18) return <h1 style={styles} className="window blue">Wish you a great Afternoon</h1>;
    else return <h1 className="window blue" style={styles}>Wish you a great Evening</h1>;
}

export default changeGreeting;
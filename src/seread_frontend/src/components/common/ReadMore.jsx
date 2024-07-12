
import React, { useState, useEffect } from 'react';

function ReadMore({ content }) {
    const [displayedText, setDisplayedText] = useState("");
    const [isExpanded, setIsExpanded] = useState(false);

    useEffect(() => {
        if (content.length > 100) {
            setDisplayedText(content.slice(0, 100) + "...");
        } else {
            setDisplayedText(content);
        }
    }, [content]);

    function handleReadMore() {
        setDisplayedText(content);
        setIsExpanded(true);
    }

    function handleReadLess() {
        setDisplayedText(content.slice(0, 100) + "...");
        setIsExpanded(false);
    }

    return (
        <div>
            <p>{displayedText}</p>
            {content.length > 100 && (
                isExpanded ? (
                    <button onClick={handleReadLess}>Read Less</button>
                ) : (
                    <button onClick={handleReadMore}>Read More</button>
                )
            )}
        </div>
    );
}

export default ReadMore;
const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

let apiQuotes = [];

// Show Loading
const loading = () => {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

// Hide Loading
const complete = () => {
    quoteContainer.hidden = false;
    loader.hidden = true;
}

// Show New Quote
const newQuote = () => {
    loading();
    // Pick a random quote from apiQuotes array
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
    // Check if Author field is blank and replce it with 'Unknown'
    if (!quote.author) {
        authorText.textContent = 'Unknown';
    } else {
        authorText.textContent = quote.author;
    }
    // Check Quote length to determine styling
    if (quote.text.length > 120) {
        quoteText.classList.add('long-quote');
    } else {
        quoteText.classList.remove('long-quote');
    }

    // Set Quote, Hide Loader
    quoteText.textContent = quote.text;
    complete();
}

//  Get Quotes from API
async function getQuotes() {
    loading();
    const apiUrl = 'https://type.fit/api/quotes';
    try {
        const response = await fetch(apiUrl);
        apiQuotes = await response.json();
        newQuote();
    } catch (error) {
        // Catch Error Here
        apiQuotes = localQuotes;
        newQuote();
    }
}

// Tweet Quote
const tweetQuote = () => {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterUrl, '_blank');
}


// // Event Listeners
newQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', tweetQuote);

// On Load
getQuotes();




// const quoteContainer = document.getElementById('quote-container');
// const quoteText = document.getElementById('quote');
// const authorText = document.getElementById('author');
// const twitterBtn = document.getElementById('twitter');
// const newQuoteBtn = document.getElementById('new-quote');
// const loader = document.getElementById('loader');

// function showLoadingSpinner() {
//     loader.hidden = false;
//     quoteContainer.hidden = true;
// }

// function removeLoadingSpinner() {
//     if(!loader.hidden) {
//         quoteContainer.hidden = false;
//         loader.hidden = true;
//     }
// }

// // Get Quote From API
// async function getQuote() {
//     showLoadingSpinner();
//     // We need to use proxy URL to make our API call in order to avoid CORS issues
//     const proxyUrl = 'https://fathomless-hamlet-75991.herokuapp.com/'
//     const apiUrl =
//         "http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json";
//     try {
//         const response = await fetch(proxyUrl + apiUrl);
//         const data = await response.json();
//         // Check if Author field is blank and replace it with 'Unknown'
//         if (data.quoteAuthor === '') {
//             authorText.innerText = 'Unknown';
//         } else {
//             authorText.innerText = '~ ' + data.quoteAuthor;
//         }

//         // Reduce font size for long text
//         if (data.quoteText.length > 120) {
//             quoteText.classList.add('long-quote');
//         } else {
//             quoteText.classList.remove('long-quote');
//         }
//         quoteText.innerText = data.quoteText;
//         removeLoadingSpinner();

//     } catch (error) {
//         getQuote();
//     }
// }

// // Tweet Quote
// function tweetQuote() {
//     const quote = quoteText.innerText;
//     const author = authorText.innerText;
//     const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
//     window.open(twitterUrl, '_blank');
// }

// // Event Listeners
// newQuoteBtn.addEventListener('click', getQuote);
// twitterBtn.addEventListener('click', tweetQuote);

// // On load
// getQuote();

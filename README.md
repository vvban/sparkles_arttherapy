# Hello, this is the page about how the service works!

We strongly recommend using a developer environment, test server and production servers.

Here are some of the libraries we use::
1. Drag and drop card function: https://interactjs.io/docs/ (docs)
2. Lazy image upload function: https://github.com/verlok/vanilla-lazyload?tab=readme-ov-file (docs)

Technology stack:
- Gulp
- HTML5
- SASS
- JavaScript ES6

## How do images get built?

In the script, we set the src of the image:
``` JavaScript
card.src = currentUrl + "assets/" + deck_id + "/" + card_id.toString() + ".jpg";
// "card_id" in range {1-50}.jpg
// "deck_id" in range set{1-2}/
```
### The service has no backend, so it doesn't know anything about the number of images or decks. We create variables in which we specify the amount of requests to get the content:
``` JavaScript
let set_size = 50; // "card_id" in range {1-50}.jpg
let number_of_deck = 2; // "deck_id" in range set{1-2}/
```
## How do profiles of a deck of cards get built?
In script we fetch texts and set image src: 
``` JavaScript
for (let index = 1; index <= number_of_deck; index++) {
    let deck_name = "set" + index

    fetch(currentUrl + 'assets/' + deck_name + "/text.txt")
        .then(response => response.text())
        .then((data) => {
            build_deck_profile(deck_name, data.split("\/\&\/"))
        })
}


const build_deck_profile = (deck_name, text) => {
    profile.src = currentUrl + 'assets/' + deck_name + "/profile.jpg"

    // ...
    header.textContent = text[0]
    // ...
    paragraph.textContent = text[1]
```

### My favorite services
1. https://caniuse.com/
2. https://www.iloveimg.com/resize-image/resize-svg
3. https://www.mozilla.org/en-US/firefox/developer/

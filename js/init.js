const days = [
    {
        day: 1,
        subject: "A song you like with a color in the title"
    },
    {
        day: 2,
        subject: "A song you like with a number in the title"
    },
    {
        day: 3,
        subject: "A song that reminds you of summertime"
    },
    {
        day: 4,
        subject: "A song that reminds you of someone you'd rather forget"
    },
    {
        day: 5,
        subject: "A song that needs to be played loud"
    },
    {
        day: 6,
        subject: "A song that makes you want to dance"
    },
    {
        day: 7,
        subject: "A song to drive to"
    },
    {
        day: 8,
        subject: "A song about drugs or alcohol"
    },
    {
        day: 9,
        subject: "A song that makes you happy"
    },
    {
        day: 10,
        subject: "A song that makes you sad"
    },
    {
        day: 11,
        subject: "A song you never get tired of"
    },
    {
        day: 12,
        subject: "A song from your preteen years"
    },
    {
        day: 13,
        subject: "A song you like from the 70s"
    },
    {
        day: 14,
        subject: "A song you'd love to be played at your wedding"
    },
    {
        day: 15,
        subject: "A song that you like that's a cover by another artist"
    },
    {
        day: 16,
        subject: "A song that's a classic favorite"
    },
    {
        day: 17,
        subject: "A song you'd sing a duet with someone on karaoke"
    },
    {
        day: 18,
        subject: "A song from the year you were born"
    },
    {
        day: 19,
        subject: "A song that makes you think about life"
    },
    {
        day: 20,
        subject: "A song that has many meanings to you"
    },
    {
        day: 21,
        subject: "A song you like with a person's name in the title"
    },
    {
        day: 22,
        subject: "A song that moves you forward"
    },
    {
        day: 23,
        subject: "A song you think everybody should listen to"
    },
    {
        day: 24,
        subject: "A song by a band you wish were still together"
    },
    {
        day: 25,
        subject: "A song you like by an artist no longer living"
    },
    {
        day: 26,
        subject: "A song that makes you want to fall in love"
    },
    {
        day: 27,
        subject: "A song that breaks your heart"
    },
    {
        day: 28,
        subject: "A song by an artist whose voice you love"
    },
    {
        day: 29,
        subject: "A song you remember form your childhood"
    },
    {
        day: 30,
        subject: "A song that reminds you of yourself"
    },
    {
        day: 31,
        subject: "A song you would like to be played at your funeral"
    },
    {
        day: 32,
        subject: "The first song you would like your son to listen to"
    },
    {
        day: 33,
        subject: "A song you hate a whole lot"
    },
    {
        day: 34,
        subject: "A song you would like to use as a torture tool"
    },
    {
        day: 35,
        subject: "A song you like from a TV show"
    },
    {
        day: 36,
        subject: "A song you liked only after listening to it several times"
    },
    {
        day: 37,
        subject: "A song you like from somebody you don't like anymore"
    },
    {
        day: 38,
        subject: "A song you like for the lyrics"
    },
    {
        day: 39,
        subject: "A song that embarasses you because you like it"
    },
    {
        day: 40,
        subject: "A song that nobody knows every time except you"
    },
    {
        day: 41,
        subject: "A song you like used in a great movie"
    },
    {
        day: 42,
        subject: "A song you like written for a movie"
    },
    {
        day: 43,
        subject: "A song you like for the music video"
    },
    {
        day: 44,
        subject: "A song you like that is perfect for sport practice"
    },
    {
        day: 45,
        subject: "A song so overused that you can't stand it anymore"
    },
    {
        day: 46,
        subject: "A song you love but anyone else hates (or vice versa)"
    },
    {
        day: 47,
        subject: "A song you like from an anime or cartoon"
    },
    {
        day: 48,
        subject: "A song with a political meaning that you like"
    },
    {
        day: 49,
        subject: "A song you like from a genre you mostly hate"
    },
    {
        day: 50,
        subject: "A song you like with the name of a month in the title"
    },
    {
        day: 51,
        subject: "A song you would like singing in the shower"
    },
    {
        day: 52,
        subject: "A song you like from the festival of Sanremo"
    },
    {
        day: 53,
        subject: "A song you like from a videogame"
    },
    {
        day: 54,
        subject: "A song you like written in a language you don't understand"
    },
    {
        day: 55,
        subject: "A song you like from somebody you've always hated"
    },
    {
        day: 56,
        subject: "A song you like that you managed to listen (live)"
    },
    {
        day: 57,
        subject: "A song that relaxes you in a good way"
    },
    {
        day: 58,
        subject: "A song you (would) like to listen to when you have sex"
    },
    {
        day: 59,
        subject: "A song you like with the name of a city in the title"
    },
    {
        day: 60,
        subject: "A song you like with a great solo"
    },
];

var posts;
var authors;

$(function () {

    $.getJSON("https://raw.githubusercontent.com/subterhero/30dsjc-explorer-dataset/master/json-files/tweets.json", function (tweets) {
        posts = tweets;
        $.getJSON("https://raw.githubusercontent.com/subterhero/30dsjc-explorer-dataset/master/json-files/all_tweets_authors.json", function (users) {
            authors = users;
            main();
        });
    });
});

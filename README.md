# Zipf's Law

According to Zipf's Law - if you rank words by their frequency in a sufficiently
large collection of texts and then plot the frequency against the rank, you get
a logarithmic curve.

## Explanation

You can enter comma separated URLs to website containing a large amount of text.
Clicking on Generate Charts, generates a visualization of the logarithmic
distribution of word occurences on each of these sites.

The server crawls these sites and returns an array of objects for each website.
Each object contains the work and its frequency (denoted here as count). It also
contains the rank of each work based on the number of occurences.

I used RechartsJS to plot the graph for the text in each of the URLs.

## Run

Clone the Repo into an empty folder.

Install dependencies and then enter yarn dev into the command line to run server
at PORT 9000 and client at PORT 3000.

```js
    // Installs Dependecies and boots up the project

    yarn install && yarn dev
```

### Screenshots

![image-1](https://github.com/abhinavramkumar/zipfs-law-signzy/blob/master/signzy-zipfs-law-1.png)
![image-2](https://github.com/abhinavramkumar/zipfs-law-signzy/blob/master/signzy-zipfs-law-2.png)
![image-3](https://github.com/abhinavramkumar/zipfs-law-signzy/blob/master/signzy-zipfs-law-3.png)
![image-4](https://github.com/abhinavramkumar/zipfs-law-signzy/blob/master/signzy-zipfs-law-4.png)

### Created by

Abhinav Ramkumar

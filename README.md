Blog Authorship Corpus
======================

The Blog Authorship Corpus consists of the collected posts of 19,320 bloggers gathered from blogger.com in August 2004. The corpus incorporates a total of 681,288 posts and over 140 million words - or approximately 35 posts and 7250 words per person.  

Each blog is presented as a separate file, the name of which indicates a blogger id# and the blogger’s self-provided gender, age, industry and astrological sign. (All are labeled for gender and age but for many, industry and/or sign is marked as unknown.)

All bloggers included in the corpus fall into one of three age groups:

·          8240 "10s" blogs (ages 13-17),

·          8086 "20s" blogs(ages 23-27)

·          2994 "30s" blogs (ages 33-47).

For each age group there are an equal number of male and female bloggers.   

Each blog in the corpus includes at least 200 occurrences of common English words. All formatting has been stripped with two exceptions. Individual posts within a single blogger are separated by the date of the following post and links within a post are denoted by the label urllink.

This data originated [here](http://u.cs.biu.ac.il/~koppel/BlogCorpus.htm)

Usage
-----

    var posters = require('blogger-posts');

Synchronous use

    posters.forEach(function(blogger, index){
        //use or save blogger
    });
    //complete

Async use

    posters.forEach(function(blogger, index, done){
        blogger.posts(function(err, posts){
            //do something with this array of posts
            done();
        });
    }, function(){
        //complete
    });

Citation
--------
The corpus may be freely used for non-commercial research purposes. Any resulting publications should cite the following:

J. Schler, M. Koppel, S. Argamon and J. Pennebaker (2006). Effects of Age and Gender on Blogging in Proceedings of 2006 AAAI Spring Symposium on Computational Approaches for Analyzing Weblogs.

Enjoy,

-Abbey Hawk Sparrow

(I only did the coding)

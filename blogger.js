(function(root, factory){
    if (typeof define === 'function' && define.amd){
        define([
            'request',
            'xml2js',
            'fs',
            'async-arrays'
        ], factory);
    }else if(typeof exports === 'object'){
        module.exports = factory(
            require('request'),
            require('xml2js'),
            require('fs'),
            require('async-arrays')
        );
    }else{
        //todo: shim things to work in a browser
        root.TopicExtraction = factory({});
    }
}(this, function(request, xml2js, fs, arrays){
    var control = {
        forEach : function(handler, onComplete){
            var isAsync = handler.length === 3;
            fs.readdir(__dirname+'/blogs', function(err, list){
                var items = list.map(function(name){
                    var pieces = name.split('.');
                    return {
                        id : pieces[0],
                        gender : pieces[1],
                        category: pieces[2],
                        sign: pieces[3],
                        posts : function(cb){
                            var url = __dirname+'/blogs/'+name;
                            fs.readFile(url, function(err, body){
                                if(err) return cb(err);
                                xml2js.parseString(body, function(err, data){
                                    if(err) return cb(err);
                                    var results = data.Blog.date.map(function(date, index){
                                        return {
                                            date : new Date(date),
                                            post : data.Blog.post[index].trim()
                                        };
                                    })
                                    return cb(undefined, results);
                                });
                            });
                        }
                    };
                });
                if(isAsync){
                    return arrays.forEachEmission(items, handler, onComplete);
                }else{
                    items.forEach(handler);
                    if(onComplete) onComplete();
                }
            });
        },
        map : function(handler){
            var results = [];
            control.forEach(function(item, key){
                results.push(handler(item));
            });
            return results;
        },
        slice : function(start, stop){
            var results = [];
            control.forEach(function(item, key){
                if(key < start) return;
                if(stop <= key) return;
                results.push(item);
            });
            return results;
        }
    };

    control.forEach(function(blogger, index, done){
        blogger.posts(function(err, posts){
            //do something with this post
            console.log(posts);
            done();
        });
    }, function(){
        console.log('done');
    });

    return control;
}));

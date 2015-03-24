var Book=require("../models/book").Book;
var isAuthenticated=require("../config/passport").isAuthenticated;

module.exports=function(app){

    app.get("/book",isAuthenticated, function(req, res){

        Book.find({}, function(err, books){
            if(err)
                return res.send(err);

            res.json(books);
        });

    });

    app.get("/book/:id", isAuthenticated, function (req, res) {

        Book.find({"_id":req.params.id}, function(err, book){
            if(err)
                return res.send(err);

            res.json(book);
        });

    });

    app.post("/book", isAuthenticated, function(req, res){

        var book=new Book();
        book.title=req.body.title;
        book.author=req.body.author;
        book.page=req.body.page;

        console.log(req.body.title);

        book.save(function(err, book){

            if(err)
                return res.send(err);

            res.json({"status":"OK", data :book});

        });

    });

    app.put("/book/:id", isAuthenticated, function(req, res){

        Book.findById(req.params.id, function(err, book){
           if(err)
               return res.send(err);

            book.title=req.body.title;
            book.author=req.body.author;
            book.page=req.body.page;

            book.save(function(err, book){

                if(err)
                    return res.send(err);

                res.json({"status":"OK", data :book});

            });
        });

    });

    app.delete("/book/:id", isAuthenticated, function(req, res){

        Book.findById(req.params.id, function(err, book){
           if(err)
             return res.send(err);

           book.remove(function(err){
              if(err)
                return res.send(err);

              res.json({"status" : "OK"});
           });

        });

    });

}

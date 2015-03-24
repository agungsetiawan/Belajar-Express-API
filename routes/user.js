var User=require("../models/user").User;

module.exports=function(app){

	app.post("/user", function(req, res){
		var user=new User();
		user.username=req.body.username;
		user.password=req.body.password;

		user.save(function(err, user){
			if(err)
				return res.send(err);

			res.json({"status" : "OK", "data":user});
		})
	})

}
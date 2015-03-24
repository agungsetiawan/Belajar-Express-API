var mongoose=require("mongoose");
var bcrypt=require("bcrypt-nodejs");
var Schema=mongoose.Schema;

var userSchema=new Schema({
	username:String,
	password:String
});

userSchema.pre("save", function(callback){

	var user=this;
	if(!user.isModified("password"))
		return callback();

	bcrypt.genSalt(5, function(err,salt){
		if(err)
			return callback(err);

		bcrypt.hash(user.password, salt, null, function(err, hash){
			if(err)
				return callback(err);

			user.password=hash;
			callback();
		});
	});

});

userSchema.methods.verifyPassword=function(password, callback){
	bcrypt.compare(password, this.password, function(err, isMatch){
		if(err)
			return callback(err);
		callback(null, isMatch);
	})
};

var User=mongoose.model("User", userSchema);
module.exports.User=User;
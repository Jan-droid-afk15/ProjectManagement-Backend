const { Schema, model } = require('mongoose');
const bcrypt = require('bcryptjs');

//Schema for Admins, required in MongoDB
const adminSchema = Schema(
    {
        name: {
            type: String,
            required: [true, 'Name field is required'],
        },
        email: {
            type: String,
            required: [true, 'Email field is required'],
            unique: true,
            lowercase: true,
            trim: true
        },
        password: {
            type: String,
            required: [true, 'Password field is required'],
        }
    },
    { timestamps: true }
);
//Bcrypt hashes a user's password and encrypts them for security.
adminSchema.methods.comparePassword = function(password){
    return bcrypt.compareSync(password, this.password, function(result) {
        return result;
    });
};

module.exports = model('Admin', adminSchema);
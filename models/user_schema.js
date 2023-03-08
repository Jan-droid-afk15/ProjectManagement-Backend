const { Schema, model } = require('mongoose');
const bcrypt = require('bcryptjs');

//Schema for Users, required in MongoDB
const userSchema = Schema(
    {
        first_name: {
            type: String,
            required: [true, 'First name is required'],
        },
        last_name: {
            type: String,
            required: [true, 'Last name is required'],
        },
        email: {
            type: String,
            required: [true, 'Email is required'],
            unique: true,
            lowercase: true,
            trim: true
        },
        password: {
            type: String,
            required: [true, 'Password is required'],
        },
        avatar: {
            type: String,
        },
        projects:[
            {
                type: Schema.Types.ObjectId,
                ref: 'Project'
            },
        ],
        boards:[
            {
                type: Schema.Types.ObjectId,
                ref: 'Board'
            },
        ],
        assignments:[
            {
                type: Schema.Types.ObjectId,
                ref: 'Assignment'
            },
        ],
        events:[
            {
                type: Schema.Types.ObjectId,
                ref: 'Event'
            },
        ],
    },
    { timestamps: true }
);
//Bcrypt hashes a user's password and encrypts them for security.
userSchema.methods.comparePassword = function(password){
    return bcrypt.compareSync(password, this.password, function(result) {
        return result;
    });
};

module.exports = model('User', userSchema);
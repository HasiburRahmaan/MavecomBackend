
var customerScema={
    id:ObjectId,
    name:String,
    profilePicture:imgSrc,
}

var commentSchema={
    text:String,
    images:[String(img_src)],
    liked:Number,
    disLiked:Number,
    likedBy:[
        customerScema
    ],
    disLikedBy:[
       customerScema
    ],
    createdAt:DateTime,
    updatedAt:DateTime,
},

var productComment={
    product:{
        id:ObjecttId,
        VarientId:String,
    },
    total_comments:Number,
    comments:[
        {   
            active:Boolean,
            customer:customerId,
            comment:commentSchema,
            repplies:[
                {
                    active:Boolean,
                    customer:customerScema,
                    comment:commentSchema,
                }
            ]
        },
    ]
}

const brand={
    id:ObjectId,
    Image:{
        src:String, //(image link),
    },
    name:String
},

const productBrand = {
    productId:ObjectId,
    brandId:ObjectId,
}

const shipping={
    productId:ObjectId,
    dimensions:{
        height:Number,
        width:Number,
        length:Number,
    },
    weight:Number,
};

const productVarient={
    productId:ObjectId,
    count:Number,
    varient:{
        created_at:DateTime,
        updated_at:DateTime,
        Products_info:[
            {	
                productVariantId:String,
                rating:Number,
                active:Boolean,
                Images:[
                    {
                        src:String,
                        title:String,
                        height:Number,
                        width:Number	
                    }
                ],
                Attrs:{
                    size:String,
                    color_family:String,
                    color:String,
                    quantity:Number,
                },
                Pricing:{
                    price:Number,
                    Discount_amount:Number,
                    discount_persentage:Number,
                    sale_price:Number,
                },
                sale_end_date:DateTime,
                    
            }
        ]
    }
}

var productAttrs = {
        productId:ObjectId,
        attrs:[
           {
            name:String,
            value:String,
           }
        ]
}

var productTagList={
    productId:ObjectId,
    taglist:[String],
}

var Product = {
	_id:ObjectId,
	name : String,
	lName :  String,
	department : ObjectId,
	category : String ,//  “/parent/child/child/child”
	total_stock:Number,
	description : [
		{
			title:String,
			detail:String,
		}
	],
	brandName:String,
	Assets:{
        thambnail_images:[
            {
                height:Number,
                width:Number,
                title:String,
                src:String, //(image src link)
            }
        ]
    },
    created_at:DateTime,
    updated_at:DateTime,
}


//----------------------------product end---------------------
// for add new products
const requestedProduct = {	
    active:Boolean,
    Images:[
        {
            src:String,
            title:String,
            height:Number,
            width:Number	
        }
    ],
    Attrs:{
        size:String,
        color_family:String,
        color:String,
        quantity:Number,
    },
    Pricing:{
        price:Number,
        Discount_amount:Number,
        discount_persentage:Number,
        sale_price:Number,
    },
    sale_end_date:DateTime,     
}

var ProductVarificationRequest={
	_id:ObjectId,
	createdAt:DateTime,
	updatedAt:DateTime,
	seller:ObjectId,
	Products_info:[
        requestedProduct,
    ],
	verify:{
		accepted:Boolean,
		canceled:Boolean,
		date:DateTime,
		Verified:employee_id,
	}
}

const updateRequestedProduct = {	
    productVariantId:String,
    active:Boolean,
    Images:[
        {
            src:String,
            title:String,
            height:Number,
            width:Number	
        }
    ],
    Attrs:{
        size:String,
        color_family:String,
        color:String,
        quantity:Number,
    },
    Pricing:{
        price:Number,
        Discount_amount:Number,
        discount_persentage:Number,
        sale_price:Number,
    },
    sale_end_date:DateTime,
}

var ProductUpdateRequest={
	_id:ObjectId,
	createdAt:DateTime,
	updatedAt:DateTime,
	seller:ObjectId,
	Products_info:[
        updatedRequestedProduct
    ],
	verify:{
		accepted:Boolean,
		canceled:Boolean,
		date:DateTime,
		Verified:employee_id,
	}
}


//----------------------------seller start---------------------
var seller={
    userId:ObjectId,
    total_sale: Number,
    Rank: Number,
    assets:{
        image:{
                height:Number,
                width:Number,
                src:String,
        }
    },  
}

const sellerProduct = {
    sellerId:ObjectId,
    productId:ObjectId,
    productVarientId:ObjectId,
}

const sellerTopSold = {
    sellerId:ObjectId,
    productList:[{
        productId:ObjectId,
        avrientId:ObjectId,
        sold:Number
    }]
}

const topSetisfiedCustomer = {
    sellerId:ObjectId,
    customerList:[customerId]
}



//----------------------------seller end---------------------


var saller_verificition_request = {
	_id: ObjectId,
	requestType:String,
	Updated_at: String,
	Seller_info: {}, //seller object
	varify:[
        {
            accepted: Boolean,
            canceled:Boolean,
            date: DateTime,
        }],
	Verified_by: Employee_id,
}
//----------------------------seller verification end---------------------


var user={
   id:ObjectId,
   userName: String,
   password: String,
   fullname:String,
   lFullName:String, //(lowercase),
   address:[
       {
            country:String,
	        city:String,
            state:String,
            road:String,
            house:String,
            floor : String
       }
   ],
   email:String,
   phone:Number,
   active:Boolean,
   is_superuser:Boolean,
   is_admin: Boolean,
   is_staff:Boolean,
   created_at:Date,
   update_at:Date,
   birthdate:Date
}
//----------------------------user end---------------------

const topPreferableProduct = {
    customerId:ObjectId,
    topProduct:[
        {
            productId:ObjectId,
            productVarientId:ObjectId,
            total_buy:Number,
        }
    ]
}

const customerSearchKeywords = {
    customerId:ObjectId,
    keywordList:[
        {
            keyword:String,
            searched:Number
        }
    ],
}

const customerTagList = {
    customerId:ObjectId,
    taglist:[String]
}

const deliveryAddress = {
        customerId:ObjectId,
        country:String,
        city:String,
        state:String,
        road:String,
        house:String,
        floor : String
}

var bodyDetails = {
    customerId:ObjectId,
    height:Number,
    width:Number ,
    neck:Number,
    thigh:Number,
    chest:Number,
    belly:Number,
    color:String
}

var customer={
    _id:ObjectId,
    total_buy:Number,
    religion:String,
    gender:String,
    assets:{
        images:[
            {
                height:Number,
                width:Number,
                src:String,
            }
        ],
        body_details:{
            
        }
    },
    active:Boolean,
}

//----------------------------customer end---------------------

var shopping_cart={
   id:ObjectId,
   customer_id:String,
   products:[
       {
           sellerId:ObjectId,
           productId:String,
           productVariantId:String,
           title:String,
           quantity:Number,
           unit_price:Number,
           discount_amount:Number,
           discount_percentage:Number
       }
      
   ],
   created_at:String
}

//----------------------------shopping cart end---------------------

Order[{
   id:ObjectId,
   invoice:String,
   shipping: {
       customer_id: String,
       customer_name: String,
       phone:Number,
       address:{
           country:String,
           city:String,
           state:String,
           street:String,
           house:String,
           floor:String
       },
       delivery_notes:String,
       tracking: {
           company:String,
           tracking_number:String,
           status:String
       }
     },
     orderedProducts:[
       {
           sellerId:ObjectId,
           productId:String,
           productVariantId:String,
           title:String,
           quantity:Number,
           unit_price:Number,
           discount_amount:Number,
           discount_percentage:Number
       }
   ],
   actualCost:Number,
   totalDiscount: Number,
   totalCost:Number,
   delivaryInfo:{
        started_at:DateTime,
        isDelivered:Boolean,
        isCanceled:Boolean,
        ended_at:DateTime
   },
   rating:Number,
   created_at: Date,
   updated_at:Date,
   isCanceled:Boolean,
   canceledAt:DateTime,
   payment:{
       method:String,
       transiction_id:String
   }
}]

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
            customer:customerScema,
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
const brand={
    id:ObjectId,
    Image:{
        src:String, //(image link),
    },
    name:String
},

const productDescription = {
	productId:ObjectId,
    description:String
}


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
                    price: Number,
                    discountAmount: Number,
                    discountAmountLastDate:Date,
                    discountPersentage: Number,
                    discountPersentageLastDate:Number,
                    sale_price:Number,
                },
                saleLastDate:Date,
                lastSaleDate:Date,
                    
            }
        ]
    }
}

var attrs = {
    name:String,  // name and value will be combine unique
    value:String
}

var prodcutAttrs = {
    productId:ObjectId,
    attrId:ObjectId
}

var productTag={
    productId:ObjectId,
    tagId:ObjectId
}

var tag = {
    value:String
}

var hotProducts = {
    productId:ObjectId,
    note:String
}

var Product = {
	_id:ObjectId,
	name : String,
	lName :  String,
	department : ObjectId,
	category : String ,//  “/parent/child/child/child”
    total_stock:Number,
    priceRange:Number,
	// description : [
	// 	{
	// 		title:String,
	// 		detail:String,
	// 	}
	// ],
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
    price: Number,
    discountAmount: Number,
    discountPersentage: Number,
    shortDetails:String,
    created_at:DateTime,
    updated_at:DateTime,
}




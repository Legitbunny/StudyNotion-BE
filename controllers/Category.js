const Category = require('../models/Category');

//create tag handler function
exports.createCategory = async (req, res) => {
    try{
        const {name, description} = req.body;

        if(!name || !description){
            return res.status(400).json({
                success: false,
                message: "Fields cannot be empty"
            })
        }

        //create entry in DB
        const categoryDetails = await Category.create({
            name:name,
            description:description
        })

        console.log(categoryDetails);

        return res.status(200).json({
            success: true,
            message: "Category created successfully"
        })
    }
    catch(err){ 
        console.log(err);
        return res.status(500).json({
            success: false,
            message: err.message
        })
}};

//get all tags handler function
exports.showAllCategory = async (req,res) => {
    try{
        const allCategory = await Category.find({}, {name:true, description:true});  /// to make sure that fields are not coming empty from DB ---{name:true, description:true}
        res.status(200).json({
            success: true,
            message: "All Category returned successfully",
            allCategory
        })
    }catch(e){
        console.log(e);
        return res.status(500).json({
            success: false,
            message: "An error occurred while getting all category."
        })
    }
}

//category page details
exports.categoryPageDetails = async (req, res) => {
    try{
        //get category id
        const {categoryId} = req.body;
        //get courses for specified category id
        const selectedCategory = await Category.findById(categoryId)
                                                .populate("courses")
                                                .exec();
        //validation
        if(!selectedCategory){
            return res.status(404).json({
                success: false,
                message: "data not found"
            })
        }
        //get courses for different categories
        const differentcategories = await Category.find({_id: {$ne: categoryId}}).populate("courses").exec(); //$ne -- means not equal $eq -- means equal
        //get 10 top selling courses
        //TODO: top selling courses
        //return response
        return res.status(200).json({
            success: true,
            data:{
                selectedCategory,
                differentcategories,
                topSellingCourses
            }})


    }catch(e){
        console.log(e);
        return res.status(500).json({
            success: false,
            message: "An error occurred while getting category page details."
        })
}
}
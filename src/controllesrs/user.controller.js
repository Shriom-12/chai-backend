import {asyncHandler} from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js"
import {User} from "../model/user.model.js"
import {uploadOnCloudinary} from "../utils/cloudinary.js"
import {ApiResponse} from "../utils/ApiRespomse.js"

const registerUser = asyncHandler(async (req, res) => {
   
    










const { fullName , email , username ,password} =  req.body
console.log("email:", email);

if (
    [fullName,email,username,password].some((field) =>
    field?.trim() === "")
) {
    throw new ApiError(400,"ALL feild are rqeired")
}
 
 const existedUser = User.findOne({
    $or:[{username},{email}]
})
if (existedUser) {
    throw new ApiError(409,"user with exitx") 
}

 const avatarLocalpath = req.files?.avatar[0]?.path;
 const converImageLocalPath =  req.files?.coverImage[0]?.path;
    
if (!avatarLocalpath) {
    throw new ApiError(400, "Avstsr id frewww")   
}

 const avatar = await uploadOnCloudinary(avatarLocalpath)
 const coverImage = await uploadOnCloudinary
 (converImageLocalPath)
 
 if (!avatarLocalpath) {
    throw new ApiError(400, "Avstsr id frewww")   
 }
 
  const user = await User.create({
    fullName,
    avatar:avatar.url,
    coverImage:coverImage?.url || "",
    email,
    password,
    username: username.toLowerCase()  
  })
       
  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
  )

  if(!createdUser) {
    throw new ApiError(500,"Something went wrong")
  }

  return res.status(201).json(
    new ApiResponse(200,createdUser,"User register full")
  )  


} );


export {registerUser};
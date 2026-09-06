import mongoose, { Schema } from 'mongoose';
import mangoosePaginate from mongoose-paginate-v2';
const videoSchema = new Schema(
    {
       videoFile: {
        type: String,
        required: true,
       },
       thumbnail: {
        type: String,
        required: true,
       },
        title: {
        type: String,
        required: true,
       },
       description: {
        type: String,
        required: true,
       },
       duration: {
        type: Number,
        required: true,
       },
       views: {
        type: Number,
        default: 0,
         },
         isPublic: {
        type: Boolean,
        default: true,
       },
       owener: {
        type: Schema.Types.ObjectId,
        ref: 'User',
       },
    },
    {
        timestamps: true,
    }
)   


videoSchema.plugin(mangoosePaginate);

export const Video = mongoose.model('Video', videoSchema);

import mongoose from "mongoose";

const VideoSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    desc: {
        type: String,
        required: true,
    },
    imgUrl: {
        type: String,
        default: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAACQ0lEQVR4nO2Yu2sUURjFTyImwSKSCGJja6GoRUDU+b4kapMiYiFpLCyiEV9gaSdCRA2xyT+QIo9GsVGiATHgu1C08IGPShK08RVxCUbYI3fcWXRJnJnM3Z0ZvT84sAyz3z2HOzP33g9wOBwOh+N/gLuwih4208NuKo5TMUDBGAUTFNyn4AUF76j45EswRwV9/fodXDf3PKfgnv9fxSgF56g45tc2Y2xFa3LDQD0FfRRMUVEom6mdCqWxDxKoi2d+PRoomEzBNBfRNbZhefQAggsZMM0KDUQz34EmCr5kwDArNMs2rAgP4KEzA2a5oNqxI0qA3tSN6iIS9EV5/vtTN6oJ3gMKxhMN8vAGuX9DtWbgcpQAtxINYvgxT14aIrtW2g7xJEqAx4kDBMx+IIdOkB31tgLMhAdQvLIWIODlI/LIdhsBvoeuyial9QCGYpGcukjuXZssRBcawx6hz1UJEDD3jRw+Te5sXFr9LWgOm4H5qgYImHlDnuqJX38bVmcjwPRr8mR3/PqCljw/QkX2YFl6L/HkCLlnzdJrK77+1XzmP6OC6douZB/fk4OH7C1kgqc13ko02zGuZd2t/mbuwQS5b51t4yzNwHi+t9OC/nwfaDz05vtI6aHz3z/UGygYzIBhVug8YjW2FNczYJq+TAsyTmPLDwHUUXEg5dbiTf+jEre1uGAgQQvbsZGCbioOU3GGihEqrlBw26ySVLwtN3H/DF347bq55xkVd6i4WmrunqXgqF9bsMlKc9fhcDgcDuSAn9VThUlTulWSAAAAAElFTkSuQmCC"
    },
    videoUrl: {
        type: String,
        required: true,
    },
    views: {
        type: Number,
        default: 0,
    },
    tags: {
        type: [String],
        default: [],
    },
    likes: {
        type: [String],
        default: [],
    },
    dislikes: {
        type: [String],
        default: [],
    },
},{timestamps: true});

export default mongoose.model('Video', VideoSchema);
module.exports = {

    SUCCESS: {error: 0},
    WRONG_ARGUMENT: {
        error: 1,
        text: "Wrong argument exception"
    },
    INCORRECT_TOKEN: {
        error: 2,
        text: "Incorrect token"
    },
    USER_NOT_FOUND: {
        error: 3,
        text: "User not found"
    },
    USER_EXISTS: {
        error: 4,
        text: "User with this name already exits"
    },
    IMAGE_UPLOAD_FAILED: {
        error: 5,
        text: "Image upload failed"
    }
}

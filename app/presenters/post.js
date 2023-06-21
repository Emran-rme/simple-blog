const { toPersianData } = require("@services/dateService");
const { toPersianNumber } = require("@services/langService");

class Post {
    constructor(post) {
        this.post = post;
    }

    jalaliCreatedAt() {
        return toPersianNumber(toPersianData(this.post.created_at));
    }

    persianViews(){
        return toPersianNumber(this.post.views)
    }

    excerpt(words_limit = 20) {
        const words = this.post.content.split(" ");
        return words.slice(0, words_limit - 1).join(" ") + " ...";
    }
}

module.exports = Post;

const mongoose = require('mongoose');

const { Schema } = mongoose;

const Post = new Schema({
    title: String,
    body: String,
    tags: [String],
    publishedDate: {
        type: Date,
        default: new Date()
    }
});

// 파라미터 : 스키마이름, 스키마객체
// ==> 데이터베이스는 스키마이름을 정해주면, 이 이름의 복수형태로 컬렉션을 생성
//  posts라는 컬렉션이 생성
module.exports = mongoose.model('Post', Post);

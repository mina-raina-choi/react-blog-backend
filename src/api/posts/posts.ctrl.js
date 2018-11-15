let postId = 1;

const posts = [
    {
        id: 1,
        title: 'title',
        body: 'content'
    }
]


// 포스트 작성
// POST /api/posts
// { title, body }

exports.write = (ctx) => {
    // rest api의 request body는 ctx.request.body로 조회
    const {
        title,
        body
    } = ctx.request.body;

    postId += 1;

    const post = { id: postId, title, body};
    posts.push(post);
    ctx.body = post;
}



exports.list = (ctx) => {
    ctx.body = posts;
}

exports.read = (ctx) => {
    const { id } = ctx.params;
    
    const post = posts.find( p => p.id.toString() === id);

    if(!post) {
        ctx.status = 404;
        ctx.body = {
            message:"not found"
        };
        return;
    }

    ctx.body = post;
}


exports.remove = (ctx) => {
    const { id } = ctx.params;

    const index = posts.findIndex(p => p.id.toString() === id);

    if(index === -1) {
        ctx.status = 404;
        ctx.body = {
            message:"not found"
        };
        return;
    }

    posts.splice(index, 1);
    ctx.status = 204; // no content
}



// PUT 전체교환
exports.replace = (ctx) => {
    const { id } = ctx.params;
    const index = posts.findIndex(p => p.id.toString() === id);

    if(index === -1) {
        ctx.status = 404;
        ctx.body = {
            message:"not found"
        };
        return;
    }

    // 아이디를 제외한 기존정보를 날리고, 객체를 새로만듦!
    posts[index] = {
        id,
        ...ctx.request.body
    }

    ctx.body = posts[index];
}


// PATCH는 부분 수정
exports.update = (ctx) => {
    const { id } = ctx.params;
    const index = posts.findIndex(p => p.id.toString() === id);

    if(index === -1) {
        ctx.status = 404;
        ctx.body = {
            message:"not found"
        };
        return;
    }

    // 기존값에 정보를 덮어씌움
    posts[index] = {
        ...posts[index],
        ...ctx.request.body
    }

    ctx.body = posts[index];
}
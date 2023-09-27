const { log } = require('console');
const express=require('express');
const app=express();
const path=require('path');
const methodOverride=require('method-override');
const { v4: uuid } = require('uuid');



let comments=[
    {
        id:uuid(),
        username:"Manoj Tiwari",
        comment:"baby beer peeke nacheli cham cham"
    },
    {
        id:uuid(),
        username:"puneet superstar",
        comment:"aaj kal k berojgar nalle chhapri sale"
    },
    
    {
        id:uuid(),
        username:"ravi kishan",
        comment:"lehnga utha deb remote se"
    },

]
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

app.get('/',(req,res)=>{
    res.send("hello");
});

//Restful Routing
//Read->displaying comments

app.get('/comments',(req,res)=>{
    res.render('index',{
        comments:comments
    });
})

//displayig form for to add new comments 

app.get('/comment/new',(req,res)=>{
    res.render('new');

})

//to Actually add the comment

app.post('/comments',(req,res)=>{
    // console.log(req.body);

    let {username,comment}=req.body;
    comments.push({username,comment,id:uuid()})
    res.redirect('/comments');
})

//showing a particular comments
app.get('/comments/:commentId',(req,res)=>{
    // console.log(req.params);

    let {commentId}=req.params;
    let foundComment=comments.find((item)=>{return item.id==commentId});
    res.render('show',{foundComment});
    // res.send('showing particular comment');
})

//showing the edit form
app.get('/comments/:commentId/edit',(req,res)=>{
    let {commentId}=req.params;
    let foundComment=comments.find((item)=>{return item.id==commentId});
    res.render('edit',{foundComment});
})

//to actually edit the comments
app.patch('/comments/:commentId',(req,res)=>{
    let {commentId}=req.params;
    let foundComment=comments.find((item)=>{return item.id==commentId});
    // console.log(req.body);
    let {comment}=req.body;
    foundComment.comment=comment;
    res.redirect('/comments');
})

//deleting a comment
app.delete('/comments/:commentId',(req,res)=>{
    let {commentId}=req.params;
    let newArr=comments.filter((item)=>{
        return item.id!=commentId;
    })
    comments=newArr;
    res.redirect('/comments');
})

app.listen(8080,()=>{
    console.log("server connected successfully 8080");
});
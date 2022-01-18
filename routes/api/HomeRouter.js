const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const multer = require("multer");
const fs = require("fs");
const { google } = require('googleapis');
const path = require('path');
const bcrypt = require('bcrypt');
require('dotenv').config();

const Events = require('../../models/Events');
const Users = require('../../models/Users');
const Scripts = require('../../models/Scripts');
const Contributes = require('../../models/contributedScripts');

/* Token Verifier */
// Use this token verifier whenever verification of user is required
function verifyToken( req , res , next ) {
    if( !req.headers.authorization ){
        return res.status(401).send( "Unauthorized request ")
    }
    let token = req.headers.authorization.split(' ')[1]
    if( token === 'null' )
    {
        return res.status(401).send( "Unauthorized req ")
    }
    let payload = jwt.verify( token,'secretKey')
    if( !payload ){
        return res.status(401).send( "Unauthorized user ")
    }
    req.userId = payload.subject
    next()
}
/* END Token Verifier */

router.get('/events',(req,res)=>{
    Events.find()
    .sort({date:-1})
    .then((events)=>{res.status(200).json({'success':true,'events':events})})
    .catch(err => console.log(err));
});

router.get('/events/:id',(req,res)=>{
    Events.findById(req.params.id)
    .then((event)=>{
        if(event){
            res.status(200).json({
                'success':true,
                'presentername':event.PresenterName,
                'title':event.EventTitle,
                'description':event.Description,
                'date':event.Date,
                'link':event.EventLink,
                'url':event.ImageUrl
            });
        }else{
            res.status(404).json({'success':false});
        }
    })
    .catch((err)=>{
        console.log(err.toString())
    });
});

// router.post('/events',(req,res)=>{
//     const PresenterName = req.body.presenter_name;
//     const EventTitle = req.body.event_title;
//     const Description = req.body.description;
//     const Link = req.body.link;
//     const ImageUrl = req.body.imageUrl;
//     const date = req.body.date;
//     const event = new Events({
//         PresenterName:PresenterName,
//         EventTitle : EventTitle,
//         Description:Description,
//         EventLink : Link,
//         ImageUrl:ImageUrl,
//         Date:date,
//     });
//     event.save((err)=>{
//         if(err){
//             console.log(err.toString());
//             console.log('Error Occurred while adding');
//             res.status(404).json({'success':false})
//         }else{
//             res.status(200).json({'success' : true});
//         }
//     });
// });

/* Image Upload with google drive API */

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URI = process.env.REDIRECT_URI;
const REFRESH_TOKEN = process.env.REFRESH_TOKEN;

const oauth2Client = new google.auth.OAuth2(
    CLIENT_ID,CLIENT_SECRET,REDIRECT_URI
);

oauth2Client.setCredentials({refresh_token:REFRESH_TOKEN})

const drive = google.drive({
    version:'v3',
    auth:oauth2Client
})

let user_img_name,user_img_ext,isValidImage;
const MIME_TYPE_MAP = {
    'image/png': 'png',
    'image/jpeg': 'jpeg',
    'image/jpg': 'jpg'
};
const imageStorage = multer.diskStorage({
    destination: (req,file,callback) => {
        isValidImage = MIME_TYPE_MAP[file.mimetype];
        let error = new Error("Invalid Mime Type");
        if(isValidImage){
            user_img_ext = file.mimetype;
            error = null;
        }
        callback(error,"images"); //path should be relative to server.js file
    },
    filename: (req,file,callback) => {
        const name = file.originalname.toLowerCase().split(' ').join('-');
        let ext = MIME_TYPE_MAP[file.mimetype];
        user_img_name = req.body.name+'.'+ ext;
        callback(null,user_img_name);
    }
});

async function generatePublicUrl(file_Id){
    try{
        const fileId = file_Id
        await drive.permissions.create({
            fileId: fileId,
            requestBody:{
                role:'reader',
                type:'anyone'
            }
        })

        const result = await drive.files.get({
            fileId: fileId,
            fields: 'webViewLink, webContentLink'
        })

        console.log(result.data);
    }catch(error){
        console.log(error.message);
    }
}


async function uploadFile(filename,ext) {

    const filePath = path.join(__dirname,'../../images/'+filename)

    try{
        const response = await drive.files.create({
            requestBody:{
                name:'event-image.png',
                mimeType: 'image/png'
            },
            media:{
                mimeType:'image/png',
                body: fs.createReadStream(filePath)
            }
        })

        console.log(response.data);
        await generatePublicUrl(response.data.id);
        return response.data.id;
    } catch(error){
        console.log(error.message);
        return null;
    }
}

async function deleteFile(id) {
    try{
        const response = await drive.files.delete({
            fileId: id,
        });
        console.log(response.data,response.status);
    } catch(error){
        console.log(error.message);
    }
}

router.post('/events',multer({storage:imageStorage}).single("image"),async (req,res)=>{
    const PresenterName = req.body.presenter_name;
    const EventTitle = req.body.event_title;
    const Description = req.body.description;
    const Link = req.body.link;
    const uploadedFileId = await uploadFile(user_img_name,user_img_ext);
    let imgUrl = ''
    if(uploadedFileId)  imgUrl = "https://drive.google.com/uc?export=view&id=" + uploadedFileId;

    const date = req.body.date;
    const event = new Events({
        PresenterName:PresenterName,
        EventTitle : EventTitle,
        Description:Description,
        EventLink : Link,
        ImageUrl:imgUrl,
        Date:date,
    });
    event.save((err)=>{
        if(err){
            res.status(404).json({'success':false})
        }else{
            res.status(200).json({'success' : true});
        }
    });
});

router.post('/events/:id',multer({storage:imageStorage}).single("image"), async (req,res)=>{
    const presentername = req.body.presenter_name;
    const title = req.body.event_title;
    const link = req.body.link;
    const description = req.body.description;
    let imgUrl = null;
    console.log("isValidImage :",isValidImage);
    if(isValidImage){
        const uploadedFileId = await uploadFile(user_img_name,user_img_ext);
        if(uploadedFileId)  imgUrl = "https://drive.google.com/uc?export=view&id=" + uploadedFileId;
    }
    const url = imgUrl;
    const date = req.body.date;

    Events.findById(req.params.id)
        .then((event)=>{
            event.PresenterName=presentername;
            event.EventTitle=title;
            event.Description=description;
            if(url!=null){
                const fileId = event.ImageUrl;
                deleteFile(fileId.split('id=')[1]).then(() => {
                    console.log('File Deleted Successful')
                });
                event.ImageUrl=url;
            }
            event.EventLink=link;
            event.Date=date;
            event.save().then(()=>{
                res.status(200).json({'success':true})
            })
                .catch((err)=>{
                    console.log(err.toString());
                });
        })
        .catch((err)=>{
            console.log(err.toString());
        })
})

router.delete('/events/:id',(req,res)=>{
    Events.findById(req.params.id)
    .then((event)=>{
        if(!event){
            res.status(404).json({failure : 'No Such Id'});
        }
        else{
            const fileId = event.ImageUrl;
            console.log(fileId.split('id=')[1]);
            deleteFile(fileId.split('id=')[1]).then(() => {
                console.log('File Deleted Successful')
            })
            event.remove()
            .then(()=>{res.status(200).json({success : true})})
            .catch((err)=> {res.status(404).json({success : false})});
        }
    }).catch(err => {console.log(err.toString());});
});


//Login Page Routers
router.get('/login',(req,res)=>{
    res.json({'Hello':'From Server'});
});

router.post('/login/add',async (req,res)=>{
    const email = req.body.email;
    const password = req.body.password;
    const username = req.body.username;
    const name = req.body.name;
    const isjs =true;

    const userExists = await Users.findOne({ Email: email});
    if(userExists)
        return res.json({'success':false, message:"User already exists"});

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password,salt);
    const user = new Users({
        Email:email,
        Password:hashedPassword,
        Username:username,
        Name:name,
        isJs:isjs
    });

    user.save().then(response =>{
        res.status(200).json({'success':true, message:"Registration Successful"});
    }).catch((err)=>{
        console.log(err.toString());
    });
});

router.post('/login',(req,res)=>{

    try {
        Users.find({ Email: req.body.email }).then(async (currentUser)=>{
            console.log(currentUser);
            if (currentUser !== []) {
                console.log(currentUser[0].Password, req.body.password)
                if (await bcrypt.compare(req.body.password,currentUser[0].Password)) {

                    console.log("Password match")
                    const id = currentUser[0]._id;
                    const username = currentUser[0].Username;
                    const email = currentUser[0].Email;
                    const payload = {id,username,email};
                    jwt.sign( payload, 'secretKey',{expiresIn:"1d"}, (err,token) => {
                        if(err) console.log(err);
                        else{
                            return res.status(200).json({'success':true,'username':currentUser.Username,'name':currentUser.Name , token:token})
                        }
                    });
                }
                else {
                    console.log("password mismatch")
                    return res.status(200).json({'success':false,message: "Invalid EmailID or Password"})
                }
            }
            else {
                console.log("Email mismatch")
                return res.status(200).json({'success':false,message: "Invalid EmailID or Password"})
            }
        })
            .catch((e)=>{
                console.log("Email mismatch error caught ")
                return res.status(200).json({'success':false,"message": "Invalid EmailID"})
             })
    } catch (error) {
        return res.status(200).json({'success':false,"message": "Invalid EmailID or Password"})
    }

});

//Scripts Page Routes

router.get('/scripts',(req,res)=>{
    Scripts.find().then((scripts)=>{
        if(scripts.length>0){
            res.status(200).json(scripts);
        }
    }).catch((err)=>{
        console.log(err.toString());
        res.status(404).json({'success':false});
    })
});

router.get('/scripts/:id',(req,res)=>{
    Scripts.findById( req.params.id )
    .then((script)=>{
        res.status(200).json(script);
    })
    .catch((err)=>{
        console.log(err.toString());
    });
})

router.post('/scripts',multer({storage:imageStorage}).single("image"),async(req,res)=>{
    const title= req.body.title;
    const content=req.body.content;
    const email=req.body.email;
    const contributor = req.body.contributor;

    let imgUrl = null;
    console.log("isValidImage :",isValidImage);
    if(isValidImage){
        const uploadedFileId = await uploadFile(user_img_name,user_img_ext);
        console.log("inside api");
        if(uploadedFileId)  imgUrl = "https://drive.google.com/uc?export=view&id=" + uploadedFileId;
    }

    const script = new Scripts({
        Email:email,
        Content:content,
        Title:title,
        Contributor:contributor,
        ImageUrl:imgUrl,
        Date:new Date()
    });
    script.save().then(()=>{
        res.status(200).json({'success':true});
    }).catch((err)=>{
        console.log(err.toString());
        res.status(200).json({'success':false,'message':'error in uploading...'});
    })
});

router.post('/scripts/:id',multer({storage:imageStorage}).single("image"),async (req,res)=>{

    const contributor = req.body.contributor
    const title = req.body.title
    const email = req.body.email
    const content = req.body.content
    const acceptor = req.body.acceptor

    console.log("isValidImage :",isValidImage);
    let imgUrl = null;
    if(isValidImage){
        const uploadedFileId = await uploadFile(user_img_name,user_img_ext);
        if(uploadedFileId)  imgUrl = "https://drive.google.com/uc?export=view&id=" + uploadedFileId;
    }
    const url = imgUrl;
    const date = new Date();

    Scripts.findById(req.params.id)
        .then((script)=>{
            if(script){
                script.Contributor=contributor
                script.Email = email
                script.Content=content
                script.Title=title
                script.Acceptor=acceptor

                if(url!=null){
                    const fileId = script.ImageUrl;
                    deleteFile(fileId.split('id=')[1]).then(() => {
                        console.log('File Deleted Successful')
                    })
                    script.ImageUrl=url;
                }
                script.Date = date
                script.save().then(()=>{
                    res.status(200).json({'success':true})
                })
                    .catch((err)=>{
                        console.log(err.toString())
                        res.status(404).json({'success':false,'message':'Error In Saving'})
                    })
            }else{
                res.status(404).json({'success':false})
            }
        })
        .catch((err)=>{
            console.log(err.toString());
        })
})

router.delete('/scripts/:id',(req,res)=>{

    Scripts.findById(req.params.id)
        .then((script)=>{
            if(!script){
                res.status(404).json({failure : 'No Such Id'});
            }
            else{
                const fileId = script.ImageUrl;
                deleteFile(fileId.split('id=')[1]).then(() => {
                    console.log('File Deleted Successful')
                })
                script.remove()
                    .then(()=>{res.status(200).json({success : true})})
                    .catch((err)=> {res.status(404).json({success : false})});
            }
        }).catch(err => {console.log(err.toString());});
})


//contribute-scripts page router
router.get('/contribute-scripts',(req,res)=>{
    Contributes.find()
    .then((contributes)=>{
        if(contributes && contributes.length>0){
            res.status(200).json({'success':true,'contributes':contributes});
        }
        else{
            res.status(404).json({'success':false})
        }
    })
    .catch((err)=>{
        console.log(err.toString());
    });
});

router.get('/contribute-scripts/:id',(req,res)=>{
    Contributes.findById(req.params.id).then((contribute)=>{
        if(contribute){
            res.status(200).json(contribute)
        }
        else{
            res.status(404).json({'success':false});
        }
    })
    .catch((err)=>{
        console.log(err.toString())
    })
})

router.post('/contribute-scripts',multer({storage:imageStorage}).single("image"),async(req,res)=>{
    const contributor = req.body.contributor
    const title =req.body.title
    const content = req.body.content
    const email = req.body.email

    let imgUrl = null;
    console.log("isValidImage :",isValidImage);
    if(isValidImage){
        const uploadedFileId = await uploadFile(user_img_name,user_img_ext);
        console.log("inside api");
        if(uploadedFileId)  imgUrl = "https://drive.google.com/uc?export=view&id=" + uploadedFileId;
    }

    const contribute = new Contributes({
        Contributor:contributor,
        Title : title,
        Email:email,
        Content:content,
        ImageUrl:imgUrl,
        Date:new Date()
    });
    contribute.save().then(()=>{
        res.status(200).json({'success':true})
    })
    .catch((err)=>{
        console.log(err.toString())
        res.status(404).json({'success':false,'message':'error in uploading...'})
    })

});

router.post('/contribute-scripts/:id',multer({storage:imageStorage}).single("image"),async (req,res)=>{

    const contributor = req.body.contributor
    const title = req.body.title
    const email = req.body.email
    const content = req.body.content
    const acceptor = req.body.acceptor

    console.log("isValidImage :",isValidImage);
    let imgUrl = null;
    if(isValidImage){
        const uploadedFileId = await uploadFile(user_img_name,user_img_ext);
        if(uploadedFileId)  imgUrl = "https://drive.google.com/uc?export=view&id=" + uploadedFileId;
    }
    const url = imgUrl;
    const date = req.body.date;

    Contributes.findById(req.params.id)
        .then((contribute)=>{
            if(contribute){
                contribute.Contributor=contributor
                contribute.Email = email
                contribute.Content=content
                contribute.Title=title
                contribute.Acceptor=acceptor
                if(url!=null){
                    const fileId = contribute.ImageUrl;
                    deleteFile(fileId.split('id=')[1]).then(() => {
                        console.log('File Deleted Successful')
                    })
                    contribute.ImageUrl=url;
                }
                contribute.Date = new Date();
                contribute.save().then(()=>{
                    res.status(200).json({'success':true})
                })
                    .catch((err)=>{
                        console.log(err.toString())
                        res.status(404).json({'success':false,'message':'Error In Saving'})
                    })
            }else{
                res.status(404).json({'success':false})
            }
        })
        .catch((err)=>{
            console.log(err.toString());
        })

})

router.post('/add-contributed-script/:id',(req,res)=>{
    let contributor, title, email, content, acceptor = req.body.acceptor , imageurl, date;
    Contributes.findById(req.params.id).then((contribute)=>{
        if(contribute){
            contributor = contribute.Contributor
            title = contribute.Title
            email = contribute.Email
            content = contribute.Content
            acceptor = contribute.Acceptor
            imageurl = contribute.ImageUrl
            date = contribute.Date

            contribute.remove().then(()=>{
                const script = new Scripts({
                    Contributor:contributor,
                    Title:title,
                    Email:email,
                    Content:content,
                    Date:date,
                    ImageUrl:imageurl
                })

                script.save().then(()=>{
                    res.status(200).json({'success':true})
                }).catch((err)=>{
                        res.status(404).json({'success':false})
                        console.log(err.toString())
                    });
            }).catch((err)=>{console.log(err.toString())});
        }
        else{
            console.log('No Such ID')
            res.status(404).json({'success':false,'message':'No such ID'})
        }
    })
        .catch((err)=>{
            console.log(err.toString())
            req.status(404).json({'success':false})
        })
})

router.delete('/contribute-scripts/:id',(req,res)=>{

    Contributes.findById(req.params.id)
        .then((contribute)=>{
            if(!contribute){
                res.status(404).json({failure : 'No Such Id'});
            }
            else{
                const fileId = contribute.ImageUrl;
                deleteFile(fileId.split('id=')[1]).then(() => {
                    console.log('File Deleted Successful')
                })
                contribute.remove()
                    .then(()=>{res.status(200).json({success : true})})
                    .catch((err)=> {res.status(404).json({success : false})});
            }
        }).catch(err => {console.log(err.toString());});
});

module.exports = router;

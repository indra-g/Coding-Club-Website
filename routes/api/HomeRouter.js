const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const multer = require("multer");
const fs = require("fs");
const { google } = require('googleapis');
const path = require('path');

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
router.post('/events/:id',(req,res)=>{
    const presentername = req.body.presentername;
    const title = req.body.title;
    const link = req.body.link;
    const description = req.body.description;
    const url=req.body.imageurl;
    const date = req.body.date;

    Events.findById(req.params.id)
    .then((event)=>{
        event.PresenterName=presentername;
        event.EventTitle=title;
        event.Description=description;
        event.ImageUrl=url;
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
const CLIENT_ID = '492089325216-tvhvcd3367hn0vrq587a3ssm9s8oobr6.apps.googleusercontent.com';
const CLIENT_SECRET = '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';
const REDIRECT_URI = 'https://developers.google.com/oauthplayground';
const REFRESH_TOKEN = '1//04yAwALQuhMzPCgYIARAAGAQSNwF-L9Ir_H0KJ6lnq4xvDblPkBynZNoDC_9UPri909NZwuUYkUJB6B7G_8oy1xm5fW9n2MlXBFc';

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
        //console.log(file,MIME_TYPE_MAP[file.mimetype]);
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
        //const fileId = '1Q8KOOPU2vw-MjUzCeaUTvY5cDFVNb5z5'
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

router.post('/events',multer({storage:imageStorage}).single("image"),async (req,res)=>{
    const PresenterName = req.body.presenter_name;
    const EventTitle = req.body.event_title;
    const Description = req.body.description;
    const Link = req.body.link;
    const uploadedFileId = await uploadFile(user_img_name,user_img_ext);
    let imgUrl = ''
    if(uploadedFileId)  imgUrl = "https://drive.google.com/uc?export=view&id=" + uploadedFileId;

    //const ImageUrl = req.body.imageUrl;
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
            console.log(err.toString());
            console.log('Error Occurred while adding');
            res.status(404).json({'success':false})
        }else{
            res.status(200).json({'success' : true});
        }
    });
});

router.delete('/events/:id',(req,res)=>{
    Events.findById(req.params.id)
    .then((event)=>{
        if(!event){
            res.status(404).json({failure : 'No Such Id'});
        }
        else{
            event.remove()
            .then(()=>{res.status(200).json({success : true})})
            .catch((err)=> {res.status(404).json({success : false})});
        }
    })
    .catch(err => {
        console.log(err.toString());
    });
});


//Login Page Routers
router.get('/login',(req,res)=>{
    res.json({'Hello':'From Server'});
});

router.post('/login/add',(req,res)=>{
    const email = req.body.email;
    const password = req.body.password;
    const username = req.body.username;
    const name = req.body.name;
    const isjs =true;

    // console.log(email,username,name,password,isjs);

    const user = new Users({
        Email:email,
        Password:password,
        Username:username,
        Name:name,
        isJs:isjs
    });

    user.save().then(response =>{
        let payload = {subject:user._id,username:username}
        //console.log("The signed in user :" , user._id)
        let token = jwt.sign( payload, 'secretKey')
        res.status(200).json({'success':true, "name" : name ,"token":token});
    }).catch((err)=>{
        console.log(err.toString());
    });
});

router.post('/login',(req,res)=>{
    /*const email = req.body.email;
    const password = req.body.password;
    Users.find({Email:email}).then((users)=>{
        users.forEach((user)=>{
            if(user.Password==password){
                res.status(200).json({'success':true,'username':user.Username,'name':user.Name})
            }
            else{
                res.status(200).json({
                    'success':false,
                });
            }
        });
    }).catch((err)=>{
        console.log(err.toString());
    });*/

    try {
        Users.find({ Email: req.body.email }).then((currentUser)=>{
            console.log(currentUser);
            if (currentUser !== []) {
                console.log(currentUser[0].Password, req.body.password)
                if (currentUser[0].Password === req.body.password) {

                    console.log("Password match")
                    const id = currentUser[0]._id;
                    const username = currentUser[0].Username;
                    const payload = {id,username};
                    jwt.sign( payload, 'secretKey',{expiresIn:"1d"}, (err,token) => {
                        if(err) console.log(err);
                        else{
                            return res.status(200).json({'success':true,'username':currentUser.Username,'name':currentUser.Name , token:token})
                            //return res.status(200).json({'success':true,'username':currentUser.Username,'name':currentUser.Name , 'token':token})
                        }
                    });
                    //console.log("Token Gen is : " , token )
                    //return res.status(200).json({ currentUser: currentUser, message: "successfully"});
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
        //console.log( script )
        res.status(200).json(script);
    })
    .catch((err)=>{
        console.log(err.toString());
    });
})

router.post('/scripts',(req,res)=>{
    const title= req.body.title;
    const content=req.body.content;
    const email=req.body.email;
    const contributor = req.body.contributor;
    const script = new Scripts({
        Email:email,
        Content:content,
        Title:title,
        Contributor:contributor
    });
    script.save().then(()=>{
        res.status(200).json({'success':true});
    }).catch((err)=>{
        console.log(err.toString);
    })
});

router.post('/scripts/:id',(req,res)=>{
    const title = req.body.title;
    const contributor = req.body.contributor;
    const content = req.body.content;
    const email = req.body.email;
    Scripts.findById(req.params.id)
    .then((script)=>{
        script.Contributor = contributor;
        script.Title = title;
        script.Content = content;
        script.Email = email;
        script.save().then(()=>{
            console.log('Edited Successfully');
            res.status(200).json({'success':true});
        }).catch((err)=>{
            console.log(err.toString());
            res.status(404).json({'success':false});
        });
    })
    .catch((err)=>{
        console.log(err)
    });
})

router.delete('/scripts/:id',(req,res)=>{
    Scripts.findById(req.params.id)
    .then((script)=>{
        if(script){
            script.remove()
            .then(()=>{res.status(200).json({'success':true});})
            .catch((err)=>{console.log(err.toString())});
            
        }else{
            res.status(404).json({'success':false});
        }
    })
    .catch((err)=>{
        console.log(err);
    })
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

router.post('/contribute-scripts',(req,res)=>{
    const contributor = req.body.contributor
    const title =req.body.title
    const content = req.body.content
    const email = req.body.email
    const acceptor = ''
    const contribute = new Contributes({
        Contributor:contributor,
        Title : title,
        Email:email,
        Content:content,
        Acceptor:acceptor,
    });
    contribute.save().then(()=>{
        res.status(200).json({'success':true})
    })
    .catch((err)=>{
        console.log(err.toString())
        res.status(404).json({'success':false})
    })

});
router.post('/contribute-scripts/:id',(req,res)=>{
    const contributor = req.body.contributor
    const title = req.body.title
    const email = req.body.email
    const content = req.body.content
    const acceptor = req.body.acceptor
    Contributes.findById(req.params.id).then((contribute)=>{
        if(contribute){
            contribute.Contributor=contributor
            contribute.Email = email
            contribute.Content=content
            contribute.Title=title
            contribute.Acceptor=acceptor
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

})
router.post('/add-contributed-script/:id',(req,res)=>{
    var contributor;
    var title ;
    var content ;
    var email ;
    const acceptor = req.body.acceptor;
    Contributes.findById(req.params.id).then((contribute)=>{
        if(contribute){
            contributor = contribute.Contributor
            title = contribute.Title
            email = contribute.Email
            content = contribute.Content
            contribute.Acceptor = acceptor
            contribute.save().then(()=>{
                // res.status(200).json({'success':true})
            })
            .catch((err)=>{
            console.log(err.toString())
            })
            const script = new Scripts({
                Contributor:contributor,
                Title:title,
                Email:email,
                Content:content
            })
        
            script.save().then(()=>{
                res.status(200).json({'success':true})
            })
            .catch((err)=>{
                res.status(404).json({'success':false})
                console.log(err.toString())
            })
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
    Contributes.findById(req.params.id).then((contribute)=>{
        contribute.remove().then(()=>{
            res.status(200).json({'success':true})
        })
        .catch((err)=>{
            console.log(err.toString())
            res.status(404).json({'success':false})
        })
    })
    .catch((err)=>{
        console.log(err.toString())
        res.status(200).json({'success':false})
    })
})
module.exports = router;

const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
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
router.post('/events',(req,res)=>{
    const PresenterName = req.body.presenter_name;
    const EventTitle = req.body.event_title;
    const Description = req.body.description;
    const Link = req.body.link;
    const ImageUrl = req.body.imageUrl;
    const date = req.body.date;
    const event = new Events({
        PresenterName:PresenterName,
        EventTitle : EventTitle,
        Description:Description,
        EventLink : Link,
        ImageUrl:ImageUrl,
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

    user.save().then((k)=>{
        let payload = { subject : user._id }
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
                    let payload = { subject : currentUser._id }
                    let token = jwt.sign( payload, 'secretKey')
                    //console.log("Token Gen is : " , token )
                    return res.status(200).json({'success':true,'username':currentUser.Username,'name':currentUser.Name , 'token':token })
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

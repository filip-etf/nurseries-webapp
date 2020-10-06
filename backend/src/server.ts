import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';

const app = express();

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/project_jun2020');

const connection = mongoose.connection;

connection.once('open', ()=>{
    console.log('mongo open');
})

const router = express.Router();

import User from './models/user';
import Request from './models/request';
import Farmer from './models/farmer';
import Company from './models/company';
import Product_request from './models/product_request';
import Product_base from './models/product_base';
import seedling_details from './models/seedling_details';
import Comment from './models/comment';
import preparation_details from './models/preparation_details';
import Delivers from './models/delivers';
import Nursery from './models/nursery';
import Stockroom from './models/stockroom';
import Product_shop from './models/product_shop';
import product_request from './models/product_request';
import Business_report from './models/business_report';
import Update from './models/update';

//=======================LOGIN=======================//

router.route('/login').post(
    (req, res)=>{
        let username = req.body.username;
        let password = req.body.password;

        User.find({'username':username, 'password':password},
         (err,user)=>{
             //console.log(user);
            if(err) console.log(err);
            else res.json(user);
        })
    }
);

router.route('/find_company').post(
    (req, res)=>{
        let username = req.body.username;

        Company.find({'company_acronym':username},
         (err,user)=>{
             //console.log(user);
            if(err) console.log(err);
            else res.json(user);
        })
    }
);

router.route('/load_update').post(
    (req, res)=>{
        let username = req.body.username

        Update.find({'username':username},
         (err,user)=>{
             //console.log(user);
            if(err) console.log(err);
            else res.json(user);
        })
    }
);

router.route('/timer_update').post(
    (req, res) =>{
        let username = req.body.username;
        let time = req.body.time;

        Update.collection.updateOne({'username':username}, {$set:{'time':time}}).
        then(request=>{
            res.status(200).json({'request':'ok'});
        }).catch(err=>{
            res.status(400).json({'request':'no'});
        });
    }
);

//=======================REGISTER=======================//

router.route('/register').post((req, res)=>{
    let request = new Request(req.body);
    
    request.save().
        then(request=>{
            res.status(200).json({'request':'ok'});
        }).catch(err=>{
            res.status(400).json({'request':'no'});
        })
});

//=======================NEW PASSWORD=======================//

router.route('/change_password').post(
    (req, res) =>{
        let username = req.body.username;
        let password = req.body.password;

        // console.log(username);
        // console.log(password);

        Farmer.collection.updateOne({'username':username}, {$set:{'password':password}});
        Company.collection.updateOne({'company_acronym':username}, {$set:{'password':password}});
        User.collection.updateOne({'username':username}, {$set:{'password':password}}).
        then(request=>{
            res.status(200).json({'request':'ok'});
        }).catch(err=>{
            res.status(400).json({'request':'no'});
        });
    }
);

//=======================ADMIN=======================//

router.route('/load_requests').post(
    (req, res)=>{
        Request.find({},
         (err,requests)=>{
            // console.log(requests);
            if(err) console.log(err);
                else res.json(requests);
        })
    }
);

router.route('/remove_request').post((req, res)=>{

    // console.log(req.body.username);
    Request.collection.findOneAndDelete({'username': req.body.username});
    Request.collection.deleteOne({'company_acronym': req.body.username});

});

router.route('/add_farmer').post((req, res)=>{
    let request = new Farmer(req.body);
    let update = new Update(req.body)
    // console.log(request);

    update.save();

    request.save().
        then(request=>{
            res.status(200).json({'request':'ok'});
        }).catch(err=>{
            res.status(400).json({'request':'no'});
        })
});

router.route('/add_company').post((req, res)=>{
    let request = new Company(req.body);
    let delivers = new Delivers(req.body);
    //console.log(request);

    delivers.save();

    request.save().
        then(request=>{
            res.status(200).json({'request':'ok'});
        }).catch(err=>{
            res.status(400).json({'request':'no'});
        })
});

router.route('/add_user').post((req, res)=>{
    let user = new User(req.body);
    // console.log(request);

    user.save().
        then(request=>{
            res.status(200).json({'request':'ok'});
        }).catch(err=>{
            res.status(400).json({'request':'no'});
        })
});

router.route('/load_companies').post(
    (req, res)=>{
        Company.find({},
         (err,requests)=>{
            // console.log(requests);
            if(err) console.log(err);
                else res.json(requests);
        })
    }
);

router.route('/load_farmers').post(
    (req, res)=>{
        Farmer.find({},
         (err,requests)=>{
            // console.log(requests);
            if(err) console.log(err);
                else res.json(requests);
        })
    }
);

router.route('/delete_user').post((req, res)=>{

    User.collection.findOneAndDelete({'username': req.body.username});

    Farmer.collection.findOneAndDelete({'username': req.body.username});

    Company.collection.findOneAndDelete({'company_acronym': req.body.username});

    Stockroom.collection.findOneAndDelete({'farmer': req.body.username});

    Delivers.collection.findOneAndDelete({'company': req.body.username});

    Business_report.collection.findOneAndDelete({'company': req.body.username});

    Product_base.collection.findOneAndDelete({'username': req.body.username});

    Nursery.collection.findOneAndDelete({'farmer': req.body.username});

    Update.collection.findOneAndDelete({'username': req.body.username});
});

router.route('/update_company').post(
    (req, res) =>{
        let user_username = req.body.user_username;
        let company_name =  req.body.company_name;
        let company_acronym = req.body.company_acronym;
        let password = req.body.password;
        let foundation_date = req.body.foundation_date;
        let location = req.body.location;
        let mail = req.body.mail;

        // console.log(req.body);

        Company.collection.updateOne({'company_acronym':user_username}, {$set:{'company_name':company_name, 'company_acronym':company_acronym, 'password':password, 'foundation_date':foundation_date, 'location':location, 'mail':mail}});
        User.collection.updateOne({'username':user_username}, {$set:{'username':company_acronym, 'password':password}}).
        then(request=>{
            res.status(200).json({'request':'ok'});
        }).catch(err=>{
            res.status(400).json({'request':'no'});
        });
    }
);

router.route('/update_farmer').post(
    (req, res) =>{
        let user_username = req.body.user_username;
        let firstname = req.body.firstname;
        let lastname = req.body.lastname;
        let username = req.body.username;
        let password = req.body.password;
        let birthday_date = req.body.birthday_date;
        let birthday_place = req.body.birthday_place;
        let phone = req.body.phone;
        let mail = req.body.mail;

        // console.log(req.body);

        Farmer.collection.updateOne({'username':user_username}, {$set:{'firstname': firstname, 'lastname':lastname, 'username':username, 'password':password, 'birthday_date':birthday_date, 'birthday_place':birthday_place, 'phone':phone, 'mail':mail}});
        User.collection.updateOne({'username':user_username}, {$set:{'username':username, 'password':password}}).
        then(request=>{
            res.status(200).json({'request':'ok'});
        }).catch(err=>{
            res.status(400).json({'request':'no'});
        });
    }
);

//=======================COMPANY=======================//

router.route('/load_product_requests').post(
    (req, res)=>{
        Product_request.find({'producer': req.body.company},
         (err,requests)=>{
            // console.log(req.body.company);
            if(err) console.log(err);
                else res.json(requests);
        })
    }
);

router.route('/load_product_base').post(
    (req, res)=>{
        Product_base.find({'username': req.body.username},
         (err,requests)=>{
            // console.log(requests);
            if(err) console.log(err);
                else res.json(requests);
        })
    }
);

router.route('/load_delivers').post(
    (req, res)=>{
        Delivers.find({'company': req.body.company},
         (err,requests)=>{
            if(err) console.log(err);
                else res.json(requests);
        })
    }
);

router.route('/load_seedling').post(
    (req, res)=>{
        seedling_details.find({'name': req.body.name},
         (err,requests)=>{
            // console.log(requests);
            if(err) console.log(err);
                else res.json(requests);
        })
    }
);

router.route('/load_preparation').post(
    (req, res)=>{
        preparation_details.find({'name': req.body.name},
         (err,requests)=>{
            // console.log(requests);
            if(err) console.log(err);
                else res.json(requests);
        })
    }
);

router.route('/load_preparations').post(
    (req, res)=>{
        preparation_details.find({'type': 'preparation'},
         (err,preparations)=>{
            // console.log(requests);
            if(err) console.log(err);
                else res.json(preparations);
        })
    }
);

router.route('/load_comments').post(
    (req, res)=>{
        Comment.find({'company': req.body.company, 'product_name': req.body.product_name},
         (err,requests)=>{
            // console.log(req.body.requestsw);
            if(err) console.log(err);
                else res.json(requests);
        })
    }
);

router.route('/new_seedling').post(
    (req, res)=>{
        let seedling = new seedling_details(req.body);
        // console.log(seedling);

        seedling.save().
            then(request=>{
                res.status(200).json({'request':'ok'});
            }).catch(err=>{
                res.status(400).json({'request':'no'});
            });
    }
);

router.route('/new_preparation').post(
    (req, res)=>{
        let preparation = new preparation_details(req.body);
        // console.log(preparation);
    
        preparation.save().
            then(request=>{ 
                res.status(200).json({'request':'ok'});
            }).catch(err=>{
                res.status(400).json({'request':'no'});
            }); 
    }
);

router.route('/delete_request').post((req, res)=>{
    // console.log(req.body.farmer);
    // console.log(req.body.nursery);
    // console.log(req.body.producer);

    Product_request.collection.findOneAndDelete({'username': req.body.farmer, 'nursery_name' : req.body.nursery, 'producer' : req.body.producer}).
    then(request=>{
        res.status(200).json({'request':'ok'});
    }).catch(err=>{
        res.status(400).json({'request':'no'});
    });

});

router.route('/delete_product').post((req, res)=>{
    console.log(req.body.name);

    Product_base.collection.findOneAndDelete({'name': req.body.name});

});

router.route('/update_request_status').post(
    (req, res) =>{

        let farmer = req.body.farmer;
        let comapany = req.body.company;
        let nursery = req.body.nursery
        // console.log(req.body);

        product_request.collection.updateOne({'username':farmer, 'producer': comapany, 'nursery_name': nursery}, {$set:{'status':req.body.status}}).
        then(request=>{
            res.status(200).json({'request':'ok'});
        }).catch(err=>{
            res.status(400).json({'request':'no'});
        });
    }
);

router.route('/update_deliver').post(
    (req, res) =>{

        let comapany = req.body.company;
        // console.log(req.body);

        Delivers.collection.updateOne({'company': comapany}, {$set:{'delivers':req.body.delivers}}).
        then(request=>{
            res.status(200).json({'request':'ok'});
        }).catch(err=>{
            res.status(400).json({'request':'no'});
        });
    }
);

router.route('/load_business_report').post(
    (req, res)=>{
        Business_report.find({'company': req.body.company, 'day': {$gte: req.body.date}},
         (err,requests)=>{
            // console.log(requests);
            if(err) console.log(err);
                else res.json(requests);
        })
    }
);

//=======================FARMER=======================//
router.route('/load_nursery').post(
    (req, res)=>{
        Nursery.find({'farmer': req.body.farmer},
         (err,requests)=>{
            // console.log(req.body.company);
            if(err) console.log(err);
                else res.json(requests);
        })
    }
);

router.route('/find_nursery').post(
    (req, res)=>{
        Nursery.find({'farmer': req.body.farmer, 'name': req.body.nursery},
         (err,requests)=>{
            // console.log(requests);
            if(err) console.log(err);
                else res.json(requests);
        })
    }
);

router.route('/add_nursery').post((req, res)=>{
    let nursery = new Nursery(req.body);
    let stockroom = new Stockroom(req.body);
    // console.log(nursery);

    stockroom.save();

    nursery.save().
        then(request=>{
            res.status(200).json({'request':'ok'});
        }).catch(err=>{
            res.status(400).json({'request':'no'});
        })
});

router.route('/update_nursery').post(
    (req, res) =>{
        // console.log(req.body.nursery.farmer);
        Nursery.collection.updateOne({'farmer':req.body.nursery.farmer, 'name': req.body.nursery.name}, {$set:{'water':req.body.nursery.water, 'temperature':req.body.nursery.temperature, 'plants':req.body.nursery.plants}}).
        then(request=>{
            console.log('ok');
            res.status(200).json({'request':'ok'});
        }).catch(err=>{
            res.status(400).json({'request':'no'});
        });;
    }
);

router.route('/load_stockroom').post(
    (req, res)=>{
        Stockroom.find({'farmer': req.body.farmer, 'nursery': req.body.nursery},
         (err,requests)=>{
            // console.log(req.body.stockroom);
            if(err) console.log(err);
                else res.json(requests);
        })
    }
);

router.route('/load_farmer_stockrooms').post(
    (req, res)=>{
        Stockroom.find({'farmer': req.body.farmer},
         (err,requests)=>{
            // console.log(req.body.stockroom);
            if(err) console.log(err);
                else res.json(requests);
        })
    }
);

router.route('/load_product_shop').post(
    (req, res)=>{
        Product_shop.find({},
         (err,product_shop)=>{
            // console.log(req.body.product_shop);
            if(err) console.log(err);
                else res.json(product_shop);
        })
    }
);

router.route('/add_comment').post((req, res)=>{
    let comment = new Comment(req.body);
    // console.log(request);

    comment.save().
        then(request=>{
            res.status(200).json({'request':'ok'});
        }).catch(err=>{
            res.status(400).json({'request':'no'});
        })
});

router.route('/add_product_request').post((req, res)=>{
    let product_request = new Product_request(req.body);
    // console.log(product_request);

    product_request.save().
        then(request=>{
            res.status(200).json({'request':'ok'});
        }).catch(err=>{
            res.status(400).json({'request':'no'});
        })
});

router.route('/update_items_stockroom').post(
    (req, res) =>{
        let farmer = req.body.farmer;
        let nursery = req.body.nursery;
        let items = req.body.items;

        // console.log(farmer);
        // console.log(nursery);
        // console.log(items);

       Stockroom.collection.updateOne({'farmer':farmer, 'nursery': nursery}, {$set:{'items':items}}).
       then(request=>{
           res.status(200).json({'request':'ok'});
       }).catch(err=>{
           res.status(400).json({'request':'no'});
       });;
    }
);

router.route('/find_product_request').post(
    (req, res)=>{
        let farmer = req.body.farmer;
        let nursery = req.body.nursery;
        let producer = req.body.producer;

        Product_request.find({'username': farmer, 'nursery_name': nursery, 'producer': producer},
         (err,requests)=>{
            // console.log(requests);
            if(err) console.log(err);
                else res.json(requests);
        })
    }
);

app.use('/', router);
app.listen(4000, () => console.log(`Express server running on port 4000`));
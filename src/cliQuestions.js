// questions to be asked from user
var questions={}
module.exports= questions

questions.runQuestions= [
    {
        type: 'confirm',
        name: 'npmInit',
        message: 'do you want to initialise npm? : enter y if you have not run npm init yet... ',
        default: true
    },

    {
        type: 'input',
        name: 'mongoUrl',
        message: 'url of mongo database? This location will be stored in .env file, you can manually change later'        
    },

    {
        type: 'input',
        name: 'cookieSecret',
        message: 'enter a cookie secret',
        default: (Math.random()*1000).toString(36)        
    },

    // {
    //     type: 'confirm',
    //     name: 'staticFrontend',
    //     message: 'do you want demo static frontend?',       
    //     default: false
    // },

    {
        type: 'input',
        name: 'authRoutes',
        message: 'enter names of user collections (space separated), eg. clients leads admins'
    },

    {
        type: 'input',
        name: 'unAuthRoutes',
        message: 'enter names of normal collections, eg. items sales orders'
    },

    // {
    //     type: 'confirm',
    //     name: 'multerSetup',
    //     message: 'do you want to setUp multer? : multer is used to store files in mongo DB',
    //     default: false
    // },

    {
        type: 'confirm',
        name: 'emailAuth',
        message: 'do you want email authentication?',
        default: false
    },

    {
        type: 'checkbox',
        name: 'providers',
        message: 'select auth providers',
        choices:["Facebook", "Github", "Google"]
    }
]

questions.npmQuestions=[  
    {
        type: 'input',
        name: 'name',
        message: 'package name',
        default: 'sample-project'
    },
    {
        type: 'input',
        name: 'version',
        message: 'version',
        default: '1.0.0'
    },
    {
        type: 'input',
        name: 'description',
        message: 'description'
    },
    {
        type: 'input',
        name: 'main',
        message: 'entry point',
        default: 'index.js'
    },
    {
        type: 'input',
        name: 'keywords',
        message: 'keywords'
    },
    {
        type: 'input',
        name: 'author',
        message: 'author'
    },
    {
        type: 'input',
        name: 'licence',
        message: 'licence',
        default: 'ISC'
    }
]

questions.routeSelection=[
    {
        type: 'checkbox',
        name: 'routesRequired',
        message: 'select routes',
        choices:[
            {   
                value: "get",
                checked: true
            },
            "post", "update", "delete", "create"                      
        ]
    }
]

questions.providerQuestions=[
    {
        type: 'input',
        name: 'clientId',
        message: 'client id or consumer key'
    },
    {
        type: 'input',
        name: 'clientSecret',
        message: 'client secret or consumer secret'
    }
]

questions.firebaseSetup=[
    {
        type: 'checkbox',
        name: 'services',
        message: 'select firebase service',
        choices:['authentication', 'firestore', 'storage' ,'analytics']
    }]

// not used 
questions.firebaseAuth=[
    {
        type: 'checkbox',
        name: 'providers',
        message: 'select Authentication providers. There are other providers as well',
        choices:['email', 'google', 'facebook', 'phone']
    },
    {
        type: 'confirm',
        name: 'loginPageRequired',
        message: 'do you want basic signup and login page for code reference?',
        default: true
    }
]

questions.firebaseDb=[{
    type: 'list',
    name: 'db',
    message: 'Select Database',
    choices: ['firestore', 'realtime_database']
}]

questions.reactSetup=[
    // {
    //     type: 'confirm',
    //     name: 'redux',
    //     message: 'Do you want to setup redux for your project?',
    //     default: false
    // },
    {
        type: 'confirm',
        name: 'routing',
        message: 'Do you want to setup basic routing for your app?',
        default: false
    },
    {
        type: 'input',
        name: 'projectName',
        message: 'Enter a name for your project',
        default: 'ez-Auth_demo'
    }
]
questions.reactRouting=[{
    type: 'input',
    name: 'routes',
    message: 'Enter names of routes you want (:- name should start with Upper case)',
    default: 'Home AboutUs'
}]

questions.nodemailer=[
    {
        type: 'input',
        name: 'service',
        message: 'email service provider. Some email service providers reject the request from your less secure apps',
        default: 'gmail'
    },
    {
        type: 'input',
        name: 'email_id',
        message: 'email id'
    },
    {
        type: 'password',
        name: 'password',
        message: 'password'
    }
]
const readline = require('readline')
const { stdin: input, stdout: output } = require('process');
const { userInfo } = require('os');

const rl = readline.createInterface({ input, output });


const userData = [
    {
        Name: "Jhon",

        Balance: 1000,
        City: "Pune",
        ContactNo: 6546464678,
        AdharNo:1234567
    },
    {
        Name: "Tanny",

        Balance: 500,
        City: "Pune",
        ContactNo: 6546464098,
        AdharNo:1234567

    },
    {
        Name: "Harry",

        Balance: 1500,
        City: "pune",
        ContactNo: 9408765432,
        AdharNo:1234567
    },
    {
        Name: "Jony",

        Balance: 1000,
        City: "Pune",
        ContactNo: 7875654323,
        AdharNo:1234567
    },
    {
        Name: "sunny",

        Balance: 1200,
        City: "pune",
        ContactNo: 6546464678,
        AdharNo:1234567
    },
]

const services = ["User", "create account"];
const userInfos = (user) => {
    rl.question('please provide Username \n ', username => {
        user(username)
    })
}

const createUser = (usr) => {
    rl.question("Enter Your Name \n", (nam) => {
        rl.question("Enter the initial amount want to add\n", (amt) => {
            rl.question("Enter your City Name \n", (place) => {
                rl.question("Enter Your Mobile Number \n", (Contact) => {
                    rl.question("Enter Your Adhar Card  Number \n", (num) => {

                    let data = { "Name": nam, "Balance": Number(amt), "City": place, "ContactNo":  Number(Contact),AdharNo:Number(num) }
                    usr(data)
                })
            })
        })
    })
})
}

const selectService = () => {
    console.table(services)
    rl.question("Welcome To Kotak Bank... \n please select the service ", (selectedservice) => {
        if (selectedservice == 0) {
            userInfos(user => {
                // let i=0;
                const userPersonalInfo = userData.filter(item => {
                    return item.Name == user;
                })
                if (userPersonalInfo.length >= 1) {

                    debitcredit(userPersonalInfo)
                }
                else {
                    console.log("User not Found")
                    rl.close();
                }
            })
        }
        else if (selectedservice == 1) {
            createUser(usr => {
                {
                    userData.push(usr)
                    console.log("User added Suceesfully");

                    console.table(userData);
                    rl.close()
                }
            }
            )
        }
        else {
            console.log("please choose the proper answer")
            selectService();
        }
    })
}
const debit = (userPersonalInfo) => {
    rl.question("Enter the  amount to Debit  \n", (deb) => {

        
        if (deb > userPersonalInfo[0].Balance) {
            console.log("\n not sufficient balance!! \n")
            debit(userPersonalInfo)

        }
        else {
            userPersonalInfo[0].Balance = userPersonalInfo[0].Balance - deb;

            console.log(`\n Amount of Rs ${deb} is debited from your account \n remaining balance : Rs ${userPersonalInfo[0].Balance}
            `)
            console.table(userPersonalInfo)
            console.log("\n Thank for visiting !!!! \n ")
            rl.close()
        }

    })
}

const credit = (userPersonalInfo) => {
    rl.question("Enter  the amount to be credited \n", (cred) => {
        userPersonalInfo[0].Balance = userPersonalInfo[0].Balance + Number(cred);
        console.log(`\n Amount of Rs ${cred} is credited into your account \n new  balance : Rs ${userPersonalInfo[0].Balance}
        `)
        console.table(userPersonalInfo)

        console.log("\n Thank for visiting !!!!!")
        rl.close()
    })

}

const debitcredit = (userPersonalInfo) => {
    (() => {
        console.table(userPersonalInfo)
        rl.question("Proceed to Debit/Credit amount y/n \n",
            answer => {
                if (answer == 'y') {
                    rl.question("1 for Debit , 2 for credit \n", answer => {
                        if (answer == 1) {
                            debit(userPersonalInfo)

                        }
                        else if (answer == 2) {
                            credit(userPersonalInfo)
                        }
                        else {
                            console.log("please select correct option !! \n")
                            debcred(userPersonalInfo)
                        }
                    })
                }
                else
                    rl.close()
            })
   
   
     })()

}



const KotakBank = () => {


    selectService()

}

KotakBank();
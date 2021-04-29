const appRoot = require('app-root-path');
const log = require(appRoot + '/configs/winston').getLogger();
const mailchimp = require("@mailchimp/mailchimp_marketing");

const LIST_NAME = "getyourpixels";


class MailChimpService {
    constructor() {
        mailchimp.setConfig({
            apiKey: process.env.MAILCHIMP_API_KEY ?
                process.env.MAILCHIMP_API_KEY
                :
                'API_KEY_HERE'
            ,
            server: process.env.MAILCHIMP_SERVER_PREFIX ?
                process.env.MAILCHIMP_SERVER_PREFIX
                :
                'SERVER_PREFIX'
            })
            this.mailer = mailchimp;
    }
    getContactObject() {
        return {
            "email_address": '',
            "status": "subscribed",
            "merge_fields": {
                "FNAME": '',
                "PHONE": '',
            }
        }
    }

    async authenticate() {
        log.info("START");
        try {
            return await this.mailer.ping.get();
        } catch (error) {
            log.error(error);
            throw error;
        } finally {
            log.info("FINISH");
        }
    }

    async getLists() {
        log.info("START");
        try {
            return await this.mailer.lists.getAllLists();
        } catch (error) {
            log.error(error);
            throw error;
        } finally {
            log.info("FINISH");
        }
    }

    async getListsByName(nameParam) {
        log.info("START");
        try {
            const result = await this.mailer.lists.getAllLists();
            const name = nameParam ? nameParam : LIST_NAME;
            let id = '';
            for (let i in result.lists) {
                if (result.lists[i].name === name) {
                    id = result.lists[i].id
                }
            }
            if (id === '') {
                throw new Error("Lista email non trovata");
            }

            return await this.mailer.lists.getList(id);
        } catch (error) {
            log.error(error);
            throw error;
        } finally {
            log.info("FINISH");
        }
    }

    async getListMember(nameParam) {
        log.info("START");
        try {
            const result = await this.mailer.lists.getAllLists();
            const name = nameParam ? nameParam : LIST_NAME;
            let id = '';
            for (let i in result.lists) {
                if (result.lists[i].name === name) {
                    id = result.lists[i].id
                }
            }
            if (id === '') {
                throw new Error("Lista email non trovata");
            }
            
            const response = await this.mailer.lists.getListMembersInfo(id);

            return response?.members;
        } catch (error) {
            log.error(error);
            throw error;
        } finally {
            log.info("FINISH");
        }
    }

    async addMemberToList(param) {
        log.info("START");
        try {
            const result = await this.mailer.lists.getAllLists();
            const name = LIST_NAME;
            let id = '';
            for (let i in result.lists) {
                if (result.lists[i].name === name) {
                    id = result.lists[i].id
                }
            }
            if (id === '') {
                throw new Error("Lista email non trovata");
            }

            const contact = this.getContactObject();

            const { username, email, ...rest } = param;
            contact.FNAME = username;
            contact.email_address = email;
            for (let i in rest) {
                for (let j in contact) {
                    if (i === j) {
                        contact[j] = rest[i];
                    }
                }
            }

            return await this.mailer.lists.addListMember(id, contact);
        } catch (error) {
            log.error(error);
            throw error;
        } finally {
            log.info("FINISH");
        }
    }

    async addAllMembersToList(accounts) {
        log.info("START");
        try {
            const result = await this.mailer.lists.getAllLists();
            const name = LIST_NAME;
            let id = '';
            for (let i in result.lists) {
                if (result.lists[i].name === name) {
                    id = result.lists[i].id
                }
            }
            if (id === '') {
                throw new Error("Lista email non trovata");
            }

            for (let i in accounts) {
                const contact = this.getContactObject();
    
                const { username, email, ...rest } = accounts[i];
                contact.FNAME = username;
                contact.email_address = email;
                // for (let i in rest) {
                //     for (let j in contact) {
                //         if (i === j) {
                //             contact[j] = rest[i];
                //         }
                //     }
                // }
    
                await this.mailer.lists.addListMember(id, contact);
            }
            return true;
        } catch (error) {
            log.error(error);
            throw error;
        } finally {
            log.info("FINISH");
        }
    }

}

module.exports = MailChimpService;
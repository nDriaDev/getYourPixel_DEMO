const appRoot = require('app-root-path');
const log = require(appRoot + '/configs/winston').getLogger();
var MailChimpService = require(appRoot + '/services/mailChimpService');
var service = new MailChimpService();


class MailChimpController{
    async authenticate(req, res, next) {
        log.info("START")
        try {
            service.authenticate();
            next();
        } catch (error) {
            log.error(error);
            next(error);
        } finally {
            log.info("FINISH")
        }
    }

    async getLists(req, res, next) {
        log.info("START");
        try {
            const result = await service.getLists();
            next();
        } catch (error) {
            log.error(error);
            next(error);
        } finally {
            log.info("FINISH");
        }
    }

    async getListByName(req, res, next) {
        log.info("START");
        try {
            const result = await service.getListByName(req?.body);
            next();
        } catch (error) {
            log.error(error);
            next(error);
        } finally {
            log.info("FINISH");
        }
    }

    async getListMembers(req, res, next) {
        log.info("START");
        try {
            const result = await service.getListMembers({ idList: req.body.id });
            next();
        } catch (error) {
            log.error(error);
            next(error);
        } finally {
            log.info("FINISH");
        }
    }

    async addMemberToList(req, res, next) {
        log.info("START");
        const { username, email, lang } = res.locals.result;
        const template = lang === 'it' ? '/resources/templateActivationSuccess_IT.html' : '/resources/templateActivationSuccess_ENG.html';
        try {
            delete res.locals.result;
            await service.addMemberToList({ username, email });
            res.sendFile(appRoot + template);
        } catch (error) {
            log.error(error);
            res.sendFile(appRoot + template);
        } finally {
            log.info("FINISH");
        }
    }

    async addAllMembersToList(req, res, next) {
        log.info("START");
        try {
            const { accounts } = res.locals.result;
            delete res.locals.result;
            const res1 = await service.addAllMembersToList(accounts);
            res.status(200).send({message:'Tutti gli utenti sono stati aggiunti alla mailing list'})
        } catch (error) {
            log.error(error);
            next(error);
        } finally {
            log.info("FINISH");
        }
    }
}

module.exports = new MailChimpController();

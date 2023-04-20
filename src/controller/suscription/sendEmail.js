const handlerHttpError = require("../../utils/handlerHttpError");
const { newCampaign } = require("./objectSend")
const {ContactsApi, CreateContact, EmailCampaignsApi, TransactionalEmailsApi }= require("../../config/sendinblue")
const listId = 3


const addSuscriptiontoList = async ({email}) => {

    try {
        let apiInstance = await ContactsApi;
        let createContact = await CreateContact;

        createContact.email = email
        createContact.listIds = [listId]
        await apiInstance.createContact(createContact)
       /*  console.log('API called successfully. Returned data: ' + JSON.stringify(createContact)); */

    } catch (error) {
        handlerHttpError(res, `ERROR_EN_CREAR_NUEVO_CONTACTO`, 400)
    }

}

//se agrega un tag de a los contactos de tal forma que se dispare un evento automatizado
const sendPostNewInfo = async ({type, info}) => {
    try {
        let campaignId = await createCampaign({type: type, info: info})
        if (campaignId) {
            await EmailCampaignsApi.sendEmailCampaignNow(campaignId)
            console.log('API called successfully.');
        } else {
            console.error('Campaign ID is missing or invalid');
        }
    } catch (error) {
        console.error(error)
    }
}



const createCampaign = async ({type, info}) => {
    let params
    if (type == "event") {
        params = {
            event: info.title,
            event_image: info.frontpage
        }
    } else if (type == "blog") {
        params = {
            title: info.title,
            description: info.description,
            blog_image: info.image
        }
    }

    try {
        let templateId = await getTemplate({type})
        let emailCampaigns = await newCampaign({ title: info.title, params, listId, templateId});
        const campaign = await EmailCampaignsApi.createEmailCampaign(emailCampaigns)
        return campaign.id
    } catch (error) {
        
        handlerHttpError(res, `Origen: Campaign ${error}`)
    }
}

const getTemplate = async ({type}) => {
    const apiInstance = await TransactionalEmailsApi
    const templates = await apiInstance.getSmtpTemplates()
    const template = templates.templates.find(t => t.name.toLowerCase().includes(type.toLowerCase()));
    const id = template.id;
    return id;
}

module.exports = {
    addSuscriptiontoList,
    sendPostNewInfo
}
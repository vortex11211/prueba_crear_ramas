import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getContact = (async(req: any, res: any)=>{
    const contactId: number = req.params.contactId;
    const showContact = await prisma.contact.findFirst({
        where: {contactId: Number(contactId), deleted: false}
    })

    if (!showContact) { 
 res.status(404).end("Contact not found")
    } else {
        res.json(showContact)
    }
});

export const getContacts = (async(req: any, res: any)=>{
    const showContacts = await prisma.contact.findMany({
       where: {deleted:false}
   });

   if (!showContacts) {
        res.status(404).end("There are no contacts in the list")    
    } else {
        res.json(showContacts)     
    }
});

export const createContact = (async(req: any, res: any)=>{
    const {name, last_name, email, phone_number}= req.body;
    const newContact = await prisma.contact.create({
        data:{
            name, last_name, email, phone_number
        }
    });

    if (!newContact) {
        res.status(400).end("Error: Contact info format is not correct")
    } else {
        res.json(newContact)    
    }
});

export const deleteContact = (async(req: any,res: any)=>{
    const contactId: number = req.params.contactId;
    const eraseContact= await prisma.contact.update({
        where:{contactId: Number(contactId)},
        data:{deleted: true}
    });

    res.status(204).json("Contact deleted")
});

export const uptadeContact = (async(req: any, res: any)=>{
    const contactId: number = req.params.contactId;
    const {name, last_name, email, phone_number} = req.body;
    const putContact = await prisma.contact.update({
        where: {contactId : Number(contactId)},
        data:{name, last_name, email, phone_number}
    });

    if(!putContact) {
        res.status(404).end("Contact not found")
    } else {
        res.status(200).json(putContact)
    }
});

export const recoverContact = (async (req: any, res: any) => {
    const contactId = req.params.contactId;
    const recoveredContact = await prisma.contact.update({
        where: {contactId: Number(contactId)},
        data: { deleted: false },
    });

    if(!recoveredContact) {
        res.status(404).end("Contact not found");
    } else {
        res.status(200).json("Contact recovered");
    }
    
});

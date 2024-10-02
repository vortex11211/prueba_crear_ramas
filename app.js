const express= require('express')
const{PrismaClient}= require('@prisma/client')

const prisma = new PrismaClient()
const app=express()

app.use(express.json())

app.get('/',(req,res)=>{
    res.send('Hola mundo')
})

//crear un contacto
app.post(`/POST/contacts`, async(req, res)=>{
    const {name, last_name, email, phone_number}= req.body;
    const result= await prisma.contact.create({
        data:{
            name,last_name,email,phone_number
        }
    });
    res.json(result)
});


//mostrar contactos GET/contacts
app.get(`/GET/contacts`, async(req, res)=>{
 const showContacts =   await prisma.contact.findMany({
    where: {deleted:false}
});
 res.json(showContacts)
});

//actualizar un contacto PUT/contacts/:contactId
app.put(`/PUT/contacts/:contactId`, async(req,res)=>{
   const {contactId} = req.params;
   const {name,last_name,email,phone_number}= req.body;
   const post = await prisma.contact.update({
    where: {contactId : Number(contactId)},
    data:{name,last_name,email,phone_number}
   });
   res.json(post)
});

//softdelete
app.delete(`/DELETE/contacts/:contactId`, async(req,res)=>{
    const{contactId}=req.params;
const erase= await prisma.contact.update({
    where:{contactId:Number(contactId)},
data:{deleted: true}
});
res.json('Eliminado')
});


// Recuperar un contacto
app.patch('/PATCH/contacts/:contactId/recover', async (req, res) => {
    const { contactId } = req.params;
    const recover = await prisma.contact.update({
      where: {contactId: Number(contactId)},
      data: { deleted: false },
    });
    res.json('contacto recuperado');
  });
  

app.listen(3000,()=>
console.log("Server ready at: http://localhost:3000"))